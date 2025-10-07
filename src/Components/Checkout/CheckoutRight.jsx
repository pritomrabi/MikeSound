import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckoutRight = ({
  cartItems,
  subtotal,
  shippingFee,
  total,
  paymentMethod,
  setPaymentMethod,
  handlePlaceOrder,
  txnId,
  handleManualPaymentSubmit
}) => {
  const [userNumber, setUserNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [paymentNumbers, setPaymentNumbers] = useState({});

  useEffect(() => {
    const fetchPaymentNumbers = async () => {
      try {
        const res = await axios.get(
          "https://dj-completed-project.onrender.com/api/payment-numbers/"
        );
        if (res.data && res.data.payment_numbers) {
          const numbers = {};
          res.data.payment_numbers.forEach(p => {
            numbers[p.gateway] = p.account_number;
          });
          setPaymentNumbers(numbers);
        }
      } catch (err) {
        console.error("Failed to fetch payment numbers", err);
      }
    };
    fetchPaymentNumbers();
  }, []);

  return (
    <div className="lg:w-[50%] w-full sm:px-4 px-0 font-Lato">
      <div className="bg-white shadow rounded-xl p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 text-center">Your Order</h3>

        {cartItems.map(item => (
          <div key={item.id} className="flex items-center gap-4 py-2 border-b">
            <img
              src={item.image || "https://via.placeholder.com/80"}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
            />
            <span className="flex-1">{item.title} × {item.quantity}</span>
            <span>৳ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="flex justify-between py-2 border-b">
          <span>Subtotal</span>
          <span>৳ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>Delivery</span>
          <span>৳ {shippingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 font-semibold text-lg">
          <span>Total</span>
          <span>৳ {total.toFixed(2)}</span>
        </div>

        <h3 className="mt-6 mb-3 font-semibold">Select Payment Method</h3>
        <div className="flex flex-col gap-3">
          {["bkash", "nagad", "rocket"].map(method => (
            <label
              key={method}
              className="flex items-center gap-3 p-3 shadow-sm rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />
              <span className="flex-1 font-Nunito-font">
                {method.toUpperCase()} - {paymentNumbers[method] || "Loading..."}
              </span>
            </label>
          ))}
        </div>

        <div className="my-6">
          {["bkash", "nagad", "rocket", "upay"].map((method) => (
            paymentMethod === method && (
              <div key={method} className="payment-box">
                <div className="mt-3">
                  <label className="block text-sm font-Nunito-font">Your Number</label>
                  <input
                    type="text"
                    value={userNumber}
                    onChange={e => setUserNumber(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-Nunito-font">Transaction ID</label>
                  <input
                    type="text"
                    value={trxId}
                    onChange={e => setTrxId(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>
              </div>
            )
          ))}
        </div>

        {!txnId ? (
          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-blue-600 text-white p-3 rounded"
          >
            Place Order
          </button>
        ) : (
          <button
            onClick={() => handleManualPaymentSubmit(txnId, userNumber, trxId)}
            className="mt-6 w-full bg-green-600 text-white p-3 rounded"
          >
            Submit Payment
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutRight;
