import React from "react";
import HomeBanner from "../Components/Home/HomeBanner";
import HomeCategories from "../Components/Home/HomeCategories";
import HomeLatest from "../Components/Home/HomeLatest";
import HomeDiscover from "../Components/Home/HomeDiscover";

const Home = () => {
  return (
    <div className="pt-20">
      <HomeBanner />
      <HomeCategories />
      <HomeLatest />
      <HomeDiscover />
    </div>
  );
};

export default Home;
