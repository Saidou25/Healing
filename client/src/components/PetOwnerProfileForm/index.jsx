import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import { PatternFormat } from 'react-number-format';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";
import { QUERY_ME, QUERY_PROFILES } from '../../utils/queries';
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
    console.log("from pet owner form", templateParams)

    const [patientState, setNewValue] = useState('');
    const [patientnumber, setPatientNumber] = useState('');
    const [patientfirstname, setPatientFirstName] = useState('');
    const [patientlastname, setPatientLastName] = useState('');
    const [patientaddress, setPatientAddress] = useState('');
    const [patientcity, setPatientCity] = useState('');
    const [patientzip, setPatientZip] = useState('');

    // const { data: meData } = useQuery(QUERY_ME);
    // const me = meData?.me || [];
    // const username = me.username;

    const [addProfile] = useMutation(ADD_PROFILE, {
        variables: { username, patientState, patientnumber, patientfirstname, patientaddress, patientlastname, patientcity, patientzip },

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

        addProfile(username, patientState, patientnumber, patientfirstname, patientaddress, patientlastname, patientcity, patientzip)

        console.log(`success adding your info ${patientfirstname} !`);
        (!myPet) ? navigate('/PetProfileForm', { state: { userProfile, templateParams } }) : navigate('/Dashboard');
    };

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
                    </div >
                </div >
            </div >
            <Footer />
        </>
    )
};

export default PetOwnerProfileForm;