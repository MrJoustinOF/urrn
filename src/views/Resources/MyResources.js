import React, { Fragment, useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Navbar from "./../../components/Navbar";

const MyResources = () => {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const verifyRoute = () => {
    if (Object.keys(user).length === 0) {
      return <Redirect to="/" />;
    }
  };

  const deletePost = async (id) => {
    const query = await (
      await fetch(`http://localhost:3001/api/urresourcesnetwork/posts/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
    ).json();
    if (query.msg === "post deleted") {
      fetchPosts();
    }
  };

  const fetchPosts = () => {
    fetch(`http://localhost:3001/api/urresourcesnetwork/posts/user/${user.id}`)
      .then((res) => res.json())
      .then((json) => {
        json.reverse();
        setPosts(json);
      });
  };
  useEffect(() => {
    fetchPosts();
    return () => {};
  });

  return (
    <Fragment>
      {verifyRoute()}
      <Navbar />

      <Link to="/resources/create">
        <p className="font-semibold text-white bg-blue-800 py-2 px-4 m-4 rounded w-32 text-center inline-block">
          Publish new
        </p>
      </Link>

      {posts.length > 0 ? (
        <div className="lg:grid grid-cols-3">
          {posts.map((post) => {
            // Date configuration
            const parseDate = new Date(post.createdAt);
            const date = `${
              parseDate.getMonth() + 1
            }/${parseDate.getDate()}/${parseDate.getFullYear()} ${
              parseDate.getHours() + parseDate.getTimezoneOffset() / 60
            }:${parseDate.getMinutes()} (UTC+0)`;

            // Cut desc if it is too long
            let desc = post.desc;
            if (post.desc.length > 100) {
              desc = post.desc.slice(0, 99) + "...";
            }

            return (
              <div
                key={posts.indexOf(post)}
                className="w-60 md:w-96 mx-auto border my-2"
              >
                <h2 className="bg-blue-800 text-white font-semibold text-lg rounded p-2">
                  {post.title}
                </h2>

                <p className="p-4 text-justify">{desc}</p>

                <div className="lg:flex justify-around my-2">
                  <p className="bg-blue-900 text-white font-semibold p-2 rounded w-24 text-center mx-auto my-2">
                    <Link to={`/resource/${post._id}`}>See more</Link>
                  </p>

                  <p className="bg-green-900 text-white font-semibold p-2 rounded w-24 text-center mx-auto my-2">
                    <Link to={`/resource/${post._id}/edit`}>Update</Link>
                  </p>

                  <p
                    onClick={() => deletePost(post._id)}
                    className="cursor-pointer bg-red-900 text-white font-semibold p-2 rounded w-24 text-center mx-auto my-2"
                  >
                    Delete
                  </p>
                </div>

                <p className="p-2 text-gray-500">Created at: {date}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <h2 className="text-center font-semibold text-2xl mt-4">
          No resources published yet
        </h2>
      )}
    </Fragment>
  );
};

export default MyResources;
