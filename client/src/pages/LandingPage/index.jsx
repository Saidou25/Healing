import React from "react";
import { Link } from 'react-router-dom';
import './index.css';

const LandingPage = () => {
    return (
        <div className="mainlandingpage">
            <h1 className='reiki text-white m-4' style={{ fontSize: '7rem' }}>Reiki</h1>
            <div className="landing-parent">
                <div className="card landing-page">
                    <div className="row landing-row">
                        <div className="col-4 landig-column">
                            <button className="btn but-landing" >
                                <Link to='/Login' className='visit-item'>Login</Link>
                            </button>
                        </div>
                        <div className="col-4 landig-column">
                            <button className="btn but-landing" >
                                <Link to='/Signup' className='visit-item'>signup</Link>
                            </button>
                        </div>
                        <div className="col-4 landig-column">
                            <button className="btn but-landing" >
                                <Link to='/Visit' className='visit-item'>Visit</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default LandingPage;