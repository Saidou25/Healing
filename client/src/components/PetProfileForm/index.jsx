import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { QUERY_ME, QUERY_PETS } from '../../utils/queries';
import { ADD_PET } from "../../utils/mutations";
import { useMutation, useQuery } from '@apollo/client';
import './index.css';

const PetForm = () => {
    const navigate = useNavigate();
    const [profileId, setProfileId] = useState('');
    const [profile, setProfile] = useState('');
    const [petName, setPetName] = useState('');
    const [petWeight, setPetWeight] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petGender, setPetGender] = useState('');
    const [petKind, setPetKind] = useState('');
    const [petExist, setPetExist] = useState('');

    console.log('profile from petProfileForm', profile);
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

    const { loading, data: meData } = useQuery(QUERY_ME);
    // const { data: profileData } = useQuery(QUERY_PROFILES);

    // const [addPet] = useMutation(ADD_PET);

    const [addPet, { error }] = useMutation(ADD_PET, {
      variables: { petName, profileId, petGender, petWeight: parseInt(petWeight), petAge, petBreed },
       
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
            console.log(`Appointment for ${petName} booked successfully`);
            setPetName('');
            setPetGender('');
            setPetAge('');
            setPetWeight('');
            setPetBreed('');
            navigate('/Dashboard');
        }
     } );
    useEffect(() => {
        if (meData) {
            const me = meData?.me || [];
            console.log('me', me);
            const profile = me.profile;
            console.log('profile from useEffect', profile);
            const id = profile._id;
            console.log('id', id);
            setProfileId(id);
            // const email = me.email;
            // const existingProfile = profile._id;
            // if (!profile.length) {
            //     console.log('no profile')

            //     setPetExist();
            //     setProfileId(existingProfile);
            //     setProfile(profile);
            // } else {
            //     console.log('there is aprofile');
            //     console.log('profile', profile);
            //     const petExists = profile.pets;
            //     console.log(petExists)
            //     setPetExist(petExists);
            //     setProfile(profile);
            //     setProfileId(existingProfile);

            // }

            // setEmail(email)
        }

    }, [meData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'petKind') {
            setPetKind(value);

            if (value) {
                x.style.display = "block";
                y.style.display = "none";
            } else {
                x.style.display = "none";
                y.style.display = "block";
            }
        }
        if (name === 'petName') {
            setPetName(value);

            if (value) {
                x1.style.display = "block";
                y1.style.display = "none";
            } else {
                x1.style.display = "none";
                y1.style.display = "block";
            }
        }
        if (name === 'petGender') {
            setPetGender(value);

            if (value) {
                x2.style.display = "block";
                y2.style.display = "none";
            } else {
                x2.style.display = "none";
                y2.style.display = "block";
            }
        }
        if (name === 'petAge') {
            setPetAge(value);

            if (value) {
                x3.style.display = "block";
                y3.style.display = "none";
            } else {
                x3.style.display = "none";
                y3.style.display = "block";
            }
        }
        if (name === 'petBreed') {
            setPetBreed(value);

            if (value) {
                x4.style.display = "block";
                y4.style.display = "none";
            } else {
                x4.style.display = "none";
                y4.style.display = "block";
            }
        }
        if (name === 'petWeight') {
            setPetWeight(value);
            console.log(value);
            if (value) {
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
        console.log('e', e.target.value);
        console.log('petName', petName);
        console.log('petBreed', petBreed);
        console.log('profile from addPet', profile);
        console.log('profileId', profileId);
        // try {
        //     await addPet({
        //         variables: { petName: petName, profileId: profileId, petGender: petGender, petWeight: parseInt(petWeight), petAge: petAge, petBreed: petBreed }
        //     });
            // console.log(`Appointment for ${petName} booked successfully`);
            // setPetName('');
            // setPetGender('');
            // setPetAge('');
            // setPetWeight('');
            // setPetBreed('');
            // navigate('/Dashboard');

        // } catch (err) {
        //     console.error(err);
        // };
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
            <div>
                {(!petExist) ? (
                    <div className='container'>
                        <h1>Please answer few questions about your pet</h1>
                        <form>
                            <div className='row'>
                                <div className='col-6'>
                                    <div>
                                        <label className="form-label">What kind of pet?</label><br />
                                        <input
                                            type="radio"
                                            name="petKind"
                                            value='dog'
                                            checked={petKind === 'dog'}
                                            onChange={handleChange} /> dog
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            name='petKind'
                                            value='cat'
                                            checked={petKind === 'cat'}
                                            onChange={handleChange} /> cat
                                    </div>
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
                                    <label className="form-label1"> Name</label>
                                    <input
                                        className="form-control"
                                        onChange={handleChange}
                                        type="text"
                                        value={petName}
                                        name="petName"
                                        placeholder="pet's name..." />
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
                                        <label className="form-label">What is your pet's gender?</label><br />
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
                                    <div className='validate3'>
                                        Looks good
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <div className='invalidate3'>
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
                                    <label className="form-label1"> Pet's weight</label>
                                    <input
                                        className="form-control"
                                        onChange={handleChange}
                                        type="text"
                                        name="petWeight"
                                        value={petWeight}
                                        placeholder="weight..." />
                                    <div className='validate5'>
                                        Looks good
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <div className='invalidate5'>
                                        required
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-primary"
                                        type="submit"
                                        value="Send"
                                        onClick={(e) => addPet(e)}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>Appointment booked</div>
                )}
            </div>
        </>
    )
};
export default PetForm;