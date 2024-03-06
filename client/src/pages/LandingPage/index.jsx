import React from "react";
import { NavLink } from 'react-router-dom';
import SideMenu from "../../components/SideMenu";
import './index.css';

const LandingPage = () => {

    return (
        <div className="mainlandingpage">
            <div className="row">
                <div className='col-12 d-flex justify-content-end'>
                    <SideMenu />
                </div>
            </div>
            <div className="landing-title">
                <NavLink className="col-12 landing text-black" to="/">
                    Healing
                </NavLink>
            </div>
            <div className="landing-parent">
                <div className="card landing-page rounded-0">
                    <div className="row landing-row">
                        <div className="col-4 landing-column">
                            <button className="btn but-landing" >
                                <NavLink to='/Login' className='landing-item'>Login</NavLink>
                            </button>
                        </div>
                        <div className="col-4 landing-column">
                            <button className="btn but-landing" >
                                <NavLink to='/Signup' className='landing-item'>Signup</NavLink>
                            </button>
                        </div>
                        <div className="col-4 landing-column">
                            <button className="btn but-landing" >
                                <NavLink to='/About' className='landing-item'>About</NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default LandingPage;