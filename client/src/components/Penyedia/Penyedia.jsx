import React from "react";
import "./Penyedia.css";

export default function Penyedia({ _id, no, npwp, nama, alamat, skp, jenis, onEdit, onDelete }) {
  return (
    <tr className="penyedia-row">
      <td>{no}</td>
      <td>{nama}</td>
      <td>{npwp}</td>
      <td>{alamat}</td>
      <td>{skp}</td>
      <td>{jenis}</td>
      <td>
        <button onClick={onEdit} title="Edit">
          <i className="fas fa-edit"></i> {/* Ikon Edit */}
        </button>
        <button onClick={() => onDelete(_id)} title="Hapus">
          <i className="fas fa-trash-alt"></i> {/* Ikon Hapus */}
        </button>
        <a href={`/Penyedia/${npwp}`} title="Details">
          <i className="fas fa-info-circle"></i> {/* Ikon Details */}
        </a>
      </td>
    </tr>
  );
}