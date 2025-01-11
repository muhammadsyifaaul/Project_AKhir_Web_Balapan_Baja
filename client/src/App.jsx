import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  DataPaketPage,
  DetailAksiPenyediaPage,
  DetailAksiTenagaAhliPage,
  DetailPaketPage,
  DetailPenyediaPage,
  DetailTenagaAhliPage,
  HomePage,
  KelolaUserPage,
  LoginPage,
  PenyediaPage,
  TambahPaketPage,
  TenagaAhliPage,
} from "./Pages";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Penyedia" element={<PenyediaPage />} />
        <Route path="/TenagaAhli" element={<TenagaAhliPage />} />
        <Route path="/DetailPenyedia" element={<DetailPenyediaPage />} />
        <Route path="/DetailTenagaAhli" element={<DetailTenagaAhliPage />} />
        <Route path="/DetailPaket" element={<DetailPaketPage />} />
        <Route
          path="/DetailAksiPenyedia"
          element={<DetailAksiPenyediaPage />}
        />
        <Route
          path="/DetailAksiTenagaAhli"
          element={<DetailAksiTenagaAhliPage />}
        />
        <Route path="/TambahPaket" element={<TambahPaketPage />} />
        <Route path="/KelolaUser" element={<KelolaUserPage />} />
        <Route path="/DataPaket" element={<DataPaketPage />} />
      </Routes>
    </Router>
  );
};

export default App;
