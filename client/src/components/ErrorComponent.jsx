import React from "react";
import "./ErrorComponent.css";

const ErrorComponent = ({ message }) => {
  return (
    <>
      <div className="row review-list p-2 error-comp">
        <h4 className="col-12 d-flex justify-content-center text-light"
        style={{ fontWeight: "300" }}>
          Error!
        </h4>
        <p
          className="col-12 d-flex justify-content-center m-0"
          style={{ textAlign: "center" }}
        >
          {message}
        </p>
      </div>
      <br />
      <br />
    </>
  );
};
export default ErrorComponent;