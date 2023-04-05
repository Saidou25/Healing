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
                <CustomLink to='/Home' className='nav-item'>home</CustomLink>
                <CustomLink to='/Info' className='nav-item'>form</CustomLink>
                <CustomLink to='/Appointments' className='nav-item'>appointments</CustomLink>
                {/* <CustomLink to='/DateList' className='nav-item'>applist</CustomLink> */}
                {/* <CustomLink to='/' className='nav-item'>home</CustomLink> */}
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