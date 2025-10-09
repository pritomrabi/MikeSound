import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

const CheckoutBanner = () => {
  return (
    <section className="bg-[url('/home.jpg')] bg-cover bg-center bg-no-repeat h-[200px] flex items-center justify-center text-white text-center px-4 w-full relative">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.55)] bg-opacity-50"></div>
      <div className="sm:p-6 p-0 rounded-lg relative z-10 flex gap-2 sm:gap-5 items-center justify-center ">
        <Link
          to="/viewcart"
          className="sm:text-3xl text-sm font-bold text-secandari hover:text-white duration-300  font-Lato"
        >
          Shopping cart
        </Link>
        <FaChevronRight className="sm:text-xl text-base text-secandari" />
        <h1 className="sm:text-2xl text-sm font-bold text-white font-Lato">
          Checkout
        </h1>
        <FaChevronRight className="sm:text-xl text-base text-secandari" />
        <h1 className="sm:text-2xl text-sm font-bold text-secandari font-Lato">
          Order complete
        </h1>
      </div>
    </section>
  );
};

export default CheckoutBanner;
