import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    console.log("Login submitted:", formData);
  };
  const handleSocialLogin = (provider) => {
    // trigger social login flow
    console.log(`Logging in with ${provider}`);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-2xl animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold font-Nunito-font text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 text-sm font-Popins">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all text-sm text-primary font-Opensans font-normal"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 text-sm font-Popins font-normal">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all text-sm text-primary font-Opensans font-normal"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold font-Opensans cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center font-Monrope font-normal text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/registration" className="text-blue-500 underline">
            Register
          </Link>
        </p>
        <div className="justify-center flex mx-auto">
          <Link
            to="/forgot"
            className="text-sm font-Monrope font-normal text-blue-500 hover:underline pt-1"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
