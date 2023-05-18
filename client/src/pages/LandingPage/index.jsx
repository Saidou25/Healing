import React from "react";
import { Link } from 'react-router-dom';
import './index.css';

const LandingPage = () => {
    return (
        <div className="mainlandingpage">
            <Link className="site-title text-primary m-5" to="/" style={{ fontSize: '7rem' }}>
                Healing
            </Link>
            <div className="landing-parent rounded-0">
                <div className="card landing-page">
                    <div className="row landing-row">
                        <div className="col-4 landig-column">
                            <button className="btn but-landing" >
                                <Link to='/Login' className='visit-item'>Login</Link>
                            </button>
                        </div>
                        <div className="col-4 landig-column">
                            <button className="btn but-landing" >
                                <Link to='/Signup' className='visit-item'>Signup</Link>
                            </button>
                        </div>
                        <div className="col-4 landig-column">
                            <button className="btn but-landing" >
                                <Link to='/About' className='visit-item'>About</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default LandingPage;