import React from "react";
import Alerts from "./components/Alerts";

//Router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//Views
import {
  Login as LoginView,
  NotFound as NotFoundView,
  Dashboard as DashboardView,
  SignUp as SignUpView
} from "./views";

//Components
import { Navbar } from "./components";

//Private route
import PrivateRoute from './components/PrivateRoute';

function Routes() {
  return (
    <div className="content">
      <Router>
        <Navbar />
        <Alerts />
        <Switch>
          <Route exact path="/" component={LoginView} />
          <Route exact path='/signup' component={SignUpView} />
          <PrivateRoute exact path="/dashboard" component={DashboardView} />
          <Route component={NotFoundView} exact path="/not-found" />
          <Redirect to="/not-found" />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
