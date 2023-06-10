import React, { useState } from 'react';
import './index.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Spinner from '../../components/Spinner';
import Auth from '../../utils/auth';

const Signup = () => {
  const navigate = useNavigate();

  const [email, SetEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsename] = useState('');
  const [confirm, setConfirm] = useState(false);

  const [addUser, { error, data, loading }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
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
      setConfirm(true);
    } catch (e) {
      console.error(e);
    };
    setTimeout(() => {
      navigate('/Dashboard');
    }, 2500);
  };

  if (loading) return <Spinner />

  if (confirm === true) {
    return (
      <main className='row container-success'>
        <div className="col-12 appointment-success d-flex mb-2">
          <i className="d-flex fa-solid fa-check">
          </i>
        </div>
        <h2 className='col-12 signup-success d-flex justify-content-center'>
          Success!
        </h2>
        <p className='col-12 signup-success d-flex justify-content-center'>
          Let's now head to your dashboard...
        </p>
      </main>
    )
  }
  return (
    <>
      <Navbar />
      <div className='container-signup'>
        <div className="card signup">
          <h4 className="card-header bg-primary rounded-0 text-light p-4">
            Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <label className='text-label'>
                Username
              </label><br />
              <input
                className="form-input"
                placeholder="choose a username..."
                name="username"
                type="username"
                value={username}
                onChange={(e) => setUsename(e.target.value)}
              /><br />
              <label className='text-label'>
                Email
              </label><br />
              <input
                className="form-input"
                placeholder="your email.."
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
              /><br />
              <label className='text-label'>
                Password
              </label><br />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /><br />
              <button
                className="btn btn-info rounded-0 mt-5"
                type="button"
                style={{ cursor: 'pointer' }}
                onClick={handleFormSubmit}>
                Submit
              </button>
            </form>
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='footer-signup'>
        <Footer />
      </div>
    </>
  );
};
export default Signup;