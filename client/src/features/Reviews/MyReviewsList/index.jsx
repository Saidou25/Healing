import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../../utils/queries";
import { NavLink, useNavigate } from "react-router-dom";
// import { useUser } from "../../../context/userContext";
import useDeletReview from "../useDeleteReview";
import RatingList from "../../../components/RatingList";
// import profileIcon from "../../../assets/images/profileIcon.png";
import trash from "../../../assets/images/trash.png";
import ButtonSpinner from "../../../components/ButtonSpinner";
import "./index.css";

const MyReviewsList = () => {
  const navigate = useNavigate();

  const [deleteReviewData, setDeleteReviewData] = useState("");

  const { data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || [];
  const myReviews = me.reviews;

  const { successDeletingReview, loading, error } =
    useDeletReview(deleteReviewData);

  const handleSubmit = (review) => {
    const reviewId = review._id;
    setDeleteReviewData(reviewId);
  };

  useEffect(() => {
    if (successDeletingReview && !myReviews?.length) {
      setDeleteReviewData("");
      navigate("/Dashboard");
    }
  }, [myReviews, successDeletingReview, navigate]);

  return (
    <>
      {!myReviews?.length ? (
        <div className="container-history my-5">
          <div className="card global-card no-history review-list text-light">
            <NavLink
              to="/Dashboard"
              className="text-white fs-3 px-3 pt-3"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <AiOutlineClose />
            </NavLink>
            <p className="card-header history-header fs-3">No review yet</p>
            <div className="card-body" style={{ textAlign: "center" }}>
              <p>Your reviews will show on here soon.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-review py-5">
          <div className="media-title review-border">
            <h3 className="review-list-title my-5 text-light">Your reviews</h3>{" "}
            <NavLink to="/Dashboard" className="text-white my-5 fs-3 g-0"
            style={{ display: "flex", alignItems: "center" }}
            >
              <AiOutlineClose />
            </NavLink>
          </div>
          <div className="row all-history">
            {myReviews &&
              myReviews.map((review) => (
                <div key={review._id} className="col-lg-8 col-sm-12">
                  <div className="card global-card card-media mb-4">
                    <div className="card-header fs-3">{review.title}</div>
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-12">
                          <p className="card-text px-3 pt-4">
                            {review.reviewText}
                          </p>
                        </div>
                        <div className="col-12 mt-3">
                          <p className="review fs-5 px-3">
                            Created on {review.reviewDate}
                          </p>
                        </div>
                        <div className="col-12 px-3 pb-3">
                          {/* <img
                            src={profileIcon}
                            alt="profile icon"
                            height={25}
                          /> */}
                          <span className="review fs-5 m-2">
                            {review.username}
                          </span>
                        </div>
                        <div className="card-footer">
                          <div className="row">
                            <div className="col-6 d-flex align-items-center">
                              <RatingList rating={review.rating} />
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                              <button
                                type="button"
                                className="btn delete-review"
                                disabled={loading}
                                onClick={() => handleSubmit(review)}
                              >
                                {loading && deleteReviewData === review._id ? (
                                  <ButtonSpinner />
                                ) : (
                                  <img
                                    className="trash-can"
                                    src={trash}
                                    alt="trash-can"
                                    height={50}
                                  />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyReviewsList;
