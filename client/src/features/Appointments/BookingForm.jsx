import React from "react";
import { Outlet } from "react-router-dom";
import { setHours, setMinutes } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "react-multi-date-picker/styles/backgrounds/bg-brown.css";
import "./BookingForm.css";
import ErrorComponent from "../../components/ErrorComponent";

export default function BookingForm({
  handleChange,
  handleSubmit,
  showNavNav,
  formatTime,
  setStartDate,
  allAppointments,
  startDate,
  reason,
  error,
  me,
}) {
  return (
    <div className="container-fluid">
      <div
        className="card global-card p-5"
        style={{ width: "40%", marginRight: "auto", marginLeft: "auto" }}
      >
        <div className="bg-black">
          <h4
            className="log-form bg-black rounded-0 text-light my-3 py-3"
            style={{ fontStyle: "normal", textAlign: "center", width: "100%" }}
          >
            Book your appointment
          </h4>
        </div>
        <div className="card-body">
          {showNavNav ? (
            <form className="global-form">
              {/* <div className="row"> */}
              <div className="col-12 date-picker">
                <label className="log-form">Choose your appointment date</label>
                <div className="choose-date mt-3 mb-2">
                  <DatePicker
                    // className="bg-brown"
                    id="user_date"
                    timeIntervals={15}
                    // set to today for past appointment demo purpose. Will be set to new Date + 1 in future.
                    minDate={new Date()}
                    excludeDates={allAppointments}
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      formatTime(date);
                    }}
                    showTimeSelect
                    minTime={setHours(setMinutes(new Date(), 0), 9)}
                    maxTime={setHours(setMinutes(new Date(), 0), 19)}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    withPortal
                  />
                </div>
                <div className="col-12 appointment-column">
                  <div>
                    <label className="log-form">
                      What is your reason for visiting?
                    </label>
                    <textarea
                      className="log-form input-input"
                      name="reason"
                      value={reason}
                      type="text"
                      placeholder="type your text here..."
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <br />
                {error && <ErrorComponent message={error} />}
                <br />
                {/* {errorHook && <ErrorComponent message={errorHook} />} */}
                <div className="centering">
                  <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    className="btn app-btn bg-black mt-2 mb-4 rounded-0 m-0"
                    style={{ width: "50%" }}
                  >
                    submit
                  </button>
                </div>
              </div>
              {/* </div> */}
            </form>
          ) : (
            <>
              <Outlet />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
