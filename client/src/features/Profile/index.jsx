import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import { FaEnvelope, FaPhone, FaIdBadge, FaHome } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
import DeleteModal from "../../components/DeleteModal";
import Navbar from "../../components/Navbar";
import auth from "../../utils/auth";
import "./index.css";

const Profile = () => {
  const { data, loading } = useQuery(QUERY_ME);
  const me = data?.me || [];

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
            <div className="col-12 col-no-profile mb-5">
              <h3 className="text-profile my-profile-titles py-5 text-light">
                Login
              </h3>
              <div className="card review-list profile-body mb-5 p-3 text-light">
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
        <div className="footer-myprofile">
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="container-profile">
          <div className="flex-row justify-space-between">
            <div className="col-12 col-profile">
              <h3 className="text-profile my-profile-titles text-light py-5">
                Login
              </h3>
              <div className="card global-card review-list profile-body text-light p-3">
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
              <h3 className="text-profile my-profile-titles text-light mb-5 mt-5">
                General
              </h3>
              <div className="card review-list profile-body text-light p-3 ">
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
              <div className="card review-list profile-body text-light p-3">
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
            <div className="col-12 col-profile">
              <NavLink
                className="update-navlink"
                to="/UpdateProfile"
                state={{ userProfile: me.profile }}
              >
                <button className="btn update-profile mt-5 btn-info rounded-0">
                  update
                </button>
              </NavLink>
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
        <Footer />
      </>
    );
  }
};
export default Profile;
