import React from "react";
import { Outlet } from "react-router-dom";
import { setHours, setMinutes } from "date-fns";
import DatePicker from "react-datepicker";
import ErrorComponent from "../../components/ErrorComponent";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingForm.css";

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
      <div className="card booking-card global-card my-5">
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
              <div className="col-12 date-picker py-4">
                <label htmlFor="user_date" className="log-form">
                  Choose your appointment date
                </label>
                <div className="choose-date py-4">
                  <DatePicker
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
                    popperModifiers={{
                      preventOverflow: {
                        enabled: true,
                      },
                    }}
                    withPortal
                  />
                </div>
                <div className="col-12 appointment-column py-4">
                  <div>
                    <label htmlFor="reason" className="log-form py-4">
                      What is your reason for visiting?
                    </label>
                    <textarea
                      id="reason"
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
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="btn app-btn bg-black rounded-0"
                  style={{ width: "50%" }}
                >
                  submit
                </button>
              </div>
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
