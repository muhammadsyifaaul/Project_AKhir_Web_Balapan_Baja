import React, { useState, useEffect } from "react";
import KelolaUser from "./KelolaUser";
import FormKelolaUser from "./FormKelolaUser";
import axios from "axios";

export default function ShowKelolaUser() {
  const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getAllUser");
      setUsers(response.data);
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
    setCurrentPage(1); // Reset to the first page
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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

      <input
        type="text"
        placeholder="Cari user..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ margin: "10px 0", padding: "5px" }}
      />

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
            <th>No</th>
            <th>Username</th>
            <th>Nama</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <KelolaUser
              key={user._id}
              no={indexOfFirstUser + index + 1}
              {...user}
              onUserDeleted={fetchUsers}
              onEdit={() => handleEditUser(user)}
            />
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
