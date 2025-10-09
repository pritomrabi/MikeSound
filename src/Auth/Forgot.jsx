import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../api/api"; // backend API

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword(email);
      setLoading(false);

      if (res?.error) toast.error(res.error);
      else if (res?.message) {
        toast.success(res.message);
        // OTP page e navigate kore user_id pass kora
        navigate("/otp", { state: { user_id: res.user_id, type: "forgot" } });
      } else toast.error("Server not reachable");
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
          Forgot Your Password?
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your registered email address to receive OTP for password reset.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 text-sm">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Forgot;
