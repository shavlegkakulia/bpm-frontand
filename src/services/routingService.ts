import { globalConfig } from '../constants/configs.constants';
interface IRoutingService {
    routes: Array<String>;
    routeNames: Object;
    routePath (name: string, params: any): String;
    routeName(path: string, checkSlash: boolean): String;
}

class RoutingService implements IRoutingService {
    history: any;
    match: any;
    constructor() {
        let baseUrl = globalConfig.base_URL;
        this.routes[this.routeNames.default] = `${baseUrl}`;
        this.routes[this.routeNames.login] = `${baseUrl}landing/login/`;
        this.routes[this.routeNames.register] = `${baseUrl}landing/register/`;
        this.routes[this.routeNames.landing] = `${baseUrl}landing/`;
        this.routes[this.routeNames.recoverPassword] = `${baseUrl}landing/recover-password/`;
        this.routes[this.routeNames.contact] = `${baseUrl}contact`;
        this.routes[this.routeNames.packages] = `${baseUrl}packages`;
        this.routes[this.routeNames.packageInfo] = `${baseUrl}packageInfo`;
        this.routes[this.routeNames.dashboard] = `${baseUrl}dashboard`;
        this.routes[this.routeNames.terms] = `${baseUrl}terms`;
        this.routes[this.routeNames.viewResult] = `${baseUrl}viewResult/:id`;
        this.routes[this.routeNames.viewWithHashDoc] = `${baseUrl}auth/api/public/authWithHash/pdf/:hash`;
        this.routes[this.routeNames.viewWithHashResetPassword] = `${baseUrl}auth/api/public/authWithHash/resetPassword/:hash`;
        this.routes[this.routeNames.viewWithHashOnce] = `${baseUrl}auth/api/public/authWithHash/once/:hash`;
        this.routes[this.routeNames.viewPayment] = `${baseUrl}viewPayment`;
        this.routes[this.routeNames.startBogAuthorize] = `${baseUrl}packageInfo/startBOGAuthorize/:packetid`;
        this.routes[this.routeNames.cancellPayment] = `${baseUrl}cancellPayment`;
        this.routes[this.routeNames.paymentSucces] = `${baseUrl}packageInfo/payment/success`;
        this.routes[this.routeNames.paymentFailed] = `${baseUrl}packageInfo/payment/failed`; 
        this.routes[this.routeNames.dashboardView] = `${baseUrl}dashboardView/:docId`;
    }

    routes = [];
    routeNames = {
        default: 'default',
        login: 'login',
        register: 'register',
        landing: 'landing',
        recoverPassword: 'recoverPassword',
        contact: 'contact',
        packages: 'packages',
        packageInfo: 'packageInfo',
        dashboard: 'dashboard',
        terms: 'terms',
        viewResult: 'viewResult',
        viewWithHashDoc: 'viewWithHashDoc',
        viewWithHashResetPassword: 'viewWithHashResetPassword',
        viewWithHashOnce: 'viewWithHashOnce',
        viewPayment: 'viewPayment',
        startBogAuthorize: 'startBogAuthorize',
        cancellPayment: 'cancellPayment',
        paymentSucces: 'paymentSucces',
        paymentFailed: 'paymentFailed',
        dashboardView: 'dashboardView'
    }

        //get route path from name and optional params
        routePath(name: string, params: any): String {
            let route = this.routes[name];
            if (!route) return '';
    
            if (params) {
                for (let prop in params) {
                    route = route.replace(`:${prop}`, params[prop]);
                }
            }
    
            return route;
        }

            //get route name from path
    routeName(path: string, checkSlash: boolean = true): String {
        if (!path) path = this.history.location.pathname;
        if (!path.endsWith('/') && checkSlash) path += '/';

        for (let routeName in this.routes) {
            let route = this.routes[routeName];

            for (let param in this.match.params) {
                route = route.replace(`:${param}`, this.match.params[param]);
            }
            
            if (route == path) return routeName;
        }
        return null;
    }
}

export default new RoutingService();