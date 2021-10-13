import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "./../../components/Navbar";
import Loader from "./../../components/Loader";
import Message from "./../../components/Message";
import { showErrs } from "./../../utils/showErrs";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("waiting...");
  const [loged, setLoged] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("login...");
    sessionStorage.removeItem("statusUser");

    let errs = [];

    const errsDiv = document.querySelector("#errs-container-login");
    if (email.length === 0 || password.length === 0) {
      errs.push("All fields are required");
    }

    if (errs.length === 0) {
      const userRequest = await (
        await fetch(
          // `http://localhost:3001/api/urresourcesnetwork/users/login/${email}/${password}`
          `https://ur-apis-center.herokuapp.com/api/urresourcesnetwork/users/login/${email}/${password}`
        )
      ).json();

      if (userRequest.msg === "user doesn't exist") {
        errs.push("User doesn't exist");
        showErrs(errs, errsDiv);
        setStatus("waiting...");
      } else if (userRequest.msg === "wrong password") {
        errs.push("Wrong Password");
        showErrs(errs, errsDiv);
        setStatus("waiting...");
      } else {
        localStorage.setItem("user", JSON.stringify(userRequest.user));

        setLoged(true);
      }
    } else {
      showErrs(errs, errsDiv);
      setStatus("waiting...");
    }
  };

  const verifyUserRoute = () => {
    if (Object.keys(user).length !== 0 || loged) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Fragment>
      <Navbar />
      {verifyUserRoute()}
      <h2 className="text-center text-2xl font-bold mb-4 mt-12">Log in</h2>

      {sessionStorage.getItem("statusUser") && status === "waiting..." ? (
        <Message
          type="success"
          text="Sign up successfully, log in to see your acount"
        />
      ) : (
        ""
      )}

      <div id="errs-container-login"></div>

      <form onSubmit={handleLogin}>
        <div className="bg-blue-900 w-60 md:w-96 block text-white mx-auto p-4 md:p-6">
          <label htmlFor="email" className="block text-xl font-semibold my-2">
            Email:
          </label>
          <input
            name="email"
            id="email"
            value={email}
            onChange={(data) => setEmail(data.target.value)}
            className="block w-full text-black h-12"
          />

          <label
            htmlFor="password"
            className="block text-xl font-semibold my-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(data) => setPassword(data.target.value)}
            className="block w-full text-black h-12"
          />
        </div>

        {status === "waiting..." ? (
          <input
            type="submit"
            value="Log in"
            className="block mx-auto text-white text-lg w-60 md:w-96 h-12 mt-4 py-2 font-semibold bg-blue-900 hover:bg-blue-800 cursor-pointer transition-all"
          />
        ) : (
          <Loader idLoader="loaderLogin" />
        )}
      </form>
    </Fragment>
  );
};

export default Login;
