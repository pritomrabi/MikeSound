import React from "react";
import HomeBanner from "../Components/Home/HomeBanner";
import HomeCategories from "../Components/Home/HomeCategories";
import HomeLatest from "../Components/Home/HomeLatest";
import AdBanner from "../Components/Home/AdBanner";
import BestSeller from "../Components/Home/BestSeller";
import OurAuido from "../Components/Home/OurAuido";

const Home = () => {
  return (
    <div className="md:pt-20 pt-16">
      <HomeBanner />
      <BestSeller/>
      <AdBanner />
      <OurAuido/>
      <HomeLatest />
      <HomeCategories />
    </div>
  );
};

export default Home;
