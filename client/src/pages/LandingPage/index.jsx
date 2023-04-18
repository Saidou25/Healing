import React from "react";
import { Link } from 'react-router-dom';
import './index.css';

const LandingPage = () => {
    return (
        <div className="main">
            <h1>Reiki</h1>
            <button className="btn visit" >
                <Link to='/Login' className='visit-item'>Login</Link>
            </button>
        </div>
    )
};
export default LandingPage;