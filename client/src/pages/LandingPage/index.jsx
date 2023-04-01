import React from "react";
import { Link } from 'react-router-dom';
import './index.css';

const LandingPage = () => {
    return (
        <div className="main">
            <h1>Reiki</h1>
            <button className="btn visit" >
                <Link to='/home' className='visit-item'>Visit</Link>
            </button>
        </div>
    )
};
export default LandingPage;