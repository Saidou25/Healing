import React, { useEffect, useState } from "react";
import useAddReview from "../useAddReview";
import ButtonSpinner from "../../../components/ButtonSpinner";
import Button from "../../../components/Button";
import ErrorComponent from "../../../components/ErrorComponent";
import Success from "../../../components/Success";
import "./index.css";

const ReviewForm = ({ username, today }) => {
  const [formState, setFormState] = useState({
    username: username,
    reviewDate: today,
    title: "",
    reviewText: "",
    rating: "4",
  });
  const [addReviewData, setAddReviewData] = useState("");
  const [error, setError] = useState("");
  const [errorHook, setErrorHook] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    successAddingReview,
    loading: loadingAddingReview,
    errorAddingReview,
  } = useAddReview(addReviewData);

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [confirm, setConfirm] = useState("");
  // const [error, setError] = useState(false);

  // const [addReview] = useMutation(ADD_REVIEW, {
  //   update(cache, { data: { addReview } }) {
  //     try {
  //       const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

  //       cache.writeQuery({
  //         query: QUERY_REVIEWS,
  //         data: { reviews: [addReview, ...reviews] },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //     const { me } = cache.readQuery({ query: QUERY_ME });
  //     cache.writeQuery({
  //       query: QUERY_ME,
  //       data: { me: { ...me, reviews: [...me.reviews, addReview] } },
  //     });
  //   },
  // });
  const handleChange = (event) => {
    setError("");
    setErrorHook("");
    setLoading(false);

    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // const handleRating = (event, num) => {
  //   // event.preventDefault();

  //   console.log("num", num);

  //   if (num === "1") {
  //     setChecked1(true);
  //     setChecked2(false);
  //     setChecked3(false);
  //     setChecked4(false);
  //     setChecked5(false);
  //     setRating("1");
  //   }
  //   if (num === "2") {
  //     setChecked1(true);
  //     setChecked2(true);
  //     setChecked3(false);
  //     setChecked4(false);
  //     setChecked5(false);
  //     setRating("2");
  //   }
  //   if (num === "3") {
  //     setChecked1(true);
  //     setChecked2(true);
  //     setChecked3(true);
  //     setChecked4(false);
  //     setChecked5(false);
  //     setRating("3");
  //   }
  //   if (num === "4") {
  //     setChecked1(true);
  //     setChecked2(true);
  //     setChecked3(true);
  //     setChecked4(true);
  //     setChecked5(false);
  //     setRating("4");
  //   }
  //   if (num === "5") {
  //     setChecked1(true);
  //     setChecked2(true);
  //     setChecked3(true);
  //     setChecked4(true);
  //     setChecked5(true);
  //     setRating("5");
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    setConfirm(false);
    setError("");
    if (!formState.title || !formState.reviewText) {
      setAddReviewData("");
      setError("All fields need to be filled!");
      setLoading(false);
      return;
    }
    setLoading(true);
    setAddReviewData({ ...formState });
    //     if (title.length < 2 || reviewText.length < 2) {
    //       setConfirm(false);
    //       setError("All fields need to be filled with two charactes minimum!");
    //       return;
    //     }
    //     try {
    //       const { data } = await addReview({
    //         variables: {
    //           today: today,
    //           title: title,
    //           reviewText: reviewText,
    //           username: username,
    //           rating: rating,
    //         },
    //       });
    //       if (data) {
    //         console.log('success adding review', title)
    //       }
    //     } catch (e) {
    //       console.error(e);
    //     };
    //     setConfirm("Done! You can now close the window...");
    //     setTimeout(() => {
    //       setConfirm("");
    //     }, 2500);
    // // Clearing form inputs
    //     setError(false);
    //     setTitle("");
    //     setReviewText("");
    //     setRating("");
    //     setChecked1("")
    //     setChecked2("");
    //     setChecked3("");
    //     setChecked4("");
    //     setChecked5("");
  };
  useEffect(() => {
    if (successAddingReview) {
      setError("");
      setLoading(false);
      setConfirm(true);
      setFormState({
        username: username,
        reviewDate: today,
        title: "",
        reviewText: "",
        rating: "4",
      });
      setTimeout(() => {
        setConfirm(false);
      }, 2000);
    }
  }, [successAddingReview, today, username]);

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
                      <label className="form-label1">
                        Rate
                        <span className="optional">(optianal)</span>
                      </label>
                      <div className="row star mt-2">
                        <Button
                          type="button"
                          className="col-2 btn"
                          // onClick={(event) => handleRating("1")}
                        >
                          {checked1 ? (
                            <i className="fa fa-star checked1"></i>
                          ) : (
                            <i className="fa fa-star unchecked1"></i>
                          )}
                        </Button>
                        <Button
                          type="button"
                          className="col-2 btn"
                          // onClick={(event) => handleRating("2")}
                        >
                          {checked2 ? (
                            <i className="fa fa-star checked2"></i>
                          ) : (
                            <i className="fa fa-star unchecked2"></i>
                          )}
                        </Button>
                        <Button
                          type="button"
                          className="col-2 btn"
                          // onClick={(event) => handleRating("3")}
                        >
                          {checked3 ? (
                            <i className="fa fa-star checked3"></i>
                          ) : (
                            <i className="fa fa-star unchecked3"></i>
                          )}
                        </Button>
                        <Button
                          type="button"
                          className="col-2 btn"
                          // onClick={(event) => handleRating("4")}
                        >
                          {checked4 ? (
                            <i className="fa fa-star checked4"></i>
                          ) : (
                            <i className="fa fa-star unchecked4"></i>
                          )}
                        </Button>
                        <Button
                          type="button"
                          className="col-2 btn"
                          // onClick={(event) => handleRating("5")}
                        >
                          {checked5 ? (
                            <i className="fa fa-star checked5"></i>
                          ) : (
                            <i className="fa fa-star unchecked5"></i>
                          )}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <div>
                        {successAddingReview && (
                          <div className="bg-success text-white mb-5">
                            <p className="review-confirm m-2">
                              {successAddingReview}
                            </p>
                          </div>
                        )}
                      </div>
                      <br />
                      {error && <ErrorComponent message={error} />}
                    </div>
                    <Button
                      className="btn btn-block rounded-0 btn-info mt-5"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <ButtonSpinner /> : <>Submit</>}
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
