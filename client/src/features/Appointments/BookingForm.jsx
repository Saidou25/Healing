import React from "react";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import practitioner from "../../assets/images/practitioner.jpeg";
import { setHours, setMinutes } from "date-fns";
import Footer from "../../components/Footer";

export default function BookingForm({
  mepet,
  petForm,
  showPetName,
  handleChange,
  handleSubmit,
  formatTime,
  setStartDate,
  allAppointments,
  startDate,
  reason,
  error,
}) {
  return (
    <>
      <div className="goback-appointment d-flex justify-content-center">
        <NavLink to="/Dashboard">
          <button type="btn" className="btn-goback-appointment text-white">
            go back
          </button>
        </NavLink>
      </div>
      <div className="container-appointment">
        <div className="img-appointment" src={practitioner} alt="care">
          <div className="card-appointment">
            <h4 className="card-header-appointment text-primary mt-5 mb-4">
              Book your appointment
            </h4>
            <div className="card-body-appointment">
              <form id="appointment-form">
                <div className="row">
                  <div className="col-12 appointment-column">
                    <label className="form-label">
                      Who is the appointment for?
                    </label>
                  </div>
                  <div></div>
                  <div className="col-12 visit">
                    <div>
                      <input
                        className="radio m-2 ms-4"
                        type="radio"
                        name="mepet"
                        value="me"
                        onChange={handleChange}
                        checked={mepet === "me"}
                      />
                      me
                      <input
                        className="radio m-2 ms-4"
                        type="radio"
                        name="mepet"
                        value="mypet"
                        onChange={handleChange}
                        checked={mepet === "mypet"}
                      />
                      my pet
                    </div>
                  </div>
                  {showPetName === "mypet" ? (
                    <div className="col-12 appointment-column">
                      <div>
                        <label className="form-label">
                          What is your pet name
                        </label>
                        <input
                          className="form-control type-your-text mt-2 mb-2"
                          name="petForm"
                          value={petForm}
                          placeholder="name..."
                          type="text"
                          onChange={handleChange}
                        ></input>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
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
                  <div className="col-12 d-flex justify-content-center">
                    <button
                      className="btn btn-submitapp text-white mt-2 mb-4 rounded-0"
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="text-container">
          <p className="text-app">
            sdfasdfadsfasdfasdfsdfas dfasldfasdfhlaksdh
            falksjhdflkajshdflkajhsdl fajkhsdfl kahs lkdjfhalksjhdf
            lakjshfdaksdjhf aks dflakjshdflakjshdfkajs
            dfkajhskdfhaadfasdfasdfasdfasfdasdfs ksjdhf
          </p>
          <p className="text-app">
            1sdfasdfadsfasdfasdfsdfas dfasldfasdfhlaksdh
            falksjhdflkajshdflkajhsdl fajkhsdfl kahs lkdjfhalksjhdf
            lakjshfdaksdjhf aks dflakjshdflakjshdfkajs dfkajhskdfha ksjdhf
          </p>
          <p className="text-app">
            2sdfasdfadsfasdfasdfsdfas dfasldfasdfhlaksdh
            falksjhdflkajshdflkajhsdl fajkhsdfl kahs lkdjfhalksjhdf
            lakjshfdaksdjhf aks dflakjshdflakjshdfkajs dfkajhskdfha ksjdhf
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
