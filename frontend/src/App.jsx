import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Alltask from "./components/layouts/Dashboard/Alltask";
import UserDashboard from "./components/layouts/Dashboard/UserDashboard";
import CompletedTask from "./components/layouts/Dashboard/CompletedTask";
import PendingTask from "./components/layouts/Dashboard/PendingTask";
import ImportantTask from "./components/layouts/Dashboard/ImportantTask";
import ProtectedRoute from "./components/layouts/Auth/ProtectedRoute";
import OpenRoute from "./components/layouts/Auth/OpenRoute";
import InProgressTask from "./components/layouts/Dashboard/InProgressTask";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Navigate to="/user_dashboard" />} />
          <Route element={<Dashboard />}>
            <Route path="/user_dashboard" element={<UserDashboard />} />
            <Route path="/all-task" element={<Alltask />} />
            <Route path="/complete-task" element={<CompletedTask />} />
            <Route path="/pending-task" element={<PendingTask />} />
            <Route path="/important-task" element={<ImportantTask />} />
            <Route path="/in-progress-task" element={<InProgressTask />} />
          </Route>
        </Route>

        <Route element={<OpenRoute/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
