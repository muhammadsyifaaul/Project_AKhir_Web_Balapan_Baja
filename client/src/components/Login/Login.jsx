import './Login.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const response = await axios.post('http://localhost:5000/Login', data);
            console.log('Response Status:', response.status);
            console.log('Response Data:', response.data);

            if (response.status !== 200) {
                setErrorMessage(response.data.message || 'An error occurred');
            } else {
                console.log('Redirecting to Home...');
                // window.location.href = `/Home`;
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage(error.response ? error.response.data.message : 'An error occurred');
        }
    };

    // useEffect(() => {
    //     if (errorMessage) {
    //         const timer = setTimeout(() => {
    //             setErrorMessage('');
    //         }, 2000);

    //         return () => clearTimeout(timer);
    //     }
    // }, [errorMessage]);

    return (
        <div className="login-container">
            <div className="login-card">
                <img src="/images/logo_smg.webp" alt="Logo" className="login-logo"/>
                <h2>Login</h2>
                <form action='http://localhost:5000/Login' method='post'>
                    <input type="text" name="username" placeholder="Username" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
                {/* {errorMessage && (
                    <div className="error-popup">
                        {errorMessage}
                    </div>
                )} */}
            </div>
        </div>
    );
}
