import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../../utils/mutations";
import { QUERY_ME, QUERY_REVIEWS } from "../../utils/queries";

const useDeletReview = (deleteReviewData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successDeletingReview, setSuccessDeletingReview] = useState("");
  // const [deleteReviewI, setDeleteReviewId] = useState("");

  // console.log("loading", loading);

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    // variables: { id: deleteReviewI },
    update(cache, { data: { deleteReview } }) {
      try {
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });
        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: {
            reviews: reviews.filter(
              (review) => review._id !== deleteReview._id
            ),
          },
        });
      } catch (error) {
        console.error(error);
      }
      // update me object's cache with deleted review
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: {
          me: {
            ...me,
            reviews: [
              ...me.reviews.filter((review) => review._id !== deleteReview._id),
            ],
          },
        },
      });
    },
  });

  const removeReview = useCallback(async () => {
    // console.log("deleteReviewData", deleteReviewData);
    if (!deleteReviewData) {
      console.log("no luck", deleteReviewData);
      return;
    }
    setLoading(true);
    // console.log("lucky you, deleteReviewData", deleteReviewData);

    try {
      const { data } = deleteReview({
        variables: { id: deleteReviewData },
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    } finally {
      // setDeleteReviewId(deleteReviewData._id)
      setSuccessDeletingReview("Review was successfully deleted");
      setError("");
      setLoading(false);
    }
  }, [deleteReviewData, deleteReview]);

  useEffect(() => {
    // console.log("use effect delete review data", deleteReviewData);
    if (!deleteReviewData) {
      // console.log("there is no delete review data", deleteReviewData);
      setSuccessDeletingReview("");
      setError("");
      return;
    } else {
      // console.log("there is delete review data", deleteReviewData);
      setLoading(true);
      removeReview();
    }
  }, [deleteReviewData, removeReview]);
  return { successDeletingReview, loading, error };
};

export default useDeletReview;
