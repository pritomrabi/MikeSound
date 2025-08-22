import axios from "axios";

const BASE_URL = "https://dj-fashionflat.onrender.com";

const ProductData = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/products/`);
        console.log("API response data:", res.data);  // এখানে চেক করো
        return res.data;
    } catch (err) {
        console.log("API error:", err.message);
        return [];
    }
};

const registerUser = async (username, email, password) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/accounts/register/`, {
            username: username,
            email: email,
            password: password
        });
        console.log("Registration successful:", res.data);
        return res.data;
    } catch (err) {
        console.error("Registration error:", err.response?.data || err.message);
        return null;
    }
};


export { ProductData, registerUser };

