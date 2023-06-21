import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Spinner from '../../components/Spinner';
import Auth from '../../utils/auth';
import Navbar from "../../components/Navbar";
import Footer from '../../components/Footer';
import './index.css';

const Login = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({ email: '', password: '' });
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

            navigate('/Dashboard', { state: { formState } });

        } catch (e) {
            console.error(e);
        }
        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };
    if (loading) return <Spinner />
    return (
        <>
            <Navbar />
            <main className='container-login'>
                <div className="card login">
                    <h4 className="card-header header-login bg-primary rounded-0 text-light p-4">
                        Login</h4>
                    <div className="card-body p-3">
                        {data ?
                            <p>
                                Success! You may now head{' '}
                                <Link to="/Dashboard">to your Dashboard.</Link>
                            </p>
                            : (
                                <form onSubmit={handleFormSubmit}>
                                    <label className='form-label1 mb-4'>
                                        Email
                                    </label><br />
                                    <input
                                        className="form-input mb-4"
                                        placeholder="Your email"
                                        name="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                    /> <br />
                                    <label className='form-label1'>
                                        Password
                                    </label><br />
                                    <input
                                        className="form-input mt-3"
                                        placeholder="******"
                                        name="password"
                                        type="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                    /> <br />
                                    <div>
                                        {error && (
                                            <div className="bg-danger log-error text-white mt-5">
                                                <p className='error-message m-2 pt-3 pb-3'>
                                                    {error.message}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        className="btn btn-block rounded-0 mt-5 btn-info"
                                        style={{ cursor: 'pointer' }}
                                        type="submit">
                                        Submit
                                    </button>
                                </form>
                            )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};
export default Login;