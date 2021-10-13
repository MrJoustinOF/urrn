import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import Navbar from "./../../components/Navbar";
import Loader from "./../../components/Loader";
import { showErrs } from "./../../utils/showErrs";

const EditResource = () => {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [postUser, setPostUser] = useState({});
  const [status, setStatus] = useState("waiting...");
  const [updated, setUpdated] = useState(false);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPost = () => {
      fetch(`http://localhost:3001/api/urresourcesnetwork/posts/${id}`)
        .then((res) => res.json())
        .then((json) => {
          setPost(json);
          setPostUser(json.user);
          setTitle(json.title);
          setDesc(json.desc);
        });
    };
    fetchPost();

    return () => {};
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("updating...");
    let errs = [];

    if (title.length === 0 || desc.length === 0) {
      errs.push("All fields are required");
    }

    if (title.length < 4 && title.length !== 0) {
      errs.push("Title must be at least 4 chars");
    }

    if (desc.length < 10 && desc.length !== 0) {
      errs.push("The description must be at least 10 chars");
    }

    if (errs.length === 0) {
      const query = await (
        await fetch(
          `http://localhost:3001/api/urresourcesnetwork/posts/${post._id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              title,
              desc,
              user: postUser,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
      ).json();

      if (query.msg === "post updated") {
        setUpdated(true);
      }
    } else {
      const errsContainer = document.querySelector("#errs-container-update");
      showErrs(errs, errsContainer);
      setStatus("waiting...");
    }
  };

  const verifyUserRoute = () => {
    if (Object.keys(user).length === 0) {
      return <Redirect to="/" />;
    } else if (user.id !== postUser.id && postUser.id) {
      return <Redirect to="/myresources" />;
    } else if (updated) {
      return <Redirect to="/myresources" />;
    }
  };

  return (
    <Fragment>
      <Navbar />
      {verifyUserRoute()}
      <h2 className="text-center font-semibold text-2xl mt-4">
        Update the resource: {post.title}
      </h2>

      <div id="errs-container-update"></div>

      <form onSubmit={handleSubmit}>
        <div className="bg-blue-900 w-60 md:w-96 block text-white mx-auto mt-4 p-4 md:p-6">
          <label htmlFor="title" className="block text-xl font-semibold my-2">
            Title
          </label>
          <input
            name="title"
            id="title"
            className="block w-full text-black h-12"
            onChange={(data) => setTitle(data.target.value)}
            value={title}
            placeholder="Your title here"
          />

          <label htmlFor="desc" className="block text-xl font-semibold my-2">
            Description
          </label>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            onChange={(data) => setDesc(data.target.value)}
            defaultValue={desc}
            className="mt-1 block w-full p-2 text-black mx-auto md:mx-0"
            placeholder="Make sure to add a good description and the url to the resource"
          ></textarea>
        </div>

        {status === "waiting..." ? (
          <input
            type="submit"
            value="Update"
            className="block mx-auto text-white text-lg w-60 md:w-96 h-12 mt-4 py-2 font-semibold bg-blue-900 hover:bg-blue-800 cursor-pointer transition-all"
          />
        ) : (
          <Loader idLoader="loaderUpdate" />
        )}
      </form>
    </Fragment>
  );
};

export default EditResource;
