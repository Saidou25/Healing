import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const ErrorComponent = ({ style, message }) => {
  return (
    <main className="row container-success">
      <div className="col-12 d-flex appointment-success mb-2">
       <HiOutlineExclamationCircle />
        {/* <i className="fa-solid fa-check d-flex"></i> */}
      </div>
      <h2 className="col-12 signup-success d-flex justify-content-center">
        Error!
      </h2>
      <p className="col-12 d-flex justify-content-center mt-4" style={style}>
        {message}
      </p>
    </main>
  );
};
export default ErrorComponent;
