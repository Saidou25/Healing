import React from "react";
import { Link } from 'react-router-dom';
import './index.css';

const LandingPage = () => {
    return (
        <div className="main">
            <h1>Reiki</h1>
            <div className="row">
                <div className="col-6">
                    <button className="btn visit" >
                        <Link to='/Login' className='visit-item'>Login</Link>
                    </button>
                </div>
                <div className="col-6">
                    <button className="btn visit" >
                        <Link to='/Signup' className='visit-item'>signup</Link>
                    </button>
                </div>
            </div>
        </div>
    )
};
export default LandingPage;