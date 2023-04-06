import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { ADD_DATE } from "../../utils/mutations";
import { QUERY_DATES } from '../../utils/queries';
import DateList from '../DateList';
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import './index.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css'


import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from 'date-fns';


const Appointments = () => {

    const [startDate, setStartDate] = useState(new Date());



    const [addDate] = useMutation(ADD_DATE);
    const { data } = useQuery(QUERY_DATES);
    const dates = data?.dates || [];


    const disableCustomDt = (bookedDays, toBook) => {
        console.log(bookedDays);
        console.log(toBook);

        return bookedDays.includes(toBook) ? console.log('date is not available') : console.log(`appointment bookedDays for ${toBook}`);

    };

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

            const bookedDays = (dates[i].startDate).split('').slice(0, 10).join('');
            // console.log(bookedDays);
            const toBook = JSON.stringify(startDate).split('').slice(1, 11).join('');
            console.log(toBook);

            disableCustomDt(bookedDays, toBook);
            // if (toBook === bookedDays) {
            //     console.log('busy at this time');
            //     return;
            // };
        };
        // console.log('I have time');
        // bookAppointment();
    };
    // if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;

    return (
        <div className='container'>
            <DatePicker

                numberOfMonths={2} pagedNavigation
                // selected={startDate}
                placeholderText="Click to select a date"
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                isValidate={disableCustomDt}
                excludeDates={[new Date(), subDays(parseISO('2023-04-19'), 1)]}
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

export default Appointments;

