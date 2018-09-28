import React from "react";
import PropTypes from "prop-types";

const Number = ({ type, id, value, disabled, handleClick }) => (
  <input
    type={type}
    className="btns"
    id={"btn-"+ id}
    value={value}
    onClick={handleClick}
    disabled={disabled}
  />
);
Number.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
export default Number;
