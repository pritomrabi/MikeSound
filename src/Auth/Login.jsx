import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser(formData.email, formData.password);
      setLoading(false);

      if (res?.error) toast.error(res.error);
      else if (res?.message) {
        toast.success(res.message);

        // jodi account verified na thake backend theke error dey, OTP page e pathate paro
        if (res?.user && !res.user.is_verified) {
          toast.info("Account not verified. Please check your email for OTP.");
          navigate("/otp", { state: { user_id: res.user.id } });
        } else {
          navigate("/"); // login successful, redirect user
        }
      } else toast.error("Server not reachable");
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4 sm:px-6 lg:px-8 py-10">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account? <Link to="/registration" className="text-blue-500 underline">Register</Link>
        </p>
        <div className="justify-center flex mx-auto">
          <Link to="/forgot" className="text-sm text-blue-500 hover:underline pt-1">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
