import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './index.css';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('formState from signup', formState);
    console.log('username', formState);

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
    <div className='container-signup'>
      <div className="card-signup">
        <h4 className="card-header bg-dark text-light p-4" style={{ fontSize: '1.7rem', borderRadius: '20px', textAlign: 'center' }}>Sign Up</h4>
        <div className="card-body">
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/Login">lets now login.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <label className='text-label' style={{ fontSize: '1.7rem' }}>
                Username
              </label><br />
              <input
                className="form-input"
                placeholder="Your name"
                style={{ fontSize: '1.5rem', borderRadius: '20px' }}
                name="username"
                type="username"
                value={formState.username}
                onChange={handleChange}
              /><br />
              <label className='text-label' style={{ fontSize: '1.7rem' }}>
                Email
              </label><br />
              <input
                className="form-input"
                placeholder="Your email"
                style={{ fontSize: '1.5rem', borderRadius: '20px' }}
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              /><br />
              <label className='text-label' style={{ fontSize: '1.7rem' }}>
                Password
              </label><br />
              <input
                className="form-input"
                placeholder="******"
                style={{ fontSize: '1.5rem', borderRadius: '20px' }}
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              /><br />
              <button
                className="btn btn-block btn-info m-10"
                style={{ cursor: 'pointer', fontSize: '1.5rem', margin: '15px', borderRadius: '20px' }}
                type="submit"
              >
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
  );
};
export default Signup;