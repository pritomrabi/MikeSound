import React from "react";
import HomeBanner from "../Components/Home/HomeBanner";
import HomeCategories from "../Components/Home/HomeCategories";
import HomeLatest from "../Components/Home/HomeLatest";
import HomeDiscover from "../Components/Home/HomeDiscover";
import HomeProducts from "../Components/Home/HomeProducts";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <HomeCategories />
      <HomeProducts />
      <HomeLatest />
      <HomeDiscover />
    </div>
  );
};

export default Home;
