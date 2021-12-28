import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ITranslateState,
  ITranslateStateGlobal,
} from "./interfaces/reducer.translate.interface";
import { SIGNOUT, USERINFO } from "./redux/actions/auth.actions";
import {
  FetchLocales,
  FetchTranslates,
} from "./redux/actions/translate.actions";
import AuthService from "./services/authService";
import CommonService from "./services/commonService";
import Navigation from "./NAVIGATION";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  fromPromise,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  DocumentNode,
  TypedDocumentNode,
  OperationVariables,
  ApolloQueryResult,
  FetchResult,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { globalConfig } from "./constants/configs.constants";
import Store from './redux/store';
import { LOGOUT } from "./redux/constants/auth.constants";

const GET_REFRESH_TOKEN_QUERY = gql`
query {
  refresh(
    refreshToken: "${AuthService.GetRefreshToken()}"
  ) {
    data {
          token
          refreshToken
        }
        succes
        errorMessage
        code
  }
}
`;

const getNewToken = () => {
  return apolloClient
    .query({ query: GET_REFRESH_TOKEN_QUERY, fetchPolicy: 'no-cache' })
    .then((response) => {
      const { token, refreshToken } = response.data.refresh.data;
     
      AuthService.SetToken(token, refreshToken);
      return token;
    });
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response, forward }) => {
  
    if (JSON.parse(JSON.stringify(networkError)).statusCode === 401) {
      return fromPromise(
        getNewToken().catch((error) => {
          // Handle token refresh errors e.g clear stored tokens, redirect to login
          return;
        })
      )
        .filter((value) => Boolean(value))
        .flatMap((accessToken) => {
          const oldHeaders = operation.getContext().headers;
          // modify the operation context with a new token
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${accessToken}`,
            },
          });

          // retry the request, returning the new observable
          return forward(operation);
        });
    }
  
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.status) {
          case 401:
            if (err.message === "forceLogout") {
              Store.dispatch({ type: LOGOUT });
              AuthService.SignOut();
              return;
            }
        
            return fromPromise(
              getNewToken().catch((error) => {
                alert(error)
                // Handle token refresh errors e.g clear stored tokens, redirect to login
                return;
              })
            )
              .filter((value) => Boolean(value))
              .flatMap((accessToken) => {
           
                const oldHeaders = operation.getContext().headers;
                // modify the operation context with a new token
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`,
                  },
                });
    
                // retry the request, returning the new observable
                return forward(operation);
              });
          default: {
            alert(err.extensions.status);
            return;
          }
        }
      }
    }
  }
);

export const createQuery = (
  Query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
  witAuth?: boolean
): Promise<ApolloQueryResult<any>> => {
  const accessToken = AuthService.GetToken();
  const params = witAuth
    ? { authorization: accessToken ? `Bearer ${accessToken}` : "" }
    : {};
  return apolloClient.query({
    query: Query,
    context: {
      // example of setting the headers with context per operation
      headers: {
        ...params,
      },
    },
  });
};

export const createMutate = (
  Mutation: DocumentNode | TypedDocumentNode<any, OperationVariables>,
  witAuth?: boolean
): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> => {
  const accessToken = AuthService.GetToken();
  const params = witAuth
    ? { authorization: accessToken ? `Bearer ${accessToken}` : "" }
    : {};
  return apolloClient.mutate({
    mutation: Mutation,
    context: {
      // example of setting the headers with context per operation
      headers: {
        ...params,
      },
    },
  });
};

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      locale: localStorage.getItem('locale') || null,
    }
  }));

  return forward(operation);
})

const httpLink = new HttpLink({ uri: globalConfig.api_URL });

const link = ApolloLink.from([errorLink, httpLink]);

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache({addTypename: false}),
  link: link,
});

function App() {
  const dispatch = useDispatch();
  const state = useSelector<ITranslateStateGlobal>(
    (state) => state.TranslateReducer
  ) as ITranslateState;

  useEffect(() => {
    dispatch(FetchLocales());
  }, []);

  useEffect(() => {
    if (AuthService.IsAuthenticated()) {
      dispatch(USERINFO());
    }
  }, []);

  useEffect(() => {
    dispatch(FetchTranslates(state.activeKey));
  }, [state.activeKey]);
  console.log(state.isLoading, state.activeKey);
  if (state.isLoading) return <div>loading...</div>;

  return (
    <ApolloProvider client={apolloClient}>
      <Navigation />
    </ApolloProvider>
  );
}

interface ISubscription {
  unsubscribe: Function;
}

export default App;
