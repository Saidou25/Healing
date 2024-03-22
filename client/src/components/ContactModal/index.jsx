import React, { useState } from "react";
import { sendMessage } from "../../utils/email.js";
import "./index.css";

const ContactModal = (props) => {
  const username = props.username;
  const email = props.email;

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = () => {
    // building templateParams for message confirmation email
    const templateParams = {
      username: username,
      email: email,
      message: message,
    };
    if (!message) {
      setConfirm("");
      console.log("no message sent");
      setError("You need to leave a message");
      return;
    }
    setConfirm("Message sent. You can now close the window.");
    sendMessage(templateParams);
    setTimeout(() => {
      setConfirm("");
    }, 5000);
    // Clearing form
    sendMessage(templateParams);
    setError("");
    setMessage("");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-black text-light direct-message rounded-0"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <div className="message-btn-modal">message</div>
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title-contact fs-1 text-light"
                id="exampleModalLabel"
              >
                Contact Me
              </h1>
              <button
                type="button"
                className="btn-close btn btn-primary mb-5"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body fs-4 m-2">
              <form>
                <label className="form-label-contact text-primary mb-5 fs-4 text-light px-1">
                  Message
                </label>
                <textarea
                  className="form-control message-textarea"
                  type="text"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please type your message..."
                />
                {error && (
                  <p className="my-3 p-3 bg-danger text-white fs-6 mt-5">
                    {error}
                  </p>
                )}
                {confirm && (
                  <p className="my-3 p-3 bg-success text-white fs-6 mt-5">
                    {confirm}
                  </p>
                )}
                <div className="row mt-5">
                  <div className="col-6 my-2">
                    <button
                      className="contact-me-button text-light bg-transparent btn fs-4"
                      type="button"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                  <div className="col-6 my-2">
                    <button
                      className="contact-me-button btn bg-black fs-4"
                      type="button"
                      onClick={handleSubmit}
                    >
                      send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactModal;
