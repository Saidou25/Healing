import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEWS } from "../../../utils/queries";
import profileIcon from "../../../assets/images/profileIcon.png"
import RatingList from "../../../components/RatingList";
import Spinner from "../../../components/Spinner";
import "./index.css";

const AllReviews = () => {
  const { data: reviewsData, resultsDataLoading } = useQuery(QUERY_REVIEWS);
  const reviews = reviewsData?.reviews || [];

  if (resultsDataLoading) return <Spinner />;
  return (
    <>
      <div className="row all-reviews">
        {reviews.length ? (
          <>
          <h3 className="reviews-title mt-4 mb-5">Read what people say</h3>
            {reviews &&
              reviews.map((review) => (
                <div key={review._id} className="col-12">
                  <div className="card review-list mb-4">
                    <div className="card-header fs-3">{review.title}</div>
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-12">
                          <p className="card-text fs-4">{review.reviewText}</p>
                        </div>
                        <div className="col-12 mt-3">
                          <p className="review fs-5">
                            Created on {review.reviewDate}
                          </p>
                        </div>
                        <div className="col-12 pb-3">
                          <img
                            src={profileIcon}
                            alt="profile icon"
                            height={20}
                          />
                          <span className="review fs-5 m-2">
                            {review.username}
                          </span>
                        </div>
                        <div className="col-6 d-flex align-items-center">
                          <RatingList rating={review.rating} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        ) : (
          null
        )}
      </div>
    </>
  );
};
export default AllReviews;
