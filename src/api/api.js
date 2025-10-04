import axios from "axios";

const API = axios.create({
  baseURL: "https://dj-completed-project.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRequest = async (method, url, data = null, token = null) => {
  try {
    const config = { headers: {} };
    if (token) config.headers.Authorization = `Bearer ${token}`;
    const res = await API({ method, url, data, ...config });
    return res.data;
  } catch (err) {
    console.log("Error response:", err.response || err);
    return { error: err.response?.data?.error || "Server not reachable" };
  }
};

// Register user
export const registerUser = (name, email, phone, password, confirm_password) =>
  apiRequest("post", "/accounts/api/register/", { name, email, phone, password, confirm_password });

// Verify OTP
export const verifyOtp = (otp, user_id) =>
  apiRequest("post", "/accounts/api/verify-otp/", { otp, user_id });

// Login
export const loginUser = (email, password) =>
  apiRequest("post", "/accounts/api/login/", { email, password });

// Logout
export const logoutUser = () =>
  apiRequest("post", "/accounts/api/logout/");

// Forgot password
export const forgotPassword = (email) =>
  apiRequest("post", "/accounts/api/forgot-password/", { email });

// Verify forgot password OTP
export const verifyForgotOtp = (otp, user_id) =>
  apiRequest("post", "/accounts/api/forgot-verify-otp/", { otp, user_id });

// Reset password
export const resetPassword = (user_id, new_password, confirm_password) =>
  apiRequest("post", "/accounts/api/reset-password/", { user_id, new_password, confirm_password });

// Get all products
export const getProducts = () => apiRequest("get", "/api/products/");
export const getProductById = (id) => apiRequest("get", `/api/products/${id}/`);
export const getLatestProducts = () => apiRequest("get", "/api/products/latest/");
export const getCategoriesWithCount = () =>
  apiRequest("get", "/api/categories-with-count/");
export const getProductsByCategory = (slug) =>
  apiRequest("get", `/api/products/?category=${slug}`);

