import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { ADD_BOOKINGDATE } from "../../utils/mutations";
import { QUERY_BOOKINGDATES, QUERY_ME } from '../../utils/queries';
import { sendEmail } from '../../utils/email.js';
import { parseISO, setHours, setMinutes } from 'date-fns';
import Spinner from '../../components/Spinner';
import DatePicker from "react-datepicker";
import Navbar from '../Navbar';
import Footer from '../Footer';
import './index.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";

const AppointmentForm = (props) => {
    const navigate = useNavigate();
    const myPet = props.myPet;
    const [startDate, setStartDate] = useState(new Date());
    const [mepet, setMePet] = useState('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const [confirm, setConfirm] = useState(false);

    const { data: meData } = useQuery(QUERY_ME);
    const me = meData?.me || [];
    const profile = me.profile;
    const username = me.username;
    // const myPet = profile?.pets;

    const { data, loading } = useQuery(QUERY_BOOKINGDATES);

    // collecting all appointments that we push into allAppointments[] to block unvailable dates in calendar.
    const bookingdates = data?.bookingdates || [];
    const allAppointments = []

    for (let bookingdate of bookingdates) {
        const result = (bookingdate.finalDateISO).slice(0, 10);
        const resultIso = parseISO(result);
        allAppointments.push(resultIso)
    };
    // Updating the cache with newly created appointment
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

        // building up digitalAppointment needed to display appointments date in components
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

        // building templateParams for emailing appointment confirmation
        const sy = 'saidou.monta@yahoo.com';
        const templateParams = {
            digitalAppointment: digitalAppointment,
            username: username,
            myemail: sy,
            appTime: appTime,
            profile: profile
        };
        if (!mepet || !reason || !startDate) {
            setError('All fields need filled!');
            return;
        };
        // adding a bookingdate to database
        try {
            const { data } = await addBookingdate({
                variables: {
                    username: username,
                    digitalAppointment: digitalAppointment,
                    digitMonth: digitMonth,
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
            });

            setConfirm(true);
            console.log(`success booking a date ${isBooked}`);

        } catch (err) {
            console.error(err);
        };

        // redirects user to the next step in appointment process based on condilions
        if (mepet === 'mypet' && profile && myPet.length) {
            sendEmail(templateParams);
            setTimeout(() => {
                navigate('/Dashboard');
            }, 3000);
            console.log('case 1');
        }
        if (mepet === 'mypet' && profile && !myPet.length) {
            navigate('/PetProfileForm', { state: { templateParams } });
            console.log('case 2');
        }
        if (mepet === 'mypet' && !profile) {
            navigate('/PetOwnerProfileForm', { state: { templateParams } });
            console.log(profile);
            console.log('case 3');
        }
        if (mepet === 'me' && !profile) {
            navigate('/ProfileForm', { state: { templateParams } });
            console.log('case 4');
        }
        if (mepet === 'me' && profile) {
            sendEmail(templateParams);
            setTimeout(() => {
                navigate('/Dashboard', { state: { profile } })
            }, 1500);
            console.log('case 5');
        };
        setMePet('');
        setStartDate('');
        setReason('');
    };

    if (loading) return <Spinner />

    if (confirm === true) {
        return (
            <main className='row container-success'>
                <div className="col-12 d-flex appointment-success mb-2">
                    <i className="fa-solid fa-check d-flex">
                    </i>
                </div>
                <h2 className='col-12 signup-success d-flex justify-content-center'>
                    Success!
                </h2>
                <p className='col-12 signup-success d-flex justify-content-center'>
                    Your appointment is booked...
                </p>
            </main>
        )
    }

    return (
        <>
            <Navbar />
            <div className='container-appointment'>
                <h4 className="card-header bg-primary rounded-0 text-light p-4 mt-4 mb-5">
                    Book your appointment</h4>
                <div className="card-body">
                    <form id='appointment-form'>
                        <div className='row'>
                            <div className='col-12 appointment-column'>
                                <label className="form-label">
                                    Who is the appointment for?
                                </label>
                            </div>
                            <div >
                            </div>
                            <div className='col-12 visit'>
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
                            <div className='col-12 date-picker mb-2'>
                                <label className="form-label">
                                    Choose your appointment date
                                </label>
                                <div className='choose-date mt-5 mb-3'>
                                    <DatePicker id='user_date'
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
                            <div className='col-12 appointment-column'>
                                <div>
                                    <label className="form-label mb-4">
                                        What is your reason for visiting?
                                    </label>
                                    <textarea className="form-control type-your-text mt-4 mb-5"
                                        name="reason"
                                        value={reason}
                                        placeholder='type your text here...'
                                        onChange={handleChange}>
                                    </textarea>
                                </div>
                            </div>
                            <div>
                                {error && (
                                    <div className="bg-danger text-white mb-4">
                                        <p className='appoitment-error m-2'>
                                            {error}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="col-12 d-flex justify-content-center" >
                                <button className="btn btn-primary mt-4 rounded-0"
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

