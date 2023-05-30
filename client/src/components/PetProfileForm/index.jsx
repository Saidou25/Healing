import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { QUERY_ME, QUERY_PETS, QUERY_PROFILES } from '../../utils/queries';
import { ADD_PET } from "../../utils/mutations";
import { useMutation, useQuery } from '@apollo/client';
import './index.css';

const PetForm = (props) => {
    const navigate = useNavigate();

    const myPet = props.myPet;
    const profileId = props.profileId;

    const [petName, setPetName] = useState('');
    const [petWeight, setPetWeight] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petGender, setPetGender] = useState('');
    const [petKind, setPetKind] = useState('');

    const { data } = useQuery(QUERY_ME);
    const me = data?.me || [];
    const username = me.username;

    const { data: profilesData } = useQuery(QUERY_PROFILES);
    const profiles = profilesData?.profiles || [];


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
            }
            navigate('/Dashboard');
        }
    });

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
        if (name === 'petAge') {
            setPetAge(value);
        }
        if (name === 'petBreed') {
            setPetBreed(value);
        }
        if (name === 'petWeight') {
            setPetWeight(value);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPet({
                variables: { profileId: profileId, petName: petName, username: username, petGender: petGender, petWeight: parseInt(petWeight), petAge: petAge, petBreed: petBreed }
            });
            console.log(`Appointment for ${petName} booked successfully`);

        } catch (err) {
            console.error(err);
        }
        setPetName('');
        setPetGender('');
        setPetAge('');
        setPetWeight('');
        setPetBreed('');
        navigate('/Dashboard');
    };

    return (
        <>
            <Navbar />
            <div>
                {myPet?.username ? (
                    <Link to='/AppointmentConfirmation'>Success booking</Link>
                ) : (
                    <div className='container-pet mt-5'>
                        <h4 className="card-header bg-primary rounded-0 text-light p-4"
                            style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                            Please answer few questions about your pet</h4>
                        <div className="card-body">
                            <form onSubmit={handleFormSubmit}>
                                <div className='row m-5'>
                                    <div className='col-6'>
                                        <div>
                                            <label className="form-label">What kind of pet?</label><br />
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
                                    <div className='col-6'>
                                        <div>
                                            <label className="form-label">What is your pet's gender?</label><br />
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
                                    <div className="col-6">
                                        <label className="form-label"> Name</label>
                                        <input
                                            className="form-control"
                                            onChange={handleChange}
                                            type="text"
                                            value={petName}
                                            name="petName"
                                            placeholder="pet's name..." />
                                    </div>
                                    <div className='col-6'>
                                        <label className="form-label">Age</label><br />
                                        <input
                                            className='age'
                                            type='text'
                                            name="petAge"
                                            value={petAge}
                                            onChange={handleChange}
                                            placeholder="MM/DD/YYYY..."
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label"> Breed</label>
                                        <input
                                            className="form-control"
                                            onChange={handleChange}
                                            type="text"
                                            value={petBreed}
                                            name="petBreed"
                                            placeholder="breeed..." />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label"> Pet's weight</label>
                                        <input
                                            className="form-control"
                                            onChange={handleChange}
                                            type="text"
                                            name="petWeight"
                                            value={petWeight}
                                            placeholder="weight..." />
                                    </div>
                                    <div className="col-12">
                                        <button className="btn rounded-0 button-pet btn-primary"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
};
export default PetForm;