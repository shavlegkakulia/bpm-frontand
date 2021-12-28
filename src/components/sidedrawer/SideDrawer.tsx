import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUserFriends,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import "./sideDrawer.scss";
import translate from "../../services/translateService";
import { useLocation } from 'react-router-dom'

enum Menus {
  dashboard = "dashboard",
  patients = "patients",
  imports = "imports",
}

const SideDrawer: React.FC = () => {
  const location = useLocation();
  let activeMenu: string = Menus.dashboard;
  if(location.pathname) {
    const getNames = location.pathname.split('/');
    if(getNames) {
      activeMenu = getNames[1].toLowerCase();
    }
  }

  return (
    <div className="sideDrawer">
      <Link
        to={"/Dashboard"}
        className={`menu-item ${activeMenu === Menus.dashboard && "active"}`}
      >
        <div className="icon">
          <FontAwesomeIcon className="menu-icon" icon={faChartLine} size="lg" />
        </div>{" "}
        {translate.T("dashboard.dashboard")}
      </Link>

      <Link
        to={"/Patients"}
        className={`menu-item ${activeMenu === Menus.patients && "active"}`}
      >
        <div className="icon">
          <FontAwesomeIcon
            className="menu-icon"
            icon={faUserFriends}
            size="lg"
          />
        </div>{" "}
        {translate.T("dashboard.patients")}
      </Link>

      <Link
        to={""}
        className={`menu-item ${activeMenu === Menus.imports && "active"}`}
      >
        <div className="icon">
          <FontAwesomeIcon
            className="menu-icon"
            icon={faArrowAltCircleDown}
            size="lg"
          />
        </div>{" "}
        Import clinical data
      </Link>
    </div>
  );
};

export default SideDrawer;
