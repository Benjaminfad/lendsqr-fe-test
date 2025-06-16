import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar"
import Header from "../Header/Header"
import "./Layout.scss"

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
