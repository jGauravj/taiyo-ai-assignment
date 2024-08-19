import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64 w-64 h-screen bg-gray-800 p-4 transition-transform duration-300 ease-in-out`}
      >
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={toggleSidebar}>
            <FaBars className="text-white" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="mt-8">
          <Link
            to="/"
            className="block py-2 px-4 text-white rounded hover:bg-gray-700"
          >
            View Contact
          </Link>
          <Link
            to="/chart"
            className="block py-2 px-4 text-white rounded hover:bg-gray-700"
          >
            Graph
          </Link>
        </div>
      </div>

      {/* Hamburger Icon Only on Small Screens */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 md:hidden z-50"
        >
          <FaBars className={`${isOpen ? "text-black" : "text-black"}`} />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
