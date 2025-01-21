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

