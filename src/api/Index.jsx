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



export { ProductData };

