import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../../utils/mutations";
import { QUERY_ME, QUERY_REVIEWS } from "../../utils/queries";

const useDeletReview = (deleteReviewData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successDeletingReview, setSuccessDeletingReview] = useState("");

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    variables: { id: deleteReviewData },
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
        setError(error.message);
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
    setLoading(true);

    const deleteReviewId = deleteReviewData;
    try {
      const { data } = await deleteReview({
        variables: { id: deleteReviewId },
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    } finally {
      setSuccessDeletingReview("Review was successfully deleted");
      setError("");
      setLoading(false);
      setTimeout(() => {
        setSuccessDeletingReview("");
      }, [2500]);
    }
  }, [deleteReviewData, deleteReview]);

  useEffect(() => {
    if (!deleteReviewData) {
      setSuccessDeletingReview("");
      setError("");
      setLoading(false);
      return;
    } else {
      removeReview();
    }
  }, [deleteReviewData, removeReview]);
  return { successDeletingReview, loading, error };
};

export default useDeletReview;
