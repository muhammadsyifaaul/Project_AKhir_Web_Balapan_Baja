import React from "react";
import "./Penyedia.css";

export default function Penyedia({ _id, no, npwp, nama, alamat, skp, jenis, onEdit, onDelete }) {
  return (
    <div className="penyedia-card">
      <h2>No: {no}</h2>
      <h2>Nama: {nama}</h2>
      <p>NPWP: {npwp}</p>
      <p>Alamat: {alamat}</p>
      <p>SKP: {skp}</p>
      <p>Jenis: {jenis}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={() => onDelete(_id)}>Hapus</button> 
      <a href={`/Penyedia/${npwp}`}>Details</a>
    </div>
  );
}
// import React from "react";
// import "./Penyedia.css";
// import { FaEdit, FaTrashAlt, FaInfoCircle, FaPlus } from "react-icons/fa";

// export default function Penyedia({ _id, no, npwp, nama, alamat, skp, jenis, onEdit, onDelete }) {
//   return (
//     <div className="penyedia-container">
//       <div className="penyedia-header">
//         <h1>Daftar Penyedia</h1>
//         <button className="btn-add">
//           <FaPlus /> Tambah Penyedia
//         </button>
//       </div>
//       <div className="penyedia-card">
//         <div className="penyedia-info">
//           <h3>{no}. {nama}</h3>
//           <p><strong>NPWP:</strong> {npwp}</p>
//           <p><strong>Alamat:</strong> {alamat}</p>
//           <p><strong>SKP:</strong> {skp}</p>
//           <p><strong>Jenis:</strong> {jenis}</p>
//         </div>
//         <div className="penyedia-actions">
//           <button className="btn-edit" onClick={onEdit}>
//             <FaEdit /> Edit
//           </button>
//           <button className="btn-delete" onClick={() => onDelete(_id)}>
//             <FaTrashAlt /> Hapus
//           </button>
//           <a className="btn-details" href={`/Penyedia/${npwp}`}>
//             <FaInfoCircle /> Details
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
