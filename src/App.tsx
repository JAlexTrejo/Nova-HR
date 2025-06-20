import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/Admin"; // No es necesario el .tsx, Vite lo resuelve

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Router>
  );
}