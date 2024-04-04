import React from "react";
import "./ErrorComponent.css";

const ErrorComponent = ({ message }) => {
  return (
    <>
      {" "}
      <div
        className="row review-list p-2 error-comp"
        style={{ backgrounColor: "#dd4050", zIndex: "1" }}
      >
        <h3 className="col-12 d-flex justify-content-center text-light">
          Error!
        </h3>
        <p
          className="col-12 d-flex text-light justify-content-center px-3"
          style={{ textAlign: "center" }}
        >
          {message}
        </p>
      </div>
      <br />
    </>
  );
};
export default ErrorComponent;
