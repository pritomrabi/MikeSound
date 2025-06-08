import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl text-gray-700">Page not found</p>
      <p className="text-gray-500 mt-2">
        The page you are looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
