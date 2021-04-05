import { AxiosResponse } from 'axios';

export interface IDefLangKey {
    _ka: string;
}

export interface ITranslateService {
    key: string;
    T(locales: ITranslateResponse[], key: string, ...params: any): string;
    Use(key: string): Promise<ITranslateResponse>; 
    FetchLocales(): Promise<AxiosResponse<any>>;
}

export interface ILocale {
    description: any;
    id: number;
    key: string;
    value: string;
}

export interface IAllLocalesResponse {
    count: number;
    data: ILocale[];
    errorMessage: string | null;
    message: string | null;
    success: boolean;
}

export interface ITranslates {
    common: any;
    contact: any;
    dashboard: any;
    date: any;
    error: any;
    months: any;
    packages: any;
    payments: any;
    result: any;
    signing: any;
    terms: any;
    validation: any;
    weeks: any;
}

export interface ITranslateResponse {
    common: any;
    contact: any;
    dashboard: any;
    date: any;
    error: any;
    months: any;
    packages: any;
    payments: any;
    result: any;
    signing: any;
    terms: any;
    validation: any;
    weeks: any;
}