import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Footer from "../../components/Footer";
import pic from "../../assets/images/nenuphar.jpeg";
import Spinner from "../../components/Spinner";
import Auth from "../../utils/auth";
import "./index.css";

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

  if (loading) return <Spinner />;

  if (confirm === true) {
    return (
      <main className="row container-success">
        <div className="col-12 appointment-success d-flex mb-2">
          <i className="d-flex fa-solid fa-check"></i>
        </div>
        <h2 className="col-12 signup-success d-flex justify-content-center">
          Success!
        </h2>
        <p className="col-12 signup-success d-flex justify-content-center">
          Let's now head to your dashboard...
        </p>
      </main>
    );
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
      <div className="bg-image" src={pic} alt="care">
        <div className="container-signup g-0">
          <div className="card signup">
            <h4 className="card-header signup-header text-primary-emphasis p-4">
              Sign Up
            </h4>
            <div className="card-body overlay p-4">
              <form onSubmit={handleFormSubmit}>
                <label className="form-label1 text-primary-emphasis mb-4 mt-0">
                  Username
                </label>
                <br />
                <input
                  className="form-input"
                  placeholder="choose a username..."
                  name="username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsename(e.target.value)}
                />
                <br />
                <label className="form-label1 text-primary-emphasis mb-4">
                  Email
                </label>
                <br />
                <input
                  className="form-input"
                  placeholder="your email.."
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                />
                <br />
                <label className="form-label1  text-primary-emphasis mb-4">
                  Password
                </label>
                <br />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <div className="btn-position">
                  <button
                    className="btn btn-primary btn-signup rounded-0 mt-5"
                    type="button"
                    style={{ cursor: "pointer" }}
                    onClick={handleFormSubmit}
                  >
                    Submit
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
