import React from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import "./FormPenyedia.css";

export default function Penyedia({ _id, no, npwp, nama, alamat, skp, jenis, onEdit, onDelete, notSuper }) {
  return (
    <tr>
      <td>{no}</td>
      <td>{nama}</td>
      <td>{npwp}</td>
      <td>{alamat}</td>
      <td>{skp}</td>
      <td>{jenis}</td>
      {!notSuper && (
        <>
          <button className="edit-btn" onClick={onEdit}><AiOutlineEdit />Edit</button>
          <button className="delete-btn" onClick={() => onDelete(_id)}><AiOutlineDelete />Hapus</button>
        </>
      )}
      <td>
        <a className="details-btn" href={`/Penyedia/${npwp}`}>
          <AiOutlineEye />
          Details
        </a>      </td>
    </tr>
  );
}


