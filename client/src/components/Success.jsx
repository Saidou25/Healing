import React from "react";
import "./Success.css";

const Success = ({ message }) => {
  return (
    <div className="success-background">
      <div className="card card-success p-4">
        <div className="row row-success">
          <div className="col-12 d-flex appointment-success">
            <i className="fa-solid fa-check d-flex"></i>
          </div>
          <h3 className="col-12 signup-success d-flex justify-content-center pt-3">
            Success!
          </h3>
          <p className="col-12 d-flex justify-content-center">{message}</p>
        </div>
      </div>
    </div>
  );
};
export default Success;
