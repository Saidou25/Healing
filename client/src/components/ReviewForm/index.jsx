import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS, QUERY_ME } from '../../utils/queries';
import './index.css';

const ReviewForm = (props) => {
    const username = props.username;

    const [confirm, setConfirm] = useState(false);
    const [error, setError] = useState(false);
    const [title, setTitle] = useState('');
    const [reviewText, setReviewText] = useState('');

    const [addReview] = useMutation(ADD_REVIEW, {
        update(cache, { data: { addReview } }) {
            try {
                const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

                cache.writeQuery({
                    query: QUERY_REVIEWS,
                    data: { reviews: [addReview, ...reviews] },
                });
            } catch (e) {
                console.error(e);
            }
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, reviews: [...me.reviews, addReview] } },
            });
        }
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (title.length < 2 || reviewText.length < 2) {
            setConfirm(false);
            setError('All fields need filled with two charactes minimum!');
            return;
        };
        try {
            const { data } = await addReview({
                variables: { title: title, reviewText: reviewText, username: username },
            });

        } catch (e) {
            console.error(e);
        }
        setConfirm(true);
        setTimeout(() => {
            setConfirm(false);
          }, 2500);

        setError(false);
        setTitle('');
        setReviewText('');
    };

    return (
        <>
            <main className="flex-row">
                <div className="col-12 col-lg-10 review-form">
                    <div className="card">
                        <h4 className="card-header-review-title bg-primary text-light p-2">review</h4>
                        <div className="card-body">
                            <form onSubmit={handleFormSubmit}>
                                <label className="form-label">Title</label><br />
                                <input
                                    className="form-input review-form-input mb-3"
                                    placeholder="title..."
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <label className="form-label">Text</label><br />
                                <textarea
                                    className="form-input review-textarea mb-3"
                                    placeholder="write your text here..."
                                    name="reviewText"
                                    type="text"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                /><br />
                                {error && (
                                    <p className="my-3 p-3 bg-danger text-white fs-5 mt-2">
                                        {error}
                                    </p>
                                )}
                                {confirm && (
                                    <p className="my-3 p-3 bg-success text-white fs-5 mt-2">
                                        Done! You can now close the window...
                                    </p>
                                )}
                                <button
                                    className="btn btn-block rounded-0 btn-info mt-4"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export default ReviewForm;