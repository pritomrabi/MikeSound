import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    // ডেমো ডাটা
    const demoOrders = [
      {
        id: 1,
        date: "2025-08-20",
        shipping: 20,
        items: [
          {
            id: 101,
            name: "Wkinny Fit Suit - XXL",
            price: 599,
            quantity: 2,
            image:
              "https://woodmart.xtemos.com/wp-content/uploads/2017/04/fashion-product-3.jpg",
          },
        ],
      },
      {
        id: 2,
        date: "2025-08-25",
        shipping: 15,
        items: [
          {
            id: 102,
            name: "Classic Shirt - L",
            price: 250,
            quantity: 3,
            image:
              "https://woodmart.xtemos.com/wp-content/uploads/2017/04/fashion-product-1.jpg",
          },
        ],
      },
    ];

    setOrders(demoOrders);

    // grand total হিসাব
    const total = demoOrders.reduce((accOrder, order) => {
      const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      return accOrder + subtotal + (order.shipping || 0);
    }, 0);

    setGrandTotal(total);
  }, []);

  return (
    <div className="lg:w-[70%] w-full mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Your Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-secandari-default">You have not purchased any products yet.</p>
      ) : (
        <>
          <div className="space-y-6 mb-6">
            {orders.map((order) => {
              const subtotal = order.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              );
              const total = subtotal + (order.shipping || 0);

              return (
                <div key={order.id} className="border rounded-lg p-4 shadow-md bg-white dark:bg-[#1a1a1a]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                    <p className="font-medium text-primary-default dark:text-primary-dark">
                      Order #{order.id} - {order.date}
                    </p>
                    <p className="font-semibold text-brand mt-2 sm:mt-0">${total.toFixed(2)}</p>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center border-b pb-3 last:border-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-28 h-28 sm:w-20 sm:h-20 object-cover rounded"
                        />
                        <div className="ml-0 sm:ml-4 flex-1 mt-2 sm:mt-0">
                          <p className="font-medium text-primary-default dark:text-primary-dark">{item.name}</p>
                          <p className="text-sm text-secandari-default">Quantity: {item.quantity}</p>
                          <p className="text-sm text-secandari-default">Price: ${item.price}</p>
                        </div>
                        <p className="font-semibold text-brand mt-2 sm:mt-0">${item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 text-right text-sm font-medium text-primary-default dark:text-primary-dark">
                    Subtotal: ${subtotal}, Shipping: ${order.shipping}, Total: ${total}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-right font-semibold text-lg text-brand">
            Grand Total (all orders): ${grandTotal.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderHistory;
