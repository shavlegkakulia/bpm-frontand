import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { FuncProps } from "../../interfaces/common.interface";
import Translate from "../../services/translateService";
import Login from "./auth/login";
import ResetPassword from "./auth/password/reset-password";
import ResetPasswordRequest from "./auth/password/reset-password-request";
import SignUp from "./auth/signup";

enum contentTypes {
  login = "login",
  signup = "signup",
}

const Landing: React.FC<FuncProps> = (props) => {
  const [contentType, setContentType] = useState(contentTypes.login);
  let renderContent: JSX.Element = <></>;
  if (contentType === contentTypes.login) {
    renderContent = <Login />;
  }
  return (
    <div className="landing">
      <div className="container">
        <div className="header">
          <a href="#" className="logoItem">
            <img src={"./../../assets/images/Icon-logo.svg"} className="logo" />
          </a>
          <a href="#" className="mailItem">
            <img
              src={"./../../assets/images/Icon-mail.svg"}
              className="mailLogo"
            />
            {Translate.T("signing.contactUs")}
          </a>
        </div>
        <div className="content">
          <div className="left">
            <div className="titleLogo">
              {Translate.T("signing.defaultText")}
            </div>
            <div className="bigHurtBox">
              <img
                src={"./../../assets/images/Icon-bigHurt.svg"}
                className="bigHurt"
              />
            </div>
          </div>
          <div className="right">
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/signin" exact component={Login} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/password-reset-request" component={ResetPasswordRequest} />
              <Route path="/resetPassword/:resetToken" exact component={ResetPassword} />
              <Route path="/verify/:token" exact component={Login} />
            </Switch>
          </div>
        </div>
        <div className="footer">
          <div className="copyright"> {Translate.T("signing.copyright")}</div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
