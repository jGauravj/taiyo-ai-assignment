import React from "react";
import Home from "./pages/Home";
import CreateContact from "./pages/CreateContact";
import Update from "./pages/Update";
import Sidebar from "./components/Sidebar"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

type Props = {};

export default function App({}: Props) {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateContact />} />
            <Route path="/edit/:id" element={<Update />} />
            <Route path="/chart" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
