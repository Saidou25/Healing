import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS, QUERY_ME } from '../../utils/queries';
// import Rating from '../Rating';

import './index.css';

const ReviewForm = (props) => {
    const username = props.username;

    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);
    const [rating, setRating] = useState('');
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
    const handleChange = (num) => {
        if (num === '1') {
            setChecked1(true);
            setChecked2(false);
            setChecked3(false);
            setChecked4(false);
            setChecked5(false);
            setRating('1')
        }
        if (num === '2') {
            setChecked1(true);
            setChecked2(true);
            setChecked3(false);
            setChecked4(false);
            setChecked5(false);
            setRating('2')
        }
        if (num === '3') {
            setChecked1(true);
            setChecked2(true);
            setChecked3(true);
            setChecked4(false);
            setChecked5(false);
            setRating('3')
        }
        if (num === '4') {
            setChecked1(true);
            setChecked2(true);
            setChecked3(true);
            setChecked4(true);
            setChecked5(false);
            setRating('4')
        }
        if (num === '5') {
            setChecked1(true);
            setChecked2(true);
            setChecked3(true);
            setChecked4(true);
            setChecked5(true);
            setRating('5')
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('rating', rating);
        if (title.length < 2 || reviewText.length < 2) {
            setConfirm(false);
            setError('All fields need filled with two charactes minimum!');
            return;
        };
        try {
            const { data } = await addReview({
                variables: { title: title, reviewText: reviewText, username: username, rating: rating },
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
                            <form>
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
                            </form>
                            <div className="col-12">
                                <label className="form-label">
                                    Rate
                                    <span className="optional">(optianal)</span>
                                </label>
                                <div className='row star mt-2'>
                                    {/* <div className="col-2"> */}
                                        <button className='col-2 btn'
                                            onClick={() => handleChange('1')}>
                                            {checked1 ? (
                                                <i className="fa fa-star checked1"></i>
                                            ) : (
                                                <i className="fa fa-star unchecked1"></i>
                                            )}
                                        </button>
                                    {/* </div> */}
                                    {/* <div className="col-2"> */}
                                        <button className='col-2 btn'
                                            onClick={() => handleChange('2')}>
                                            {checked2 ? (
                                                <i className="fa fa-star checked2"></i>
                                            ) : (
                                                <i className="fa fa-star unchecked2"></i>
                                            )}
                                        </button>
                                    {/* </div> */}
                                    {/* <div className="col-2"> */}
                                        <button className='col-2 btn'
                                            onClick={() => handleChange('3')}>
                                            {checked3 ? (
                                                <i className="fa fa-star checked3"></i>
                                            ) : (
                                                <i className="fa fa-star unchecked3"></i>
                                            )}
                                        </button>
                                    {/* </div> */}
                                    {/* <div className="col-2"> */}
                                        <button className='col-2 btn'
                                            onClick={() => handleChange('4')}>
                                            {checked4 ? (
                                                <i className="fa fa-star checked4"></i>
                                            ) : (
                                                <i className="fa fa-star unchecked4"></i>
                                            )}
                                        </button>
                                    {/* </div> */}
                                    {/* <div className="col-2"> */}
                                        <button className='col-2 btn'
                                            onClick={() => handleChange('5')}>
                                            {checked5 ? (
                                                <i className="fa fa-star checked5"></i>
                                            ) : (
                                                <i className="fa fa-star unchecked5"></i>
                                            )}
                                        </button>
                                    {/* </div> */}
                                </div>
                            </div>
                            {error && (
                                <p className="my-3 p-3 bg-danger text-white fs-5 mt-4">
                                    {error}
                                </p>
                            )}
                            {confirm && (
                                <p className="my-3 p-3 bg-success text-white fs-5 mt-4">
                                    Done! You can now close the window...
                                </p>
                            )}
                            <button
                                className="btn btn-block rounded-0 btn-info mt-4"
                                type="submit"
                                onClick={handleSubmit}

                            >
                                Submit
                            </button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export default ReviewForm;