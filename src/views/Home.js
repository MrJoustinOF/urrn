import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "./../components/Navbar";
import Loader from "./../components/Loader";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:3001/api/urresourcesnetwork/posts")
    fetch("https://ur-apis-center.herokuapp.com/api/urresourcesnetwork/posts")
      .then((res) => res.json())
      .then((json) => setPosts(json.reverse()));
    return () => {};
  });

  return (
    <Fragment>
      <Navbar />
      <h2 className="text-center text-2xl font-semibold my-4">
        Resources people has published
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

                <p className="px-2 pb-1 pt-2 text-gray-500">
                  Published by:
                  <Link to={`/profile/${post.user.id}`}>
                    {" "}
                    {post.user.name}
                    <img
                      src={post.user.avatar}
                      alt="user avatar"
                      className="w-7 rounded-full inline-block ml-2"
                    />
                  </Link>
                </p>
                <p className="px-2 py-1 text-gray-500">Created at: {date}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto">
          <Loader idLoader="loader-home" />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
