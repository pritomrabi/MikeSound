import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../api/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user_id } = location.state || {};
  const [formData, setFormData] = useState({ new_password: "", confirm_password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { new_password, confirm_password } = formData;

    if (!new_password || !confirm_password) {
      toast.error("All fields are required");
      return;
    }
    if (new_password !== confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(user_id, new_password, confirm_password);
      setLoading(false);

      if (res?.error) toast.error(res.error);
      else if (res?.message) {
        toast.success(res.message);
        navigate("/login");
      } else toast.error("Server not reachable");
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 text-sm">New Password</label>
            <input
              type="password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
