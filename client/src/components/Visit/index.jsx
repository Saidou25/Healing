import React, { useState } from 'react';


const Visit = () => {

    // const [birthdate, setBirthDate] = useState("");
    const [mepet, setMePet] = useState();

    // const [reason, setReason] = useState("");


    const handleChange = (e) => {
        //     e.preventDefault();
        setMePet(e.target.value);
console.log(mepet);

    };

    return (
        <div className='container'>
            <h1>{mepet}</h1>
            <form>
                <div>
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
            </form>
        </div>
    )
};

export default Visit;