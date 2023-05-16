import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS, QUERY_ME } from '../../utils/queries';
import MyReviewsList from "../MyReviewsList";
// import Dashboard from "../../pages/Dashboard";
import './index.css';


const ReviewForm = (props) => {
   const username = props.username;
//    console.log('username', username);
    //    const navigate = useNavigate();
    const [formState, setFormState] = useState({ title: '', reviewText: '' });
    // const [disapear, setDisapear] = useState('');
    // const [addReview] = useMutation(ADD_REVIEW);

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

            // setDisapear('disapear')

        } catch (e) {
            console.error(e);
        }
        // navigate('/AppointmentConfirmation', { state: formState });

        setFormState({
            title: '',
            reviewText: '',
        });

    };

    return (
        <>
            <main className="flex-row justify-center mb-4">
                <div className="col-12 col-lg-10">
                    <div className="card">
                        <h4 className="card-header bg-primary text-light p-2">Write your review</h4>
                        <div className="card-body">
                           {formState.length ?  
                          <p>
                Success! 
                {/* <Link to="/Dashboard">to your Dashboard.</Link> */}
              </p>
            :  ( 
                            <form onSubmit={handleFormSubmit}>
                                 <label className="form-label">Title</label><br />
                                           
                                <input
                                    className="form-input review-form-input mb-3"
                                    placeholder="title"
                                    name="title"
                                    type="text"
                                    value={formState.title}
                                    onChange={handleChange}
                                />
                                 <label className="form-label">Text</label><br />
                                           
                                <textarea
                                    className="form-input review-textarea mb-3"
                                    placeholder="write your text"
                                    name="reviewText"
                                    type="text"
                                    value={formState.reviewText}
                                    onChange={handleChange}
                                /><br />
                                <button
                                    className="btn btn-block rounded-0 btn-info"
                                    style={{ cursor: 'pointer' }}
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