// src/components/Header.jsx
import React from "react";
import { FaShieldAlt } from "react-icons/fa";

function Header() {
  return (
    <header className="bg-blue-700 text-white py-4 px-6 shadow-md flex items-center gap-3">
      <FaShieldAlt size={28} />
      <div>
        <h1 className="text-2xl font-bold">SM Forensics Tool</h1>
        <p className="text-sm">Social Media Forensics & Analytics Dashboard</p>
      </div>
    </header>
  );
}

export default Header;
