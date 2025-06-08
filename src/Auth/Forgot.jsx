import React, { useState } from "react";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate your password reset logic here
    console.log("Reset link sent to:", email);
    alert("If this email is registered, a reset link has been sent.");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 font-Nunito-font">
          Forgot Your Password?
        </h2>
        <p
          className="text-center text-sm font-normal font-Raleway
         text-gray-600 mb-6"
        >
          Enter your registered email address and we’ll send you a link to reset
          your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 text-sm font-Popins font-normal">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none  transition-all text-sm text-primary font-Opensans font-normal"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submiy"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold font-Opensans cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>
        <p className="text-sm text-center font-Monrope font-normal text-gray-600 mt-4">
          Remember your password?{" "}
          <a href="#" className="text-blue-500 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Forgot;
