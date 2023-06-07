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
    const [email, setEaddress] = useState('');
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data, loading }] = useMutation(LOGIN_USER);

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
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);

            navigate('/Dashboard', { state: formState });
            setFormState({
                email: '',
                password: '',
            });
        } catch (e) {
            console.error(e);
            navigate('/');
        }
    };
    if (loading) return <Spinner />
    return (
        <>
            <Navbar />
            <main className='container-login'>
                <div className="card login">
                    <h4 className="card-header bg-primary rounded-0 text-light p-4"
                        style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                        Login</h4>
                    <div className="card-body">
                        {data ?
                            <p>
                                Success! You may now head{' '}
                                <Link to="/Dashboard">to your Dashboard.</Link>
                            </p>
                            : (
                                <form onSubmit={handleFormSubmit}>
                                    <label className='text-label' style={{ fontSize: '1.5rem' }}>
                                        Email
                                    </label><br />
                                    <input
                                        style={{ fontSize: '1.3rem' }}
                                        className="form-input"
                                        placeholder="Your email"
                                        name="eAddress"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                    /> <br />
                                    <label className='text-label' style={{ fontSize: '1.5rem' }}>
                                        Password
                                    </label><br />
                                    <input
                                        style={{ fontSize: '1.3rem' }}
                                        className="form-input mt-4"
                                        placeholder="******"
                                        name="password"
                                        type="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                    /> <br />
                                    <button
                                        className="btn btn-block rounded-0 mt-5 btn-info"
                                        style={{ cursor: 'pointer' }}
                                        type="submit">
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
            </main>
            <Footer />
        </>
    );
};
export default Login;