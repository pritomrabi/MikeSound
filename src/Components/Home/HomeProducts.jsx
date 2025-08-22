import React, { useState } from "react";
import Heading from "../../Utilities/Heading";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import ProductQuickView from "./ProductQuickView";
import { Link } from "react-router-dom";

const HomeProducts = () => {
  const [selectedCollection, setSelectedCollection] = useState("man");
  const [quickcart, setQuickcart] = useState(false);

  const products = {
    man: [
      { title: "Men's Slim Fit Shirt", price: "$99.00", sizes: ["XS", "S", "XL"], img: "home.jpg" },
      { title: "Casual Denim Jacket", price: "$120.00", sizes: ["S", "M", "L"], img: "https://via.placeholder.com/300x300" },
    ],
    woman: [
      { title: "Women's Elegant Dress", price: "$89.00", sizes: ["XS", "S", "M"], img: "https://woodmart.xtemos.com/wp-content/uploads/2017/04/fashion-product-7.jpg" },
      { title: "Summer Floral Top", price: "$75.00", sizes: ["S", "M", "L"], img: "https://via.placeholder.com/300x300" },
    ],
  };

  return (
    <section className="py-12">
      <div className="container mx-auto p-4">
        <Heading Head="Featured Products" />
        <div className="flex justify-center mb-8">
          <button
            className={`px-4 py-2 mr-2 text-sm sm:text-base font-Lato font-medium rounded cursor-pointer ${selectedCollection === "man" ? "text-brand" : "text-primary"}`}
            onClick={() => setSelectedCollection("man")}
          >MAN COLLECTION</button>
          <button
            className={`px-4 py-2 text-sm sm:text-base font-Lato font-medium rounded cursor-pointer ${selectedCollection === "woman" ? "text-brand" : "text-primary"}`}
            onClick={() => setSelectedCollection("woman")}
          >WOMAN COLLECTION</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products[selectedCollection].map((prod, idx) => (
            <div key={idx} className="group relative rounded-md shadow-sm transition overflow-hidden">
              <div className="overflow-hidden rounded-md">
                <img src={prod.img} alt={prod.title} className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105 cursor-pointer" />
              </div>
              <div className="text-center space-y-1 p-3">
                <div className="flex justify-center gap-2 text-xs text-primary-default font-medium font-Lato">
                  {prod.sizes.map((size, i) => <span key={i}>{size}</span>)}
                </div>
                <h3 className="text-sm font-medium text-primary-default font-Roboto">{prod.title}</h3>
                <p className="text-md font-bold text-brand font-Monrope">{prod.price}</p>
              </div>
              <div className="absolute bottom-32 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition flex gap-4 bg-white py-2.5 px-5 rounded shadow z-10">
                <div className="relative group/icon">
                  <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"><AiOutlineShoppingCart /></button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100">Add to cart</span>
                </div>
                <div className="relative group/icon">
                  <button onClick={() => setQuickcart(true)} className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"><LuSearch /></button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100">Search</span>
                </div>
                <Link to="/wishlist" className="relative group/icon">
                  <button className="text-xl text-primary hover:text-secandari duration-200 cursor-pointer"><FaRegHeart /></button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover/icon:opacity-100">Wishlist</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {quickcart && <ProductQuickView setQuickcart={setQuickcart} />}
      </div>
    </section>
  );
};

export default HomeProducts;
