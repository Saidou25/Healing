import React, { useState } from "react";
import "./index.css";
// import { useUser } from "../../../context/userContext";
import useDeletReview from "../useDeleteReview";
import RatingList from "../../../components/RatingList";
import profileIcon from "../../../assets/images/profileIcon.png";
import trash from "../../../assets/images/trash.png";
import ButtonSpinner from "../../../components/ButtonSpinner";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../../utils/queries";

const MyReviewsList = () => {
  const [deleteReviewData, setDeleteReviewData] = useState("");

  // const { me } = useUser();
  const { data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || [];
  const myReviews = me.reviews;

  const { successDeletingReview, loading, error } =
    useDeletReview(deleteReviewData);

  const handleSubmit = (review) => {
    console.log(review._id);
    // if (!review?._id) {
    //   console.log("no review", review);
    //   return;
    // } else {
        const reviewId = review._id
      setDeleteReviewData(reviewId);
    // }
  };

  return (
    <>
      {!myReviews?.length ? (
        <div className="containerno-history mt-5 mb-5">
          <div className="card no-history">
            <p className="card-header history-header fs-3 my-3">
              No review yet
            </p>
            <div className="card-body history-text">
              <p>Your reviews will show on here soon.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-review">
          <h3 className="review-list-title mt-5 mb-5">Your reviews</h3>
          <div className="row review-border">
            {myReviews &&
              myReviews.map((review) => (
                <div key={review._id} className="col-8">
                  <div className="card review-list mb-4">
                    <div className="card-header fs-3">{review.title}</div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <p className="card-text fs-4 px-3 pt-4">
                            {review.reviewText}
                          </p>
                        </div>
                        <div className="col-12 mt-3">
                          <p className="review fs-5 px-3">
                            Created on {review.reviewDate}
                          </p>
                        </div>
                        <div className="col-12 px-3 pb-3">
                          <img
                            src={profileIcon}
                            alt="profile icon"
                            height={25}
                          />
                          <span className="review fs-5 m-2">
                            {review.username}
                          </span>
                        </div>
                        <div className="card-footer px-3">
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
                                {loading ? (
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
