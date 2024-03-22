import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_USER,
  DELETE_PROFILE,
  DELETE_BOOKINGDATE,
} from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./index.css";

const DeleteModal = ({ userId, myAppointments, profileId }) => {
  const [deleteUser] = useMutation(DELETE_USER);
  const [deleteProfile] = useMutation(DELETE_PROFILE);
  const [deleteBookingdate] = useMutation(DELETE_BOOKINGDATE);
  const [confirm, setConfirm] = useState(false);

  const logout = () => {
    Auth.logout();
    console.log("logout success!");
  };
  const bye = () => {
    setConfirm(true);
    setTimeout(() => {
      deleteAll();
    }, 3000);
  };

  const deleteAll = async () => {
    for (let bookingdate of myAppointments) {
      const { data } = await deleteBookingdate({
        variables: { id: bookingdate._id },
      });
    }
    try {
      const { data } = await deleteProfile({
        variables: { id: profileId },
      });
    } catch (e) {
      console.error(e);
    }
    try {
      const { data } = await deleteUser({
        variables: { id: userId },
      });
    } catch (e) {
      console.error(e);
    }
    logout();
    console.log("success");
  };

  return (
    <>
      <div className="d-flex top-level pb-5">
        <button
          type="button"
          className="btn btn-danger btn-modal my-5"
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
            {!confirm ? (
              <>
                <div className="modal-body fs-4 mx-2">
                  <p className="sure mt-4">
                    Are you sure you want to delete your account?
                  </p>
                </div>
                <div className="row mt-2">
                  <div className="col-6 my-2 pr-2">
                    <button
                      className="contact-me-button text-light bg-transparent btn fs-4"
                      // className="btn btn-secondary fs-4 "
                      type="button"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                  <div className="col-6 my-2 pl-2">
                    <button
                      className="contact-me-button btn bg-danger text-light fs-4"
                      // className="btn btn-danger fs-4"
                      type="button"
                      onClick={bye}
                    >
                      confirm
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <main className="row container-delete-success mt-5 mb-5">
                <div className="col-12 d-flex appointment-success mb-2">
                  <i className="fa-solid fa-check d-flex"></i>
                </div>
                <h2 className="col-12 signup-success d-flex justify-content-center">
                  Success!
                </h2>
                <p className="col-12 signup-success d-flex justify-content-center">
                  Good bye...
                </p>
              </main>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteModal;
