import {
  IS_LOADING,
  AUTHENTIFICATE,
  LOGOUT,
  REGISTER,
  VERIFY,
  RESET_PASSWORD,
  USER_INFO,
} from "./../constants/auth.constants";
import AuthService from "./../../services/authService";
import { gql } from "@apollo/client";
import { apolloClient } from "../../App";
import authService from "./../../services/authService";

export const SIGNIN = (username: string, password: string) => (dispatch) => {
  dispatch({ type: IS_LOADING, isLoading: true });
  AuthService.SignIn(username, password).subscribe((Response) => {
    if (Response.status === 200) {
      dispatch({ type: AUTHENTIFICATE });
      AuthService.SetToken(Response.data.token, Response.data.refreshToken);
      USERINFO()(dispatch);
    }
  });
};

export const USERINFO = () => (dispatch) => {
  dispatch({ type: IS_LOADING, isLoading: true });
  const GET_USERINFO_QUERY = gql`
    query {
      userInfo {
        data {
            email
        }

        succes
        errorMessage
        code
      }
    }
  `;

  return apolloClient
    .query({ query: GET_USERINFO_QUERY, context: {
        headers: {
            authorization: `Bearer ${AuthService.GetToken()}`
        }
    } })
    .then((response) => {
      const { userInfo } = response.data.userInfo;

      dispatch({ type: USER_INFO, User: userInfo });
    })
    .finally(() => {
      dispatch({ type: IS_LOADING, isLoading: false });
    });
};

export const SIGNOUT = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  AuthService.SignOut();
};
