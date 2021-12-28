import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { from } from 'rxjs';
import { useDispatch, useStore } from 'react-redux';
import { SIGNOUT } from './../redux/actions/auth.actions';
import { globalConfig } from '../constants/configs.constants';
import { IAuthService, IUser, IRegisterResponse, IVerifyResponse, ISignInResponse, IUserInfoResponse, IResetPassword, IRefreshTokenResponse, IAxiosError } from './../interfaces/service.auth.interface';
import { IAuthState } from '../interfaces/reducer.auth.interface';

class AuthService implements IAuthService {
    refreshStarted = false;
    
    SetToken (token: string, refreshToken: string) {
        localStorage.setItem('access-token', token);

        if (refreshToken !== undefined) {
            localStorage.setItem('refresh-token', refreshToken);
        }
    }

    GetToken () {
        return localStorage.getItem("access-token");
    }

    GetRefreshToken () {
        return localStorage.getItem("refresh-token");
    }

    RemoveToken () {
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
    }

    IsAuthenticated () {
        let token = this.GetToken();
        let refreshToken = this.GetRefreshToken();

        return token != null || refreshToken != null;
    }

    IsActive () {
         return (useStore().getState() as IAuthState).AuthReducer.isActive; 
    }

    RegisterAuthInterceptor () {
        const dispatch = useDispatch();

        const setAuthToken = (config: AxiosRequestConfig) => {
            config.headers = config.headers || {};
            config.headers['authorization'] = this.GetToken();
        }

        const waitForRefresh = (config: AxiosRequestConfig) => {
            return new Promise(resolve => {
                let interval = setInterval(() => {
                    if (this.refreshStarted) return;

                    clearInterval(interval);
                    resolve(config);
                }, 500);
            });
        }

        // //add auth header
        let requestInterceptor = axios.interceptors.request.use((config: AxiosRequestConfig) => {
            if (this.IsAuthenticated() && !config.anonymous && !config.ignoreToken) {
                //if refreshStarted wait
                if (this.refreshStarted && !config.skipRefresh) {
                    return waitForRefresh(config).then((config: AxiosRequestConfig) => {
                        if (!this.GetToken()) return Promise.reject({ status: 401 });
                        setAuthToken(config);
                        return Promise.resolve(config);
                    });
                }

                setAuthToken(config);
            }
            return config;
        });

        // if unauthorized refetch
        let responseInterceptor = axios.interceptors.response.use((response: AxiosResponse) => {
            return response
        },
        (error: IAxiosError) => {
            error.response = error.response || {};
            //Reject promise if usual error
            if ((error.response.status !== 401 && error.response.status !== 403) || error.config.anonymous || error.config.skipRefresh) {
                return Promise.reject(error);
            }
            const originalRequest = error.config;
            //if refresh already started wait and retry with new token
            if (this.refreshStarted) {
                return waitForRefresh(null).then(_ => {
                    if (!this.GetToken()) return Promise.reject({ status: 401 });
                    setAuthToken(originalRequest);
                    return axios(originalRequest);
                });
            }
            //refresh token
            this.refreshStarted = true;
            return axios.post<IRefreshTokenResponse>(`${globalConfig.api_URL}api/private/refreshaccesstoken/${this.GetRefreshToken()}`, {}, { anonymous: true }).then((response: AxiosResponse<IRefreshTokenResponse>) => {
                let tokenData = response?.data?.data;
                let jsonStr = tokenData?.replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {
                    return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
                });
                  
                let objData = JSON.parse(jsonStr);
            
                if (!response.data.success || !objData.token) throw response;
                this.SetToken(objData.token, objData?.refreshToken);
                this.refreshStarted = false;
                setAuthToken(originalRequest);
                return axios(originalRequest);
            }).catch(err => {
                dispatch(SIGNOUT());
                this.refreshStarted = false;
                //redirect to login
                //routingService.push(defaults.notAuthRoute);
                return Promise.reject(err);
            });
        });
        return {
            unsubscribe: () => {
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            }
        }
    }

    Register (user: IUser) {
        let promise = axios.post<IRegisterResponse>(`${globalConfig.api_URL}api/public/register/`, user, { objectResponse: true });
        return from(promise);
    }

    Verify (hash: string, type: number) {
        let promise = axios.get<IVerifyResponse>(`${globalConfig.api_URL}api/public/authWithHash/${type}/${hash}`, { objectResponse: true });
        return from(promise);
    }

    SignIn (username: string, password: string) {
        let promise = axios.post<ISignInResponse>(`${globalConfig.api_URL}api/authenticate?username=${username}&password=${password}`, {}, { fromLogin: true, objectResponse: true, skipRefresh: true });
        return from(promise);
    }

    UserInfo () {
        let promise = axios.get<IUserInfoResponse>(`${globalConfig.api_URL}api/private/userInfo`, { objectResponse: true });
        return from(promise);
    }

    ResetPassword (username: string, password: string) {
        let promise = axios.post<IResetPassword>(`${globalConfig.api_URL}api/public/resetPassword`, { username, password }, { objectResponse: true });
        return from(promise);
    }

    SignOut () {
        this.RemoveToken();
    }
}

export default new AuthService();