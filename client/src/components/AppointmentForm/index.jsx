import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { ADD_BOOKINGDATE } from "../../utils/mutations";
import { QUERY_BOOKINGDATES, QUERY_ME } from '../../utils/queries';
import DatePicker from "react-datepicker";
import './index.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, setHours, setMinutes } from 'date-fns'


const AppointmentForm = (props) => {
    const username = props.username;

    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());
    const [mepet, setMePet] = useState('');
    const [reason, setReason] = useState('');

    const { data: meData } = useQuery(QUERY_ME);
    const me = meData?.me || [];
    const profile = me.profile;

    const { data, loading } = useQuery(QUERY_BOOKINGDATES);

    const bookingdates = data?.bookingdates || [];

    const allAppointments = []

    for (let bookingdate of bookingdates) {

        const result = (bookingdate.finalDateISO).slice(0, 10);

        const resultIso = parseISO(result);

        allAppointments.push(resultIso)
    };

    const [addBookingdate, { error }] = useMutation(ADD_BOOKINGDATE, {
        update(cache, { data: { addBookingdate } }) {
            try {
                const { bookingdates } = cache.readQuery({ query: QUERY_BOOKINGDATES });

                cache.writeQuery({
                    query: QUERY_BOOKINGDATES,
                    data: { bookingdates: [addBookingdate, ...bookingdates] },
                });
            } catch (e) {
                console.error(e);
            }
        }
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        const x = document.querySelector(".validate");
        const y = document.querySelector(".invalidate");
        const x1 = document.querySelector(".validate1");
        const y1 = document.querySelector(".invalidate1");

        if (name === 'mepet') {
            setMePet(value);

            if (value === 'mypet') {
                x.style.display = "block";
                y.style.display = "none";
            } else if (value === 'me') {
                x.style.display = "block";
                y.style.display = "none";
            } else {
                x.style.display = "none";
                y.style.display = "block";
            }
        }
        if (name === 'reason') {
            setReason(value);
            if (value.lenght > 10) {
                x1.style.display = "block";
                y1.style.display = "none";
            } else {
                x1.style.display = "block";
                y1.style.display = "none";
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isBooked = JSON.stringify(startDate);

        const dateArr = isBooked.replaceAll('"', '').split(':');
        const finalDate = dateArr[0].slice(0, 10);

        const finalDateISO = parseISO(finalDate)

        allAppointments.push(finalDateISO)

        const app = (startDate.toString().split(' '));

        const appDay = app[0];
        const appMonth = app[1];
        const appDate = app[2];
        const appTime = app[4];
        const appYear = app[3];

        const navigateVisitData = {
            // email: email,
            profile: profile,
            reason: reason,
            mepet: mepet,
            isBooked: isBooked,
            finalDateISO: finalDateISO,
            appDay: appDay,
            appMonth: appMonth,
            appDate: parseInt(appDate),
            appTime: appTime,
            appYear: parseInt(appYear)
        }
        if (mepet && reason) {
            try {
                await addBookingdate({ variables: { username: username, reason: reason, mepet: mepet, isBooked: isBooked, finalDateISO: finalDateISO, appDay: appDay, appMonth: appMonth, appDate: parseInt(appDate), appTime: appTime, appYear: parseInt(appYear) } });
                console.log(`success booking a date ${isBooked}`);

            } catch (err) {
                console.error(err);
            }
            setMePet('');
            setStartDate('');
            setReason('');
        } else {
            console.log('you need to fill up the form correctly');
        }
        mepet === 'me' ?
            navigate('/ProfileForm', { state: navigateVisitData }) :
            navigate('/PetOwnerProfileForm', { state: navigateVisitData });
        // document.getElementById("appointment-form").reset();
    };

    if (loading) {
        return (
          <main>
            <h2>Loading . . . . . . </h2>
          </main>
        )
      }
    return (
        <>
            <div className='container-visit'>
                <div className='row app-window'>
        
                    <div className='card-visit'>
                        
                        <form id='appointment-form'>
                            <div className='row-visit align-items-center p-5'>
                                <div className='col-6 appointment-for'>
                                    <label className="form-label">
                                        Who is the appointment for?
                                    </label>
                                </div>
                                <div className='col-6 visit'>
                                    <div>
                                        <input
                                            type="radio"
                                            name="mepet"
                                            value="me"
                                            checked={mepet === 'me'}
                                            onChange={handleChange} /> me

                                        <input
                                            type="radio"
                                            name="mepet"
                                            value="mypet"
                                            checked={mepet === 'mypet'}
                                            onChange={handleChange} /> my pet
                                    </div>

                                    <div className='validate'>
                                        Looks good
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <div className='invalidate'>
                                        required
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                </div>

                                <div className='col-6 date-picker'>
                                    <label className="form-label">
                                        Choose your appointment date
                                    </label>
                                    <div className='choose-date'>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            timeCaption="time"
                                            minTime={setHours(setMinutes(new Date(), 0), 9)}
                                            maxTime={setHours(setMinutes(new Date(), 0), 19)}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            minDate={new Date()}
                                            excludeDates={allAppointments}
                                        // footer={footer};
                                        />
                                    </div>
                                </div>
                                <div className='col-6-reason'>
                                    <div>
                                        <label className="form-label-reason">What is your reason for visitint?</label>
                                        <textarea className="form-control-reason"
                                            name="reason"
                                            value={reason}
                                            placeholder='type your text here...'
                                            onChange={handleChange}>
                                        </textarea>
                                        <div className='validate1'>
                                            Looks good
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <div className='invalidate1'>
                                            required
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 button-visit'>
                                    <button type='submit' onClick={(e) => handleSubmit(e)}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AppointmentForm;

