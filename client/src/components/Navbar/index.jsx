import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import SideMenu from "../SideMenu";
import Auth from "../../utils/auth";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    console.log("logout success!");
  };

  if (Auth.loggedIn()) {
    return (
      <main className="main-nav">
        <div className="bg-img">
          <nav className="row">
            <div className="col-12 d-flex justify-content-end">
              <SideMenu />
            </div>
            <div className="one">
              <div className="landing-title">
                <Link className="landing" to="/">
                  Healing
                </Link>
              </div>
              <ul className="nav d-flex">
                <CustomLink to="/About" className="nav-item show-hide fs-3">
                  About
                </CustomLink>
                <CustomLink to="/Dashboard" className="nav-item show-hide fs-3">
                  dashboard
                </CustomLink>
                <CustomLink to="/Visit" className="nav-item show-hide fs-3">
                  Visits
                </CustomLink>
                {/* <CustomLink to="/Sign" className="nav-item show-hide fs-3">
                Sign
                </CustomLink> */}
                <button className="btt-logout show-hide fs-3" onClick={logout}>
                  logout
                </button>
                <Link
                  className="profile-icon nav-item show-hide fs-3"
                  to="/MyProfile"
                >
                  <img src={profileIcon} alt="profile icon" height={43} />
                </Link>
              </ul>
            </div>
          </nav>
        </div>
      </main>
    );
  }

  return (
    <main className="main-nav">
      <div className="bg-img">
        <nav className="row">
          <div className="col-12 d-flex justify-content-end">
            <SideMenu />
          </div>
          <div className="one">
            <div className="landing-title">
              <Link className="landing" to="/">
                Healing
              </Link>
            </div>
            <ul className="nav d-flex p-2">
              <CustomLink to="/About" className="nav-item show-hide fs-3">
                About
              </CustomLink>
              <CustomLink to="/Visit" className="nav-item show-hide fs-3">
                Visit
              </CustomLink>
              <CustomLink to="/Login" className="nav-item show-hide fs-3">
                login
              </CustomLink>
              <CustomLink to="/Signup" className="nav-item show-hide fs-3">
                signup
              </CustomLink>
            </ul>
          </div>
        </nav>
      </div>
    </main>
  );

  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const is = useMatch({ path: resolvedPath.pathname, end: true });
    return (
      <li className={is ? "" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  }
};

export default Navbar;
