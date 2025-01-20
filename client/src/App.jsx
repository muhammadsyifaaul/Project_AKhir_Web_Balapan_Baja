import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route
      path="/Login"
      element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      }
    />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/Home" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Penyedia"
          element={
            <ProtectedRoute>
              <PenyediaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Penyedia/:npwp"
          element={
            <ProtectedRoute>
              <DetailPenyediaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/TenagaAhli"
          element={
            <ProtectedRoute>
              <TenagaAhliPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/DetailTenagaAhli/:_id"
          element={
            <ProtectedRoute>
              <DetailTenagaAhliPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DetailPaket/:id"
          element={
            <ProtectedRoute>
              <DetailPaketPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DetailAksiPenyedia"
          element={
            <ProtectedRoute>
              <DetailAksiPenyediaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DetailAksiTenagaAhli"
          element={
            <ProtectedRoute>
              <DetailAksiTenagaAhliPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/TambahPaket"
          element={
            <ProtectedRoute>
              <TambahPaketPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/KelolaUser"
          element={
            <ProtectedRoute>
              <KelolaUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DataPaket"
          element={
            <ProtectedRoute>
              <DataPaketPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/Login" />} />
      </Routes>
    </Router>
  );
};

export default App;
