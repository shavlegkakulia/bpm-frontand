import React from 'react';
import { Redirect, Route, RouteComponentProps, StaticContext } from "react-router";
import authService from "../../services/authService";

interface IProps {
  path: string;
  exact?: boolean;
  component:
    | React.ComponentType<any>
    | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>;
}

const PrivateRoute: React.FC<IProps> = (props) => {
  const isAuth = authService.IsAuthenticated();

  return isAuth ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/signin" />
  );
};

export default PrivateRoute;
