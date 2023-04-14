import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PET } from "../../utils/mutations";



const PetForm = () => {
    const navigate = useNavigate();

    const [petName, setPetName] = useState('');
    const [petWeight, setPetWeight] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petReason, setPetReason] = useState('');
    const [petGender, setPetGender] = useState('');

    const [addPet] = useMutation(ADD_PET);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'petName') {
            setPetName(value);
        }
        if (name === 'petWeight') {
            setPetWeight(value);
        }
        if (name === 'petGender') {
            setPetGender(value);
        }
        if (name === 'petReason') {
            setPetReason(value);
        }
        if (name === 'petAge') {
            setPetAge(value);
        }
        if (name === 'petBreed') {
            setPetBreed(value);
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
                                <label className="form-label">Who is your pet's gender?</label><br />
                                <input
                                    type="radio"
                                    name="petGender"
                                    value='male'
                                    checked={petGender === 'male'}
                                    onChange={handleChange} /> male
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name='petGender'
                                    value='female'
                                    checked={petGender === 'female'}
                                    onChange={handleChange} /> female
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
                            <div className='validate8'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='invalidate8'>
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
                                placeholder="breeed..." />
                            <div className='validate'>
                                Looks good
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className='invalidate'>
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
                                <div className='validate7'>
                                    Looks good
                                    <i className="fa-solid fa-check"></i>
                                </div>
                                <div className='invalidate7'>
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