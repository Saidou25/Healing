import React from "react";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

import './index.css';

const Navbar = () => {
    return (
        <nav className="nav">
            <Link className="site-title" to="/">
               Healing
            </Link>
            <ul className="nav justify-content-end">
                <CustomLink to='/UserList' className='nav-item'>users</CustomLink>
                <CustomLink to='/Login' className='nav-item'>login</CustomLink>
                <CustomLink to='/Signup' className='nav-item'>signup</CustomLink>
                <CustomLink to='/Visit' className='nav-item'>visit</CustomLink>
                {/* <CustomLink to='/patients' className='nav-item'>patients</CustomLink> */}
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