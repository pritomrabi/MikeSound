import { Link } from "react-router-dom";
import { useState } from "react";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
const CheckoutRight = () => {
  
  const [method, setMethod] = useState("bkash");

  return (
    <div className="lg:w-[50%] w-full sm:px-4 px-0 font-Lato">
      <div class="bg-white shadow rounded-xl p-6 mt-6">
        <h3 class="text-lg font-semibold mb-4 text-center">Your Order</h3>
        <div class=" rounded-lg overflow-hidden">
          <div class="flex justify-between bg-gray-50 px-4 py-2 font-medium text-sm text-gray-600">
            <span>Product</span>
            <span>Subtotal</span>
          </div>
          <div class="flex justify-between items-start sm:px-4 px-1 py-3 border-b border-secandari">
            <div className="items-center flex gap-2">
              <img src="home.jpg" alt="home" className="object-cover sm:h-20 h-16 sm:w-20 w-16 rounded-xl" />
              <p class="font-medium text-gray-800 font-Lato text-base">Netflix Subscription × 2</p>
            </div>
            <span class="text-gray-700">৳ 2,580.00</span>
          </div>
          <div class="flex justify-between px-4 py-2 border-b border-secandari">
            <span class="text-gray-600">Subtotal</span>
            <span class="font-medium">৳ 2,580.00</span>
          </div>
          <div class="flex justify-between px-4 py-2 border-b border-secandari">
            <span class="text-gray-600">bKash Charge</span>
            <span>৳ 0.00</span>
          </div>
          <div class="flex justify-between px-4 py-3 font-semibold text-lg">
            <span>Total</span>
            <span class="text-green-600">৳ 2,580.00</span>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl  p-6 mt-6">
          <h3 className="text-lg font-semibold font-Nunito-font mb-4">Choose Payment Method</h3>

          {/* Payment Options */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 shadow-sm rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="bkash"
                checked={method === "bkash"}
                onChange={() => setMethod("bkash")}
                className="payment-radio"
              />
              <span className="flex-1 font-Nunito-font">bKash Personal</span>
              <img
                src="https://i.ibb.co/PG1XxvD/bkash.png"
                className="w-6 h-6"
                alt="bkash"
              />
            </label>

            <label className="flex items-center gap-3 p-3 shadow-sm rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="nagad"
                checked={method === "nagad"}
                onChange={() => setMethod("nagad")}
                className="payment-radio"
              />
              <span className="flex-1 font-Nunito-font">Nagad Personal</span>
              <img
                src="https://i.ibb.co/kHw04Yw/nagad.png"
                className="w-6 h-6"
                alt="nagad"
              />
            </label>

            <label className="flex items-center gap-3 p-3 shadow-sm rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="rocket"
                checked={method === "rocket"}
                onChange={() => setMethod("rocket")}
                className="payment-radio"
              />
              <span className="flex-1 font-Nunito-font">Rocket Personal</span>
              <img
                src="https://i.ibb.co/CPwq1Nm/rocket.png"
                className="w-6 h-6"
                alt="rocket"
              />
            </label>

            <label className="flex items-center gap-3 p-3 shadow-sm rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="upay"
                checked={method === "upay"}
                onChange={() => setMethod("upay")}
                className="payment-radio"
              />
              <span className="flex-1 font-Nunito-font">Upay Personal</span>
              <img
                src="https://i.ibb.co/YpRj7td/upay.png"
                className="w-6 h-6"
                alt="upay"
              />
            </label>
          </div>

          {/* Instruction Boxes */}
          <div className="my-6">
            {method === "bkash" && (
              <div className="payment-box">
                <p className="font-semibold text-pink-600 font-Nunito-font">bKash Payment Instructions</p>
                <ol className="text-sm text-gray-700 list-decimal ml-5 mt-2 space-y-1">
                  <li>Open your bKash App or Dial *247#</li>
                  <li>Choose “Send Money”</li>
                  <li>Enter the Account Number: <strong>01XXXXXXXXX</strong></li>
                  <li>Enter total amount</li>
                  <li>Confirm with your PIN</li>
                  <li>Copy the Transaction ID & paste below</li>
                </ol>
                <div className="mt-3">
                  <label className="block text-sm font-Nunito-font">Your bKash Number</label>
                  <input type="text" placeholder="01XXXXXXXXX" className="w-full border rounded-lg px-3 py-2 mt-1" />
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-Nunito-font">Transaction ID</label>
                  <input type="text" placeholder="ABC123XYZ" className="w-full border rounded-lg px-3 py-2 mt-1" />
                </div>
              </div>
            )}

            {method === "nagad" && (
              <div className="payment-box">
                <p className="font-semibold text-orange-600 font-Nunito-font">Nagad Payment Instructions</p>
                <ol className="text-sm text-gray-700 list-decimal ml-5 mt-2 space-y-1">
                  <li>Go to your Nagad app or Dial *167#</li>
                  <li>Choose “Send Money”</li>
                  <li>Enter Account Number</li>
                  <li>Enter total amount</li>
                  <li>Confirm with PIN</li>
                  <li>Copy Transaction ID & paste below</li>
                </ol>
                <p className="mt-2 text-green-600 font-medium font-Nunito-font">You need to send ৳ 2617.00</p>
                <div className="mt-3">
                  <label className="block text-sm font-Nunito-font">Your Nagad Number</label>
                  <input type="text" placeholder="01XXXXXXXXX" className="w-full border rounded-lg px-3 py-2 mt-1" />
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-Nunito-font">Transaction ID</label>
                  <input type="text" placeholder="XYZ789" className="w-full border rounded-lg px-3 py-2 mt-1" />
                </div>
              </div>
            )}

            {method === "rocket" && (
              <div className="payment-box">
                <p className="font-semibold text-purple-600 font-Nunito-font">Rocket Payment Instructions</p>
                <p className="text-sm mt-2">Use Rocket app or *322# to send money. Enter account number and confirm. Paste your Transaction ID below.</p>
                <div className="mt-3">
                  <label className="block text-sm font-Nunito-font">Your Rocket Number</label>
                  <input type="text" placeholder="01XXXXXXXXX" className="w-full border rounded-lg px-3 py-2 mt-1" />
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-Nunito-font">Transaction ID</label>
                  <input type="text" placeholder="TRX12345" className="w-full border rounded-lg px-3 py-2 mt-1" />
                </div>
              </div>
            )}

            {method === "upay" && (
              <div className="payment-box">
                <p className="font-semibold text-blue-600 font-Nunito-font">Upay Payment Instructions</p>
                <p className="text-sm mt-2">Open Upay app and send money to account: <strong>01XXXXXXXXX</strong>. Paste your Transaction ID below.</p>
                <div className="mt-3">
                  <label className="block text-sm font-Nunito-font">Your Upay Number</label>
                  <input type="text" placeholder="01XXXXXXXXX" className="w-full border rounded-lg px-3 py-2 mt-1" />
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-Nunito-font">Transaction ID</label>
                  <input type="text" placeholder="UPAY123" className="w-full border rounded-lg px-3 py-2 mt-1" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="pt-5">
          <Link
            to="/viewcart"
            type="submit"
            class="w-full bg-Dark text-white bg-Green font-semibold p-3 rounded-xl transition"
          >
            PLACE ORDER
          </Link>
        </div>
      </div>

    </div>
  );
};

export default CheckoutRight;
