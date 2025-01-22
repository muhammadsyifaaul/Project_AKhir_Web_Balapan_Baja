// import './Login.css'
// export default function Login() {
//     return (
//         <div>
//             <form action="http://localhost:3000/Login" method="post">
//             <input type="text" name="username" placeholder="Username" />
//             <input type="password" name="password" placeholder="Password" />
//             <button type="submit">Login</button>
//             </form>
//         </div>
//     )
// }
import './Login.css';

export default function Login() {
    return (
        <div className="login-container">
            <div className="login-card">
                <img src="/images/logo_smg.webp" alt="Logo" className="login-logo"/>
                <h2> Login </h2>
                <form action="http://localhost:5000/Login" method="post">
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
