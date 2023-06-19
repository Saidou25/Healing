import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QUERY_PETS, QUERY_ME, QUERY_PROFILES } from '../../utils/queries';
import { ADD_PROFILE, ADD_PET, ADD_BOOKINGDATE } from "../../utils/mutations";
import { useMutation, useQuery } from '@apollo/client';
import { sendEmail } from '../../utils/email.js';
import { Regex } from '../../utils/Regex';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './index.css';

const PetForm = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const appInfo = location.state.appInfo;
    const petForm = location.state.petForm;
    const ownerInfo = location.state.ownerInfo;


    const [petName, setPetName] = useState('');
    const [petWeight, setPetWeight] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petGender, setPetGender] = useState('');
    const [petKind, setPetKind] = useState('');
    const [confirm, setConfirm] = useState(false)
    const [error, setError] = useState("");
    const [finalize, setFinalize] = useState(false);

    const { data: meData } = useQuery(QUERY_ME);
    const me = meData?.me || [];
    const username = me.username;
    const profileId = me.profile?._id;

    const [addProfile] = useMutation(ADD_PROFILE);
    const [addBookingdate] = useMutation(ADD_BOOKINGDATE);

    const [addPet] = useMutation(ADD_PET, {
        update(cache, { data: { addPet } }) {
            try {
                const { pets } = cache.readQuery({ query: QUERY_PETS });

                cache.writeQuery({
                    query: QUERY_PETS,
                    data: { pets: [addPet, ...pets] },
                });
            } catch (e) {
                console.error(e);
            };
        }
    });

    // const [addProfile] = useMutation(ADD_PROFILE, {
    //     variables: {
    //         username: ownerInfo.username,
    //         patientState: ownerInfo.patientState,
    //         patientnumber: ownerInfo.patientnumber,
    //         patientfirstname: ownerInfo.patientfirstname,
    //         patientgender: ownerInfo.patientgender,
    //         patientaddress: ownerInfo.patientaddress,
    //         patientlastname: ownerInfo.patientlastname,
    //         patientcity: ownerInfo.patientcity,
    //         birthdate: ownerInfo.birthdate,
    //         patientzip: ownerInfo.patientzip
    //     },
    //     update(cache, { data: { addProfile } }) {
    //         try {
    //             const { profiles } = cache.readQuery({ query: QUERY_PROFILES });
    //             cache.writeQuery({
    //                 query: QUERY_PROFILES,
    //                 data: { profiles: [addProfile, ...profiles] },
    //             });
    //             console.log(`success adding ${ownerInfo.patientfirstname} appointment`);

    //         } catch (e) {
    //             console.error(e);
    //         };
    //     }
    // });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'petKind') {
            setPetKind(value);
        }
        if (name === 'petName') {
            setPetName(value);
        }
        if (name === 'petGender') {
            setPetGender(value);
        }
        if (name === 'petAge' && Regex.checkAge.test(value)) {
            setPetAge(value);
        }
        if (name === 'petBreed') {
            setPetBreed(value);
        }
        if (name === 'petWeight' && Regex.checkWeight.test(value)) {
            setPetWeight(value);
        }
    };
    const cancelApp = () => {
        navigate('/Dashboard');
    };

    const ownerProfile = async () => {
        console.log(ownerInfo);
        try {
            const { data } = await addProfile({
                variables: {
                    username: username,
                    patientState: ownerInfo.patientState,
                    patientnumber: ownerInfo.patientnumber,
                    patientfirstname: ownerInfo.patientfirstname,
                    patientgender: ownerInfo.patientgender,
                    patientaddress: ownerInfo.patientaddress,
                    patientlastname: ownerInfo.patientlastname,
                    patientcity: ownerInfo.patientcity,
                    birthdate: ownerInfo.birthdate,
                    patientzip: ownerInfo.patientzip
                }
            });
        } catch (err) {
            console.error(err);
        };
        // // sendEmail(templateParams);
        console.log('success adding profile')
        setFinalize(true);
        setTimeout(() => {
            navigate('/Dashboard');
        }, 3000);
    };

    const appBooking = async () => {
        try {
            const { data } = await addBookingdate({
                variables: {
                    username: appInfo.username,
                    digitalAppointment: appInfo.digitalAppointment,
                    digitMonth: appInfo.digitMonth,
                    reason: appInfo.reason,
                    mepet: appInfo.mepet,
                    isBooked: appInfo.isBooked,
                    finalDateISO: appInfo.finalDateISO,
                    appDay: appInfo.appDay,
                    appMonth: appInfo.appMonth,
                    appDate: appInfo.appDate,
                    appTime: appInfo.appTime,
                    appYear: appInfo.appYear
                }
            });

            console.log(`success booking a date ${appInfo.digitalAppointment}`);
            // setReviewData({ ...data, me })

        } catch (err) {
            console.error(err);
        };
        if (!me.profile) {
            console.log("no existing profile", me.profile);
            ownerProfile();
        } else {
            // sendEmail(templateParams);
            console.log('there is a profile', me.profile);
            setFinalize(true);
            setTimeout(() => {
                navigate('/Dashboard');
            }, 3000);
        }; 

        setPetName('');
        setPetGender('');
        setPetAge('');
        setPetWeight('');
        setPetBreed('');
    };

    const confirmation = async () => {
        if (petName !== petForm) {
            setError(`${petForm} is the pet we have in our record...`);
            return;
        };
        if (!petWeight || !petBreed || !petAge || !petGender || !petName || !petKind) {
            setError('all fields need filled!');
            return;
        };
        // console.log(ownerInfo);
        try {
            const { data } = await addPet({
                variables: {
                    profileId: profileId,
                    petName: petName,
                    username: username,
                    petGender: petGender,
                    petWeight: parseInt(petWeight),
                    petAge: petAge,
                    petBreed: petBreed
                },
            });
            console.log(`Appointment for ${petName} booked successfully`);
            if (data && me.profile) {
                console.log('profile exists')
                appBooking();
            } else {
                console.log('no profile yet')
                appBooking();
                ownerProfile();
            }
        } catch (err) {
            console.error(err);
        };
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!petWeight || !petBreed || !petAge || !petGender || !petName || !petKind) {
            setError('all fields need filled!');
            return;
        };
        if (petName !== petForm) {
            setError(`${petForm} is the pet we have in our record...`);
            return;
        };
        console.log('next step');
        setError(false);
        setConfirm(true);
    };

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

    return (
        <>
            <Navbar />
            <main>
                <div className='container-pet'>
                    <div className='card card-pet pt-4 pb-4'>
                        {confirm === true ? (
                            <>
                                <h4 className="card-header header-profile bg-primary rounded-0 text-white p-4 mb-3">
                                    Review your pet's appointment info</h4>
                                <div className='info-review mt-5'>
                                    <p className='app-review-profile mt-4'>Appointment for: {petForm}</p>
                                    <p className='app-review-profile mt-4'>On: {appInfo.digitalAppointment} at: {appInfo.appTime}</p>
                                    <p className='app-review-profile mt-4'>Reason: {appInfo.reason}</p><br />
                                </div>
                            </>
                        ) : (
                            <>
                                <h4 className="card-header header-profile bg-primary rounded-0 text-light p-4 mb-4">
                                    About your pet</h4>
                            </>
                        )}
                        <div className="card-body">
                            <form onSubmit={handleFormSubmit}>
                                <div className='row'>
                                    <div className='col-lg-6 col-m-6 col-sm-12 p-2'>
                                        <div>
                                            <label className="form-label1">Type </label><br />
                                            <input
                                                className='radio m-2 ms-4'
                                                type="radio"
                                                name="petKind"
                                                value='dog'
                                                checked={petKind === 'dog'}
                                                onChange={handleChange} /> dog
                                            <input
                                                className='radio m-2 ms-4'
                                                type="radio"
                                                name='petKind'
                                                value='cat'
                                                checked={petKind === 'cat'}
                                                onChange={handleChange} /> cat
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-m-6 col-sm-12 p-2'>
                                        <div>
                                            <label className="form-label1">Gender</label><br />
                                            <input
                                                className='radio m-2 ms-4'
                                                type="radio"
                                                name="petGender"
                                                value='male'
                                                checked={petGender === 'male'}
                                                onChange={handleChange} /> male
                                            <input
                                                className='radio m-2 ms-4'
                                                type="radio"
                                                name='petGender'
                                                value='female'
                                                checked={petGender === 'female'}
                                                onChange={handleChange} /> female
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-m-6 col-sm-12 p-2">
                                        <label className="form-label1"> Name</label>
                                        <input
                                            className="form-control"
                                            onChange={handleChange}
                                            type="text"
                                            value={petName}
                                            name="petName"
                                            placeholder="pet's name..." />
                                    </div>
                                    <div className='col-lg-6 col-m-6 col-sm-12 p-2'>
                                        <label className="form-label1">Age</label><br />
                                        <input
                                            className='age'
                                            type='text'
                                            name="petAge"
                                            value={petAge}
                                            onChange={handleChange}
                                            placeholder="ex: 7..."
                                        />
                                    </div>
                                    <div className="col-lg-6 col-m-6 col-sm-12 p-2">
                                        <label className="form-label1"> Breed</label>
                                        <input
                                            className="form-control"
                                            onChange={handleChange}
                                            type="text"
                                            value={petBreed}
                                            name="petBreed"
                                            placeholder="breed..." />
                                    </div>
                                    <div className="col-lg-6 col-m-6 col-sm-12 p-2">
                                        <label className="form-label1"> Pet's weight</label>
                                        <input
                                            className="form-control"
                                            onChange={handleChange}
                                            type="text"
                                            name="petWeight"
                                            value={petWeight}
                                            placeholder="weight..." />
                                    </div>
                                    <div>
                                        {error && (
                                            <div className="bg-danger text-white mt-5 p-2">
                                                <p className='pet-error m-2'>
                                                    {error}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {confirm === true ? (
                                        <div className='card-footer confirm-appointmen mt-5'>
                                            <div className='row p-3 d-flex'>
                                                <button className="col-6 btn btn-app-review btn-secondary fs-5"
                                                    type="button"
                                                    onClick={cancelApp}
                                                >
                                                    cancel
                                                </button>
                                                <button className="col-6 btn btn-app-review btn-primary fs-5"
                                                    type="button"
                                                    onClick={confirmation}
                                                >
                                                    confirm
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="col-12 d-flex justify-content-center mt-5">
                                            <button className="btn rounded-0 btn-primary"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
};
export default PetForm;