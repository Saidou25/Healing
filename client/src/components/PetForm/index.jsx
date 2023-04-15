import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PET } from "../../utils/mutations";
import './index.css';



const PetForm = () => {
    const navigate = useNavigate();

    const [petName, setPetName] = useState('');
    const [petWeight, setPetWeight] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petReason, setPetReason] = useState('');
    const [petGender, setPetGender] = useState('');

    const x = document.querySelector(".validate");
    const y = document.querySelector(".invalidate");
    const x1 = document.querySelector(".validate1");
    const y1 = document.querySelector(".invalidate1");
    const x2 = document.querySelector(".validate2");
    const y2 = document.querySelector(".invalidate2");
    const x3 = document.querySelector(".validate3");
    const y3 = document.querySelector(".invalidate3");
    const x4 = document.querySelector(".validate4");
    const y4 = document.querySelector(".invalidate4");
    const x5 = document.querySelector(".validate5");
    const y5 = document.querySelector(".invalidate5");

    const [addPet] = useMutation(ADD_PET);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'petName') {
            setPetName(value);
            if (value.length > 2) {
                x.style.display = "block";
                y.style.display = "none";
            } else {
                x.style.display = "none";
                y.style.display = "block";
            }
        }
        if (name === 'petWeight') {
            setPetWeight(value);
            if (value > 3) {
                x1.style.display = "block";
                y1.style.display = "none";
            } else {
                x1.style.display = "none";
                y1.style.display = "block";
            }
        }
        if (name === 'petGender') {
            setPetGender(e.target.value);
            if (e.target.value) {
                x2.style.display = "block";
                y2.style.display = "none";
            } else {
                x2.style.display = "none";
                y2.style.display = "block";
            }
        }
        if (name === 'petReason') {
            setPetReason(value);
            if (value.length > 10) {
                x3.style.display = "block";
                y3.style.display = "none";
            } else {
                x3.style.display = "none";
                y3.style.display = "block";
            }
        }
        if (name === 'petAge') {
            setPetAge(value);
            if (value.length === 10) {
                x4.style.display = "block";
                y4.style.display = "none";
            } else {
                x4.style.display = "none";
                y4.style.display = "block";
            }
        }
        if (name === 'petBreed') {
            setPetBreed(value);
            if (value.length > 3) {
                x5.style.display = "block";
                y5.style.display = "none";
            } else {
                x5.style.display = "none";
                y5.style.display = "block";
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addPet({
                variables: { petName: petName, petGender: petGender, petWeight: parseInt(petWeight), petReason: petReason, petAge: petAge, petBreed: petBreed }
            });
            console.log(`${petName} added successfully`);

        } catch (err) {
            console.error(err);
        };
        const petNavigateData = {
            petReason: petReason,
            petName: petName,
            petAge: petAge,
            petWeight: petWeight,
            petBreed: petBreed,
            petGender: petGender
        }
        navigate('/VisitorAppointment', { state: petNavigateData });
    };

    return (
        <>
            <h1>
                Pet form
            </h1>
            <div className='container'>
                <h1>Please answer few questions</h1>
                <form>
                    <div className='row'>

                        <div className="col-6">
                            <label className="form-label1"> Name</label>
                            <input
                                className="form-control"
                                onChange={handleChange}
                                type="text"
                                value={petName}
                                name="petName"
                                placeholder="pet's name..." />
                            <div className='validate'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='invalidate'>
                                required
                                <i className="fa-solid fa-check"></i>
                            </div>
                        </div>

                        <div className='col-6'>
                            <div>
                                <label className="form-label">What is your pet's gender?</label><br />
                                <input
                                    type="radio"
                                    name="petGender"
                                    value='male'
                                    checked={petGender === 'male'}
                                    onChange={handleChange} /> male

                                <input
                                    type="radio"
                                    name='petGender'
                                    value='female'
                                    checked={petGender === 'female'}
                                    onChange={handleChange} /> female
                            </div>
                            <div className='validate2'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='invalidate2'>
                                required
                                <i className="fa-solid fa-check"></i>
                            </div>
                        </div>

                        <div className='col-6'>
                            <label className="form-label">Age</label><br />
                            <input
                                type='text'
                                name="petAge"
                                value={petAge}
                                onChange={handleChange}
                                placeholder="MM/DD/YYYY..."
                            />
                            <div className='validate4'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='invalidate4'>
                                required
                                <i className="fa-solid fa-check"></i>
                            </div>
                        </div>

                        <div className="col-6">
                            <label className="form-label1"> Breed</label>
                            <input
                                className="form-control"
                                onChange={handleChange}
                                type="text"
                                value={petBreed}
                                name="petBreed"
                                placeholder="breed..." />
                            <div className='validate5'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='invalidate5'>
                                required
                                <i className="fa-solid fa-check"></i>
                            </div>
                        </div>

                        <div className="col-6">
                            <label className="form-label1"> Pet's weight</label>
                            <input
                                className="form-control"
                                onChange={handleChange}
                                type="text"
                                name="petWeight"
                                value={petWeight}
                                placeholder="weight..." />
                            <div className='validate1'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='invalidate1'>
                                required
                                <i className="fa-solid fa-check"></i>
                            </div>
                        </div>

                        <div className='col-6'>
                            <div>
                                <label className="form-label">What is the reason for visitint?</label>
                                <textarea className="form-control"
                                    name="petReason"
                                    value={petReason}
                                    placeholder='type your text here...'
                                    onChange={handleChange}>
                                </textarea>
                                <div className='validate3'>
                                    Looks good
                                    <i className="fa-solid fa-check"></i>
                                </div>
                                <div className='invalidate3'>
                                    required
                                    <i className="fa-solid fa-check"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary"
                                type="submit"
                                value="Send"
                                onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default PetForm;