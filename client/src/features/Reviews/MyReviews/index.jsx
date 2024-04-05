import React from "react";
import MyReviewsList from "../MyReviewsList";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../../utils/queries";
// import { useUser } from "../../context.js/userContext";

const MyReviews = () => {
  const date = new Date();
  const todaysDate = date.getDate();
  const todaysYear = date.getFullYear();
  const todaysMonth = date.getMonth() + 1;
  const todaysMonthStr = todaysMonth.toString();
  const todaysDateStr = todaysDate.toString();

  // const [bookingdateId, setBookingdateId] = useState("");

  const { data: meData, meLoading, error } = useQuery(QUERY_ME);
  const me = meData?.me || [];
  // const { me } = useUser();
  const username = me.username;
  const myReviews = me.reviews;
  // const myAppointments = me.bookingdates;

  let newDay;
  let newMonth;

  if (todaysMonthStr.length === 1) {
    newMonth = `0${todaysMonth}`;
  } else {
    newMonth = todaysMonth;
  }
  if (todaysDateStr.length === 1) {
    newDay = `0${todaysDate}`;
  } else {
    newDay = todaysDate;
  }
  const today = `${newMonth}/${newDay}/${todaysYear}`;

  const myAppointments = me.bookingdates;
  const history = myAppointments?.filter(
    (bookingdate) => today >= bookingdate.digitalAppointment
  );

  return (
    <MyReviewsList
      history={history}
      myReviews={myReviews}
      username={username}
    />
  );
};
export default MyReviews;
