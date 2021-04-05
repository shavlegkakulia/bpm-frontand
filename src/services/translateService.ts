import axios from 'axios';
import { Constants } from './../constants/translate.constants';
import { globalConfig } from './../constants/common.constants';
import { ITranslateService, IAllLocalesResponse, ITranslateResponse, IAllLocalesData } from './../interfaces/translate.interface';

class TranslateService implements ITranslateService {

    key = Constants._ka;
    locales = [];
    translate = null;

    T(key: string, ...params) {
        try {
            if (!key) return null;
            let parts = key.split('.');
            let tData = this.translate;

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
    }

    Use = async(key: string) => {
       return await axios.get<ITranslateResponse>(`src/assets/translate/${key}.json?v=${globalConfig.translate_Version}`).then(Response => {
            this.translate = Response.data;
            this.key = key;
            return true;
        }).catch(() => {
            return false;
        })
    }

    async FetchLocales() {
        return await axios.get<IAllLocalesResponse>(`${globalConfig.api_URL}api/public/allLocales`);
    }
}

export default new TranslateService();