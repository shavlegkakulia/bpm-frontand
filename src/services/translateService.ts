import axios from 'axios';
import { DefLangKey } from '../constants/service.translate.constants';
import { globalConfig } from '../constants/configs.constants';
import { ITranslateService, IAllLocalesResponse, ITranslateResponse } from '../interfaces/service.translate.interface';

const TranslateService: ITranslateService =  {
    key: DefLangKey._ka,
    T(locales: ITranslateResponse[], key: string, ...params) {
        try {
            if (!key) return null;
            let parts = key.split('.');
            let tData = locales;

            for (let part of parts) {
                tData = tData[part];
            }

            let value = tData.toString() || "";
            for (let i = 0; i < params.length; i++) {
                value = value.replace(new RegExp(`\\{${i}}`, "g"), params[i]);
            }

            return value;
        }
        catch (e) {
            return "";
        }
    },
    Use: async(key: string):Promise<ITranslateResponse> => {
       return await axios.get<ITranslateResponse>(`src/assets/translate/${key}.json?v=${globalConfig.translate_Version}`).then(Response => {
        TranslateService.key = key;
            return Response.data;
        }).catch(() => {
            return null;
        })
    },
    FetchLocales: async() => {
        return await axios.get<IAllLocalesResponse>(`${globalConfig.api_URL}api/public/allLocales`);
    }
}

export default TranslateService;