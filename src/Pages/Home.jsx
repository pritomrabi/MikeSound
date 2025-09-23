import React from "react";
import HomeBanner from "../Components/Home/HomeBanner";
import HomeCategories from "../Components/Home/HomeCategories";
import HomeLatest from "../Components/Home/HomeLatest";
import AdBanner from "../Components/Home/AdBanner";
import BigDeal from "../Components/Home/BigDeal";
import BestSeller from "../Components/Home/BestSeller";

const Home = () => {
  return (
    <div className="md:pt-20 pt-16">
      <HomeBanner />
      <BestSeller/>
      <BigDeal/>
      <HomeLatest />
      <AdBanner />
      <HomeCategories />
    </div>
  );
};

export default Home;
