import React, { useState } from "react";
// import Spinner from "../../components/Spinner";
// import { useUser } from "../../../context/userContext";
import useDeleteBooking from "../useDeleteBooking";
import trash from "../../../assets/images/trash.png";
import ButtonSpinner from "../../../components/ButtonSpinner";
import "./index.css";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../../utils/queries";

const AppointmentHistory = () => {
  const [deleteBookingData, setDeleteBookingData] = useState("");

  const date = new Date();
  const todaysDate = date.getDate();
  const todaysYear = date.getFullYear();
  const todaysMonth = date.getMonth() + 1;
  const todaysMonthStr = todaysMonth.toString();
  const todaysDateStr = todaysDate.toString();

  const { loading } = useDeleteBooking(deleteBookingData);

  const { data: meData } = useQuery( QUERY_ME);
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
        <div className="containerno-history mt-5 mb-5">
          <div className="card no-history">
            <p className="card-header history-header fs-3 my-3">
              No appointment yet
            </p>
            <div className="card-body history-text">
              <p>Your appointments will show on here soon.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-history">
          <h3 className="appointment-list-title mt-5 mb-5">
            Appointment history
          </h3>
          <div className="row all-history">
            {history &&
              history.map((bookingdate) => (
                <div key={bookingdate._id} className="col-8 history-column">
                  <div className="card history mb-4">
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
                            {loading && bookingdate._id === deleteBookingData._id ? (
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
