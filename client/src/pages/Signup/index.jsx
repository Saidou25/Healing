import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Footer from "../../components/Footer";
import ButtonSpinner from "../../components/ButtonSpinner";
import Auth from "../../utils/auth";
import Success from "../../components/Success";
import ErrorComponent from "../../components/ErrorComponent";
import "./index.css";

const Signup = () => {
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");
  const [errorHook, setErrorHook] = useState("");
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [addUser] = useMutation(ADD_USER);

  const handleChange = (event) => {
    setError("");
    setErrorHook("");
    setLoading(false);

    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setConfirm(false);
    setLoading(true);
    setError("");
    if (!formState.username || !formState.email || !formState.password) {
      setError("All fields are required!");
      setErrorHook("");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await addUser({
        variables: {
          username: formState.username,
          password: formState.password,
          email: formState.email,
        },
      });
      if (data) {
        setConfirm(true);
        setLoading(false);
        setError("");
        setErrorHook("");
        setTimeout(() => {
          Auth.login(data.addUser.token);
          setConfirm(false);
          navigate("/Dashboard");
        }, 2000);
      }
    } catch (error) {
      setErrorHook(error.message);
      setLoading(false)
      return;
    }
  };

  return (
    <>
      <div className="go-back d-flex justify-content-center">
        <NavLink to="/">
          <button type="btn" className="btn-go-back text-white">
            go back
          </button>
        </NavLink>
      </div>

      {confirm ? (
        <div className="container-signup p-5"
        style={{ height: "60vh", display: "flex", alignItems: 'center' }}>
          <div
            className="card bg-transparent"
            style={{ width: "40%", margin: "auto" }}
          >
            <Success message={`Welcome ${formState.username}.`} />
          </div>
        </div>
      ) : (
        <div className="container-signup p-5">
          <div className="card global-card signup p-5">
            <div className="card-header">
              <h4
                className="log-form bg-black rounded-0 text-light p-5 mb-5"
                style={{ fontStyle: "normal", textAlign: "center", width: "100%" }}
              >
                Sign Up
              </h4>
            </div>
            <div className="card-body">
              <form className="global-form" onSubmit={handleFormSubmit}>
                <label className="log-form text-light">Username</label>
                <br />
                <input
                  className="log-form input-input"
                  placeholder="choose a username..."
                  name="username"
                  type="username"
                  value={formState.username}
                  onChange={handleChange}
                />
                <br />
                <label className="log-form text-light">Email</label>
                <br />
                <input
                  className="log-form input-input"
                  placeholder="your email.."
                  name="email"
                  type="email"
                  value={formState.email?.toLowerCase()}
                  onChange={handleChange}
                />
                <br />
                <label className="log-form text-light">Password</label>
                <br />
                <input
                  className="log-form input-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <br />
                {error && <ErrorComponent message={error} />}
                <br />
                {errorHook && <ErrorComponent message={errorHook} />}
                <div className="btn-position">
                  <button
                    className="btn log-form btn-signup rounded-0 my-5 p-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <ButtonSpinner /> : <>Submit</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="footer-signup">
        <Footer />
      </div>
    </>
  );
};
export default Signup;
