import React from "react";

export default function KelolaUser({ _id, no, username, name, role, onUserDeleted, onEdit }) {
  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        const response = await fetch(`http://localhost:5000/deleteUser/${_id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (response.ok) {
          alert("User deleted successfully");
          onUserDeleted();
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
      <td>
        <button onClick={onEdit} style={{ marginRight: "5px" }}>
          Edit
        </button>
        <button onClick={handleDelete} style={{ color: "red" }}>
          Hapus
        </button>
      </td>
    </tr>
  );
}
