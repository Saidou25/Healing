import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_DATE } from "../../utils/mutations";
import { QUERY_DATES } from '../../utils/queries';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateList from '../DateList';

const Appointments = () => {

    const { data } = useQuery(QUERY_DATES);
    const dates = data?.dates || [];

    console.log(data.dates.toString());
    
    const [date, setDate] = useState(new Date());

    const [addDate, { loading, error }] = useMutation(ADD_DATE);


    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const onChange = async () => {

        setDate(date);

        console.log(date);

        try {
            await addDate({ variables: { date: date } });
            

            console.log(`success adding ${date}`);
            // const { data } = useQuery(QUERY_DATES);
            // const dates = data?.dates || [];

        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className='container'>
          <DatePicker
                    onChange={onChange}
                    value={date}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholder="last name..."
                />
                <DateList dates={dates} />
                </div>
         
    )
};

export default Appointments;

