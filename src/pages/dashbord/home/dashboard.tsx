import React from "react";
import { Route, Switch } from "react-router";
import SideDrawer from "../../../components/sidedrawer/SideDrawer";
import InviteUser from "../../signing/auth/InviteUser/InviteUser";
import AddPatients from "../add-patients/addPatients";
import ViewPatient from "../add-patients/viewPatient";
import DashboardLayout from "../DashboardLayout";
import Patients from "../patients/patients";
import PleasureModel from "../pleasuremodel/PleasureModel";
import "./dashboard.scss";

enum routes {
  Dashboard = '/Dashboard',
  PleasureModel = '/PleasureModel',
  InviteUser = '/InviteUser',
  Patients = '/Patients',
  PatientsAdd = '/Patients/add'
}

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <SideDrawer />
        <Switch>
          <Route path="/Dashboard" exact component={PleasureModel} />
          <Route path="/PleasureModel" exact component={PleasureModel} />
          <Route path="/InviteUser" exact component={InviteUser} />
          <Route path="/Patients" exact component={Patients} />
          <Route path="/Patients/add" exact component={AddPatients} />
          <Route path="/Patients/View/:patientId" exact component={ViewPatient} />
        </Switch>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
