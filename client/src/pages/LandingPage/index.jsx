import React from "react";
import { Link } from 'react-router-dom';
import './index.css';

const LandingPage = () => {
    
    return (
        <div className="mainlandingpage">
            <div className="landing-title">
            <Link className="landing text-primary" to="/">
                Healing
            </Link>
            </div>
            <div className="landing-parent">
                <div className="card landing-page rounded-0">
                    <div className="row landing-row">
                        <div className="col-4 landing-column">
                            <button className="btn but-landing" >
                                <Link to='/Login' className='visit-item'>Login</Link>
                            </button>
                        </div>
                        <div className="col-4 landing-column">
                            <button className="btn but-landing" >
                                <Link to='/Signup' className='visit-item'>Signup</Link>
                            </button>
                        </div>
                        <div className="col-4 landing-column">
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