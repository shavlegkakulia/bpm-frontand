import axios, {AxiosRequestConfig} from "axios";
import { useStore, useDispatch } from 'react-redux';
import { SIGNOUT } from './../redux/actions/auth.actions';
import { ITranslateState } from './../interfaces/reducer.translate.interface';
// declare module 'axios' {
//     export interface AxiosInstance {
//       request<T = any> (config: AxiosRequestConfig): Promise<T>;
//       get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
//       delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
//       head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
//       post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//       put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//       patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//     }
//   }
declare module 'axios' {
    export interface AxiosRequestConfig {
        objectResponse?: boolean;
        fromLogin?: boolean;
        skipRefresh?: boolean;
        anonymous?: boolean;
        errorMessage?: string;
        customError?:boolean;
        config?: IConfig;
    }

    export interface IConfig {
        skipCustomErrorHandling: boolean;
        objectResponse: boolean;
    }
}
class CommonService {
RegisterCommonInterceptor() {
    // const store = (useStore().getState() as ITranslateState).TranslateReducer;
    // const dispatch = useDispatch();
    // let requestInterceptor = axios.interceptors.request.use((config) => {
    //     config.headers = config.headers || {}; 
    //     config.headers['locale'] = store.activeKey;

    //     return config;
    // });

    // let responseInterceptor = axios.interceptors.response.use(
    //     (response: any) => {debugger
    //         if (!response.config.objectResponse) return Promise.resolve(response);

    //         // let data = response.data || {};
    //         // if (!data.success && !data.token) {
    //         //     response.errorMessage = data.errorMessage || 'errror';
    //         //     response.customError = true;
    //         //      if (!response.config.skipCustomErrorHandling) alert(response.errorMessage)
    //         //     //     stateService.event(stateEvents.globalError, response.errorMessage);

    //         //     return Promise.reject(response);
    //         // }
    //         return Promise.resolve(response);
    //     },
    //     error => {debugger
    //         if (navigator && !navigator.onLine) {
    //             if (!error.config.skipCustomErrorHandling) alert('No internet connection')
    //             //stateService.event(stateEvents.globalError, "No internet connection");
    //         }
    //         if(!error?.response){
    //             dispatch(SIGNOUT());
    //             return Promise.reject(error);
    //         }

    //         if(error?.response.status === 401 || error.response.status === 403 || error.config.anonymous || error.config.skipRefresh) {
    //           error.errorMessage = "error.unauthorized";
    //           if(error.config.fromLogin || error.config.anonymous) alert(error?.response?.data?.errorMessage || 'err')
    //            // stateService.event(stateEvents.globalError, error?.response?.data?.errorMessage || translateService.t(error.errorMessage));
    //           return Promise.reject(error);
    //         }

    //         else error.errorMessage = "error.error";
    //         console.log('error')
    //        // stateService.event(stateEvents.globalError, translateService.t(error.errorMessage));

    //         return Promise.reject(error);
    //     }
    // );

    return {
        unsubscribe: () => {
            axios.interceptors.request.eject(0);
            axios.interceptors.response.eject(1);
        }
    };
}
}

export default new CommonService();
