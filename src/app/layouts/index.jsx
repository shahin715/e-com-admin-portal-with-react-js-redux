import Sidebar from "@/app/layouts/Sidebar";

// src/app/layouts/index.jsx  (RootLayout)
import { Outlet } from "react-router";
export default function RootLayout(){
  return (
    <div className="app-root">
      <Sidebar />
      <main><Outlet /></main>
    </div>
  )
}


