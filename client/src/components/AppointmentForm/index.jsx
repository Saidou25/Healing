import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { ADD_BOOKINGDATE } from "../../utils/mutations";
import { QUERY_BOOKINGDATES, QUERY_ME } from '../../utils/queries';
import DatePicker from "react-datepicker";
import Navbar from '../Navbar';
import Footer from '../Footer'; 
import './index.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, setHours, setMinutes } from 'date-fns'


const AppointmentForm = (props) => {
    const navigate = useNavigate();
    const userProfile = props.userProfile;
    const myPet = props.myPet;

    const [startDate, setStartDate] = useState(new Date());
    const [mepet, setMePet] = useState('');
    const [reason, setReason] = useState('');


    const { data: meData } = useQuery(QUERY_ME);
    const me = meData?.me || [];
    const profile = me.profile;
    const username = me.username;

    const { data, loading } = useQuery(QUERY_BOOKINGDATES);

    const bookingdates = data?.bookingdates || [];

    const allAppointments = []

    for (let bookingdate of bookingdates) {

        const result = (bookingdate.finalDateISO).slice(0, 10);

        const resultIso = parseISO(result);

        allAppointments.push(resultIso)
    };

    const [addBookingdate] = useMutation(ADD_BOOKINGDATE, {
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
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, bookingdates: [...me.bookingdates, addBookingdate] } },
            });
        }
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'mepet') {
            setMePet(value);
        }
        if (name === 'reason') {
            setReason(value);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isBooked = JSON.stringify(startDate);

        const dateArr = isBooked.replaceAll('"', '').split(':');
        const finalDate = dateArr[0].slice(0, 10);

        const finalDateISO = parseISO(finalDate);

        const digitMonth = isBooked.slice(6, 8);

        allAppointments.push(finalDateISO)

        const app = (startDate.toString().split(' '));

        const appDay = app[0];
        const appMonth = app[1] - 1;
        const appDate = app[2];
        const appTime = app[4];
        const appYear = app[3];
        const digitalAppointment = `${digitMonth}/${appDate}/${appYear}`;

        if (mepet && reason) {
            try {
                await addBookingdate({ variables: { username: username, digitalAppointment: digitalAppointment, digitMonth: digitMonth, reason: reason, mepet: mepet, isBooked: isBooked, finalDateISO: finalDateISO, appDay: appDay, appMonth: appMonth, appDate: parseInt(appDate), appTime: appTime, appYear: parseInt(appYear) } });
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

        if (mepet === 'mypet' && userProfile && myPet.length) {
            navigate('/Dashboard');
            console.log('case 1');
        }
        if (mepet === 'mypet' && userProfile && !myPet.length) {
            navigate('/PetProfileForm');
            console.log('case 2');
        }
        if (mepet === 'mypet' && !userProfile) {
            navigate('/PetOwnerProfileForm');
            console.log('case 3');
        }
        if (mepet === 'me' && !userProfile) {
            navigate('/ProfileForm', { state: profile });
            console.log('case 4');
        }
        if (mepet === 'me' && userProfile) {
            navigate('/Dashboard', { state: profile });
            console.log('case 5');
        }
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
            <Navbar />
            <div className='container-appointment'>
                <h4 className="card-header bg-primary rounded-0 text-light p-4 mt-4 mb-5"
                    style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                    Book your appointment</h4>
                <div className="card-body">
                    <form id='appointment-form'>
                        <div className='row'>
                            <div className='col-6 appointment-column'>
                                <label className="form-label">
                                    Who is the appointment for?
                                </label>
                            </div>
                            <div >
                            </div>
                            <div className='col-6 visit'>
                                <div>
                                    <input
                                        className='radio m-2 ms-4'
                                        type="radio"
                                        name="mepet"
                                        value="me"
                                        checked={mepet === 'me'}
                                        onChange={handleChange} /> me

                                    <input
                                        className='radio m-2 ms-4'
                                        type="radio"
                                        name="mepet"
                                        value="mypet"
                                        checked={mepet === 'mypet'}
                                        onChange={handleChange} /> my pet
                                </div>
                            </div>
                            <div className='col-6 date-picker mb-2'>
                                <label className="form-label">
                                    Choose your appointment date
                                </label>
                                <div className='choose-date mt-5 mb-3'>
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
                            <div className='col-6 appointment-column'>
                                <div>
                                    <label className="form-label mb-4">What is your reason for visiting?</label>
                                    <textarea className="form-control type-your-text mt-4"
                                        name="reason"
                                        value={reason}
                                        placeholder='type your text here...'
                                        onChange={handleChange}>
                                    </textarea>
                                </div>
                            </div>
                            <div className="col-12" >
                                <button className="btn button-appointment btn-primary mt-5 rounded-0"
                                    type='submit'
                                    onClick={(e) => handleSubmit(e)}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default AppointmentForm;

