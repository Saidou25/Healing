import React from "react";
import { Outlet } from "react-router-dom";
import { setHours, setMinutes } from "date-fns";
import DatePicker from "react-datepicker";

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
      <div className="card-appointment">
        <h4 className="card-header-appointment text-primary mt-5 mb-4">
          Book your appointment
        </h4>
        <div className="card-body-appointment">
          {showNavNav ? (
            <form id="appointment-form">
              <div className="row">
                <div className="col-12 date-picker">
                  <label className="form-label">
                    Choose your appointment date
                  </label>
                  <div className="choose-date mt-3 mb-2">
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
                      withPortal
                      // footer={footer};
                    />
                  </div>
                </div>
                <div className="col-12 appointment-column">
                  <div>
                    <label className="form-label mb-3">
                      What is your reason for visiting?
                    </label>
                    <textarea
                      className="form-control type-your-text mt-4 mb-5"
                      name="reason"
                      value={reason}
                      type="text"
                      placeholder="type your text here..."
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div>
                  <div className="app-error">
                    {error && (
                      <div className="bg-warning text-white mb-4">
                        <p className="appoitment-error m-2">{error}</p>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="nav-item  btn-submitapp text-white mt-2 mb-4 rounded-0 m-0"
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
