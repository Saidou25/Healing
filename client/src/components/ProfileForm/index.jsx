import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import { PatternFormat } from 'react-number-format';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";
import { QUERY_ME, QUERY_PROFILES } from '../../utils/queries';
import SelectUSState from 'react-select-us-states';
import { sendEmail } from '../../utils/email.js';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './index.css';

const ProfileForm = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const templateParams = location.state.templateParams;
    const username = templateParams.username;
    console.log("from profile form", username)

    const [patientState, setNewValue] = useState('');
    const [patientnumber, setPatientNumber] = useState('');
    const [patientgender, setPatientGender] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [patientfirstname, setPatientFirstName] = useState('');
    const [patientlastname, setPatientLastName] = useState('');
    const [patientaddress, setPatientAddress] = useState('');
    const [patientcity, setPatientCity] = useState('');
    const [patientzip, setPatientZip] = useState('');

    // const { loading, data: meData } = useQuery(QUERY_ME);
    // const me = meData?.me || [];
    // const username = me.username;

    const [addProfile] = useMutation(ADD_PROFILE, {
        variables: { username, patientState, patientnumber, patientfirstname, patientgender, patientaddress, patientlastname, patientcity, birthdate, patientzip },
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

    const handleFormSubmit = (event) => {
        event.preventDefault();

        addProfile(username, patientState, patientnumber, patientfirstname, patientgender, patientaddress, patientlastname, patientcity, birthdate, patientzip);

        sendEmail(templateParams);

        setPatientFirstName("");
        setPatientLastName("")
        setPatientGender("");
        setPatientCity("")
        setPatientAddress("");
        setPatientZip("");
        setPatientNumber("");
        setBirthDate("");

        console.log(`success adding ${patientfirstname}' appointment`);
        navigate('/Dashboard');
    };

    // if (loading) {
    //     return (
    //         <main>
    //             <h2>Loading . . . . . . </h2>
    //         </main>
    //     )
    // }
    return (
        <>
            <Navbar />
            <div>
                <div className='container-profile'>
                    <p>
                        Our practitioner will be driving to the address provided in the form below.
                        Please don't hesitate to add any useful information in the address field.
                    </p><br />
                    <h4 className="card-header bg-primary rounded-0 text-light p-4 mt-5">
                        Please answer few questions about yourself</h4>
                    <div className='card-body'>
                        <form onSubmit={(e) => handleFormSubmit(e)}>
                            <div className='row mt-5'>
                                <div className='col-6'>
                                    <div>
                                        <label className="form-label gender-question">What is your gender?</label><br />
                                        <input
                                            className='radio m-2 ms-4'
                                            type="radio"
                                            name="patientgender"
                                            value='male'
                                            checked={patientgender === 'male'}
                                            onChange={(e) => setPatientGender(e.target.value)} /> male
                                        <input
                                            className='radio m-2 ms-4'
                                            type="radio"
                                            name='patientgender'
                                            value='female'
                                            checked={patientgender === 'female'}
                                            onChange={(e) => setPatientGender(e.target.value)} /> female
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <label className="form-label">Age</label><br />
                                    <input
                                        className='age'
                                        type='text'
                                        name="birthdate"
                                        value={birthdate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        placeholder="MM/DD/YYYY..."
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="form-label1"> First name</label>
                                    <input
                                        className="form-control"
                                        onChange={(e) => setPatientFirstName(e.target.value)}
                                        type="text"
                                        value={patientfirstname}
                                        name="patientfirstname"
                                        placeholder="first name..." />
                                </div>
                                <div className="col-6">
                                    <label className="form-label1"> Last name</label>
                                    <input
                                        className="form-control"
                                        onChange={(e) => setPatientLastName(e.target.value)}
                                        type="text"
                                        name="patientlastname"
                                        value={patientlastname}
                                        placeholder="last name..." />
                                </div>
                                <div className="col-6">
                                    <label className="form-label1">Address</label>
                                    <input
                                        className="form-control"
                                        value={patientaddress}
                                        onChange={(e) => setPatientAddress(e.target.value)}
                                        type="text"
                                        name="patientaddress"
                                        placeholder="address..." />
                                </div>
                                <div className="col-6">
                                    <label className="form-label1">City</label>
                                    <input
                                        className="form-control"
                                        value={patientcity}
                                        type="text"
                                        name="patientcity"
                                        onChange={(e) => setPatientCity(e.target.value)}
                                        placeholder="enter city..." />
                                </div>
                                <div className='col-6'>
                                    <label className='form-label'>
                                        Select a state
                                    </label>
                                    <SelectUSState
                                        id="myId"
                                        className="myClassName"
                                        onChange={setNewValue} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label1">zip code</label>
                                    <input
                                        className="form-control"
                                        name="patientzip"
                                        value={patientzip}
                                        onChange={(e) => setPatientZip(e.target.value)}
                                        type="text"
                                        placeholder="zip code..." />
                                </div>
                                <div className="col-6">
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
                                            }} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn button-profile btn-primary rounded-0"
                                        type="submit"
                                        value="Send">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default ProfileForm;