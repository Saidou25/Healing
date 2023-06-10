import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import { PatternFormat } from 'react-number-format';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";
import { QUERY_ME, QUERY_PROFILES } from '../../utils/queries';
import { Regex } from '../../utils/Regex';
import SelectUSState from 'react-select-us-states';
import Navbar from '../Navbar';
import Footer from '../Footer';

import './index.css';

const PetOwnerProfileForm = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const templateParams = location.state.templateParams;
    const username = templateParams.username;
    const userProfile = props.userProfile;
    const myPet = props.myPet;

    const [patientState, setNewValue] = useState('');
    const [patientnumber, setPatientNumber] = useState('');
    const [numberValue, setNumberValue] = useState('');
    const [patientfirstname, setPatientFirstName] = useState('');
    const [patientlastname, setPatientLastName] = useState('');
    const [patientaddress, setPatientAddress] = useState('');
    const [patientcity, setPatientCity] = useState('');
    const [patientzip, setPatientZip] = useState('');
    const [error, setError] = useState('');
    const [confirm, setConfirm] = useState(false);

    // const { data: meData } = useQuery(QUERY_ME);
    // const me = meData?.me || [];
    // const username = me.username;

    const [addProfile] = useMutation(ADD_PROFILE, {
        variables: {
            username,
            patientState,
            patientnumber,
            patientfirstname,
            patientaddress,
            patientlastname,
            patientcity,
            patientzip
        },
        //  uptdating cache with new profile
        update(cache, { data: { addProfile } }) {
            try {
                const { profiles } = cache.readQuery({ query: QUERY_PROFILES });

                cache.writeQuery({
                    query: QUERY_PROFILES,
                    data: { profiles: [addProfile, ...profiles] },
                });
                console.log(`success adding ${patientfirstname} appointment`);

            } catch (e) {
                console.error(e);
            }
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!patientfirstname ||
            !patientaddress ||
            !patientlastname ||
            !patientcity ||
            !patientState) {

            setError('All fields need to be filled!');
            return;
        };
        if (!Regex.zipRegex.test(patientzip) || !patientzip) {
            setError('zip code needs to be a five digit number!');
            return;
        };
        if (!Regex.checkphone.test(numberValue) || !patientnumber) {
            setError('10 digits phone number is missing!');
            return;
        };

        addProfile(
            username,
            patientState,
            patientnumber,
            patientfirstname,
            patientaddress,
            patientlastname,
            patientcity,
            patientzip
        )
        setConfirm(true);
        console.log(`success adding your info ${patientfirstname} !`);


        (!myPet)
            ? navigate('/PetProfileForm', { state: { userProfile, templateParams } })
            : setTimeout(() => {
                navigate('/Dashboard');
            }, 1500);

        setPatientFirstName('');
        setPatientLastName('');
        setPatientAddress('');
        setPatientZip('');
        setPatientCity('');
        setNewValue('');
        setPatientNumber('');
    };

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
            <div>
                <div>
                    <div className='container-owner'>
                        <p>
                            Our practitioner will be driving to the address provided in the form below.
                            Please don't hesitate to add any useful information in the address field.
                        </p><br />
                        <h4 className="card-header bg-primary rounded-0 text-light p-4">
                            Please answer few questions about yourself</h4>
                        <div className="card-body">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className='row mt-5'>
                                    <div className="col-6 owner-fields">
                                        <label className="form-label"> First name</label>
                                        <input
                                            className="form-control"
                                            onChange={(e) => setPatientFirstName(e.target.value)}
                                            type="text"
                                            value={patientfirstname}
                                            name="patientfirstname"
                                            placeholder="first name..." />
                                    </div>
                                    <div className="col-6 owner-fields">
                                        <label className="form-label"> Last name</label>
                                        <input
                                            className="form-control"
                                            onChange={(e) => setPatientLastName(e.target.value)}
                                            type="text"
                                            name="patientlastname"
                                            value={patientlastname}
                                            placeholder="last name..." />
                                    </div>
                                    <div className="col-6 owner-fields">
                                        <label className="form-label">Address</label>
                                        <input
                                            className="form-control"
                                            value={patientaddress}
                                            onChange={(e) => setPatientAddress(e.target.value)}
                                            type="text"
                                            name="patientaddress"
                                            placeholder="address..." />
                                    </div>
                                    <div className="col-6 owner-fields">
                                        <label className="form-label">City</label>
                                        <input
                                            className="form-control"
                                            value={patientcity}
                                            type="text"
                                            name="patientcity"
                                            onChange={(e) => setPatientCity(e.target.value)}
                                            placeholder="enter city..." />
                                    </div>
                                    <div className='col-6 owner-fields'>
                                        <label className='form-label'>
                                            Select a state
                                        </label>
                                        <SelectUSState
                                            id="myId"
                                            className="myClassName"
                                            onChange={setNewValue}
                                        />
                                    </div>
                                    <div className="col-6 owner-fields">
                                        <label className="form-label">Zip code</label>
                                        <input
                                            className="form-control"
                                            name="patientzip"
                                            value={patientzip}
                                            onChange={(e) => setPatientZip(e.target.value)}
                                            type="text"
                                            placeholder="zip code..." />
                                    </div>
                                    <div className="col-6 owner-fields">
                                        <label className="form-label">
                                            Phone number
                                        </label>
                                        <div>
                                            <PatternFormat
                                                className='phone-update'
                                                format="(###) ### ####"
                                                allowEmptyFormatting mask="_"
                                                name='patientnumber'
                                                onValueChange={(values, sourceInfo) => {
                                                    setPatientNumber(values.formattedValue);
                                                    setNumberValue(values.value);
                                                }} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn button-owner rounded-0 btn-primary"
                                            type="submit"
                                            value="Send">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {error && (
                            <div className="my-3 p-3 bg-danger phone-error text-white">
                                {error}
                            </div>
                        )}
                    </div >
                </div >
            </div >
            <Footer />
        </>
    )
};

export default PetOwnerProfileForm;