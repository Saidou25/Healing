import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_USER, DELETE_PET, DELETE_PROFILE, DELETE_BOOKINGDATE } from '../../utils/mutations';
import Auth from "../../utils/auth";
import "./index.css";

const DeleteModal = ({ userId, myAppointments, profileId, myPets }) => {

    const [deleteUser] = useMutation(DELETE_USER);
    const [deleteProfile] = useMutation(DELETE_PROFILE);
    const [deletePet] = useMutation(DELETE_PET);
    const [deleteBookingdate] = useMutation(DELETE_BOOKINGDATE);

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        console.log('logout success!');
    };

    const deleteAll = async (event) => {
        for (let pet of myPets) {
            const { data } = await deletePet({
                variables: { username: pet.username }
            });
        }
        for (let bookingdate of myAppointments) {
            const { data } = await deleteBookingdate({
                variables: { id: bookingdate._id }
            });
        }
        try {
            const { data } = await deleteProfile({
                variables: { id: profileId }
            })
        } catch (e) {
            console.error(e);
        }
        try {
            const { data } = await deleteUser({
                variables: { id: userId }
            })
        } catch (e) {
            console.error(e);
        }
        console.log('success');
        logout(event);
    };

    return (
        <>
            <div className='d-flex justify-content-end'>
                <button
                    type="button"
                    className="btn btn-danger btn-modal delete-user mt-5"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    delete
                </button>
            </div>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className='row'>
                                <div className="col-12 modal-header">
                                    <h1 className="modal-title-delete fs-1" id="exampleModalLabel">
                                        Delete Account
                                    </h1>
                                    <button type="button" className="btn-close btn btn-primary mb-5" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="col-12 d-flex justify-content-center modal-body fs-4 mt-4 mb-4">
                                    <p>Are you sure you want to delete your account?</p>
                                </div>
                                <div className='row mb-3 p-3'>
                                    <button className="col-6 btn btn-secondary fs-4"
                                        type="button"
                                        data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button className="col-6 btn btn-danger fs-4"
                                        type="button"
                                        onClick={(event) => { deleteAll(event) }}>
                                        confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default DeleteModal;