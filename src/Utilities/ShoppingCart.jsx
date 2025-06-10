import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
const ShoppingCart = ({ setShop }) => {
  return (
    <div className="absolute w-full top-0 left-0 flex transition-all duration-500 h-screen">
      <div
        onClick={() => setShop(false)}
        className="lg:w-[55%] xl:w-[65%] md:w-[35%] sm:w-[40%] w-[5%] cursor-pointer h-full z-40 "
      ></div>
      <div className="fixed right-0  bg-white xl:w-[35%] lg:w-[45%] md:w-[65%] sm:w-[60%] w-[85%] h-[98%] items-center top-1 bottom-2  shadow-md rounded-l-2xl px-1 sm:px-4 md:px-8 py-4 z-50">
        <p
          onClick={() => setShop(false)}
          className=" absolute -left-5 border-[4px] text-white bg-brand duration-100 p-2 w-fit rounded-full drop-shadow-sm cursor-pointer"
        >
          <RxCross2 className=" text-lg" />
        </p>
      </div>
    </div>
  );
};

export default ShoppingCart;
