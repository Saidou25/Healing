import React, { useState } from "react";
import Button from "../../../components/Button";
import ButtonSpinner from "../../../components/ButtonSpinner";
import useDeleteBooking from "../useDeleteBooking";

import "./index.css";

const UpcomingAppointments = ({ futureAppointments }) => {
  const [deleteBookingData, setDeleteBookingData] = useState("");
  const [confirmCancel, setConfimrCancel] = useState(false);
  const [buttonId, setButtonId] = useState("");

  const { loading } = useDeleteBooking(deleteBookingData);

  const handleCancel = (bookingdate) => {
    if (!bookingdate) {
      return;
    } else {
      setButtonId(bookingdate._id);
      // setDeleteBookingData(bookingdate)
      setConfimrCancel(true);
    }
  };
  // if (deleteBookingError) {
  //   console.log("deleteBookingError", deleteBookingError);
  //   // return <p>Error deleting booking: {deleteBookingError}</p>;
  // }

  // Check for success
  // if (successDeletingBooking) {
  //   console.log("successDeletingBooking", successDeletingBooking);
  //   // return <p>{successDeletingBooking}</p>;
  // }

  // Check for loading state
  // if (loading) {
  //   // console.log("loading", loading);
  //   // return <p>Deleting booking...</p>;
  // };

  // If none of the above conditions are met, the deletion process is ongoing
  // return <p>Deleting booking...</p>;

  if (!futureAppointments?.length) {
    return <></>;
  }

  return (
    <div className="container-upcoming-appointment mt-5">
      <h3 className="upcoming-title">Upcoming appointment</h3>
      <div className="row all-upcoming-apppointments g-0">
        {futureAppointments &&
          futureAppointments.map((bookingdate) => (
            <div key={bookingdate._id} className="col-12 mt-5">
              <div className="card app-card mb-3">
                <div className="card-header fs-3">
                  You have an appointment scheduled for:
                </div>
                <div className="card-body m-3">
                  <div className="text">{bookingdate.appointmentString}</div>
                  <div className="row g-0">
                    <p className="col-8 text pt-3">
                      Reason: <br />
                      {bookingdate.reason}
                    </p>
                    <div className="col-4">
                      <div className="row g-0">
                        {confirmCancel && bookingdate._id === buttonId ? (
                          <>
                            <div className="col-6 d-flex justify-content-center">
                              <Button
                                className="btn border rounded bg-danger d-flex align-items-center text-light"
                                type="button"
                                style={{ maxHeight: "40px" }}
                                onClick={() =>
                                  setDeleteBookingData(bookingdate)
                                }
                                disabled={loading}
                              >
                                {loading &&
                                bookingdate._id === deleteBookingData._id ? (
                                  <ButtonSpinner />
                                ) : (
                                  <>confirm</>
                                )}
                              </Button>
                            </div>
                            <div className="col-6">
                              <Button
                                className="btn border rounded bg-primary text-light m-0 d-flex align-items-center"
                                type="button"
                                style={{ maxHeight: "40px" }}
                                onClick={() => {
                                  handleCancel(bookingdate);
                                  setButtonId(bookingdate._id);
                                  setConfimrCancel(false);
                                }}
                              >
                                cancel
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-6"></div>
                            <div className="col-6 d-flex">
                              <Button
                                className="btn border rounded bg-primary text-light m-0 d-flex align-items-center"
                                type="button"
                                style={{ maxHeight: "40px" }}
                                onClick={() => {
                                  handleCancel(bookingdate);
                                  setButtonId(bookingdate._id);
                                }}
                              >
                                cancel
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default UpcomingAppointments;
