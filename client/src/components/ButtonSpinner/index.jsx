import React from "react";

const ButtonSpinner = ({ height }) => {
  return (
    <div className="container-fluid m-0 p-0 g-0">
      <span
        className="spinner-border spinner-border-sm color-warning m-0 p-0 g-0"
        role="status"
        aria-hidden="true"
        style={
          height
            ? { height: height, width: height, aspectRatio: "1 / 1", backgroundPosition: "cover" }
            : { height: "25px", width: "25px", aspectRatio: "1 / 1", backgroundPosition: "cover" }
        }
      ></span>
    </div>
  );
};

export default ButtonSpinner;
