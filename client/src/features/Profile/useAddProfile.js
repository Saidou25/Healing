import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";
import { QUERY_ME, QUERY_PROFILES } from "../../utils/queries";

const useAddProfile = (profileInformation) => {
  const [errorAddingProfile, setErrorAddingProfile] = useState("");
  const [successAddingProfile, setSuccessAddingProfile] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    data: meData,
    error: meError,
    loading: meLoading,
  } = useQuery(QUERY_ME);

  // Updating the cache with newly created appointment
  const [addProfile] = useMutation(ADD_PROFILE, {
    update(cache, { data: { addProfile } }) {
      try {
        const { profiles } = cache.readQuery({ query: QUERY_PROFILES });
        cache.writeQuery({
          query: QUERY_PROFILES,
          data: {
            profiles: [...profiles, addProfile],
          },
        });
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, profile: { ...me.profile, addProfile } } },
        });
      } catch (error) {
        setErrorAddingProfile(error.message);
      }
    },
    refetchQueries: [{ query: QUERY_ME }],
  });

  const newProfile = useCallback(async () => {
    setLoading(true);
    if (!profileInformation) {
      return;
    }

    try {
      const { data } = await addProfile({
        variables: {
          birthdate: profileInformation.birthdate,
          patientState: profileInformation.patientState,
          patientaddress: profileInformation.patientaddress,
          patientcity: profileInformation.patientcity,
          patientfirstname: profileInformation.patientfirstname,
          patientgender: profileInformation.patientgender,
          patientlastname: profileInformation.patientlastname,
          patientnumber: profileInformation.patientnumber,
          patientzip: profileInformation.patientzip,
          username: profileInformation.username,
        },
      });
     
    } catch (err) {
      setErrorAddingProfile(err.message);
    } finally {
      setSuccessAddingProfile("success creating your profile.");
      setErrorAddingProfile("");
      setLoading(false);
    }
  }, [profileInformation, addProfile]);

  useEffect(() => {
    const myData = meData?.me || [];
    if (myData.profile || !profileInformation) {
      return;
    }
    newProfile();
  }, [profileInformation, newProfile, meData]);
  return { loading, errorAddingProfile, successAddingProfile };
};
export default useAddProfile;
