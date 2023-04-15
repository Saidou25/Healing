import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { ADD_BOOKINGDATE } from "../../utils/mutations";
import { QUERY_BOOKINGDATES } from '../../utils/queries';
// import DateList from '../DateList';
import DatePicker from "react-datepicker";
import './index.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, setHours, setMinutes } from 'date-fns';


const Visit = () => {

    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());
    const [mepet, setMePet] = useState('');

    const [addBookingdate] = useMutation(ADD_BOOKINGDATE);
    const { data } = useQuery(QUERY_BOOKINGDATES);

    const bookingdates = data?.bookingdates || [];

    const allAppointments = []

    for (let bookingdate of bookingdates) {

        const result = (bookingdate.finalDateISO).slice(0, 10);

        const resultIso = parseISO(result);

        allAppointments.push(resultIso)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const x9 = document.querySelector(".validate9");
        const y9 = document.querySelector(".invalidate9");

        if (name === 'mepet') {
            setMePet(value);
           
            if (value === 'mypet') {
                x9.style.display = "block";
                y9.style.display = "none";
         
            } else if (value === 'me') {
                x9.style.display = "block";
                y9.style.display = "none";
             
            } else {
                x9.style.display = "none";
                y9.style.display = "block";
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
            mepet: mepet,
            isBooked: isBooked,
            finalDateISO: finalDateISO,
            appDay: appDay,
            appMonth: appMonth,
            appDate: parseInt(appDate),
            appTime: appTime,
            appYear: parseInt(appYear)
        }
        try {
            await addBookingdate({ variables: { mepet: mepet, isBooked: isBooked, finalDateISO: finalDateISO, appDay: appDay, appMonth: appMonth, appDate: parseInt(appDate), appTime: appTime, appYear: parseInt(appYear) } });
            console.log(`success adding appointment ${isBooked}`);

        } catch (err) {
            console.error(err);
        }
        // setMePet('');
        // setStartDate('');
        
        mepet === 'me' 
        ? navigate('/VisitorAppointment', { state: navigateVisitData })
        : navigate('/PetAppointment', { state: navigateVisitData });

    };

    return (

        <div className='container'>
            <div className='row'>
                <form>
                    <div className='col-6'>
                        <div>
                            <label className="form-label appointment-for">Who is the appointment for?</label><br />
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
                        <div className='validate9'>
                            Looks good
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className='invalidate9'>
                            required
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>

                    <div className='col-6'>
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
                        <div>
                            <button type='submit' onClick={(e) => handleSubmit(e)}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Visit;

