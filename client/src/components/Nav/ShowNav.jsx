import axios from "axios";
import Nav from "./Nav";
import { useState, useEffect } from "react";

export default function ShowNav() {
  const [user, setUser] = useState(null);
  const [notSuper, setNotSuper] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("http://localhost:5000/getUser", {
        withCredentials: true,
      });
      console.log(response.data);
      setUser(response.data);

      if (response.data.role !== "Super Admin") {
        setNotSuper(true);
        console.log(response.data.role);
        console.log(notSuper)
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      {user && <Nav user={user.username} notSuper={notSuper} />}
    </>
  );
}
