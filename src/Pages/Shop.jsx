import React, { useEffect } from "react";
import ShopPage from "../Components/Shop/ShopPage";

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="md:pt-20 pt-16">
      <ShopPage />
    </div>
  );
};

export default Shop;
