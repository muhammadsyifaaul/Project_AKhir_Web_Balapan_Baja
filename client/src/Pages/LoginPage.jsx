export default function LoginApp() {
    return (
        <div>
            <form action="http://localhost:3000/Login" method="post">
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
            </form>
        </div>
    )
}