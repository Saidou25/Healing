import React from "react";
import "./index.css";

const RatingList = (props) => {
  const rating = props.rating;
  return (
    <>
      <div className="star mt-2">
        {rating === "" && (
          <>
            <i className="fa fa-star-sharp unchecked"></i>
            <i className="fa fa-star unchecked"></i>
            <i className="fa fa-star unchecked"></i>
            <i className="fa fa-star unchecked"></i>
            <i className="fa fa-star unchecked"></i>
          </>
        )}
        {rating === "1" && (
          <>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star unchecked"></i>
            <i className="fa fa-star unchecked"></i>
            <i className="fa fa-star unchecked"></i>
            <i className="fa fa-star unchecked"></i>
          </>
        )}
        {rating === "2" && (
          <>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star unchecked"></i>
            <i className="fa fa-star unchecked"></i>
            <i className="fa fa-star unchecked"></i>
          </>
        )}
        {rating === "3" && (
          <>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star unchecked"></i>
            <i className="fa fa-star unchecked"></i>
          </>
        )}
        {rating === "4" && (
          <>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star unchecked"></i>
          </>
        )}
        {rating === "5" && (
          <>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star checked"></i>
            <i className="fa fa-star checked"></i>
          </>
        )}
      </div>
    </>
  );
};

export default RatingList;
