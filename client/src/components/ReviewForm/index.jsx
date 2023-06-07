import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS, QUERY_ME } from '../../utils/queries';
import './index.css';

const ReviewForm = (props) => {
    const username = props.username;

    const [formState, setFormState] = useState({ title: '', reviewText: '' });

    const [addReview, { error }] = useMutation(ADD_REVIEW, {
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

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addReview({
                variables: { username: username, ...formState },
            });

        } catch (e) {
            console.error(e);
        }

        setFormState({
            title: '',
            reviewText: '',
        });
    };

    return (
        <>
            <main className="flex-row">
                <div className="col-12 col-lg-10 review-form">
                    <div className="card">
                        <h4 className="card-header-review-title bg-primary text-light p-2">review</h4>
                        <div className="card-body">
                            {formState.length ?
                                <p>
                                    Success!
                                    {/* <Link to="/Dashboard">to your Dashboard.</Link> */}
                                </p>
                                : (
                                    <form onSubmit={handleFormSubmit}>
                                        <label className="form-label">Title</label><br />

                                        <input

                                            className="form-input review-form-input mb-3"
                                            placeholder="title..."
                                            name="title"
                                            type="text"
                                            value={formState.title}
                                            onChange={handleChange}
                                        />
                                        <label className="form-label">Text</label><br />
                                        <textarea
                                            className="form-input review-textarea mb-3"
                                            placeholder="write your text here..."
                                            name="reviewText"
                                            type="text"
                                            value={formState.reviewText}
                                            onChange={handleChange}
                                        /><br />
                                        <button
                                            className="btn btn-block rounded-0 btn-info mt-4"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                )}
                            {error && (
                                <div className="my-3 p-3 bg-danger text-white">
                                    {error.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export default ReviewForm;