import { AxiosResponse } from 'axios';

export interface ITranslateService {
    key: string;
    locales: IAllLocalesData[] | [];
    translate: ITranslateResponse;
    T(key: string, ...params: any): void;
    Use(key: string): Promise<boolean>; 
    FetchLocales(): Promise<AxiosResponse<any>>;
}

export interface IAllLocalesData {
    description: any;
    id: number;
    key: string;
    value: string;
}

export interface IAllLocalesResponse {
    count: number;
    data: IAllLocalesData[];
    errorMessage: string | null;
    message: string | null;
    success: boolean;
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