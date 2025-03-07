import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Penyedia/FormPenyedia.css";

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
          `${import.meta.env.VITE_REACT_APP_API_URL}/updateUser/${userData._id}`,
          { username, name, password, role }
        );
        setMessage(response.data.message);
      } else {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/addUser`, {
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
    <div className="form-overlay">

      <form onSubmit={handleSubmit} className="form-box">
        <h1>{userData ? "Update User" : "Tambah User"}</h1>
        <div className="form-bundle">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-bundle">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-bundle">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!userData}
          />
        </div>
        <div className="form-bundle">
          <label htmlFor="role">Role : </label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Admin OPD">Admin OPD</option>
            <option value="Super Admin">Super Admin</option>
          </select>
        </div>
        <div className="button" style={{ marginTop: "1rem" }}>
          <button type="submit">{userData ? "Update" : "Simpan"}</button>
          <button type="button" onClick={onClose}>
            Batal
          </button>
        </div>
      </form>

      {popupVisible && (
        <div className="popup">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
