import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAddReview from "../useAddReview";
import ButtonSpinner from "../../../components/ButtonSpinner";
import Button from "../../../components/Button";
import ErrorComponent from "../../../components/ErrorComponent";
import Success from "../../../components/Success";
import Rating from "../Rating";
import "./index.css";

const ReviewForm = ({ username, today }) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: username,
    reviewDate: today,
    title: "",
    reviewText: "",
    rating: "",
  });
  const [addReviewData, setAddReviewData] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);

  const {
    successAddingReview,
    loading: loadingAddingReview,
    error: errorAddingReview,
  } = useAddReview(addReviewData);

  const handleChange = (event) => {
    setError("");

    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleRating = (star) => {
    setError("");
    setFormState({
      ...formState,
      rating: star,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formState.title || !formState.reviewText) {
      setError("All fields need to be filled!");
      return;
    }
    if (formState.title.length < 2 || formState.reviewText.length < 2) {
      setError("Two characters minimum are required!");
      return;
    }
    setAddReviewData(formState);
  };

  useEffect(() => {
    if (successAddingReview) {
      setConfirm(true);
      setTimeout(() => {
        setConfirm(false);
        setFormState({
          username: username,
          reviewDate: today,
          title: "",
          reviewText: "",
          rating: "",
        });
        navigate("/Dashboard");
      }, 2000);
    }
  }, [successAddingReview, today, username, navigate]);

  useEffect(() => {
    if (errorAddingReview) {
      setError(errorAddingReview);
      setConfirm(false);
      return;
    }
  }, [errorAddingReview, today, username]);

  return (
    <>
      <main className="row mt-5">
        <div className="col-12 review-form">
          <div className="card global-card card-card">
            {confirm ? (
              <Success message={successAddingReview} />
            ) : (
              <>
                <h4 className="card-header-review-title bg-black text-light">
                  review
                </h4>
                <div className="card-body text-light">
                  <form>
                    <label
                      htmlFor="the-title"
                      className="form-label1 my-4 text-light"
                    >
                      Title
                    </label>
                    <br />
                    <input
                      id="the-title"
                      required
                      className="form-input review-form-input mb-3 text-light"
                      placeholder="title..."
                      name="title"
                      type="text"
                      value={formState.title}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="the-text"
                      className="form-label1 my-4 text-light"
                    >
                      Text
                    </label>
                    <br />
                    <textarea
                      id="the-text"
                      className="form-input review-form-input mb-3 text-light"
                      placeholder="write your text here..."
                      name="reviewText"
                      type="text"
                      value={formState.reviewText}
                      onChange={handleChange}
                    />
                    <br />
                    <div className="col-12">
                      <span className="form-label1 mt-4">
                        Rate
                        <span className="optional">(optianal)</span>
                      </span>
                      <Rating
                        handleRating={handleRating}
                        successAddingReview={successAddingReview}
                      />
                    </div>
                    <div>
                      {successAddingReview && (
                        <div className="bg-success text-white mb-5">
                          <p className="review-confirm m-2">
                            {successAddingReview}
                          </p>
                        </div>
                      )}
                      <br />
                      {error && <ErrorComponent message={error} />}
                    </div>
                    <Button
                      className="btn btn-block rounded-0 btn-info mt-2"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loadingAddingReview}
                    >
                      {loadingAddingReview ? <ButtonSpinner /> : <>Submit</>}
                    </Button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
export default ReviewForm;
