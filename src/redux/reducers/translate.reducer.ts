import { LOCALE_LOADING, FETCH_LOCALSE, FETCH_TRANSLATES, CHANGE_LOCALE } from './../constants/translate.constants';
import { DefLangKey } from './../../constants/service.translate.constants';
import { ITranslateState, IAction } from '../../interfaces/reducer.translate.interface';


const initialState: ITranslateState = {
    isLoading: true,
    Locales: [],
    Translates: [],
    activeKey: DefLangKey._en
}

export function TranslateReducer (state: ITranslateState = initialState, action: IAction): ITranslateState {
    switch (action.type) {
        case LOCALE_LOADING:
            return {
                ...state, isLoading: action.isLoading
            }
        case FETCH_LOCALSE:
            return {
                ...state, Locales: action.Locales
            }
        case FETCH_TRANSLATES: 
            return {
                ...state, Translates: action.Translates
            }
        case CHANGE_LOCALE:
            return {
                ...state, activeKey: action.key
            }
        default:
            return {...state}
    }
}