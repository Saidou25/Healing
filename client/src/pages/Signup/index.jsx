import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Footer from "../../components/Footer";
import pic from "../../assets/images/nenuphar.jpeg";
import ButtonSpinner from "../../components/ButtonSpinner";
import Auth from "../../utils/auth";
import "./index.css";
import Success from "../../components/Success";

const Signup = () => {
  const navigate = useNavigate();

  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsename] = useState("");
  const [confirm, setConfirm] = useState(false);

  const [addUser, { error, loading }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      const lowerCaseEmail = value.toLowerCase();
      SetEmail(lowerCaseEmail);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { username: username, password: password, email: email },
      });
      Auth.login(data.addUser.token);
      if (data) {
        setConfirm(true);
        setTimeout(() => {
          navigate("/Dashboard");
        }, 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (confirm) {
    return <Success message={`Welcome ${username}.`} />;
  }
  return (
    <>
      <div className="go-back d-flex justify-content-center">
        <NavLink to="/">
          <button type="btn" className="btn-go-back text-white">
            go back
          </button>
        </NavLink>
      </div>
      <div className="signup-login-error">
        {error && (
          <div className="my-3 p-3 bg-warning text-white mt-5">
            {error.message}
          </div>
        )}
      </div>
      <div className="bg-image" src={pic} alt="care">
        <div className="container-signup p-5">
          <div className="card signup">
            <h4
              className="card-header-update log-form bg-black rounded-0 text-light p-4 mt-5"
              style={{ width: "90%", fontStyle: "normal" }}
            >
              Sign Up
            </h4>
            <div className="card-body overlay p-4">
              <form className="px-5" onSubmit={handleFormSubmit}>
                <label className="sign-form text-light mt-0 mb-4">
                  Username
                </label>
                <br />
                <input
                  className="sign-form sign-input mb-4"
                  placeholder="choose a username..."
                  name="username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsename(e.target.value)}
                />
                <br />
                <label className="sign-form text-light mt-0">Email</label>
                <br />
                <input
                  className="sign-form sign-input mt-4"
                  placeholder="your email.."
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                />
                <br />
                <label className="sign-form text-light mt-0">Password</label>
                <br />
                <input
                  className="log-form my-4"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <div className="btn-position">
                  <button
                    className="btn sign-form mt-5 btn-signup rounded-0 my-5"
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
      </div>
      <div className="footer-signup">
        <Footer />
      </div>
    </>
  );
};
export default Signup;
