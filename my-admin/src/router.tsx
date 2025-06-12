import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import UserDetails from "./pages/UserDetails/UserDetails";
import Layout from "./components/Layout/Layout";
import "./styles/global.scss"

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Routing
