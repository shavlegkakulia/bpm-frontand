import { ILocale, ITranslates } from './service.translate.interface';

export interface ITranslateState {
    isLoading: boolean,
    Locales: ILocale[],
    Translates: ITranslates[],
    activeKey: string
}

export interface IAction {
    type: string,
    isLoading: boolean,
    Locales: ILocale[],
    Translates: ITranslates[],
    key: string
}

export interface ITranslateStateGlobal {
    TranslateReducer: ITranslateState;
}

export interface ITranslateReducer {
    state(state: ITranslateState, action: IAction): ITranslateState;
}