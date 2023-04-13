import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { ADD_BOOKINGDATE } from "../../utils/mutations";
import { QUERY_BOOKINGDATES } from '../../utils/queries';
import DateList from '../DateList';
import DatePicker from "react-datepicker";
import './index.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, setHours, setMinutes } from 'date-fns';


const Visit = () => {

    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());

    const [addBookingdate] = useMutation(ADD_BOOKINGDATE);
    const { data } = useQuery(QUERY_BOOKINGDATES);

    const bookingdates = data?.bookingdates || [];
    console.log('bookingdates', bookingdates);

    const allAppointments = []
    console.log('allAppointments', allAppointments);

    for (let bookingdate of bookingdates) {

        const result = (bookingdate.finalDateISO).slice(0, 10);

        const resultIso = parseISO(result);

        allAppointments.push(resultIso)
    }

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

        const navigateData = {
            isBooked: isBooked,
            finalDateISO: finalDateISO,
            appDay: appDay,
            appMonth: appMonth,
            appDate: parseInt(appDate),
            appTime: appTime,
            appYear: parseInt(appYear)
        }
        try {
            await addBookingdate({ variables: { isBooked: isBooked, finalDateISO: finalDateISO, appDay: appDay, appMonth: appMonth, appDate: parseInt(appDate), appTime: appTime, appYear: parseInt(appYear) } });
            console.log(`success adding appointment ${isBooked}`);
       
            navigate('/VisitorAppointment', { state: navigateData });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='container'>
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
            <DateList bookingdates={bookingdates} />
        </div>
    )
};

export default Visit;

