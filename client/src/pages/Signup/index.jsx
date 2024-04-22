import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Footer from "../../components/Footer";
import ButtonSpinner from "../../components/ButtonSpinner";
import authServiceInstance from "../../utils/auth";
import Success from "../../components/Success";
import ErrorComponent from "../../components/ErrorComponent";
import Button from "../../components/Button";
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
          authServiceInstance.login(data.addUser.token);
          setConfirm(false);
          navigate("/Dashboard");
        }, 2500);
      }
    } catch (error) {
      setErrorHook(error.message);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="media-signup">
      <div className="go-back d-flex justify-content-center">
        <NavLink to="/">
          <Button
            type="btn"
            className="btn-go-back text-white"
            onClick={() => {
              setFormState({ email: "", username: "", password: "" });
              setLoading(false);
              setError("");
              setConfirm(false);
              setErrorHook("");
            }}
          >
            go back
          </Button>
        </NavLink>
      </div>

      {confirm ? (
        <div
          className="container-signup py-5"
          style={{ height: "60vh", display: "flex", alignItems: "center" }}
        >
          <div
            className="card bg-transparent"
            style={{ width: "40%", margin: "auto" }}
          >
            <Success message={`Welcome ${formState.username}.`} />
          </div>
        </div>
      ) : (
        <div className="container-signup py-5">
          <div className="card global-card signup p-5">
            <div className="card-header m-0 p-2">
              <h4
                className="bg-black rounded-0 text-light p-3 mb-3"
                style={{
                  fontStyle: "normal",
                  textAlign: "center",
                  width: "100%",
                  fontWeight: "300",
                }}
              >
                Sign Up
              </h4>
            </div>
            <div className="card-body">
              <form
                htmlFor="username"
                className="global-form"
                // onSubmit={handleFormSubmit}
              >
                <label htmlFor="username" className="log-form text-light">
                  Username
                </label>
                <br />
                <input
                  id="username"
                  autoComplete="on"
                  className="log-form input-input"
                  placeholder="choose a username..."
                  name="username"
                  type="username"
                  value={formState.username}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="email" className="log-form text-light">
                  Email
                </label>
                <br />
                <input
                  id="email"
                  autoComplete="on"
                  className="log-form input-input"
                  placeholder="your email.."
                  name="email"
                  type="email"
                  value={formState.email?.toLowerCase()}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="password" className="log-form text-light">
                  Password
                </label>
                <br />
                <input
                  id="password"
                  autoComplete="on"
                  className="log-form input-input mb-4"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <br />
                <br />
                {error && <ErrorComponent message={error} />}
                {/* <br /> */}
                {errorHook && <ErrorComponent message={errorHook} />}
                <Button
                  className="btn log-form btn-signup mb-2 p-2"
                  type="submit"
                  disabled={loading}
                  onClick={handleFormSubmit}
                  style={{
                    fontStyle: "normal",
                    fontWeight: "300",
                  }}
                >
                  {loading ? <ButtonSpinner /> : <>Submit</>}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default Signup;
