import React from "react";
import MedusaLogo from "../assets/medusaLogo.png";
import { Link } from "react-router-dom";

const WhiteHeader = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between bg-white px-10  py-6 border-gray-200 border-b">
      <Link to="/">
        <img src={MedusaLogo} alt="medusaLogo" className="w-28" />
      </Link>
      <div>
        <Link to="/favorites">
          <span className="material-symbols-outlined text-3xl cursor-pointer mr-8">
            favorite
          </span>
        </Link>
        <Link to="/card">
          <span className="material-symbols-outlined text-3xl cursor-pointer">
            shopping_cart
          </span>
        </Link>
      </div>
    </div>
  );
};

export default WhiteHeader;
