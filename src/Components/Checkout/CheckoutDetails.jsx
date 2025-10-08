import React, { useState, useEffect } from "react";
import CheckoutLeft from "./CheckoutLeft";
import CheckoutRight from "./CheckoutRight";
import axios from "axios";

const CheckoutDetails = () => {
  const [addressData, setAddressData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(50);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [txnId, setTxnId] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    const safeCart = storedCart
      ? Array.isArray(storedCart.product)
        ? storedCart.product
        : storedCart
      : [];
    setCartItems(safeCart);

    // subtotal calculate without sending price to backend
    const st = safeCart.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );
    setSubtotal(st);
    setTotal(st + shippingFee);
  }, [shippingFee]);

  const handlePlaceOrder = async () => {
    if (!addressData.full_name || !addressData.phone || !addressData.line1 || !addressData.city) {
      alert("Please fill all required address fields");
      return;
    }

    if (!cartItems.length) {
      alert("Cart is empty");
      return;
    }

    // only send ids and quantity, no price
    const items = cartItems.map(item => ({
      product_id: item.id,
      variation_id: item.variation || null,
      quantity: item.quantity
    }));


    const payload = {
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
      }
    };

    try {
      const res = await axios.post(
        "https://dj-completed-project.onrender.com/api/orders/place/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success && res.data.order_id) {
        alert("Order placed successfully. Order ID: " + res.data.order_id);
        localStorage.removeItem("cart");
        setCartItems([]);
      } else {
        alert(res.data.error || "Order failed. Check backend response.");
      }
    } catch (err) {
      console.error("Order error:", err.response?.data || err);
      alert("Order request failed. Check console for details.");
    }
  };

  const handleManualPaymentSubmit = (txnId, userNumber, trxId) => {
    console.log("Manual payment", txnId, userNumber, trxId);
  };

  return (
    <section>
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
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          handlePlaceOrder={handlePlaceOrder}
          txnId={txnId}
          setTxnId={setTxnId}
          handleManualPaymentSubmit={handleManualPaymentSubmit}
        />
      </div>
    </section>
  );
};

export default CheckoutDetails;
