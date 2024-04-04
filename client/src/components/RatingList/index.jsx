import React from "react";
import "./index.css";

const RatingList = ({ rating, reviews }) => {
  const starsArray = [0, 1, 2, 3, 4];

  return (
    <>
      <div className="row rating-row">
        {starsArray &&
          starsArray.map((star, index) => (
            <div
              className="col-lg-2 col-sm-2"
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button type="button" className="btn">
                <i
                  className="fa fa-star"
                  style={
                    index <= rating && rating !== "0" ? { color: "yellow" } : { color: "grey" }
                  }
                ></i>
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default RatingList;
