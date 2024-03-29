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
    <div className="container-upcoming-appointment mt-5 py-5">
      <h3 className="upcoming-title text-light">Upcoming appointment</h3>
      <div className="row all-upcoming-apppointments g-0">
        {futureAppointments &&
          futureAppointments.map((bookingdate) => (
            <div key={bookingdate._id} className="col-12 mt-5">
              <div className="card app-card text-light mb-3">
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
                    <div className="col-4 d-flex justify-content-end align-items-center">
                      <div className="row">
                        {confirmCancel && bookingdate._id === buttonId ? (
                          <>
                            <div className="col-lg-6 col-sm-12 up-media-col">
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
                            <div className="col-lg-6 col-sm-12 up-media-col">
                              <Button
                                className="btn border up-app-btns rounded bg-primary d-flex align-items-center"
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
                            <div className="col-lg-12 col-sm-12 up-media-col d-flex justify-content-end">
                              <Button
                                className="btn border up-app-btns rounded bg-primary d-flex align-items-center"
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
