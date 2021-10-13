import React from "react";
import PropTypes from "prop-types";

const Loader = ({ idLoader }) => {
  return (
    <div id={idLoader}>
      <div className="mt-4 z-50 overflow-hidden opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-400 h-12 w-12 mb-4"></div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  idLoader: PropTypes.string.isRequired,
};

export default Loader;
