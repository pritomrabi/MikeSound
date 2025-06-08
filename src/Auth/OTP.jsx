import React, { useState } from "react";

const OTP = () => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const input = e.target.value;
    // Only allow digits and max length of 6
    if (/^\d{0,6}$/.test(input)) {
      setOtp(input);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add OTP verification logic here
    if (otp.length !== 6) {
      alert("Please enter a valid 4-digit OTP code.");
      return;
    }
    console.log("OTP submitted:", otp);
    alert("OTP Verified!");
  };

  const handleResend = () => {
    // Resend OTP logic placeholder
    alert("A new OTP has been sent to your email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 font-Nunito-font">
          Verify OTP
        </h2>
        <p
          className="text-center text-sm font-normal font-Raleway
     text-gray-600 mb-6"
        >
          Please enter the 4-digit code sent to your email address.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none  transition-all text-sm text-primary font-Opensans font-normal"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold font-Opensans cursor-pointer"
          >
            Verify OTP
          </button>
        </form>
        <p className="text-sm text-center font-Monrope font-normal text-gray-600 mt-4">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-blue-500 underline cursor-pointer"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTP;
