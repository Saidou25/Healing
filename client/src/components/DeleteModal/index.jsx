import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_USER,
  DELETE_PROFILE,
  DELETE_BOOKINGDATE,
} from "../../utils/mutations";
import Auth from "../../utils/auth";
import Success from "../Success";
import ButtonSpinner from "../ButtonSpinner";
import "./index.css";

const DeleteModal = ({ userId, myAppointments, profileId }) => {
  const [confirm, setConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorHook, setErrorHook] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteUser] = useMutation(DELETE_USER);
  const [deleteProfile] = useMutation(DELETE_PROFILE);
  const [deleteBookingdate] = useMutation(DELETE_BOOKINGDATE);

  const logout = () => {
    Auth.logout();
  };

  const deleteAll = async () => {
    for (let bookingdate of myAppointments) {
      try {
        await deleteBookingdate({
          variables: { id: bookingdate._id },
        });
      } catch (e) {
        setErrorHook(e.message);
        setLoading(false);
        return;
      }
    }
    try {
      await deleteProfile({
        variables: { id: profileId },
      });
    } catch (e) {
      setErrorHook(e.message);
      setLoading(false);
      return;
    }
    try {
      await deleteUser({
        variables: { id: userId },
      });
    } catch (e) {
      setErrorHook(e.message);
      setLoading(false);
      return;
    } finally {
      setConfirm(false);
      setLoading(false);
      setErrorHook("");
      setSuccessMessage("Your profile has been deleted. Good bye...");
      setTimeout(() => {
        setSuccessMessage("");
        logout();
      }, 2500);
    }
  };

  const bye = () => {
    setLoading(true);
    deleteAll();
  };

  return (
    <>
      <div className="d-flex top-level">
        <button
          type="button"
          className="btn btn-danger mb-5 p-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          delete
        </button>
      </div>{" "}
      <div
        className="modal fade"
        id="staticBackdrop"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4
                className="d-flex align-items-center justify-content-center m-0 text-light"
                id="exampleModalLabel"
                style={{ fontWeight: "300"}}
              >
                Delete Account
              </h4>
              <button
                type="button"
                className="btn-close btn textlight"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-2">
              {!confirm && !successMessage && (
                <>
                  <p className="sure mt-2 text-light">
                    Are you sure you want to delete your account?
                  </p>
                  <div className="row mt-2">
                    <div className="col-6 my-2 pr-2">
                      <button
                        className="contact-me-button text-light bg-transparent btn"
                        type="button"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          setLoading(false);
                        }}
                        disabled={loading}
                      >
                        Close
                      </button>
                    </div>
                    <div className="col-6 my-2 pl-2">
                      <button
                        className="contact-me-button btn bg-danger text-light"
                        disabled={loading}
                        type="button"
                        onClick={bye}
                      >
                        {loading ? <ButtonSpinner /> : <>confirm</>}
                      </button>
                    </div>
                  </div>
                </>
              )}
              {successMessage && <Success message={`${successMessage}`} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteModal;
