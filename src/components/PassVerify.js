import React, { Fragment, useState } from "react";
import * as hash from "password-hash";
import Message from "./Message";

const PassVerify = ({ setPassStatus, setPassword }) => {
  const [password, setPasswordForm] = useState("");
  const [isWrong, setIsWrong] = useState("waiting...");

  const handleVerify = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (hash.verify(password, user.password)) {
      setPassword(password);
      setPasswordForm("");
      setPassStatus("success...");
    } else {
      setIsWrong("wrong...");
    }
  };

  return (
    <Fragment>
      <h2 className="text-center text-2xl font-semibold my-8">
        Write your password to access
      </h2>

      {isWrong === "wrong..." ? (
        <Message text="Wrong password" type="error" />
      ) : (
        ""
      )}

      <form onSubmit={handleVerify} className="w-60 md:w-96 mx-auto">
        <input
          type="password"
          value={password}
          onChange={(data) => setPasswordForm(data.target.value)}
          className="block w-full my-4 border-2 border-blue-900 h-12"
        />
        <input
          type="submit"
          value="Verify"
          className="block w-full bg-blue-900 text-white font-semibold p-2 text-xl cursor-pointer hover:bg-blue-800 transition-all"
        />
      </form>
    </Fragment>
  );
};

export default PassVerify;
