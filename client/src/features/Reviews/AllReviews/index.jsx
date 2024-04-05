import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEWS } from "../../../utils/queries";
import RatingList from "../RatingList";
import Spinner from "../../../components/Spinner";
import "./index.css";

const AllReviews = () => {
  const { data: reviewsData, resultsDataLoading } = useQuery(QUERY_REVIEWS);
  const reviews = reviewsData?.reviews || [];

  if (resultsDataLoading) return <Spinner />;

  return (
    <div className="row all-reviews mb-5">
      {reviews.length ? (
        <>
          <h3 className="reviews-title mt-4 mb-5 text-light">
            Read what people say
          </h3>
          {reviews &&
            reviews.map((review) => (
              <div key={review._id} className="col-12">
                <div className="card global-card text-light mb-4">
                  <div className="card-header fs-3">{review.title}</div>
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-12">
                        <span className="card-text fs-4">
                          {review.reviewText}
                        </span>
                      </div>
                      <div className="col-12 mt-3">
                        <span className="review fs-5">
                          Created on {review.reviewDate}
                        </span>
                      </div>
                      <div className="col-12 pb-1">
                        <span className="review fs-5">{review.username}</span>
                      </div>
                      <RatingList rating={review.rating} reviews={reviews} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </>
      ) : null}
    </div>
  );
};
export default AllReviews;
