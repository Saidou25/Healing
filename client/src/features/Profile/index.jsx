import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaIdBadge, FaHome } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
import DeleteModal from "../../components/DeleteModal";
import Navbar from "../../components/Navbar";
import "./index.css";

const Profile = ({
  userProfile,
  userId,
  myAppointments,
  profileId,
}) => {
 
  const { data, loading } = useQuery(QUERY_ME);
  const me = data?.me || [];

  if (loading) return <Spinner />;

  if (!me.profile) {
    return (
      <>
        <Navbar />
        <div className="container-profile">
          <div className="flex-row justify-space-between">
            <div className="col-12 ">
              <h3 className="text-profile my-profile-titles mb-5 mt-5 text-light">
                Login
              </h3>
              <div className="card profile-body p-3 text-light">
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
              <div className="card profile-body text-light p-3">
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
              <div className="card profile-body text-light p-3 ">
                <div className="text-profile m-2">
                  First name: {me.profile.patientfirstname}
                </div>
                <div className="text-profile m-2">
                  Last name: {me.profile.patientlastname}
                </div>
                {userProfile?.birthdate ? (
                  <div className="text-profile m-2">
                    Birth date: {me.profile?.birthdate}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="col-12 col-profile">
              <h3 className="text-profile my-profile-titles text-light mb-5 mt-5">
                Contact
              </h3>
              <div className="card profile-body text-light p-3">
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
            <div className="col-12 col-profile mt-5">
              <Link to="/UpdateProfile" state={{ userProfile: me.profile }}>
                <button className="btn update-profile mt-5 btn-info fs-5">
                  update
                </button>
              </Link>
            </div>
              <DeleteModal
                userProfile={userProfile}
                userId={userId}
                myAppointments={myAppointments}
                profileId={profileId}
              />
          </div>
        </div>
        <Footer />
      </>
    );
  }
};
export default Profile;
