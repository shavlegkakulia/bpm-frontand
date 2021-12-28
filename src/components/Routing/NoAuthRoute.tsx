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

const NotAuthRoute: React.FC<IProps> = (props) => {
  const isAuth = authService.IsAuthenticated();

  return isAuth ? (
    <Redirect to="/dashboard" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

export default NotAuthRoute;
