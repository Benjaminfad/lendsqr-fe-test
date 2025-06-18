import {  Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import UserDetails from "./pages/UserDetails/UserDetails";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


function Routing() {
  return (
     <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Route>
        </Route>
      </Routes>
       <Toaster
      />
      </AuthProvider>

  )
}

export default Routing
