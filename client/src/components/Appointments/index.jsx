import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { ADD_DATE } from "../../utils/mutations";
import { QUERY_DATES } from '../../utils/queries';
import DateList from '../DateList';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

const Appointments = () => {

    const [startDate, setStartDate] = useState(new Date());

    const [addDate] = useMutation(ADD_DATE);
    const { data } = useQuery(QUERY_DATES);
    const dates = data?.dates || [];

    const bookAppointment = async () => {
        try {
            await addDate({ variables: { startDate: startDate } });
            console.log(`success adding appointment ${startDate}`);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = () => {
        console.log('dates', dates);
        console.log('startDate', startDate);

        for (let i = 0; i < dates.length; i++) {

            const booked = (dates[i].startDate.split('').slice(8, 10).join(''));
            console.log(booked);
            const toBook = JSON.stringify(startDate).split('').slice(9, 11).join('');
            console.log(toBook);

            if (toBook === booked) {
                console.log('busy at this time');
                return;
            };
        };
        console.log('I have time');
        bookAppointment();
    };
    // if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;
    return (
        <div className='container'>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                placeholderText="Select a weekday"
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
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

export default Appointments;

