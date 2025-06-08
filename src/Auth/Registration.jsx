import  { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // submit logic here
  };

  const handleSocialLogin = (provider) => {
    // trigger social login flow
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-blue-100 via-purple-100 to-pink-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold font-Nunito-font mb-6 text-center text-gray-800">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 text-gray-700 font-Popins text-base font-normal">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all text-sm text-primary font-Opensans font-normal"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all text-sm text-primary font-Opensans font-normal"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Phone Number</label>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all text-sm text-primary font-Opensans font-normal"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all text-sm text-primary font-Opensans font-normal"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all text-sm text-primary font-Opensans font-normal"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer font-semibold font-Lato"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or sign up with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleSocialLogin("Google")}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-xs font-Lato font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <FaGoogle className="text-red-500 text-xs" />
            Google
          </button>
          <button
            onClick={() => handleSocialLogin("Facebook")}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-xs font-Lato font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <FaFacebookF className="text-blue-600 text-xs" />
            Facebook
          </button>
          <button
            onClick={() => handleSocialLogin("Twitter")}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-xs font-Lato font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <FaTwitter className="text-blue-400 text-xs" />
            Twitter
          </button>
        </div>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
