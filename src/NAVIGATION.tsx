import React from 'react';
import { Switch, Route } from "react-router-dom";
import NotAuthRoute from './components/Routing/NoAuthRoute';
import PrivateRoute from './components/Routing/PrivateRoute';
import Dashboard from './pages/dashbord/home/dashboard';
import Landing from './pages/signing/landing';

const Navigation = () => {
    return (
        <Switch>
            <NotAuthRoute path="/" exact component={Landing} />
            <NotAuthRoute path="/signin" component={Landing} />
            <NotAuthRoute path="/signup" component={Landing} />
            <NotAuthRoute path="/password-reset-request" component={Landing} />
            <NotAuthRoute path="/verify/:token" component={Landing} />
            <NotAuthRoute path="/resetPassword/:resetToken" component={Landing} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/PleasureModel" component={Dashboard} />
            <PrivateRoute path="/InviteUser" component={Dashboard} />
            <PrivateRoute path="/Patients" component={Dashboard} />
            <PrivateRoute path="/Patients/add" exact component={Dashboard} />
            <PrivateRoute path="/Patients/View/:patientId" exact component={Dashboard} />
        </Switch>
    )
}

export default Navigation;