import { Link } from "react-router-dom";

const ViewRightCart = () => {
  
  return (
    <div className="lg:w-[35%] w-full px-4 py-10">
      <div className="bg-[#fdfeff] dark:bg-[#1a1a1a] p-6 rounded-lg border-2 border-gray-300 shadow-md mb-8">
        <h2 className="sm:text-2xl text-xl font-semibold text-primary-default dark:text-primary-dark font-Roboto mb-4">
          Cart totals
        </h2>

        <div className="overflow-x-auto">
          {" "}
          {/* Added for table responsiveness */}
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className="border-b border-gray-200">
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
                        htmlFor="shipping_method_0_free_shipping2"
                        className="text-primary-default dark:text-primary-dark font-Lato font-medium text-base pr-2"
                      >
                        Free shipping
                      </label>
                      <input
                        type="radio"
                        name="shipping_method[0]"
                        data-index="0"
                        id="shipping_method_0_free_shipping2"
                        value="free_shipping:2"
                        className="shipping_method mr-2"
                      />
                    </li>
                    <li>
                      <label
                        htmlFor="shipping_method_0_local_pickup3"
                        className="text-primary-default dark:text-primary-dark font-Lato font-medium text-base pr-2"
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

        <div className="my-6 text-center">
          <Link
            to="/checkout"
            className="inline-block bg-brand text-white px-4 py-2 rounded-md  text-base font-Lato font-semibold w-full "
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewRightCart;
