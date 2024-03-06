import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOKINGDATE } from "../../utils/mutations";
import { QUERY_ME, QUERY_BOOKINGDATES } from "../../utils/queries";
// import { setHours, setMinutes } from "date-fns";

const useAddBooking = (appInformation) => {
  const [bookingData, setBookingData] = useState("");
  const [errorAddingBooking, setErrorAddingBooking] = useState("");
  const [successAddingBooking, setSuccessAddingBooking] = useState("");
  const [loading, setLoading] = useState("");

  // Updating the cache with newly created appointment
  const [addBookingdate] = useMutation(ADD_BOOKINGDATE, {
    update(cache, { data: { addBookingdate } }) {
      try {
        const { bookingdates } = cache.readQuery({ query: QUERY_BOOKINGDATES });
        cache.writeQuery({
          query: QUERY_BOOKINGDATES,
          data: {
            bookingdates: [...bookingdates, addBookingdate],
          },
        });
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: { ...me, bookingdates: [...me.bookingdates, addBookingdate] },
          },
        });
      } catch (error) {
        setErrorAddingBooking(error.message);
      }
    },
  });

  const newAppointment = useCallback(async () => {
    if (!bookingData) {
      return;
    }
    setLoading(true);

    const username = bookingData.username;
    const startDate = bookingData.startDate;
    const digitalAppointment = bookingData.digitalAppointment;
    const appointmentString = bookingData.appointmentString;
    const reason = bookingData.reason;

    try {
      const { data } = await addBookingdate({
        variables: {
          username: username,
          startDate: startDate,
          digitalAppointment: digitalAppointment,
          appointmentString: appointmentString,
          reason: reason,
        },
      });
    } catch (err) {
      setErrorAddingBooking(err.message);
    } finally {
      setSuccessAddingBooking("success booking a date");
      setErrorAddingBooking("");
      // setLoading(false);
    }
  }, [bookingData, addBookingdate]);

  useEffect(() => {
    // console.log(appInformation);
    if (!appInformation) {
      setBookingData("");
      setErrorAddingBooking("");
      setSuccessAddingBooking("");
      // console.log("yes", appInformation);
      return;
    } else {
      setBookingData(appInformation);
      newAppointment();
      // console.log("no", appInformation);
    }
  }, [appInformation, newAppointment]);
  return { errorAddingBooking, successAddingBooking, loading };
};
export default useAddBooking;
