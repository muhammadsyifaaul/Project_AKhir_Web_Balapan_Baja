import axios from "axios";
import Nav from "./Nav";
import { useState, useEffect } from "react";

export default function ShowNav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get('http://localhost:5000/getUser', {
  withCredentials: true 
});
            setUser(response.data.username);
            console.log(response);
        };
        fetchUser();
    }, []);

    return <Nav user={user} />;
}