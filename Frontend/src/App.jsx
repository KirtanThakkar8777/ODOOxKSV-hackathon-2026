import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}