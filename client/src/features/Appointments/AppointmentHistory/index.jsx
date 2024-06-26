import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../../utils/queries";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
// import Spinner from "../../components/Spinner";
// import { useUser } from "../../../context/userContext";
import useDeleteBooking from "../useDeleteBooking";
import trash from "../../../assets/images/trash.png";
import ButtonSpinner from "../../../components/ButtonSpinner";
import "./index.css";

const AppointmentHistory = () => {
  const navigate = useNavigate();

  const [deleteBookingData, setDeleteBookingData] = useState("");

  const date = new Date();
  const todaysDate = date.getDate();
  const todaysYear = date.getFullYear();
  const todaysMonth = date.getMonth() + 1;
  const todaysMonthStr = todaysMonth.toString();
  const todaysDateStr = todaysDate.toString();

  const { loading, successDeletingBooking } =
    useDeleteBooking(deleteBookingData);

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

  useEffect(() => {
    if (successDeletingBooking && !history?.length) {
      setDeleteBookingData("");
      navigate("/Dashboard");
    }
  }, [history, successDeletingBooking, navigate]);

  return (
    <div>
      {!history?.length ? (
        <div className="container-history my-5">
          <div className="card global-card no-review-history">
            <NavLink
              to="/Dashboard"
              className="text-white fs-3 px-3 pt-3"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <AiOutlineClose />
            </NavLink>
            <p className="card-header history-header fs-3">
              No appointment yet
            </p>
            <div
              className="card-body text-light"
              style={{ textAlign: "center" }}
            >
              <p>Your appointments will show on here soon.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-review text-light py-5">
          <div className="media-title review-border">
            <h3 className="review-list-title text-light my-5">
              Past appointments
            </h3>
            <NavLink to="/Dashboard" className="text-white my-5 fs-3 g-0"
             style={{ display: "flex", alignItems: "center" }}>
              <AiOutlineClose />
            </NavLink>
          </div>
          <div className="row all-history">
            {history &&
              history.map((bookingdate) => (
                <div key={bookingdate._id} className="col-lg-8 col-sm-12">
                  <div className="card global-card card-media mb-4">
                    <div className="card-header fs-3">
                      Previous appointment:
                    </div>
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-8"
                        style={{ display: "flex", alignItems: "center" }}>
                          <div className="appointment-text">
                            <div className="text">
                              {bookingdate.appointmentString}
                            </div>
                          </div>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                          <button
                            type="button"
                            disabled={loading}
                            className="btn rounded-0 py-0"
                            onClick={() => setDeleteBookingData(bookingdate)}
                          >
                            {loading &&
                            bookingdate._id === deleteBookingData._id ? (
                              <>
                                <ButtonSpinner height={30}/>
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
