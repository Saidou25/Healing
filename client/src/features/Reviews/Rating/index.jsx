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
              <Button
                type="button"
                className="btn"
                onClick={(e) => {
                  handleChange(index, star);
                }}
              >
                <i
                  className="fa fa-star"
                  style={
                    color === "yellow" && index <= indexNum
                      ? { color: "yellow" }
                      : { color: "grey" }
                  }
                ></i>
              </Button>
            </div>
          ))}
      </div>
    </>
  );
};
export default Rating;
