import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "./../../components/Navbar";
import Loader from "./../../components/Loader";
import { showErrs } from "../../utils/showErrs";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("waiting...");
  const [created, setCreated] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatus("sending...");

    let errs = [];

    if (name.length === 0 || email.length === 0 || password.length === 0) {
      errs.push("All the fields are required");
    }

    if (name.length < 4 && name.length !== 0) {
      errs.push("Your name must be at least 4 chars");
    }

    if (/^\w+@\w+\.\w+$/.test(email) === false && email.length !== 0) {
      errs.push("Email is invalid");
    }

    if (password.length < 8 && password.length !== 0) {
      errs.push("Your password must be at least 8 chars");
    }

    if (errs.length === 0) {
      const data = { name, email, password };
      const signUpUser = await (
        await fetch(
          // "http://localhost:3001/api/urresourcesnetwork/users/register",
          "https://ur-apis-center.herokuapp.com/api/urresourcesnetwork/users/register",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
      ).json();

      if (signUpUser.msg === "user created") {
        sessionStorage.setItem(
          "statusUser",
          JSON.stringify({ status: "just created" })
        );

        setCreated(true);
      } else if (signUpUser.msg === "user already exists") {
        const errsDiv = document.querySelector("#errs-container");
        errsDiv.firstChild?.remove();

        const childDiv = document.createElement("div");
        childDiv.innerHTML = `  
          <h2 class="w-60 md:w-96 mx-auto text-center text-red-700 bg-red-100 my-4 py-4 border-l-8 border-red-700">
            User already exists
          </h2>
        `;
        errsDiv.appendChild(childDiv);
        setStatus("waiting...");
      }
    } else {
      const errsDiv = document.querySelector("#errs-container");
      showErrs(errs, errsDiv);

      setStatus("waiting...");
    }
  };

  const verifyUserRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (Object.keys(user).length !== 0) {
      return <Redirect to="/" />;
    } else if (created) {
      return <Redirect to="/login" />;
    }
  };

  return (
    <Fragment>
      <Navbar />
      {verifyUserRoute()}
      <h2 className="text-center text-2xl font-bold mb-4 mt-12">Sign Up</h2>

      <div id="errs-container"></div>

      <form onSubmit={handleSignup}>
        <div className="bg-blue-900 w-60 md:w-96 block text-white mx-auto p-4 md:p-6">
          <label htmlFor="name" className="block text-xl font-semibold mb-2">
            Name:
          </label>
          <input
            name="name"
            id="name"
            value={name}
            onChange={(data) => setName(data.target.value)}
            className="block w-full text-black h-12"
          />

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
            value="Sign Up"
            className="block mx-auto text-white text-lg w-60 md:w-96 h-12 mt-4 py-2 font-semibold bg-blue-900 hover:bg-blue-800 cursor-pointer transition-all"
          />
        ) : (
          <Loader idLoader="signupLoader" />
        )}
      </form>
    </Fragment>
  );
};

export default Signup;
