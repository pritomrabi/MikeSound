import React from "react";
import { Link } from "react-router-dom";

const HomeDiscover = () => {
  const brands = [
    {
      href: "#",
      img: "https://woodmart.xtemos.com/wp-content/uploads/2016/09/brand-witra.png",
      alt: "Vitra",
    },
    {
      href: "#",
      img: "https://woodmart.xtemos.com/wp-content/uploads/2016/09/brand-Rosenthal.png",
      alt: "Röshults",
    },
    {
      href: "#",
      img: "https://woodmart.xtemos.com/wp-content/uploads/2016/09/brand-PackIt.png",
      alt: "PackIt",
    },
    {
      href: "#",
      img: "https://woodmart.xtemos.com/wp-content/uploads/2017/01/nichemodern.png",
      alt: "Niche",
    },
    {
      href: "#",
      img: "https://woodmart.xtemos.com/wp-content/uploads/2016/09/brand-Magisso.png",
      alt: "Magisso",
    },
    {
      href: "#",
      img: "https://woodmart.xtemos.com/wp-content/uploads/2016/09/brand-Louis-Poulsen.png",
      alt: "Louis Poulsen",
    },
    {
      href: "#",
      img: "https://woodmart.xtemos.com/wp-content/uploads/2017/01/klobe2r.png",
      alt: "KLÖBER",
    },
    {
      href: "#",
      img: "https://woodmart.xtemos.com/wp-content/uploads/2016/09/brand-Joseph-Joseph.png",
      alt: "Joseph Joseph",
    },
    {
      href: "#",
      img: "https://woodmart.xtemos.com/wp-content/uploads/2016/09/brand-hay.png",
      alt: "HAY",
    },
  ];
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 py-16 gap-10">
          {/* Left content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <p className="text-sm uppercase text-secandari font-Lato font-normal tracking-widest mb-4">
              CONDIMENTUM QUIS NASCETUR
            </p>
            <h2 className="text-3xl md:text-4xl font-Roboto font-semibold leading-tight mb-6">
              Discover fashion and style on <br className="hidden md:inline" />
              our online worldwide store.
            </h2>
            <p className="text-secandari font-Lato font-normal mb-8 text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              Etiam semper nibh orci, ac tincidunt mi consectetur a. In quis
              tortor ex. Morbi cursus sed neque quis dictum. Duis bibendum
              ullamcorper pharetra. Vivamus quis turpis et enim cursus neque
              quis.
            </p>
            <div className="flex font-Opensans justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="bg-yellow-600 text-white px-6 py-3 text-sm font-medium rounded-sm shadow hover:bg-yellow-700"
              >
                SHOP NOW
              </Link>
              <a
                href="#"
                className="border border-gray-300 text-gray-800 px-6 py-3 text-sm font-medium rounded-sm hover:bg-gray-100"
              >
                VIEW MORE
              </a>
            </div>
          </div>

          {/* Right brand grid */}
          <div className="lg:w-1/2 grid grid-cols-3 gap-px bg-gray-200 ">
            {brands.map((brand, idx) => (
              <a
                key={idx}
                href={brand.href}
                className="bg-white flex items-center justify-center p-6  transition"
              >
                <img
                  src={brand.img}
                  alt={brand.alt}
                  className="max-h-12 grayscale hover:grayscale-0 transition duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDiscover;
