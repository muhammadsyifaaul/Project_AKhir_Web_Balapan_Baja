import './Login.css';

export default function Login() {
    return (
<<<<<<< HEAD
        <div id="login-form">
            <div className="login-container">
                <div className="login-card">
                    <img src="/images/logo_smg.webp" alt="Logo" className="login-logo"/>
                    <h1> Account Login </h1>
                    <p>Please enter your credentials to log in to your account</p>
                    <form action="http://localhost:5000/Login" method="post">
                        <input type="text" name="username" placeholder="Username" />
                        <input type="password" name="password" placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                </div>
=======
        <div className="login-container">
            <div className="login-card">
                <img src="/images/logo_smg.webp" alt="Logo" className="login-logo"/>
                <h2> Login </h2>
                <form action="http://localhost:5000/Login" method="post">
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
>>>>>>> c7ccb4e8e10758e9e906e7a1a9c28478f823ce20
            </div>
        </div>
    );
}