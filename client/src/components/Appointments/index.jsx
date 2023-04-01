import React, { useState } from 'react';
import './index.css';

import DayTimePicker from '@mooncake-dev/react-day-time-picker';


const Appointments = () => {

    const [isScheduling, setIsScheduling] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduleErr, setScheduleErr] = useState('');


    const handleScheduled = (dateTime, date) => {
        setIsScheduling(true);
        setScheduleErr('');
        console.log('scheduled: ', dateTime);

        fakeRequest(date)
            .then(json => {
                setScheduleErr('');
                setIsScheduled(true);
                console.log('fake response: ', json);
            })
            .catch(err => {
                setScheduleErr(err);
            })
            .finally(() => {
                setIsScheduling(false);
            });
    };

    function fakeRequest(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Uncomment below to trigger error:
                // return reject('Error: KABOOM!');
                resolve({
                    status: 'ok',
                    scheduled: data
                });
            }, 2e3);
        });
    };

    function timeSlotValidator(slotTime) {
        const eveningTime = new Date(
            slotTime.getFullYear(),
            slotTime.getMonth(),
            slotTime.getDate(),
            18,
            0,
            0
        );
        const isValid = slotTime.getTime() > eveningTime.getTime();
        return isValid;
    }


    return (
        <div className='container'>
            <h3>Pick a Day and Time</h3>
            <DayTimePicker
                timeSlotSizeMinutes={15}
                onConfirm={handleScheduled}
                isLoading={isScheduling}
                isDone={isScheduled}
                err={scheduleErr}
                timeSlotValidator={timeSlotValidator} />

        </div>
    );
}


export default Appointments;