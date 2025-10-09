import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyForgotOtp } from "../api/api";

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user_id, type } = location.state || {}; // type: "forgot" or "register"
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,6}$/.test(input)) setOtp(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast.error("Enter valid 4-digit OTP");
      return;
    }
    if (!user_id) {
      toast.error("User ID missing");
      return;
    }

    setLoading(true);
    try {
      let res;
      if (type === "forgot") res = await verifyForgotOtp(otp, user_id);
      else throw new Error("Invalid OTP type for this flow");

      setLoading(false);

      if (res?.error) toast.error(res.error);
      else if (res?.message) {
        toast.success(res.message);
        if (type === "forgot") navigate("/reset-password", { state: { user_id } });
      } else toast.error("Server not reachable");
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleResend = () => {
    toast.info("Go back to resend OTP via previous step.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">Verify OTP</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Enter the 4-digit code sent to your email.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Didn't receive the code?{" "}
          <button type="button" onClick={handleResend} className="text-blue-500 underline cursor-pointer">
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTP;
