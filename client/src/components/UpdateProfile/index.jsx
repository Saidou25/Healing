import React from "react";
import UpdateMyProfileForm from "../../components/UpdateMyProfileForm";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import auth from "../../utils/auth";
import { Navigate } from "react-router-dom";
import "./index.css";

const UpdateProfile = () => {
  // work is being done here to gather data needed to pre-populate the update form
  const { data } = useQuery(QUERY_ME);
  const meUser = data?.me || [];
  const userId = meUser._id;
  const userProfile = meUser.profile;
  const profileId = userProfile._id;

  if (!auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container-profile-update">
      <UpdateMyProfileForm
        userProfile={userProfile}
        userId={userId}
        profileId={profileId}
      />
    </div>
  );
};

export default UpdateProfile;
