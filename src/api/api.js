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
    return { error: err.response?.data?.error || "Server not reachable" };
  }
};


// Product APIs

export const getProducts = (offer_type = "") => {
  const query = offer_type ? `?offer_type=${offer_type}` : "";
  return apiRequest("get", `/api/products${query}`); // removed extra slash
};

export const getProductById = (id) => apiRequest("get", `/api/products/${id}/`);
export const getSubCategories = () => apiRequest("get", "/api/subcategories/latest/");
export const getProductsByCategory = (slug) =>
  apiRequest("get", `/api/products/?category=${slug}`);

// Page APIs
export const getAbout = () => apiRequest("get", "/api/about/");
export const getTerms = () => apiRequest("get", "/api/terms/");
export const getHelpCenter = () => apiRequest("get", "/api/help/");
export const getFAQs = () => apiRequest("get", "/api/faqs/");
export const sendContactMessage = (data) => apiRequest("post", "/api/contact/", data);
export const getFooter = () => apiRequest("get", "/api/footer/");

