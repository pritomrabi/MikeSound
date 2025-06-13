import { Link } from "react-router-dom";

const Banner = ({ para, buton }) => {
  return (
    <section className="bg-[url('/home.jpg')] bg-cover bg-center bg-no-repeat h-[300px] flex items-center justify-center text-white text-center px-4 w-full relative">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.55)] bg-opacity-50"></div>
      <div className="p-6 rounded-lg relative z-10">
        <h1 className="text-5xl font-bold text-white font-Lato">
          Fashion Flat
        </h1>
        <p className="mt-2 text-white text-sm font-normal font-Monrope">
          {para}
        </p>
        {buton && (
          <Link
            to="/shop"
            className="mt-4 inline-block bg-brand text-white text-sm font-medium font-Monrope px-6 py-2 scale-95 rounded-sm"
          >
            {buton}
          </Link>
        )}
      </div>
    </section>
  );
};

export default Banner;
