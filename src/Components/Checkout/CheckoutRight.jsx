import { Link } from "react-router-dom";
import React, { useState } from "react";
import { PiMinusThin } from "react-icons/pi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
const CheckoutRight = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState("bacs");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const paymentOptions = [
    {
      id: "bacs",
      label: "Direct bank transfer",
      description:
        "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.",
    },
    {
      id: "cheque",
      label: "Cheque Payment",
      description:
        "Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.",
    },
    {
      id: "cod",
      label: "Cash on delivery",
      description: "Pay with cash upon delivery.",
    },
    {
      id: "paypal",
      label: (
        <>
          PayPal{" "}
          <img
            src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg"
            alt="PayPal"
            className="inline h-4 ml-1"
          />{" "}
          <a
            href="https://www.paypal.com/us/webapps/mpp/paypal-popup"
            className="text-blue-600 hover:underline text-sm ml-1"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                "https://www.paypal.com/us/webapps/mpp/paypal-popup",
                "WIPaypal",
                "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=1060,height=700"
              );
            }}
          >
            What is PayPal?
          </a>
        </>
      ),
      description:
        "Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account. SANDBOX ENABLED. You can use sandbox testing accounts only. See the PayPal Sandbox Testing Guide for more details.",
    },
  ];

  return (
    <div className="lg:w-[50%] w-full sm:px-4 px-0 py-10">
      <div className="bg-[#fdfeff] dark:bg-[#1a1a1a] p-6 rounded border-2 border-gray-300 shadow-md mb-8">
        <h2 className="sm:text-2xl text-xl text-center font-semibold text-primary-default dark:text-primary-dark font-Roboto mb-4">
          YOUR ORDER
        </h2>

        <div className="overflow-x-auto space-y-3">
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className="border-b-2 border-gray-300">
                <th className="py-2 font-medium text-primary-default dark:text-primary-dark text-base font-Roboto ">
                  PRODUCT
                </th>
                <td className="py-2 text-right font-medium text-primary-default dark:text-primary-dark text-base font-Roboto">
                  SUBTOTAL
                </td>
              </tr>
            </tbody>
          </table>
          <div className="border-b pb-4 border-gray-300 flex items-center space-x-2">
            <div className="p-2">
              <img
                src="https://woodmart.xtemos.com/wp-content/uploads/2017/04/fashion-product-3.jpg"
                alt="Product"
                className="sm:w-28 w-24 h-20 sm:h-24 object-cover"
              />
            </div>
            <div className="flex flex-col w-full ">
              <p className="text-primary-default dark:tex-primary-dark text-sm font-Lato font-medium pb-2">
                Wkinny Fit Suit - XXL
              </p>
              <div className="flex sm:w-20 w-14 border rounded border-gray-300">
                <button
                  className="sm:p-2 p-1 cursor-pointer"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <PiMinusThin size={10} />
                </button>
                <div className="sm:px-2 px-1 py-1 font-medium font-Monrope text-secandari-default sm:text-sm text-xs">
                  {quantity}
                </div>
                <button
                  className="sm:p-2 p-1 cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <HiOutlinePlusSmall size={10} />
                </button>
              </div>
            </div>
            <p className="p-2 text-brand text-sm font-Monrope font-medium">
              $599.00
            </p>
          </div>
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className="border-b border-gray-300">
                <th className="py-2 font-normal text-primary-default dark:text-primary-dark text-base font-Roboto">
                  Subtotal
                </th>
                <td
                  className="py-2 text-right font-semibold text-brand font-Monrope text-sm"
                  data-title="Subtotal"
                >
                  <span className="">
                    <span className="">$</span>
                    4,193.00
                  </span>
                </td>
              </tr>

              <tr className="border-b border-gray-200  justify-end">
                <td className="py-2 font-normal text-primary-default dark:text-primary-dark text-base font-Roboto">
                  Shipping
                </td>
                <td className="py-5 text-end" data-title="Shipping">
                  <ul className="list-none p-0 space-y-2">
                    <li>
                      <label
                        htmlFor=""
                        className="text-primary-default dark:text-primary-dark font-Lato font-medium text-base pr-2"
                      >
                        Flat rate:{" "}
                        <span className="font-semibold text-brand">$20.00</span>
                      </label>
                      <input
                        type="radio"
                        name="shipping_method[0]"
                        data-index="0"
                        id=""
                        value="flat_rate:1"
                        className="cursor-pointer mr-2"
                        defaultChecked
                      />
                    </li>
                    <li>
                      <label
                        htmlFor="shipping_method_0_local_pickup3"
                        className="text-primary font-Lato font-medium text-base pr-2"
                      >
                        Local pickup:{" "}
                        <span className="font-semibold text-brand">$25.00</span>
                      </label>
                      <input
                        type="radio"
                        name="shipping_method[0]"
                        data-index="0"
                        id="shipping_method_0_local_pickup3"
                        value="local_pickup:3"
                        className="shipping_method mr-2"
                      />
                    </li>
                  </ul>
                </td>
              </tr>

              <tr className="border-t-2 border-gray-300">
                <th className="py-4 font-semibold text-lg text-primary-default dark:text-primary-dark font-Roboto">
                  Total
                </th>
                <td
                  className="py-4 text-right font-medium font-Monrope text-lg text-brand"
                  data-title="Total"
                >
                  <strong>
                    <span className="">
                      <span className="">$</span>
                      4,213.00
                    </span>
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8  pt-6">
        <ul className="space-y-4">
          {paymentOptions.map((method) => (
            <li
              key={method.id}
              className="p-0.5 font-Lato font-normal text-sm text-secandari-default dark:text-secandari-dark"
            >
              <label className="flex items-start space-x-3">
                <input
                  type="radio"
                  id={`payment_method_${method.id}`}
                  name="payment_method"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                  className="mt-1"
                />
                <span className="text-base text-primary-default dark:text-primary-dark  font-medium">
                  {method.label}
                </span>
              </label>
              {selectedMethod === method.id && (
                <div className="mt-3 text-sm text-primary-default dark:text-primary-dark">
                  {method.description}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6 text-sm text-primary-default dark:text-primary-dark font-Lato font-normal">
          <p>
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our{" "}
            <Link
              to="https://woodmart.xtemos.com/privacy-policy/demo/flat/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-4">
          <label className="flex items-start text-sm text-primary-default dark:text-primary-dark font-Lato font-normal space-x-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
            />
            <span>
              I have read and agree to the website{" "}
              <a
                href="https://woodmart.xtemos.com/terms-and-conditions/demo/flat/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                terms and conditions
              </a>
              . <abbr className="text-red-600">*</abbr>
            </span>
          </label>
        </div>
      </div>
      <div className="my-6 text-center">
        <Link
          to="/checkout"
          className="inline-block bg-brand text-white px-4 py-2 rounded-md  text-base font-Lato font-semibold w-full "
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
};

export default CheckoutRight;
