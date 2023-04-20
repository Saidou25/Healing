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
            <Link className="site-title" to="/">
                Healing
            </Link>
            <ul className="nav justify-content-end">
                <CustomLink to='/UserList' className='nav-item'>users</CustomLink>
                <CustomLink to='/Login' className='nav-item'>login</CustomLink>
                <CustomLink to='/Signup' className='nav-item'>signup</CustomLink>
                <CustomLink to='/Dashboard' className='nav-item'>dashboard</CustomLink>
                <CustomLink to='/' className='nav-item' onSubmit={logout} >logout</CustomLink>
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