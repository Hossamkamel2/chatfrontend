import React, { createFactory } from "react";

const Input = ({ name, label, error, value, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        {...rest}
        name={name}
        id={name}
        //type="text"
        value={value}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
