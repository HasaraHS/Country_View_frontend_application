import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const menus = [
    { title: "Home", url: "/" },
    { title: "Map", url: "/countries" },
    { title: "About Us", url: "/about" },
  ];

  return (
    <div>
      <nav className="flex flex-col md:flex-row justify-between items-center px-4 md:px-[140px] py-5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="w-10 h-10 md:w-15 md:h-14" />
          <h4 className="text-white text-[14px] md:text-[20px] font-bold">
            Country View
          </h4>
        </Link>

        {/* Menu + Search */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto justify-between">
          <div className="bg-[#4A8087] bg-opacity-90 py-2 px-6 md:px-[80px] rounded-[20px] md:rounded-[40px] flex flex-col md:flex-row items-center gap-4">
            <ul className="flex flex-wrap justify-center md:flex-nowrap text-white text-[12px] md:text-[14px] font-bold uppercase gap-6 md:gap-[60px]">
              {menus.length > 0 ? (
                menus.map((menu, i) => (
                  <li key={i}>
                    <Link
                      to={menu.url}
                      className="hover:border-b-2 border-white transform duration-150 cursor-pointer"
                    >
                      {menu.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-300 text-sm italic">No results found</li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
