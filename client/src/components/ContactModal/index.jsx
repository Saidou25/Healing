import React, { useEffect, useState } from "react";
import { sendMessage, ok, notOk, ok1, notOk1 } from "../../utils/email.js";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries.js";
import ButtonSpinner from "../ButtonSpinner/index.jsx";
import ErrorComponent from "../ErrorComponent.jsx";
import Success from "../Success.jsx";
import "./index.css";

const ContactModal = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { data } = useQuery(QUERY_ME);
  const me = data?.me || [];

  let templateParams;

  const handleChange = (e) => {
    e.preventDefault();
    setError("");
    setLoading(false);
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // building templateParams for message confirmation email
    templateParams = {
      username: me.username,
      email: me.email,
      message: message,
    };
    setLoading(true);
    if (!message) {
      setLoading(false);
      setError("You need to leave a message");
      return;
    }
    setError("");
    // setLoading(false);
    sendMessage(templateParams);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  useEffect(() => {
    if (ok) {
      setLoading(false);
      setTimeout(() => {
        sendMessage("");
      }, 2000);
    }
  }, [ok]);

  useEffect(() => {
    if (notOk) {
      setLoading(false);
      setError(notOk);
      return;
    }
  }, [notOk]);

  return (
    <>
      <button
        type="button"
        className="btn btn-black text-light direct-message rounded-0"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <div className="message-btn-modal">Message</div>
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

            {ok ? (
              <div className="modal-body fs-4 m-2">
                <Success message="Your message was sent. Please check your emails for a confirmation." />
              </div>
            ) : (
              <>
                <div className="modal-body m-2">
                  <form onSubmit={handleSubmit}>
                    <label className="mb-5 text-light">
                      Message
                    </label>
                    <textarea
                      className="form-control message-textarea"
                      type="text"
                      name="message"
                      value={message}
                      onChange={handleChange}
                      placeholder="Please type your message..."
                    />
                    {error && <ErrorComponent message={error} />}
                    <div className="row mt-5">
                      <div className="col-6 my-2">
                        <button
                          className="contact-me-button text-light bg-transparent btn fs-4"
                          type="button"
                          data-bs-dismiss="modal"
                          onClick={() => {
                            setLoading(false);
                            setMessage("");
                            setError("");
                            sendMessage("");
                          }}
                        >
                          Close
                        </button>
                      </div>
                      <div className="col-6 my-2">
                        <button
                          className="contact-me-button btn bg-black fs-4"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? <ButtonSpinner /> : <>send</>}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactModal;
