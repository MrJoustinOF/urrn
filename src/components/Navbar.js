import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <nav className="bg-blue-800 text-white p-2 md:px-4 flex justify-between items-center">
        <h1 className="font-semibold text-2xl inline-block">
          <Link to="/">urRN</Link>
        </h1>

        {Object.keys(user).length !== 0 ? (
          <div>
            <ul>
              <li className="inline-block">
                <div className="inline-block">
                  <div className="dropdown inline-block relative">
                    <button className="bg-blue-800 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                      <span className="flex text-lg items-center">
                        {user.name}
                        <img
                          src={user.avatar}
                          alt="user avatar"
                          className="w-7 rounded-full inline-block ml-2"
                        />
                      </span>
                      <svg
                        className="fill-current h-4 w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                      </svg>
                    </button>
                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-2 ">
                      <li className="">
                        <Link
                          to="/myresources"
                          className="font-semibold rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        >
                          My resources
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          to={`/profile/${user.id}`}
                          className="font-semibold rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        >
                          My profile
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          to="/account"
                          className="font-semibold rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        >
                          My account
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          to="/logout"
                          className="font-semibold rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        >
                          Log out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <div className="text-white">
            <ul>
              <li className="inline-block mx-2">
                <Link to="/login">Log in</Link>
              </li>
              <li className="inline-block mx-2">
                <Link to="/signup">Sign up</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
