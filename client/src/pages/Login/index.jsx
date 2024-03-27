import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
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
        Auth.login(data.login.token);
        setConfirm(true);
        setLoading(false);
        setError("");
        setErrorHook("");
        setTimeout(() => {
          setConfirm(false);
          navigate("/Dashboard");
        }, 2000);
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
          <button type="btn" className="btn-go-back text-white"
          >
            go back
          </button>
        </NavLink>
      </div>

      {confirm ? (
        <div className="container-signup p-5"
        style={{ height: "60vh", display: "flex", alignItems: 'center' }}>
          <div className="card login my-5">
            <div
              className="card bg-transparent"
            >
              <Success message="You are logged in." />
            </div>
          </div>
        </div>
      ) : (
        <div className="container-signup p-5">
          <div className="card global-card signup p-5">
            <h4
              className="log-form bg-black rounded-0 text-light my-3 p-5"
              style={{ textAlign: "center" }}
            >
              Login
            </h4>
            <div className="card-body">
              <form className="global-form" onSubmit={handleFormSubmit}>
                <label className="log-form text-light">Email</label>
                <br />
                <input
                  className="log-form input-input"
                  placeholder="Your holder email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />{" "}
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
                  autoComplete="on"
                />
                <br />
                {error && <ErrorComponent message={error} />}
                <br />
                {errorHook && <ErrorComponent message={errorHook} />}
                <div className="btn-position">
                  <button
                    className="btn log-form btn-signup rounded-0 my-5 p-2"
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
      <Footer />
    </>
  );
};
export default Login;
