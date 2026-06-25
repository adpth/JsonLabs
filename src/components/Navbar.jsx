import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiCode, FiBook, FiPlay, FiHome } from "react-icons/fi";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", name: "Home", icon: <FiHome className="mr-2" /> },
    { path: "/learn", name: "Learn", icon: <FiBook className="mr-2" /> },
    { path: "/practice", name: "Practice", icon: <FiPlay className="mr-2" /> },
    {
      path: "/playground",
      name: "Playground",
      icon: <FiCode className="mr-2" />,
    },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <FiCode className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              JSON<span className="text-blue-600">Labs</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
