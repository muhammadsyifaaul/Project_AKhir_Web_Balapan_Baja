export default function ({_id, no, npwp, nama, alamat }) {
  return (
    <div>
      <h1>{no}</h1>
      <h1>{npwp}</h1>
      <h1>{nama}</h1>
      <h1>{alamat}</h1>
      <a href={`/DetailTenagaAhli/${_id}`}>Details</a>
    </div>
  );
}
