import {
  LOCALE_LOADING,
  FETCH_LOCALSE,
  FETCH_TRANSLATES,
  CHANGE_LOCALE,
} from "./../constants/translate.constants";
import TranslateService from "../../services/translateService";
import { gql } from "@apollo/client";
import { apolloClient } from "../../App";

export const FetchLocales = () => (dispatch) => {
  dispatch({ type: LOCALE_LOADING, isLoading: true });
  const GET_REFRESH_TOKEN_QUERY = gql`
    query {
      locales {
        locales {
          name
          key
        }

        succes
        errorMessage
        code
      }
    }
  `;

  return apolloClient
    .query({ query: GET_REFRESH_TOKEN_QUERY })
    .then((response) => {
      const { locales } = response.data.locales;

      dispatch({ type: FETCH_LOCALSE, Locales: locales });
    })
    .finally(() => {
      dispatch({ type: LOCALE_LOADING, isLoading: false });
    });
};

export const FetchTranslates = (key) => (dispatch) => {
  TranslateService.Use(key).then((Response) => {
    dispatch({ type: FETCH_TRANSLATES, Translates: Response, key: key });
    dispatch({ type: LOCALE_LOADING, isLoading: false });
  });
};

export const ChangeLocale = (key) => (dispatch) => {
  dispatch({ type: CHANGE_LOCALE, key: key });
};
