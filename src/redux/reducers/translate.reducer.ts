import { LOCALE_LOADING, FETCH_LOCALSE, FETCH_TRANSLATES } from './../constants/translate.constants';
import { IState, IAction } from '../../interfaces/reducer.translate.interface';

const initialState: IState = {
    isLoading: false,
    Locales: [],
    Translates: []
}

export function TranslateReducer (state: IState = initialState, action: IAction): IState {
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
        default:
            return {...state}
    }
}