import React from "react";
import PropTypes from "prop-types";

const Status = ({ status, handleStatus }) => (
  <button className="status" onClick={handleStatus}>
    {status}
  </button>
);
Status.propTypes = {
  status: PropTypes.string.isRequired,
  handleStatus: PropTypes.func.isRequired
};
export default Status;
