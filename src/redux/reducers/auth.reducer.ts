import { IS_LOADING, AUTHENTIFICATE, LOGOUT, REGISTER, VERIFY, RESET_PASSWORD, USER_INFO } from './../constants/auth.constants';
import AuthService from './../../services/authService';
import { IUserInfo } from './../../interfaces/service.auth.interface';
import { IState, IAction, IAuthReducer } from './../../interfaces/reducer.auth.interface';
import { UserStatuses } from './../../constants/userStatuses.constant';

const InitialState: IState = {
    User: null,
    isActive: false,
    isLoading: false
}

export const AuthReducer = (state: IState = InitialState, action: IAction):IState => {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state, isLoading: action.isLoading
            }
        case AUTHENTIFICATE:
            return {
                ...state
            }
        case USER_INFO:
            return {
                ...state, User: action.User
            }
        case LOGOUT: 
            return {
                ...state, isActive: false, User: null
            }
        default:
            return {
                ...state
            }
    }
}