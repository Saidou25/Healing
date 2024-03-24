import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Spinner from "../../components/Spinner";
import Auth from "../../utils/auth";
// import pic from "../../assets/images/practitioner.jpeg";
import Footer from "../../components/Footer";
import "./index.css";
import ButtonSpinner from "../../components/ButtonSpinner";
import Success from "../../components/Success";

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [confirm, setConfirm] = useState("");

  const [login, { error, data, loading }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    } finally {
      setConfirm(true);
      // clear form values
      setFormState({
        email: "",
        password: "",
      });
      setTimeout(() => {
        setConfirm(false);
        navigate("/Dashboard", { state: { formState } });
      }, 1500);
    }
  };

  if (confirm) {
    return <Success message={`Welcome ${data?.login.user.username}.`} />;
  }
  return (
    <>
      <div className="go-back d-flex justify-content-center">
        <Link to="/">
          <button type="btn" className="btn-go-back text-white">
            go back
          </button>
        </Link>
      </div>
      <div className="signup-login-error">
        {error && (
          <div className="my-3 p-3 bg-warning text-white mt-5">
            {error.message}
          </div>
        )}
      </div>
      {/* <div className="design"> */}
      <main className="container-login g-0 p-5">
        <div className="card login my-5">
          <h4
            className="card-header-update log-form bg-black rounded-0 text-light p-4 mt-5"
            style={{ width: "90%", fontStyle: "normal" }}
          >
            Login
          </h4>
          <div className="card-body p-3">
            <form className="log-form px-5" onSubmit={handleFormSubmit}>
              <label className="log-form text-light mt-0">Email</label>
              <br />
              <input
                className="log-form mb-4"
                placeholder="Your holder email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />{" "}
              <br />
              <label className="log-form text-light mt-0">Password</label>
              <br />
              <input
                className="log-form mt-3"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                autoComplete="on"
              />{" "}
              <br />
              <div></div>
              <div className="btn-position">
                <button
                  className="btn btn-login log-form rounded-0 my-5"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <ButtonSpinner /> : <>Submit</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      {/* </div> */}
      <Footer />
    </>
  );
};
export default Login;
