import React from "react";
import Auth from "../../utils/auth";
import profileIcon from '../../assets/images/profileicon.png';
import './index.css';

const SideMenu = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        console.log('logout success!')
    };

    return (
        <main className="side-menu show">
            <div>

                <a className="btn btn-side"
                    height={43}
                    data-bs-toggle="offcanvas"
                    href="#offcanvasExample"
                    role="button"
                    aria-controls="offcanvasExample">
                    <i className="fa-solid fa-bars text-black fs-2"></i>
                </a>
            </div>
            <div className="offcanvas offcanvas-start bg-primary"
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header text-white">
                    <a className="landing-title-side text-white"
                        href="/">
                        Healing
                    </a>
                    <button type="button"
                        className="btn-close bg-white"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close">
                    </button>
                </div>
                <div className="row offcanvas-body">
                    <div className="col-6 col-top d-flex align-items-center">
                        <h5 className="offcanvas-title text-white fs-2"
                            id="offcanvasExampleLabel">
                            Menu
                        </h5>
                    </div>
                    <div className="col-6 col-top">
                        <a className='profile-icon-side d-flex justify-content-end align-items-center mb-2 p-3'
                            href="/MyProfile">
                            <img src={profileIcon} alt='profile icon' height={43} />
                        </a>
                    </div>
                </div>
                <div className="row">
                    <nav className="nav side-nav">
                        <ul className="nav links-side">
                            <li className="col-12 col-items mt-5 pb-5">
                                <a className='nav-item-side fs-3'
                                    href="/About">
                                    About
                                </a>
                            </li>
                            <li className="col-12 col-items mt-5 pb-5">
                                <a className='nav-item-side fs-3'
                                    href="/Dashboard">
                                    dashboard
                                </a>
                            </li>
                            <li className="col-12 col-items mt-5 pb-5">
                                <a className='nav-item-side fs-3'
                                    href="/Dashboard">
                                    visits
                                </a>
                            </li>
                            <li className="col-12 col-items mt-5 pb-5">
                                <a className='btn-logout nav-item-side fs-3'
                                    href="/Login">
                                    login
                                </a>
                            </li>
                            <li className="col-12 col-items mt-5 pb-5">
                                <a className='btn-logout nav-item-side fs-3'
                                    href="/"
                                    onClick={logout}>
                                    logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </main>
    )
};
export default SideMenu;