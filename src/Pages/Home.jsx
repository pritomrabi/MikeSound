import React from "react";
import HomeBanner from "../Components/Home/HomeBanner";
import HomeCategories from "../Components/Home/HomeCategories";
import HomeLatest from "../Components/Home/HomeLatest";
import HomeDiscover from "../Components/Home/HomeDiscover";
import AdBanner from "../Components/Home/AdBanner";
import ProductShowcase from "../Components/Home/ProductShowcase";

const Home = () => {
  return (
    <div className="pt-20">
      <HomeBanner />
      <ProductShowcase />
      <HomeLatest />
      <AdBanner />
      <HomeCategories />
    </div>
  );
};

export default Home;
