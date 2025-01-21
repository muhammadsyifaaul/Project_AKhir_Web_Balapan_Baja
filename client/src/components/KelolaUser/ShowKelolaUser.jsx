import React, { useState, useEffect } from "react";
import KelolaUser from "./KelolaUser";
import FormKelolaUser from "./FormKelolaUser";
import axios from "axios";

export default function ShowKelolaUser() {
  const [user, setUser] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getAllUser");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEditUser = (userData) => {
    setEditingUser(userData);
    setIsFormOpen(true);
  };

  return (
    <div className="kelola-user-container">
      <button
        onClick={() => {
          setEditingUser(null);
          setIsFormOpen(true);
        }}
      >
        Tambah User
      </button>

      {isFormOpen && (
        <FormKelolaUser
          onClose={() => setIsFormOpen(false)}
          onUserAdded={fetchUser}
          userData={editingUser}
        />
      )}

      {user.map((user, index) => (
        <KelolaUser
          key={user._id}
          no={index + 1}
          {...user}
          onUserDeleted={fetchUser}
          onEdit={() => handleEditUser(user)} 
        />
      ))}
    </div>
  );
}
