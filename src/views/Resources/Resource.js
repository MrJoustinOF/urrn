import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "./../../components/Navbar";
import Loader from "./../../components/Loader";

const Resource = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/api/urresourcesnetwork/posts/${id}`)
      .then((res) => res.json())
      .then((json) => setPost(json));
    return () => {};
  }, [id]);

  const parseDate = new Date(post.createdAt);
  const date = `${
    parseDate.getMonth() + 1
  }/${parseDate.getDate()}/${parseDate.getFullYear()} ${
    parseDate.getHours() + parseDate.getTimezoneOffset() / 60
  }:${parseDate.getMinutes()} (UTC+0)`;

  return (
    <Fragment>
      <Navbar />
      {Object.keys(post).length === 0 ? (
        <Loader idLoader="resourceLoader" />
      ) : (
        <div className="w-60 md:w-96 mx-auto mt-8">
          <h2 className="text-center font-semibold text-2xl my-4">
            {post.title}
          </h2>
          <div className="my-4">
            <h3 className="font-semibold">
              Published by:{" "}
              <span className="font-normal">
                <Link to={`/profile/${post.user.id}`}>{post.user.name}</Link>
              </span>
            </h3>
            <h3 className="font-semibold">
              Created at: <span className="font-normal">{date}</span>
            </h3>
          </div>
          <p className="">{post.desc}</p>
        </div>
      )}
    </Fragment>
  );
};

export default Resource;
