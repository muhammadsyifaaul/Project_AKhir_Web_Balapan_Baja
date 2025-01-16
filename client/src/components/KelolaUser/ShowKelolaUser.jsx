import { useState, useEffect } from "react";
import KelolaUser from "./KelolaUser";
import axios from "axios";
export default function ShowKelolaUser() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => { 
            const response = await axios.get('http://localhost:5000/getAllUser');
            setUser(response.data);
            console.log(response);
        };
        fetchUser();
    }, []);

    return (
        <div>
            {user.map((user, index) => (
                <KelolaUser
                    key={user._id}
                    no={index + 1}
                    {...user}
                />
            ))}
        </div>
    );
}