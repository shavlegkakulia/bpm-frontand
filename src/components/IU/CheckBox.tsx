import React, { useState } from "react";

const CheckBox = ({ field, ...props }) => {
    
  return (
    <label className="checkbox-container">
      {props.helpertext}
      <input {...field} {...props} />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBox;
