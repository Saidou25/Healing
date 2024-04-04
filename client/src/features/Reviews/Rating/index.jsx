import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import "./index.css";

const Rating = ({ handleRating, successAddingReview }) => {
  const [color, setColor] = useState("grey");
  const [indexNum, setIndexNum] = useState("");

  const starsArray = [0, 1, 2, 3, 4];

  const handleChange = (index, star) => {
    if (index === star) {
      setColor("yellow");
      setIndexNum(star);
      handleRating(index.toString());
    }
  };

  useEffect(() => {
    if (successAddingReview) {
      setColor("grey");
      setIndexNum("");
    }
  }, [successAddingReview]);

  return (
    <>
          <br />
      {starsArray &&
        starsArray.map((star, index) => (
          // <div>
          <Button
            type="button"
            className="btn rate-btn ps-0"
            onClick={(e) => {
              handleChange(index, star);
            }}
          >
            <i
              className="fa fa-star fa-star-rate"
              style={
                color === "yellow" && index <= indexNum
                  ? { color: "yellow" }
                  : { color: "grey" }
              }
            ></i>
          </Button>
        ))}
    </>
  );
};
export default Rating;
