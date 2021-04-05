import { ILocale, ITranslates } from './service.translate.interface';

export interface IState {
    isLoading: boolean,
    Locales: ILocale[],
    Translates: ITranslates[]
}

export interface IAction {
    type: string,
    isLoading: boolean,
    Locales: ILocale[],
    Translates: ITranslates[]
}

export interface ITranslateState {
    TranslateReducer: IState;
}

export interface ITranslateReducer {
    state(state: IState, action: IAction): IState;
}