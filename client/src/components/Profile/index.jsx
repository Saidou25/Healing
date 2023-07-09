import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaIdBadge, FaHome } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Spinner from "../../components/Spinner";
import DeleteModal from "../DeleteModal";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./index.css";

const Profile = ({
  userProfile,
  userId,
  myAppointments,
  profileId,
  myPets,
}) => {
  const { data, loading } = useQuery(QUERY_ME);
  const me = data?.me || [];

  if (loading) return <Spinner />;

  if (!userProfile) {
    return (
      <div>
        <Navbar />
        <div className="container-profile mt-5">
          <div className="flex-row justify-space-between my-4">
            <div className="col-12 ">
              <h3 className="text-profile my-profile-titles mb-5 mt-5">Login</h3>
              <div className="card profile-body p-3">
                <div className="card-header">
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
        </div>
        <div className="footer-myprofile">
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <div className="container-profile mt-5">
          <div className="flex-row justify-space-between my-4">
            <div className="col-12 ">
              <h3 className="text-profile my-profile-titles mb-5 mt-5">Login</h3>
              <div className="card profile-body p-3">
                <div className="card-header">
                  <div className="text-profile">
                    <FaIdBadge className="icon m-2" />
                    {userProfile.username}
                  </div>
                  <div className="text-profile">
                    <FaEnvelope className="icon m-2" />
                    {me.email}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <h3 className="text-profile my-profile-titles mb-5 mt-5">General</h3>
              <div className="card profile-body p-3 ">
                <div className="card-header">
                  <div className="text-profile m-2">
                    First name: {userProfile.patientfirstname}
                  </div>
                  <div className="text-profile m-2">
                    Last name: {userProfile.patientlastname}
                  </div>
                  {userProfile.birthdate ? (
                    <div className="text-profile m-2">
                      Birth date: {userProfile.birthdate}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12">
              <h3 className="text-profile my-profile-titles mb-5 mt-5">Contact</h3>
              <div className="card profile-body p-3">
                <div className="card-header">
                  <div className="text-profile">
                    <FaPhone className="icon m-2" />
                    {userProfile.patientnumber}
                  </div>
                  <div className="text-profile">
                    <FaHome className="icon m-2" />
                    Address: {userProfile.patientaddress}
                  </div>
                  <div className="text-profile m-2">
                    City: {userProfile.patientcity}
                  </div>
                  <div className="text-profile m-2">
                    State: {userProfile.patientState}
                  </div>
                  <div className="text-profile m-2">
                    Zip code: {userProfile.patientzip}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <Link to="/UpdateProfile" state={{ userProfile }}>
                <button className="btn update-profile mt-5 btn-primary">
                  update
                </button>
              </Link>
            </div>
            <div>
              <DeleteModal
                userProfile={userProfile}
                userId={userId}
                myAppointments={myAppointments}
                profileId={profileId}
                myPets={myPets}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};
export default Profile;
