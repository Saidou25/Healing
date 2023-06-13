import React from "react";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Auth from "../../utils/auth";
import profileIcon from '../../assets/images/profileicon.png';
import './index.css';

const Navbar = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        console.log('logout success!')
    };

    if (Auth.loggedIn()) {
        return (
            <main className="main-nav">
            <div className="bg-img">
                <nav className="nav">
                    <Link className="landing-title" to="/">Healing</Link>
                    <ul className="nav links justify-content-end">
                        <CustomLink to='/About' className='nav-item fs-3'>About</CustomLink>
                        <CustomLink to='/Dashboard' className='nav-item fs-3'>dashboard</CustomLink>
                        <button className='btt-logout fs-3' onClick={logout}>logout</button>
                        <Link className='profile-icon' to="/MyProfile">
                            <img src={profileIcon} alt='profile icon' height={43} />
                        </Link>
                    </ul>
                </nav>
            </div>
            </main>
        )
    }
    return (
        <main className="main-nav">
        <div className="bg-img">
            <nav className="nav">
                <Link className="landing-title" to="/">
                    Healing
                </Link>
                <ul className="nav justify-content-end">
                    <CustomLink to='/About' className='nav-item fs-3'>About</CustomLink>
                    <CustomLink to='/Login' className='nav-item fs-3'>login</CustomLink>
                    <CustomLink to='/Signup' className='nav-item fs-3'>signup</CustomLink>
                    <button className='btt-logout fs-3' onClick={logout}>logout</button>
                </ul>
            </nav>
        </div>
        </main>
    );

    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to);
        const is = useMatch({ path: resolvedPath.pathname, end: true })
        return (
            <li className={is ? '' : ''}>
                <Link to={to} {...props}>
                    {children}
                </Link>
            </li>
        )
    }
};

export default Navbar;