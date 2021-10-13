import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { initializeApp } from "firebase/app";
import Home from "./views/Home";
import Signup from "./views/Auth/Signup";
import Login from "./views/Auth/Login";
import Logout from "./views/Auth/Logout";
import MyResources from "./views/Resources/MyResources";
import CreateResource from "./views/Resources/CreateResource";
import Resource from "./views/Resources/Resource";
import EditResource from "./views/Resources/EditResource";
import Profile from "./views/Profiles/Profile";
import EditAccount from "./views/Account/EditAccount";
import "./App.css";

const App = () => {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify({}));
  }

  return (
    <Fragment>
      <Router>
        <Route exact path="/" render={() => <Home />} />

        {/* Auth routes */}
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/signup" render={() => <Signup />} />
        <Route exact path="/logout" render={() => <Logout />} />

        {/* Resources routes */}
        <Route exact path="/myresources" render={() => <MyResources />} />
        <Route
          exact
          path="/resources/create"
          render={() => <CreateResource />}
        />
        <Route
          exact
          path="/resource/:id/edit"
          render={() => <EditResource />}
        />
        <Route exact path="/resource/:id" render={() => <Resource />} />

        {/* Profile Routes */}
        <Route exact path="/profile/:id" render={() => <Profile />} />

        {/* Account Routes */}
        <Route exact path="/account" render={() => <EditAccount />} />
      </Router>
    </Fragment>
  );
};

export default App;
