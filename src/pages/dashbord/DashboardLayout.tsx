import React from "react";
import Translate from "../../services/translateService";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faUser,
  faFrown,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { SIGNOUT } from "../../redux/actions/auth.actions";
import { withRouter } from "react-router";
import {
  ITranslateState,
  ITranslateStateGlobal,
} from "../../interfaces/reducer.translate.interface";
import { DefLangKey } from "../../constants/service.translate.constants";
import { CHANGE_LOCALE } from "../../redux/constants/translate.constants";

const DashboardLayout = (props) => {
  const translate = useSelector<ITranslateStateGlobal>(
    (state) => state.TranslateReducer
  ) as ITranslateState;
  const dispatch = useDispatch();

  const signOut = () => dispatch(SIGNOUT());

  const InviteUser = () => {
    props.history.push("/InviteUser");
  };

  const ChangeLang = (key: string) => {
    dispatch({ type: CHANGE_LOCALE, key: key });
  };
  return (
    <div className="dashboardLayout">
      <div className="header">
        <a href="#" className="logoItem">
          <img src={"./../../assets/images/Icon-logo.svg"} className="logo" />
        </a>

        <div className="rightActions">
          <Dropdown align={"end"}>
            <Dropdown.Toggle className="dropdownCover">
              <div className="profileDropdown">
                <img src="./../../assets/images/profile.png" className="uimg" />
                <FontAwesomeIcon
                  className="DownArrow"
                  icon={faAngleDown}
                  size="lg"
                />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdownMenu">
              <Dropdown.Item className="dropdownMenuItem" onClick={InviteUser}>
                <FontAwesomeIcon className="itemIcon" icon={faUser} size="lg" />
                Invite User
              </Dropdown.Item>
              <Dropdown.Item className="dropdownMenuItem" onClick={signOut}>
                <FontAwesomeIcon
                  className="itemIcon"
                  icon={faFrown}
                  size="lg"
                />
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown align={"end"} className="langSwitch">
            <Dropdown.Toggle className="dropdownCover">
              <div className="langDropdown">
                {translate.activeKey === DefLangKey._ka ? "GEO" : "ENG"}
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdownMenu">
              {translate.Locales.map((l) => (
                <Dropdown.Item
                  key={l.key}
                  className="dropdownMenuItem"
                  onClick={ChangeLang.bind(this, l.key)}
                >
                  {l.key}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default withRouter(DashboardLayout);
