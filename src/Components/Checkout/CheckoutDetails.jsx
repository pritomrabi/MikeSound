import React, { useState, useEffect } from "react";
import CheckoutLeft from "./CheckoutLeft";
import CheckoutRight from "./CheckoutRight";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/reducer/ProductSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CheckoutDetails = () => {
  const [addressData, setAddressData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [txnId, setTxnId] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch shipping fee from backend
  useEffect(() => {
    const fetchShippingFee = async () => {
      try {
        const res = await axios.get("https://mikesound.onrender.com/api/shipping-fee/");
        const fee = res.data?.shipping_fee || 0;
        setShippingFee(fee);
      } catch (err) {
        console.error("Shipping fee load error:", err);
        setShippingFee(0);
      }
    };
    fetchShippingFee();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    const safeCart = storedCart
      ? Array.isArray(storedCart.product)
        ? storedCart.product
        : storedCart
      : [];

    if (safeCart.length === 0) {
      toast.warning("Your cart is empty. Add products before checkout.");
      navigate("/shop");
      return;
    }

    setCartItems(safeCart);

    const st = safeCart.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );
    setSubtotal(st);
    setTotal(st + shippingFee);
  }, [navigate, shippingFee]);

  const handlePlaceOrder = async () => {
    if (!addressData.full_name || !addressData.phone || !addressData.line1 || !addressData.city) {
      toast.error("Please fill all required address fields");
      return;
    }

    // Validate email
    if (!addressData.email || !/\S+@\S+\.\S+/.test(addressData.email)) {
      toast.error("Please provide a valid email address");
      return;
    }

    // Validate user number and txn
    if (!userNumber || !txnId) {
      toast.error("Please provide your number and transaction ID");
      return;
    }

    if (userNumber.length !== 11 || !/^\d+$/.test(userNumber)) {
      toast.error("Your number must be 11 digits");
      return;
    }

    if (!cartItems.length) {
      toast.error("Cart is empty");
      navigate("/shop");
      return;
    }

    const items = cartItems.map(item => ({
      product_id: item.id,
      variation_id: item.variation || null,
      quantity: item.quantity,
      color: item.color || "",
      price: item.price || 0,
      total_price: (item.price || 0) * (item.quantity || 1),
      image: item.image || ""
    }));

    const payload = {
      payment_method: "manual",
      shipping_fee: shippingFee,
      items,
      address: {
        full_name: addressData.full_name,
        phone: addressData.phone,
        line1: addressData.line1,
        line2: addressData.line2 || "",
        city: addressData.city,
        postal_code: addressData.postal_code || "",
        email: addressData.email || "",
        note: addressData.note || ""
      },
      user_number: userNumber,
      transaction_id: txnId
    };
    console.log(payload);
    
    try {
      const res = await axios.post(
        "https://mikesound.onrender.com/api/orders/place/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success && res.data.order_id) {
        toast.success("Order placed successfully. Order ID: " + res.data.order_id);
        dispatch(clearCart());
        localStorage.removeItem("cart");
        setCartItems([]);
        setAddressData({});
        setTxnId("");
        setUserNumber("");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(res.data.error || "Order failed. Check backend response.");
      }
    } catch (err) {
      console.error("Order error:", err.response?.data || err);
      toast.error("Order request failed.");
    }
  };

  return (
    <section>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container mx-auto flex flex-col lg:flex-row px-4 py-10 gap-10">
        <CheckoutLeft
          addressData={addressData}
          setAddressData={setAddressData}
        />
        <CheckoutRight
          cartItems={cartItems}
          subtotal={subtotal}
          shippingFee={shippingFee}
          total={total}
          handlePlaceOrder={handlePlaceOrder}
          txnId={txnId}
          setTxnId={setTxnId}
          userNumber={userNumber}
          setUserNumber={setUserNumber}
        />
      </div>
    </section>
  );
};

export default CheckoutDetails;
