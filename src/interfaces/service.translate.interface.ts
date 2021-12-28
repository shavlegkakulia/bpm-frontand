import { AxiosResponse } from 'axios';

export interface IDefLangKey {
    _ka: string;
    _en: string;
}

export interface ITranslateService {
    key: string;
    Translates(): ITranslateResponse[];
    T(key: string): string;
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

export type ITranslateResponse = ITranslates;