import React from "react";
import "./index.css";

const Spinner = () => {
  return (
    <div className="card container-spinner">
      <div className="card d-flex  bg-transparent justify-content-center align-items-center"
    
      >
        <div className="spinner-border bg-transparent text-light" role="status"
        style={{ color: "rgba(255, 255, 255, 0.9)" }}
        >
    
         <span className="sr-only"></span>
        </div>
      </div>
        <p className="loading mt-4">Loading...</p>
    </div>
  );
};

export default Spinner;
