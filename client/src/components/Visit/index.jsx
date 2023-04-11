import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { ADD_BOOKINGDATE } from "../../utils/mutations";
import { QUERY_BOOKINGDATE } from '../../utils/queries';
import DateList from '../DateList';
import DatePicker from "react-datepicker";
import './index.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import "react-datepicker/dist/react-datepicker.css";
import { parseISO, setHours, setMinutes } from 'date-fns';


const Visit = () => {

    const navigate = useNavigate();

    const [startDate,  setStartDate] = useState(new Date());

    const [addBookingdate] = useMutation(ADD_BOOKINGDATE);
    const { data } = useQuery(QUERY_BOOKINGDATE);

    const dates = data?.dates || [];
    const allAppointments = [];

    for (let i = 0; i < dates.length; i++) {

        const result = ((dates[i].startDate).split('').slice(0, 10).join(''));
        const resultIso = parseISO(result.toString());
        allAppointments.push(resultIso);
    };

    const handleSubmit = async () => {
        try {
            await addBookingdate({ variables: { startDate: startDate } });
            console.log(`success adding appointment ${startDate}`);
            navigate('/AppointmentForm', {state: startDate});
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
            // footer={footer}
            />
            <div>
                <button type='submit' onClick={() => handleSubmit()}>
                    Submit
                </button>
            </div>
            <DateList dates={dates} />
        </div>
    )
};

export default Visit;

