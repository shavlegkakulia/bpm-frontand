import { LOCALE_LOADING, FETCH_LOCALSE, FETCH_TRANSLATES } from './../constants/translate.constants';
import { DefLangKey } from "../../constants/service.translate.constants";
import TranslateService from "../../services/translateService";

export const FetchLocales = () => dispatch => {
    dispatch({type: LOCALE_LOADING, isLoading: true});
    TranslateService.FetchLocales().then(Response => {
        if(Response.data.success) { 
            dispatch({type: FETCH_LOCALSE, Locales: Response.data.data});
            FetchTranslates(Response.data.data[0].key)(dispatch);
          } else {
            FetchTranslates(DefLangKey._ka)(dispatch);
          }
    })
}

export const FetchTranslates = (key) => dispatch => {
    TranslateService.Use(key).then(Response => { 
        dispatch({type: FETCH_TRANSLATES, Translates: Response, key: key});
        dispatch({type: LOCALE_LOADING, isLoading: false});
    })
}