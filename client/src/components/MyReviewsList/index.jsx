import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_REVIEWS } from '../../utils/queries';
import { DELETE_REVIEW } from '../../utils/mutations';
import './index.css';

const MyReviewsList = (props) => {
    const myUserName = props.username;
   
    const myReviews = props.myReviews;
   
    const [reviewId, setReviewId] = useState('');
    // const [reviews, setReviews] = useState('');

    const { data: reviewsData, loading } = useQuery(QUERY_REVIEWS);
    const reviews = reviewsData?.reviews || [];
    // setReviews(reviews);

    const [deleteReview, error] = useMutation(DELETE_REVIEW, {
        variables: { id: reviewId },
        update(cache, { data: { deleteReview } }) {
            try {
                const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

                cache.writeQuery({
                    query: QUERY_REVIEWS,
                    data: { reviews: reviews.filter(review => review._id !== deleteReview._id) },
                });
            } catch (error) {
                console.error(error);
            }
        }
    });

    // useEffect(() => {
    //     if (reviewsData) {
    // const reviews = reviewsData?.reviews || [];
    // setReviews(reviews);
    //     }
    // }, [reviewsData]);

    const handleSubmit = (review) => {
        const reviewId = review._id;
        // const reviewIdStr = reviewId.toString();

        try {
            const { data } = deleteReview({
                variables: { id: reviewId }
            });
            setReviewId(review._id);
            // setReview(review);
            // setReviews(reviews);
            console.log('Review deletes successfully');
        } catch (err) {
            console.error(err);
        }
    };

    // if (!reviews.length) {
    //     return <h3>No reviews Yet</h3>
    // }
    if (loading) {
        return <h3>loading...</h3>
    }
    return (
        <div>
            <h3 className="review-list-title mt-4 mb-5">Reviews</h3>
            <div className="row justify-context-space-between">
                {reviews &&
                    reviews.map((review) => (
                        <div key={review._id} className="col-4">
                            <div className="card text-white bg-primary mb-3">
                                <div className="card-header">Header</div>
                                <div className='card-body'>
                                    <p className="card-text" style={{ fontSize: '1rem' }}>
                                        Title: {review.title}</p> <br />
                                    <p className="card-text" style={{ fontSize: '1rem' }}>
                                        Text: {review.reviewText}</p> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Created: fake date</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Author: {review.username}</span> < br />
                                    <div>
                                        {(review.username === myUserName) ? (
                                            <div>
                                                <button type='button' className='btn delete-review mt-4 btn-danger rounded-0' onClick={() => handleSubmit(review)}>
                                                    delete
                                                </button>
                                            </div>) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
};

export default MyReviewsList;