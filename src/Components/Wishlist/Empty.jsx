import React from "react";
import { Link } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";

const Empty = () => {
  return (
    <section className="">
      <dix className=" container mx-auto px-4">
        <div>
          <div className=" text-center py-10">
            <IoMdHeart className=" text-8xl text-brand mx-auto mb-4" />
            <p className=" text-4xl font-semibold text-primary font-Roboto mb-4">
              This wishlist is empty.
            </p>
            <div className=" text-secandari text-sm font-medium font-Lato mb-4">
              You don't have any products in the wishlist yet. <br />
              You will find a lot of interesting products on our "Shop" page.
            </div>
            <Link
              to="/shop"
              className=" inline-block bg-brand text-white text-base font-medium font-Monrope px-8 py-3 scale-95 rounded-sm"
            >
              Return to shop
            </Link>
          </div>
        </div>
      </dix>
    </section>
  );
};

export default Empty;
