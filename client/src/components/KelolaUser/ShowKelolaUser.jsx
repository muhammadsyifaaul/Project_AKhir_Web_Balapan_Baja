import React, { useState, useEffect } from "react";
import KelolaUser from "./KelolaUser";
import FormKelolaUser from "./FormKelolaUser";
import axios from "axios";
import "./KelolaUser.css";
import { AiOutlinePlus } from "react-icons/ai";

export default function ShowKelolaUser() {
  const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/getAllUser`);
      const updatedUsers = response.data.map((user) => ({
        ...user,
        name: user.name?.trim() || "Tidak ada nama",
      }));
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (userData) => {
    setEditingUser(userData);
    setIsFormOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="kelola-user-container">
      <div className="penyedia-title">
        <img src="images/management.png" alt="management" className="penyedia-icon" />
        Kelola User
      </div>

      <div className="actions-container">
        <button
          onClick={() => {
            setEditingUser(null);
            setIsFormOpen(true);
          }} className="add-btn"
        > <AiOutlinePlus />
          Tambah User
        </button>
        
        <input
          type="text"
          placeholder="Cari user..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      {isFormOpen && (
        <FormKelolaUser
          onClose={() => setIsFormOpen(false)}
          onUserAdded={fetchUsers}
          userData={editingUser}
        />
      )}
      <table>
        <thead>
          <tr>
            <th style={{textAlign: "center"}}>No</th>
            <th style={{textAlign: "center"}}>Username</th>
            <th style={{textAlign: "center"}}>Nama</th>
            <th style={{textAlign: "center"}}>Role</th>
            <th style={{textAlign: "left"}}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <KelolaUser
              key={user._id}
              _id={user._id}
              no={index + 1 + (currentPage - 1) * usersPerPage}
              username={user.username}
              name={user.name}
              role={user.role}
              onUserDeleted={fetchUsers}
              onEdit={() => handleEditUser(user)} // Pastikan penulisan benar
            />
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
