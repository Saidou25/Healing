import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_REVIEWS } from '../../utils/queries';
import { DELETE_REVIEW } from '../../utils/mutations';
import './index.css';

const MyReviewsList = (props) => {
    //  This page shows all reviews. User's reviews have a delete button
    const myUserName = props.username;

    const [reviewId, setReviewId] = useState('');

    const { data: reviewsData, loading } = useQuery(QUERY_REVIEWS);
    const reviews = reviewsData?.reviews || [];

    const [deleteReview] = useMutation(DELETE_REVIEW, {
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

    const handleSubmit = (review) => {
        const reviewId = review._id;

        try {
            const { data } = deleteReview({
                variables: { id: reviewId }
            });
            setReviewId(review._id);
            console.log('Review deleted successfully');
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <h3>loading...</h3>
    }
    return (
        <div className='container-review'>
            <h3 className="review-list-title mt-4 mb-5">Read what people say: </h3>
            <div className="row">
                {reviews &&
                    reviews.map((review) => (
                        <div key={review._id} className="col-12">
                            <div className="card review-list mb-3">
                                <div className="card-header fs-3">{review.title}</div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <p className="card-text fs-4">
                                                {review.reviewText}</p> 
                                        </div>
                                        <div className='col-6 mt-3'>
                                            <p className="review fs-5">
                                                Created: fake date</p> 
                                        </div>
                                    </div>
                                    <div>
                                        {(review.username === myUserName) ? (
                                            <div className='d-flex justify-content-end'>
                                                <button
                                                    type='button'
                                                    className='btn delete-review mt-4 btn-danger rounded-0'
                                                    onClick={() => handleSubmit(review)}>
                                                    delete
                                                </button>
                                            </div>) : (
                                            <>
                                                <div className='col-6'>
                                                    <span className="review fs-5">
                                                        Author: {review.username}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className='star mt-2'>
                                        {/* <div className="col-2 stars"> */}
                                            {(review.rating === '1') ? (
                                                <i className="fa fa-star checked1"></i>
                                            ) : (
                                                <></>
                                            )}
                                        {/* </div> */}
                                        {/* <div className="col-2"> */}
                                            {(review.rating === '2') ? (
                                                <div className='stars'>
                                                    <i className="fa fa-star checked1"></i>
                                                    <i className="fa fa-star unchecked2"></i>
                                                </div>
                                            ) : (<></>
                                            )}
                                        {/* </div> */}
                                        {/* <div className="col-3"> */}
                                            {(review.rating === '3') ? (
                                                <>
                                                    <i className="fa fa-star checked1"></i>
                                                    <i className="fa fa-star checked2"></i>
                                                    <i className="fa fa-star unchecked3"></i>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        {/* </div> */}
                                        {/* <div className="col-2 stars"> */}
                                            {(review.rating === '4') ? (
                                                <>
                                                    <i className="fa fa-star checked1"></i>
                                                    <i className="fa fa-star checked2"></i>
                                                    <i className="fa fa-star checked3"></i>
                                                    <i className="fa fa-star checked4"></i>
                                                </>
                                            ) : (
                                                <></>
                                            )}

                                        {/* </div> */}
                                        {/* <div className="col-5"> */}
                                            {(review.rating === '5')? (
                                                <>
                                                    <i className="fa fa-star checked1"></i>
                                                    <i className="fa fa-star checked2"></i>
                                                    <i className="fa fa-star checked3"></i>
                                                    <i className="fa fa-star checked4"></i>
                                                    <i className="fa fa-star checked5"></i>
                                                </>
                                            ) : (
                                                <></>
                                            )}

                                        {/* </div> */}
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