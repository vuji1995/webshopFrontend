import React from "react";
import WhiteHeader from "../Components/WhiteHeader";
import BlackHeader from "../Components/BlackHeader";
import ServerError from "../assets/serverError.png";
import { Link } from "react-router-dom";

const WrongURL = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start">
      <BlackHeader />
      <WhiteHeader />
      <div className="flex flex-col items-center justify-center mt-32">
        <h1 className="font-semibold mb-5 text-4xl">404 - Page Not Found</h1>
        <img src={ServerError} alt="serverError" className="h-64 w-64" />
        <p className="mt-5 text-xl font-normal">
          The page you are looking for does not exist.
        </p>
        <Link to="/">
          <button className="px-5 py-2 bg-black text-white font-semibold mt-5">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WrongURL;
