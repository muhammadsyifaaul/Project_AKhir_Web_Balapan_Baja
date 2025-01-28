import React from "react";
import "./KelolaUser.css";

export default function KelolaUser({ _id, no, username, name, role, onUserDeleted, onEdit }) {
  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        const response = await fetch(`http://localhost:5000/deleteUser/${_id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("User deleted successfully");
          onUserDeleted();
        } else {
          alert("Gagal menghapus user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <tr>
      <td>{no}</td>
      <td>{username}</td>
      <td>{name}</td>
      <td>{role}</td>
      <td className="aksi-buttons">
        <button className="info" onClick={onEdit}>
          <i className="fas fa-info-circle"></i> Detail
        </button>
        <button className="delete" onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </td>
    </tr>
  );
}
