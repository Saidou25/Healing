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
            <nav className="nav">
                <Link className="site-title" to="/" style={{ fontSize: '7rem' }}>Healing</Link>
                <ul className="nav justify-content-end">
                    <CustomLink to='/About' className='nav-item' style={{ fontSize: '1.5rem' }}>About</CustomLink>
                    <CustomLink to='/UserList' className='nav-item active' style={{ fontSize: '1.5rem' }}>users</CustomLink>
                    <CustomLink to='/Dashboard' className='nav-item' style={{ fontSize: '1.5rem' }}>dashboard</CustomLink>{/* <CustomLink to='/AppointmentForm' className='nav-item' style={{ fontSize: '1.5rem' }}>dashboard</CustomLink> */}
                    <button className='nav-item' onClick={logout} style={{ fontSize: '1.5rem' }}>logout</button>
                    <Link className='profile-icon' to="/MyProfile">
                        <img src={profileIcon} alt='profile icon' height={40} />
                    </Link>
                </ul>
            </nav>
        )
    }
    return (
        <nav className="nav">
            <Link className="site-title" to="/" style={{ fontSize: '7rem' }}>
                Healing
            </Link>
            <ul className="nav justify-content-end">
                <CustomLink to='/About' className='nav-item' style={{ fontSize: '1.5rem' }}>About</CustomLink>
                <CustomLink to='/Login' className='nav-item' style={{ fontSize: '1.5rem' }}>login</CustomLink>
                <CustomLink to='/Signup' className='nav-item' style={{ fontSize: '1.5rem' }}>signup</CustomLink>
                <button  className='nav-item' onClick={logout} style={{ fontSize: '1.5rem' }}>logout</button>
            </ul>
        </nav>
    );

    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to);
        const isActive = useMatch({ path: resolvedPath.pathname, end: true })
        return (
            <li className={isActive ? 'active' : ''}>
                <Link to={to} {...props}>
                    {children}
                </Link>
            </li>
        )
    }
};

export default Navbar;