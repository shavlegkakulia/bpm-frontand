import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Observable } from 'rxjs';

export interface IAuthService {
    SetToken(token: string, refreshToken: string): void;
    GetToken(): string;
    GetRefreshToken(): string;
    RemoveToken(): void;
    IsAuthenticated(): boolean;
    IsActive(): boolean;
    Register(user: IUser): Observable<AxiosResponse<any>>;
    Verify(hash: string, type: number): Observable<AxiosResponse<any>>;
    SignIn(username: string, password: string): Observable<AxiosResponse<any>>;
    UserInfo(): Observable<AxiosResponse<any>>;
    ResetPassword(username: string, password: string): Observable<AxiosResponse<any>>;
    SignOut(): void;
    RegisterAuthInterceptor(): unsubscribe;
    RegisterAuthInterceptor(): unsubscribe;
}

interface unsubscribe {
    unsubscribe(): void;
}

export interface IUser {
    username: string;
    password: string;
    agreedTermsCond: boolean
}

export interface IRegisterResponse {
    count: number;
    data: number;
    errorMessage: string;
    message: string;
    succes: boolean;
}

interface IVerifi {
    id: number;
    localeCode: string;
    localeId: number;
    mail: string;
    nextPayDate: any;
    paymentStatus: number;
    pdfId: any;
    pdfValidationCount: number;
    refreshToken: string;
    token: string;
    userName: string;
    userStatus: number;
    workspaceId: number;
}

export interface IVerifyResponse {
    count: number;
    data: IVerifi;
    errorMessage: string;
    message: string;
    succes: boolean;
}

export interface ISignInResponse {
    refreshToken: string;
    token: string;
}

export interface IRefreshTokenResponse {
    data: string;
    success: boolean;
}

export interface IUserInfo {
    id: number;
    localeCode: string;
    localeId: number;
    mail: string;
    nextPayDate: any;
    paymentStatus: number;
    pdfId: any;
    pdfValidationCount: number;
    refreshToken: string;
    token: string;
    userName: string;
    userStatus: number;
    workspaceId: number;
}

export interface IUserInfoResponse {
    count: number;
    data: IUserInfo;
    errorMessage: string;
    message: string;
    succes: boolean;
}

export interface IResetPassword {
    count: number;
    data: number;
    errorMessage: string;
    message: string;
    succes: boolean;
}

export interface IAxiosResponseType {
    status?: number;
    data?: any
}

export interface IAxiosError {
    response?: IAxiosResponseType;
    config?: AxiosRequestConfig;
}

declare module 'axios' {
    export interface AxiosRequestConfig {
        objectResponse?: boolean;
        fromLogin?: boolean;
        skipRefresh?: boolean;
        anonymous?: boolean;
        ignoreToken?: boolean;
    }
}