import React from 'react';


const MyReviewsList = (props) => {
const reviews = props.reviews;

    if (!reviews) {
        return <h3>No reviews Yet</h3>;
    }
    return (
        <div>
            <h3 className="text">All Reviews</h3>
            <div className="flex-row justify-space-between my-4">
                {reviews &&
                    reviews.map((review) => (
                        <div key={review._id} className="col-12 col-xl-6 p-4">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-white p-2 m-0">

                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Day: {review.title}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Date: {review.reviewText}</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Created: fake date</span> <br />
                                    <span className="text" style={{ fontSize: '1rem' }}>
                                        Author: Arthur</span>
                                   
                                </h4>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
};

export default MyReviewsList;