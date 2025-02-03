import './Login.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const data = {
            username: form.username.value,
            password: form.password.value
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/Login`, data,{ withCredentials: 'true' })
            if (response.status !== 200) {
                setErrorMessage(response.data.message || 'An error occurred');
            } else {
                console.log('Redirecting to Home...');
                window.location.href = '/Home'; 
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <div className="login-container">
            <div className="login-card">
                <img src="/images/logo_smg.webp" alt="Logo" className="login-logo"/>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
                {errorMessage && (
                    <div className="error-popup">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
