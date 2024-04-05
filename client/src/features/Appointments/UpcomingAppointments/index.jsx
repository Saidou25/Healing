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

  if (!futureAppointments?.length) {
    return <></>;
  }

  return (
    <div className="container-upcoming-appointment">
      <h4 className="reviews-title-say text-light">Upcoming appointment</h4>
      <div className="row all-upcoming-apppointments g-0">
        {futureAppointments &&
          futureAppointments.map((bookingdate) => (
            <div key={bookingdate._id} className="col-12 scheduled">
              <div className="card global-card text-light mb-3">
                <div className="card-header fs-3">
                  You have an appointment scheduled for:
                </div>
                <div className="card-body px-3">
                  <div className="text">{bookingdate.appointmentString}</div>
                  <div className="row g-0">
                    <p className="col-lg-8 col-sm-12 text pt-3">
                      Reason: <br />
                      {bookingdate.reason}
                    </p>
                    <div className="col-lg-4 col-sm-12 d-flex align-items-center justify-content-center">
                      <div className="row" style={{ width: "100%" }}>
                        {confirmCancel && bookingdate._id === buttonId ? (
                          <>
                            <div className="col-lg-6 col-sm-12 row-media-row">
                              <Button
                                className="btn border up-app-btns rounded bg-danger d-flex align-items-center"
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
                            <div className="col-lg-6 col-sm-12 row-media-row">
                              <Button
                                className="btn border up-app-btns rounded bg-primary d-flex align-items-center mb-2"
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
                            <div className="col-lg-12 col-sm-12 d-flex justify-content-end align-items-center">
                              <Button
                                className="btn border up-app-btns rounded bg-primary d-flex align-items-center mb-2"
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
