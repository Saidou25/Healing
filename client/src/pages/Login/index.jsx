import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Button from "../../components/Button";
import authServiceInstance from "../../utils/auth";
import Footer from "../../components/Footer";
import ButtonSpinner from "../../components/ButtonSpinner";
import Success from "../../components/Success";
import ErrorComponent from "../../components/ErrorComponent";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState(false);
  const [errorHook, setErrorHook] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({ email: "", password: "" });

  const [login] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    setLoading(false);
    setError("");
    setErrorHook("");

    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorHook("");
    setConfirm(false);
    setError("");
    if (!formState.email || !formState.password) {
      setError("All fields are requiered!");
      setErrorHook("");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data } = await login({
        variables: { email: formState.email, password: formState.password },
      });
      if (data) {
        authServiceInstance.login(data.login.token);
        setConfirm(true);
        setLoading(false);
        setError("");
        setErrorHook("");
        setTimeout(() => {
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
    <>
      <div className="go-back d-flex justify-content-center">
        <NavLink to="/">
          <Button
            type="btn"
            className="btn-go-back text-white g-0"
            onClick={() => {
              setFormState({ email: "", password: "" });
              setLoading(false);
              setError("");
              setConfirm(false);
              setErrorHook("");
            }}
            style={{
              fontStyle: "normal",
              fontWeight: "300",
            }}
          >
            go back
          </Button>
        </NavLink>
      </div>

      {confirm ? (
        <div
          className="container-login py-5"
          style={{ height: "60vh", display: "flex", alignItems: "center" }}
        >
          <div className="card bg-transparent" style={{ margin: "auto" }}>
            <Success message="You are logged in." />
          </div>
        </div>
      ) : (
        <div className="container-login py-5">
          <div className="card global-card signup p-5">
            <h4
              className="log-form bg-black rounded-0 text-light my-3 p-3"
              style={{
                fontStyle: "normal",
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Login
            </h4>
            <div className="card-body">
              <form className="global-form">
                <label htmlFor="email" className="log-form text-light">
                  Email
                </label>
                <br />
                <input
                  id="email"
                  autoComplete="on"
                  className="log-form input-input"
                  placeholder="Your holder email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />{" "}
                <br />
                <label htmlFor="password" className="log-form text-light">
                  Password
                </label>
                <br />
                <input
                  id="password"
                  className="log-form input-input mb-4"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  autoComplete="on"
                />
                <br />
                <br />
                {error && <ErrorComponent message={error} />}
                <br />
                {errorHook && <ErrorComponent message={errorHook} />}
                <Button
                  className="btn log-form btn-login mb-2 p-2"
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
      <div style={{ width: "100%" }}>
        <Footer />
      </div>
    </>
  );
};
export default Login;
