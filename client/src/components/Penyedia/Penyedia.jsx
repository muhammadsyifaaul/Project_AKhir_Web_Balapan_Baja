import React from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineInfoCircle } from "react-icons/ai";
import "./Penyedia.css";

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
        <td className="action-buttons" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button className="edit-btn" onClick={onEdit} style={{ padding: "0", width: "2.5rem", height: "2rem" }}>
            <AiOutlineEdit />
          </button>
          <button className="delete-btn" onClick={() => onDelete(_id)} style={{ padding: "0",  width: "2.5rem", height: "2rem"}}>
            <AiOutlineDelete />
          </button>
          <a className="details-btn" href={`/Penyedia/${npwp}`}>
            <AiOutlineInfoCircle />
          </a>
        </td>
      )}
    </tr>
  );
}
