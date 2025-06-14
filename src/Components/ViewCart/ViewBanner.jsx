import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

const ViewBanner = () => {
  return (
    <section className="bg-[url('/home.jpg')] bg-cover bg-center bg-no-repeat h-[200px] flex items-center justify-center text-white text-center px-4 w-full relative">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.55)] bg-opacity-50"></div>
      <div className="p-6 rounded-lg relative z-10 flex gap-5 items-center justify-center ">
        <h1 className="text-3xl font-bold text-white font-Lato">
          Fashion Flat
        </h1>
        <FaChevronRight className="text-xl text-secandari" />
        <Link
          to="/checkout"
          className="text-2xl font-bold text-secandari hover:text-white duration-300 font-Lato"
        >
          Checkout
        </Link>
        <FaChevronRight className="text-xl text-secandari" />
        <h1 className="text-2xl font-bold text-secandari font-Lato">
          Order complete
        </h1>
      </div>
    </section>
  );
};

export default ViewBanner;
