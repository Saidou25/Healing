import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar";

const Module = () => {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [end, setEnd] = useState(false);

    const clear = (e) => {
        setShow(false);
        setEnd(false);
    };

    const working = async () => {
        console.log('2');
        // setConfirm(true);
        try {
            const middle = await setTimeout(() => {
                setShow(false);
            }, 3000);
            theEnd(middle);
            console.log('middle', middle)
        } catch (e) {
            console.log(e);
        }
    };

    const theEnd = async (str) => {
        
        setEnd(true);
        console.log("Success", str);
        await setTimeout (() => {
            navigate('/Dashboard');
        }, 3000);
    };

    const handleSubmit = () => {
        setShow(true)
        console.log('1');
        working();
    };

    if (show === true) {
        return (
            <>
                <Navbar />
                <h1>Showing</h1>
                <button
                    type='buton'
                    onClick={(e) => clear(e.target.value)}>
                    clear</button>
            </>
        )
    }
    if (end === true) {
        return (
            <>
                <Navbar />
                <h1>The end</h1>
                <button
                    type='buton'
                    onClick={(e) => clear(e.target.value)}>
                    clear</button>
            </>
        )
    }
    return (
        <>
            <Navbar />
            <button
                type='buton'
                onClick={handleSubmit}>
                click</button>

        </>
    )
};

// setConfirm(true);

//         setTimeout(() => {
//             setConfirm(false);
//         }, 5000);


// if (confirm === true) {
//     return (
//         <main className='row container-success'>
//             <div className="col-12 app-success d-flex mb-2">
//                 <i className="d-flex fa-solid fa-check">
//                 </i>
//             </div>
//             <h2 className='col-12  app-success d-flex '>
//                 Success
//             </h2>
//         </main>
//     )
// }
export default Module;