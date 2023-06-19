import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { ADD_BOOKINGDATE } from "../../utils/mutations";
import { QUERY_BOOKINGDATES, QUERY_ME, QUERY_PETS } from '../../utils/queries';
import { sendEmail } from '../../utils/email.js';
import { parseISO, setHours, setMinutes } from 'date-fns';
import Spinner from '../../components/Spinner';
import DatePicker from "react-datepicker";
import Navbar from '../Navbar';
import Footer from '../Footer';
import './index.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";

const AppointmentForm = () => {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date());
    const [mepet, setMePet] = useState('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [appTime, setAppTime] = useState('');
    const [showPetName, setShowPetName] = useState('');
    const [petForm, setPetForm] = useState('');
    const [digitalAppointment, setDigitalAppointment] = useState('');
    const [appInfo, setAppInfo] = useState('');
    const [finalize, setFinalize] = useState(false);

    const { data: meData } = useQuery(QUERY_ME);
    const me = meData?.me || [];
    const profile = me.profile;
    const username = me.username;

    const { data, loading } = useQuery(QUERY_BOOKINGDATES);

    const { data: petsData, petsDataLoading } = useQuery(QUERY_PETS);
    const pets = petsData?.pets || [];
    const myPets = pets.filter(pet => pet.username === username);
    const petNames = myPets.map(myPets => myPets.petName);
    const existingPet = pets.filter(petNames => petNames.petName === petForm);

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
            setShowPetName(value);

        };
        if (name === 'me') {
            setMePet(value);
            setShowPetName('');
            setPetForm('');
        };
        if (name === 'reason') {
            setReason(value);
        };
    };

    const cancelApp = () => {
        setMePet('');
        setStartDate('');
        setReason('');
        setShowPetName('');
        setPetForm('');
        navigate('/Dashboard');
    };

    const confirmation = async () => {
        try {
            const { data } = await addBookingdate({
                variables: {
                    username: appInfo.username,
                    digitalAppointment: appInfo.digitalAppointment,
                    digitMonth: appInfo.digitMonth,
                    reason: reason,
                    mepet: mepet,
                    isBooked: appInfo.isBooked,
                    finalDateISO: appInfo.finalDateISO,
                    appDay: appInfo.appDay,
                    appMonth: appInfo.appMonth,
                    appDate: appInfo.appDate,
                    appTime: appInfo.appTime,
                    appYear: appInfo.appYear
                }
            });
            // setReviewData({ ...data, me })

            console.log(`success booking a date ${digitalAppointment}`);

        } catch (err) {
            console.error(err);
        };
        setFinalize(true);
        setTimeout(() => {
            navigate('/Dashboard');
        }, 3000);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mepet || !reason || !startDate) {
            setError('All fields need filled!');
            return;
        };
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
        const appDate = parseInt(app[2]);
        const appTime = app[4];
        const appYear = parseInt(app[3]);
        const digitalAppointment = `${digitMonth}/${appDate}/${appYear}`;

        setDigitalAppointment(digitalAppointment);
        setAppTime(appTime);

        const appInfo = {
            username: username,
            isBooked: isBooked,
            finalDate: finalDate,
            finalDateISO: finalDateISO,
            digitMonth: digitMonth,
            appMonth: appMonth,
            appDate: appDate,
            appDay: appDay,
            appTime: appTime,
            appYear: appYear,
            digitalAppointment: digitalAppointment,
            reason: reason,
            mepet: mepet,
            profile: profile,
            petForm: petForm
        };

        if (mepet === 'me' && !profile) {
            navigate('/ProfileForm', { state: { appInfo } });
            console.log('case 4');
        }
        if (mepet === 'me' && profile) {
            setConfirm(true);
            console.log('case 5');
        };
        if (mepet === 'mypet' && profile && !myPets.length) {
            navigate('/PetProfileForm', { state: { appInfo, petForm } });
            console.log('case 2');
        }
         if (mepet === 'mypet' && profile && myPets.length && existingPet) {
            setConfirm(true);
            console.log('case 1');
        }
        if (mepet === 'mypet' && profile && myPets.length && !existingPet.length) {
            navigate('/PetProfileForm', { state: {  appInfo, petForm } });
            console.log('case 1bis');
        }
        if (mepet === 'mypet' && !profile) {
            navigate('/PetOwnerProfileForm', { state: { appInfo, petForm  } });
            console.log(profile);
            console.log('case 3');
        }
        setConfirm(true);
        setAppInfo(appInfo);

        // // building templateParams for emailing appointment confirmation
        // const sy = 'saidou.monta@yahoo.com';
        // const templateParams = {
        //     digitalAppointment: digitalAppointment,
        //     username: username,
        //     myemail: sy,
        //     appTime: appTime,
        //     profile: profile,
        //     myPets: myPets
        // };

        // // adding a bookingdate to database


        // // redirects user to the next step in appointment process based on condilions
       
        

        

        
        // setMePet('');
        // setStartDate('');
        // setReason('');
        // setShowPetName('');
        // setPetForm('');
    };

    if (loading) return <Spinner />

    if (finalize === true) {
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

    if (confirm === true) {
        return (
            <div className='container mt-5'>
                <div className="card appointment-review-card mt-5 mb-5">
                    <div className='card-header bg-primary app-review-header pb-4 pt-4'>
                        <h4 className='header-text text-light mt-3 mb-3'>Please review your appointment information</h4>
                    </div>
                    <div className='card-body mt-4'>
                        <p className='app-review-p text-primary'>Appointment for:</p>
                        <p className='app-review-p'> {profile.patientfirstname} {profile.patientlastname}</p>
                        <p className='app-review-p text-primary'>On:</p>
                        <p className='app-review-p'>{digitalAppointment} at: {appTime}</p>
                        <p className='app-review-p text-primary'>Reason:</p>
                        <p className='app-review-p'>{reason}</p><br />
                        <div className='app-review-t'>
                            <p className='app-review-p p-3 text-primary'>Contact:</p>
                        </div>
                        <p className='app-review-p'>Email {me.email}</p>
                        <p className='app-review-p'>Phone number: {profile.patientnumber}</p><br />
                        <div className='app-review-t'>
                            <p className='app-review-p p-3 text-primary'>Address: </p>
                        </div>
                        <p className='app-review-p'>address: {profile.patientaddress}</p>
                        <p className='app-review-p'>city: {profile.patientcity} </p>
                        <p className='app-review-p'>state: {profile.patientState} </p>
                        <p className='app-review-p'>zip: {profile.patientzip} </p>
                    </div>
                    <div className='card-footer mt-4'>
                        <div className='row mb-3 p-3 mt-4'>
                            <button className="col-6 btn btn-app-review btn-secondary fs-5"
                                type="button"
                                onClick={cancelApp}>
                                cancel
                            </button>
                            <button className="col-6 btn btn-app-review btn-primary fs-5"
                                type="button"
                                onClick={confirmation}>
                                confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <>
            <Navbar />
            <div className='container-appointment'>
                <h4 className="card-header-appointment bg-primary rounded-0 text-light p-4 mt-4 mb-5">
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
                            {showPetName === 'mypet' ? (
                                <div className='col-12 appointment-column'>
                                    <div>
                                        <label className="form-label mb-4">
                                            What is your pet name
                                        </label>
                                        <input className="form-control type-your-text mt-4 mb-5"
                                            name="petForm"
                                            value={petForm}
                                            placeholder='name...'
                                            type='text'
                                            onChange={(e) => setPetForm(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>
                            ) : (
                                <>
                                </>
                            )}
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
                                        type="text"
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

