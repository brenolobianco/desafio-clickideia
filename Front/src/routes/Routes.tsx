import { Route, Routes } from "react-router-dom";

import { ProtectRoute } from "./ProtectedRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route element={<ProtectRoute />}></Route>
    </Routes>
  );
};
