import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Signup = () => {
  const [email, setEaddress] = useState('');
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'eAddress') {
      setEaddress(value.toLowerCase());
    }

    setFormState({
      ...formState,
      [name]: value,
      email: email
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <div className='container-signup'>
        <div className="card signup">
          <h4 className="card-header bg-primary rounded-0 text-light p-4">
            Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/Login">lets now login.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label className='text-label'>
                  Username
                </label><br />
                <input
                  className="form-input"
                  placeholder="choose a username..."
                  name="username"
                  type="username"
                  value={formState.username}
                  onChange={handleChange}
                /><br />
                <label className='text-label'>
                  Email
                </label><br />
                <input
                  className="form-input"
                  placeholder="your email.."
                  
                  name="eAddress"
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
                  value={formState.password}
                  onChange={handleChange}
                /><br />
                <button
                  className="btn btn-info rounded-0 mt-5"
                  type="button"
                  style={{ cursor: 'pointer' }}
                  onClick={handleFormSubmit}>
                  Submit
                </button>
              </form>
            )}
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Signup;