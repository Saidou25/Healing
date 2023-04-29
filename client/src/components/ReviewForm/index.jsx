import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../utils/mutations";
import Navbar from '../Navbar';
import MyReviewsList from "../MyReviewsList";
import { useNavigate } from "react-router-dom";
// import Dashboard from "../../pages/Dashboard";
// import './index.css';


const ReviewForm = () => {
const navigate = useNavigate();
    //    const navigate = useNavigate();
    const [formState, setFormState] = useState({ title: '', reviewText: '' });
    const [addReview] = useMutation(ADD_REVIEW);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('form state', formState);

        try {
            const { data } = await addReview({
                variables: { ...formState },
            });


        } catch (e) {
            console.error(e);
        }
        navigate('/AppointmentConfirmation', { state: formState });

        setFormState({
            title: '',
            reviewText: '',
        });
        console.log('formState', formState)
    };

    return (
        <>
            <Navbar />
            <main className="flex-row justify-center mb-4">
                <div className="col-12 col-lg-10">
                    <div className="card">
                        <h4 className="card-header bg-dark text-light p-2">Write your review</h4>
                        <div className="card-body">
                            {/* {data ?  */}
                            {/* <p>
                Success! You may now head{' '}
                <Link to="/Dashboard">to your Dashboard.</Link>
              </p>
            :  ( */}
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className="form-input"
                                    placeholder="title"
                                    name="title"
                                    type="text"
                                    value={formState.title}
                                    onChange={handleChange}
                                />
                                <textarea
                                    className="form-input"
                                    placeholder="write your text"
                                    name="reviewText"
                                    type="text"
                                    value={formState.reviewText}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn btn-block btn-info"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                            {/* )} */}

                            {/* {error && (
                                <div className="my-3 p-3 bg-danger text-white">
                                    {error.message}
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export default ReviewForm;