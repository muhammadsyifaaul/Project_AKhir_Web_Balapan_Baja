export default function KelolaUser({ _id, no, username, name, role, onUserDeleted, onEdit }) {
    const handleDelete = async () => {
      if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
        try {
          const response = await fetch(`http://localhost:5000/deleteUser/${_id}`, {
            method: "DELETE",
          });
  
          const data = await response.json();
          console.log(data);
  
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
      <div>
        <h1>{no}</h1>
        <h1>{username}</h1>
        <h1>{name}</h1>
        <h1>{role}</h1>
        <button onClick={() => onEdit()}>Edit</button>
        <button onClick={handleDelete}>Hapus</button>
      </div>
    );
  }
  