import axios from 'axios';
import { DefLangKey } from '../constants/service.translate.constants';
import { globalConfig } from '../constants/configs.constants';
import { ITranslateService, IAllLocalesResponse, ITranslateResponse } from '../interfaces/service.translate.interface';
import { ITranslateState, ITranslateStateGlobal } from '../interfaces/reducer.translate.interface';
import { useStore } from 'react-redux';

const TranslateService: ITranslateService =  {
    key: DefLangKey._ka,
    Translates() {
        return (useStore().getState() as ITranslateStateGlobal).TranslateReducer.Translates;
    },
    T(key: string) {
        try {
            if (!key) return null;
            let parts = key.split('.');
            let tData = TranslateService.Translates();

            for (let part of parts) {
                tData = tData[part];
            }

            let value = tData.toString() || "";

            return value;
        }
        catch (e) {
            return "";
        }
    },
    Use: async(key: string):Promise<ITranslateResponse> => {
       return await axios.get<ITranslateResponse>(`assets/translate/${key}.json?v=${globalConfig.translate_Version}`).then(Response => {
        TranslateService.key = key;
            return Response.data;
        }).catch(() => {
            return null;
        })
    },
    FetchLocales: async() => {
        return await axios.get<IAllLocalesResponse>(`${globalConfig.api_URL}api/public/allLocales`, {ignoreToken: true});
    }
}

export default TranslateService;