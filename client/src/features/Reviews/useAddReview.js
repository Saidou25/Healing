import { useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_REVIEWS } from "../../utils/queries";
import { ADD_REVIEW } from "../../utils/mutations";
import { useCallback, useEffect, useState } from "react";

const useAddReview = (addReviewData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successAddingReview, setSuccessAddingReview] = useState("");

  const [addReview] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [addReview, ...reviews] },
        });
      } catch (e) {
        setError(e.message);
        return;
      }
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, reviews: [...me.reviews, addReview] } },
      });
    },
  });

  const addAReview = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await addReview({
        variables: {
          reviewDate: addReviewData.reviewDate,
          title: addReviewData.title,
          reviewText: addReviewData.reviewText,
          username: addReviewData.username,
          rating: !addReviewData.rating ? "0" : addReviewData.rating
        },
      });
    } catch (e) {
      setError(e.message);
      setLoading(false);
    } finally {
      setLoading(false);
      setSuccessAddingReview("Your Review has been created");
      setError("");
      setTimeout(() => {
        setSuccessAddingReview("");
      }, [2500]);
    }
  }, [addReviewData, addReview]);

  useEffect(() => {
    if (!addReviewData.title || !addReviewData.reviewText) {
      return;
    } else {
      addAReview();
    }
  }, [addReviewData, addAReview]);
  return { successAddingReview, loading, error };
};
export default useAddReview;
