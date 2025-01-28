import React from "react";

export default function TenagaAhli({_id, no, npwp, nama, alamat, onEdit, onDelete,notSuper}) {
  return (
    <div>
      <h1>{no}</h1>
      <h1>{npwp}</h1>
      <h1>{nama}</h1>
      <h1>{alamat}</h1>
      <a href={`/DetailTenagaAhli/${_id}`}>Details</a>
      {!notSuper && (
        <>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Hapus</button>
        </>
      )}
    </div>
  );
}
