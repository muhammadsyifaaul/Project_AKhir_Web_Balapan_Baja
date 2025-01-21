import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FormKelolaUser({ onClose, onUserAdded, userData }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin OPD");
  const [message, setMessage] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    if (userData) {
      setUsername(userData.username || "");
      setName(userData.name || "");
      setPassword(""); 
      setRole(userData.role || "Admin OPD");
    }
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (userData) {
        const response = await axios.put(
          `http://localhost:5000/updateUser/${userData._id}`,
          { username, name, password, role }
        );
        setMessage(response.data.message);
      } else {
        const response = await axios.post("http://localhost:5000/addUser", {
          username,
          name,
          password,
          role,
        });
        setMessage(response.data.message);
      }

      setPopupVisible(true);

      if (onUserAdded) {
        onUserAdded();
      }

      setTimeout(() => {
        setPopupVisible(false);
        onClose();
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error processing request");
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 2000);
    }
  };

  return (
    <div>
      <h1>{userData ? "Update User" : "Tambah User"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!userData}
        />
        <label htmlFor="role">Role</label>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="Admin OPD">Admin OPD</option>
          <option value="Super Admin">Super Admin</option>
        </select>
        <button type="submit">{userData ? "Update" : "Submit"}</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>

      {popupVisible && (
        <div className="popup">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
