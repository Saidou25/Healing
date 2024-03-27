import React from "react";

const ButtonSpinner = () => {
  return (
    <>
      <span
        className="spinner-border spinner-border-sm color-warning"
        role="status"
        aria-hidden="true"
        style={{ height: "25px", width: "25px" }}
      ></span>
    </>
  );
};

export default ButtonSpinner;
