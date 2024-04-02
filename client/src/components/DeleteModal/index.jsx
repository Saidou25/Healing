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
      }, 2000);
    }
  };

  const bye = () => {
    setLoading(true);
    deleteAll();
  };

  return (
    <>
      <div className="d-flex top-level pb-5">
        <button
          type="button"
          className="btn btn-danger rounded-0 my-5"
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
              <h1
                className="modal-title-delete fs-1 text-light"
                id="exampleModalLabel"
              >
                Delete Account
              </h1>
              <button
                type="button"
                className="btn-close btn btn-primary mb-5"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body fs-4 mx-2">
              {!confirm && !successMessage && (
                <>
                  <p className="sure mt-4 text-light">
                    Are you sure you want to delete your account?
                  </p>
                  <div className="row mt-2">
                    <div className="col-6 my-2 pr-2">
                      <button
                        className="contact-me-button text-light bg-transparent btn fs-4"
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
                        className="contact-me-button btn bg-danger text-light fs-4"
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
