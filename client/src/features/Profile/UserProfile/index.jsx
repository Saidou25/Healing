import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaIdBadge, FaHome } from "react-icons/fa";
// import { useQuery } from "@apollo/client";
// import Spinner from "../../components/Spinner";
import Footer from "../../../components/Footer";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../../utils/queries";
import DeleteModal from "./../../../components/DeleteModal";
// import { useUser } from "../../context/userContext";
import Navbar from "../../../components/Navbar";
import "./index.css";

const UserProfile = ({
  userProfile,
  userId,
  myAppointments,
  profileId,
  myPets,
}) => {
  // const { me } = useUser();
  const { data, loading } = useQuery(QUERY_ME);
  const me = data?.me || [];

  // if (loading) return <Spinner />;

  if (!me.profile) {
    return (
      <div>
        <Navbar />
        <div className="container-profile mt-5">
          <div className="flex-row justify-space-between my-4">
            <div className="col-12 ">
              <h3 className="text-profile my-profile-titles mb-5 mt-5">
                Login
              </h3>
              <div className="card profile-body p-3">
                {/* <div className="card-header"> */}
                <div className="text-profile">
                  <FaIdBadge className="icon m-2" />
                  {me.username}
                </div>
                <div className="text-profile">
                  <FaEnvelope className="icon m-2" />
                  {me.email}
                </div>
              </div>
              {/* </div> */}
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
              <h3 className="text-profile my-profile-titles mb-5 mt-5">
                Login
              </h3>
              <div className="card profile-body p-3">
                {/* <div className="card-header"> */}
                <div className="text-profile">
                  <FaIdBadge className="icon m-2" />
                  {me.username}
                </div>
                <div className="text-profile">
                  <FaEnvelope className="icon m-2" />
                  {me.email}
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className="col-12">
              <h3 className="text-profile my-profile-titles mb-5 mt-5">
                General
              </h3>
              <div className="card profile-body p-3 ">
                {/* <div className="card-header"> */}
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
              {/* </div> */}
            </div>

            <div className="col-12">
              <h3 className="text-profile my-profile-titles mb-5 mt-5">
                Contact
              </h3>
              <div className="card profile-body p-3">
                {/* <div className="card-header"> */}
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
              {/* </div> */}
            </div>
            <div className="col-12 mt-5">
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
export default UserProfile;
