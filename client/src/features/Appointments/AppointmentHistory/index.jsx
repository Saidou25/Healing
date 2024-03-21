import React, { useState } from "react";
// import Spinner from "../../components/Spinner";
// import { useUser } from "../../../context/userContext";
import useDeleteBooking from "../useDeleteBooking";
import trash from "../../../assets/images/trash.png";
import ButtonSpinner from "../../../components/ButtonSpinner";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../../utils/queries";
import "./index.css";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const AppointmentHistory = () => {
  const [deleteBookingData, setDeleteBookingData] = useState("");

  const date = new Date();
  const todaysDate = date.getDate();
  const todaysYear = date.getFullYear();
  const todaysMonth = date.getMonth() + 1;
  const todaysMonthStr = todaysMonth.toString();
  const todaysDateStr = todaysDate.toString();

  const { loading } = useDeleteBooking(deleteBookingData);

  const { data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || [];
  const myAppointments = me.bookingdates;

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

  const history = myAppointments?.filter(
    (bookingdate) => today >= bookingdate.digitalAppointment
  );

  return (
    <div>
      {!history?.length ? (
        <div className="container-history mt-5 mb-5">
          <div className="card no-history review-list text-light">
            <NavLink to="/Dashboard" className="text-white fs-3 px-3 pt-3"
            style={{ display: "flex", justifyContent: "flex-end" }}>
              <AiOutlineClose />
            </NavLink>
            <p className="card-header history-header fs-3">
              No appointment yet
            </p>
            <div className="card-body history-text text-light">
              <p>Your appointments will show on here soon.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-history text-light py-5">
          <div className="row review-border">
            <div className="col-4 d-flex test">
              <h3 className="review-list-title my-5">Appointment history</h3>
            </div>
            <div className="col-4 text-light d-flex justify-content-end">
              <NavLink to="/Dashboard" className="text-white my-5 fs-3">
                <AiOutlineClose />
              </NavLink>
            </div>
          </div>
          <div className="row all-history">
            {history &&
              history.map((bookingdate) => (
                <div key={bookingdate._id} className="col-8 history-column">
                  <div className="card history mb-4 text-light">
                    <div className="card-header fs-3">
                      Previous appointment:
                    </div>
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-8 d-flex align-items-center">
                          <div className="appointment-text">
                            <div className="text">
                              {bookingdate.appointmentString}
                            </div>
                          </div>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn delete-appointment rounded-0"
                            onClick={() => setDeleteBookingData(bookingdate)}
                          >
                            {loading &&
                            bookingdate._id === deleteBookingData._id ? (
                              <>
                                <ButtonSpinner />
                              </>
                            ) : (
                              <img
                                className="trash-can"
                                src={trash}
                                alt="trash-can"
                                height={50}
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
