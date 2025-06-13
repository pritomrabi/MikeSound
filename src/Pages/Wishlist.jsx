import React from "react";
import Banner from "../Utilities/Banner";
import Empty from "../Components/Wishlist/Empty";

const Wishlist = () => {
  return (
    <div className="pt-20">
      <Banner para="This is the wishlist page" buton="Shop Now" />
      <Empty />
    </div>
  );
};

export default Wishlist;
