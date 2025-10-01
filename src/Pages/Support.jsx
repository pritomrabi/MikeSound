import Banner from "../Utilities/Banner";
import Form from "../Components/Contact/Form";
import Map from "../Components/Contact/Map";
import FAQ from "../Components/Contact/FAQ";
import { useEffect } from "react";

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="md:pt-20 pt-16">
      <Banner para="This is the support page" />
      <FAQ />
      <Form />
      <Map />
    </div>
  );
};

export default Support;
