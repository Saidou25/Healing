import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_BOOKINGDATE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const useDeleteBooking = (deleteBookingData) => {
  const [deleteBookingError, setDeleteBookingError] = useState("");
  const [successDeletingBooking, setSuccessDeletingBooking] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteBookingdateId, setDeleteBookingdateId] = useState("");

  // Updating the cache with newly created appointment
  const [deleteBookingdate] = useMutation(DELETE_BOOKINGDATE, {
    variables: { id: deleteBookingdateId },
    update(cache, { data: { deleteBookingdate } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: {
              ...me,
              bookingdates: me.bookingdates.filter(
                (bookingdate) => bookingdate._id !== deleteBookingdate?._id
              ),
            },
          },
        });
      } catch (err) {
        setDeleteBookingError(err.message);
      }
    },
  });

  const removeBooking = useCallback(async () => {
    setLoading(true);
    const deleteBookingId = deleteBookingData._id;

    try {
      const { data } = await deleteBookingdate({
        variables: {
          id: deleteBookingId,
          username: deleteBookingData?.username,
          startDate: deleteBookingData?.startDate,
          digitalAppointment: deleteBookingData?.digitalAppointment,
          appointmentString: deleteBookingData?.appointmentString,
          reason: deleteBookingData?.reason,
        },
      });
      
    } catch (err) {
      setDeleteBookingError(err.message);
    } finally {
      setDeleteBookingdateId(deleteBookingId);
      setSuccessDeletingBooking("success deleting booking");
      setDeleteBookingError("");
      setLoading(false);
    }
  }, [deleteBookingData, deleteBookingdate]);

  useEffect(() => {
    if (!deleteBookingData._id) {
      setDeleteBookingError("");
      setSuccessDeletingBooking("");
      return;
    } else {
      removeBooking();
    }
  }, [deleteBookingData, removeBooking]);
  return { deleteBookingError, successDeletingBooking, loading };
};
export default useDeleteBooking;
