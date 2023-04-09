import React, { useState } from 'react';
import BirthDate from '../BirthDate';




const Visit = () => {


    const [mepet, setMePet] = useState();
    const [reason, setReason] = useState("");



    const handleChange = (e) => {
            // e.preventDefault();
        setMePet(e.target.value);
        console.log(mepet);
        const { name, value } = e.target;

        if (name === 'reason') {
            setReason(value);
            console.log(reason);
        }

    };

    return (
        <div className='container'>
             <label for="exampleFormControlTextarea1" className="form-label">What is your date of birth?</label><br />
            <BirthDate />
            <form>
                <div>
                <label for="exampleFormControlTextarea1" className="form-label">Who is the appointment for?</label><br />
                    <input
                        type="radio"
                        name="mepet"
                        value="me"
                        checked={mepet === 'me'}
                        onChange={handleChange} /> me
                </div>
                <div>
                    <input
                        type="radio"
                        name="mepet"
                        value="my pet"
                        checked={mepet === 'my pet'}
                        onChange={handleChange} /> my pet
                </div>
                <div>
                    <label for="exampleFormControlTextarea1" className="form-label">What is your reason for visitint?</label>
                    <textarea className="form-control" 
                    name="reason"
                    placeholder='type your text here...'
                    onChange={handleChange}></textarea>
                   
                </div>
            </form>
        </div>
    )
};

export default Visit;