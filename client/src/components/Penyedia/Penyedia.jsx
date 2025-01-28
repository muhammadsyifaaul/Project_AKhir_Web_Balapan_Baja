import React from "react";

export default function PenyediaRow({ _id, no, npwp, nama, alamat, skp, jenis, onEdit, onDelete, notSuper }) {
  return (
    <tr>
      <td>{no}</td>
      <td>{nama}</td>
      <td>{npwp}</td>
      <td>{alamat}</td>
      <td>{skp}</td>
      <td>{jenis}</td>
      {!notSuper && (
        <td>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Hapus</button>
        </td>
      )}
      <td>
        <a href={`/Penyedia/${npwp}`}>Details</a>
      </td>
    </tr>
  );
}