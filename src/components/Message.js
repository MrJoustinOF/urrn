import React from "react";
import PropTypes from "prop-types";

const Message = ({ type, text }) => {
  if (type === "success") {
    return (
      <h2 className="w-60 md:w-96 mx-auto text-center text-blue-900 bg-blue-100 my-4 py-4 border-l-8 border-blue-900">
        {text}
      </h2>
    );
  } else if (type === "error") {
    return (
      <h2 className="w-60 md:w-96 mx-auto text-center text-red-700 bg-red-100 my-4 py-4 border-l-8 border-red-700">
        {text}
      </h2>
    );
  }
};

Message.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Message;
