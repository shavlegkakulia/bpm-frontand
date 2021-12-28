import { IUserInfo } from './service.auth.interface';

export interface IState {
    isLoading: boolean,
    User: IUserInfo,
    isActive: boolean
}

export interface IAction {
    type: string,
    isLoading: boolean,
    User: IUserInfo,
    refreshToken: string,
    token: string
}

export interface IAuthState {
    AuthReducer: IState;
}

export interface IAuthReducer {
    AuthReducer(state: IState, action: IAction): IState;
}