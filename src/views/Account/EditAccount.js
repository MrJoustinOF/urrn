import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import * as hash from "password-hash";
import Navbar from "./../../components/Navbar";
import Loader from "./../../components/Loader";
import PassVerify from "./../../components/PassVerify";
import { showErrs } from "../../utils/showErrs";
import { fb } from "./../../utils/firebase";

const EditAccount = () => {
  const [status, setStatus] = useState("waiting...");
  const [passStatus, setPassStatus] = useState("waiting...");
  const [updated, setUpdated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatarObject, setAvatarObject] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChanges = async (e) => {
    e.preventDefault();
    setStatus("updating...");

    let errs = [];

    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      bio.length === 0
    ) {
      errs.push("All fields are required");
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

    if (bio.length < 11 && bio.length !== 0) {
      errs.push("Your bio must be at least 8 chars");
    }

    const imageTypes = ["image/webp", "image/png", "image/jpg", "image/jpeg"];
    if (avatarObject.type && !imageTypes.includes(avatarObject.type)) {
      errs.push(
        "You must upload one of this kind of image: PNG, JPG, JPEG, WEBP"
      );
    }

    if (avatarObject.size && avatarObject.size > 5_242_880) {
      errs.push("Your avatar size must be less than 5MB");
    }

    if (errs.length === 0) {
      let avatar = user.avatar;

      const fileName =
        "a" + Math.round(Math.random() * 999) + avatarObject.name;

      if (avatarObject.size && avatarObject.type) {
        const storageRef = fb.storage().ref("/profiles");
        const task = storageRef.child(fileName);
        await task.put(avatarObject);
        avatar = await task.getDownloadURL();
      }

      let hashedPass = hash.generate(password);
      const queryUser = await (
        await fetch(
          // `http://localhost:3001/api/urresourcesnetwork/users/${user.id}`,
          `https://ur-apis-center.herokuapp.com/api/urresourcesnetwork/users/${user.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name,
              bio,
              email,
              password: hashedPass,
              avatar,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
      ).json();

      if (
        (name !== user.name || avatar !== user.avatar) &&
        queryUser.msg === "user updated"
      ) {
        const posts = await (
          await fetch(
            // `http://localhost:3001/api/urresourcesnetwork/posts/user/${user.id}`
            `https://ur-apis-center.herokuapp.com/api/urresourcesnetwork/posts/user/${user.id}`
          )
        ).json();

        posts.map((post) => {
          post.user = { id: user.id, name, avatar };
          return 0;
        });

        await (
          await fetch(
            // `http://localhost:3001/api/urresourcesnetwork/posts/user/${user.id}`,
            `https://ur-apis-center.herokuapp.com/api/urresourcesnetwork/posts/user/${user.id}`,
            {
              method: "PUT",
              body: JSON.stringify({ posts }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
        ).json();
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          name,
          bio,
          avatar,
          email,
          password: hashedPass,
        })
      );
      setUpdated(true);
    } else {
      const errsContainer = document.querySelector("#errs-container-account");
      showErrs(errs, errsContainer);
      setStatus("waiting...");
    }
  };

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setBio(user.bio);
    setAvatarObject(user.avatar);
    return () => {};
  }, [user.name, user.email, user.bio, user.avatar]);

  const verifyUserRoute = () => {
    if (Object.keys(user).length === 0 || updated) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Fragment>
      <Navbar />
      {verifyUserRoute()}
      {passStatus === "waiting..." ? (
        <PassVerify setPassStatus={setPassStatus} setPassword={setPassword} />
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-center my-4">
            Edit your account
          </h2>

          <div id="errs-container-account"></div>

          <form onSubmit={handleChanges} className="w-60 md:w-96 mx-auto">
            <div>
              <label
                htmlFor="name"
                className="block text-xl font-semibold my-2"
              >
                Name
              </label>
              <input
                name="name"
                id="name"
                value={name}
                onChange={(data) => setName(data.target.value)}
                className="block w-full mb-4 border-2 border-blue-900 h-12"
              />

              <label
                htmlFor="email"
                className="block text-xl font-semibold my-2"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                value={email}
                onChange={(data) => setEmail(data.target.value)}
                className="block w-full mb-4 border-2 border-blue-900 h-12"
              />

              <label
                htmlFor="password"
                className="block text-xl font-semibold my-2"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                value={password}
                onChange={(data) => setPassword(data.target.value)}
                className="block w-full mb-4 border-2 border-blue-900 h-12"
              />

              <label htmlFor="bio" className="block text-xl font-semibold my-2">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                cols="30"
                rows="10"
                defaultValue={bio}
                onChange={(data) => setBio(data.target.value)}
                className="block w-full mb-4 border-2 border-blue-900"
              ></textarea>

              <h2>Current avatar</h2>
              <img
                src={user.avatar}
                alt="current-avatar"
                className="my-2 w-16"
              />
              <input
                type="file"
                className="my-4"
                onChange={(data) => setAvatarObject(data.target.files[0])}
              />
            </div>

            {status === "waiting..." ? (
              <input
                type="submit"
                value="Save changes"
                className="block w-full bg-blue-900 text-white font-semibold p-2 text-xl cursor-pointer hover:bg-blue-800 mb-2 transition-all"
              />
            ) : (
              <Loader idLoader="account-edit-loader" />
            )}
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default EditAccount;
