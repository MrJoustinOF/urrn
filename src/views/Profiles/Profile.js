import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "./../../components/Navbar";
import Loader from "./../../components/Loader";

const Profile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // fetch(`http://localhost:3001/api/urresourcesnetwork/users/${id}`)
    fetch(
      `https://ur-apis-center.herokuapp.com/api/urresourcesnetwork/users/${id}`
    )
      .then((res) => res.json())
      .then((json) => setUser(json));

    // fetch(`http://localhost:3001/api/urresourcesnetwork/posts/user/${id}`)
    fetch(
      `https://ur-apis-center.herokuapp.com/api/urresourcesnetwork/posts/user/${id}`
    )
      .then((res) => res.json())
      .then((json) => setPosts(json));

    return () => {};
  }, [id]);

  return (
    <Fragment>
      <Navbar />
      <div className="my-6 md:grid grid-cols-2">
        <img
          src={user.avatar}
          alt="profile avatar"
          className="w-60 md:w-72 rounded-full mx-auto"
        />
        <div>
          <h2 className="text-center text-2xl font-semibold my-4">
            {user.name}
          </h2>
          <p className="text-justify p-4">{user.bio}</p>
        </div>
      </div>

      <h2 className="text-center text-2xl font-semibold my-4">
        Posts published by {user.name}
      </h2>

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

                <p className="bg-blue-900 text-white font-semibold p-2 rounded w-24 text-center mx-auto my-2">
                  <Link to={`/resource/${post._id}`}>See more</Link>
                </p>

                <p className="px-2 py-1 text-gray-500">Created at: {date}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <Loader idLoader="profileLoader" />
      )}
    </Fragment>
  );
};

export default Profile;
