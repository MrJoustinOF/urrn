import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const logoutUser = () => {
    localStorage.setItem("user", JSON.stringify({}));
  };

  return (
    <Fragment>
      {logoutUser()}
      <Redirect to="/" />;
    </Fragment>
  );
};

export default Logout;
