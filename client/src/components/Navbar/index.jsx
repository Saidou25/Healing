import React from "react";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Auth from "../../utils/auth";
import profileIcon from '../../assets/images/profileicon.png'

import './index.css';

const Navbar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        console.log('logout success!')
    };
    return (
        <nav className="nav">
            <Link className="site-title" to="/" style={{ fontSize: '7rem' }}>
                Healing
            </Link>
            <ul className="nav justify-content-end">
                <CustomLink to='/UserList' className='nav-item active' style={{ fontSize: '1.5rem' }}>users</CustomLink>
                <CustomLink to='/Login' className='nav-item' style={{ fontSize: '1.5rem' }}>login</CustomLink>
                <CustomLink to='/Signup' className='nav-item' style={{ fontSize: '1.5rem' }}>signup</CustomLink>
                <CustomLink to='/Dashboard' className='nav-item' style={{ fontSize: '1.5rem' }}>dashboard</CustomLink>
                <CustomLink to='/' className='nav-item' onSubmit={logout}  style={{ fontSize: '1.5rem' }}>logout</CustomLink>
                <Link className='profile-icon' to="/Profile">
                    <img src={profileIcon} alt='profile icon' height={40} />
                </Link>
            </ul>
        </nav>
    )

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