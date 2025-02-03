import React from "react";
import "./KelolaUser.css";

export default function KelolaUser({ _id, no, username, name, role, onUserDeleted, onEdit }) {
  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/deleteUser/${_id}`, {
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
      <td className="aksi-buttons" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button className="info" onClick={onEdit}>
          <i className="fas fa-info-circle"></i> 
        </button>
        <button className="delete" onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i> 
        </button>
      </td>
    </tr>
  );
}
