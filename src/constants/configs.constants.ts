import { IConfigConstants } from '../interfaces/configs.interface';

declare const globalConfig: IConfigConstants;
const _globalConfig = globalConfig;
export { _globalConfig as globalConfig }