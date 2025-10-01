import React, { useEffect } from "react";
import HomeBanner from "../Components/Home/HomeBanner";
import HomeCategories from "../Components/Home/HomeCategories";
import AdBanner from "../Components/Home/AdBanner";
import OurAuido from "../Components/Home/OurAuido";
import Collection from "../Components/Home/Collection";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="md:pt-20 pt-16">
      <HomeBanner />
      <OurAuido />
      <Collection />
      <AdBanner />
      <HomeCategories />
    </div>
  );
};

export default Home;
