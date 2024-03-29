import React from "react";
// import { HiOutlineExclamationCircle } from "react-icons/hi2";

const ErrorComponent = ({ message }) => {
  
  return (
    <div className="row review-list mt-4 mx-2 pt-3 bg-danger">
      <h3 className="col-12 d-flex justify-content-center text-light">Error!</h3>
      <p className="col-12 d-flex text-light justify-content-center px-3"
      style={{ textAlign: "center" }}>{message}</p>
    </div>
  );
};
export default ErrorComponent;
