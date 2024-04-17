import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { FaEnvelope, FaPhone, FaIdBadge, FaHome } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
import DeleteModal from "../../components/DeleteModal";
import Navbar from "../../components/Navbar";
import auth from "../../utils/auth";
import useMonitorWidth from "../../pages/Dashboard/useMonitorWidth";
import "./index.css";

const Profile = () => {
  const [showNav, setShowNav] = useState(false);
  const { data, loading } = useQuery(QUERY_ME);
  const me = data?.me || [];

  const { showDashboardMediaNav } = useMonitorWidth();

  useEffect(() => {
    if (showDashboardMediaNav) {
      setShowNav(showDashboardMediaNav);
    }
  }, [showDashboardMediaNav]);

  if (!auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  if (loading) return <Spinner />;

  if (!me.profile) {
    return (
      <>
        <Navbar />
        <div className="container-profile">
          <div className="flex-row justify-space-between">
            <div className="col-12 col-no-profile-login">
              <h3 className="text-profile my-profile-titles py-5 text-light">
                Login
              </h3>
              <div className="card global-card review-list profile-body-media mb-5 p-3">
                <div className="text-profile">
                  <FaIdBadge className="icon m-2" />
                  {me.username}
                </div>
                <div className="text-profile">
                  <FaEnvelope className="icon m-2" />
                  {me.email}
                </div>
              </div>
            </div>
          </div>
        </div>
        {showNav ? null : (
          <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
            <Footer />
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {showNav ? null : <Navbar />}
        <>
          <div className="container-profile">
            <div className="flex-row justify-space-between">
              <div className="col-12 col-profile">
                <h3 className="text-light my-5">Login</h3>
                <div className="card global-card review-list profile-body-media p-3">
                  <div className="text-profile">
                    <FaIdBadge className="icon m-2" />
                    {me.username}
                  </div>
                  <div className="text-profile text-light">
                    <FaEnvelope className="icon m-2" />
                    {me.email}
                  </div>
                </div>
              </div>
              <div className="col-12 col-profile">
                <h3 className="text-profile my-profile-titles text-light my-5">
                  General
                </h3>
                <div className="card review-list profile-body-media text-light p-3 ">
                  <div className="text-profile m-2">
                    First name: {me.profile.patientfirstname}
                  </div>
                  <div className="text-profile m-2">
                    Last name: {me.profile.patientlastname}
                  </div>
                  {me.profile?.birthdate ? (
                    <div className="text-profile m-2">
                      Birth date: {me.profile?.birthdate}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="col-12 col-profile">
                <h3 className="text-profile my-profile-titles text-light my-5">
                  Contact
                </h3>
                <div className="card review-list profile-body-media text-light p-3">
                  <div className="text-profile">
                    <FaPhone className="icon m-2" />
                    {me.profile.patientnumber}
                  </div>
                  <div className="text-profile">
                    <FaHome className="icon m-2" />
                    Address: {me.profile.patientaddress}
                  </div>
                  <div className="text-profile m-2">
                    City: {me.profile.patientcity}
                  </div>
                  <div className="text-profile m-2">
                    State: {me.profile.patientState}
                  </div>
                  <div className="text-profile m-2">
                    Zip code: {me.profile.patientzip}
                  </div>
                </div>
              </div>
              <div className="col-12 col-profile my-5">
                <>
                  <NavLink
                    to={"/UpdateProfile"}
                    state={{ userProfile: me.profile }}
                  >
                    <button className="btn mt-5 btn-info">
                      update
                    </button>
                  </NavLink>
                </>
              </div>
              <div className="col-12 col-profile">
                <DeleteModal
                  userProfile={me.profile}
                  userId={me._id}
                  myAppointments={me.bookingdates}
                  profileId={me.profile?._id}
                />
              </div>
            </div>
          </div>
        </>
        {showDashboardMediaNav ? null : <Footer />}
      </>
    );
  }
};
export default Profile;
