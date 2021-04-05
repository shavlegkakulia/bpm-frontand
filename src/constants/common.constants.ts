import { IConfigConstants } from './../interfaces/constants.interface';

declare const globalConfig: IConfigConstants;
const _globalConfig = globalConfig;
export { _globalConfig as globalConfig }