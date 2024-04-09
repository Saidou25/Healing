import React, { useEffect, useState } from "react";
import { sendMessage, ok, notOk, ok1, notOk1 } from "../../../utils/email.js";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../../utils/queries.js";
import "./index.css";
import Success from "../../../components/Success.jsx";
import ButtonSpinner from "../../../components/ButtonSpinner/index.jsx";
import ErrorComponent from "../../../components/ErrorComponent.jsx";

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
      }, 2500);
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
        className="btn btn-black text-light direct-message rounded-0 p-0"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <div className="message-btn-modal">contact</div>
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
              <h4
                className="d-flex align-items-center justify-content-center m-0 text-light"
                id="exampleModalLabel"
                style={{ fontWeight: "300" }}
              >
                Contact Me
              </h4>
              <button
                type="button"
                className="btn-close d-flex align-items-center"
                // style={{ color: "black", background: "blue" }}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {ok ? (
              <div className="modal-body m-2">
                <Success message="Your message was sent. Please check your emails for a confirmation." />
              </div>
            ) : (
              <>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <label className="mb-3 text-light">
                      Message
                    </label>
                    <textarea
                      className="form-control message-textarea mb-3"
                      type="text"
                      name="message"
                      value={message}
                      onChange={handleChange}
                      placeholder="Please type your message..."
                    />
                    <br />
                    {error && <ErrorComponent message={error} />}
                    <div className="row">
                      <div className="col-6">
                        <button
                          className="contact-me-button text-light bg-transparent btn"
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
                      <div className="col-6">
                        <button
                          className="contact-me-button btn bg-black text-light"
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
