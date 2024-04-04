import React from "react";
import "./index.css";

const RatingList = ({ rating }) => {
  const starsArray = [0, 1, 2, 3, 4];

  return (
      <div className="d-flex">
        {starsArray &&
          starsArray.map((star, index) => (
            <div key={index}>
              <i
                className="fa fa-star"
                style={
                  index <= rating && rating !== "0"
                    ? { color: "yellow" }
                    : { color: "grey" }
                }
              ></i>
            </div>
          ))}
      </div>
  );
};

export default RatingList;
