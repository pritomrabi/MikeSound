import Banner from "../Utilities/Banner";
import Form from "../Components/Contact/Form";
import Map from "../Components/Contact/Map";
import FAQ from "../Components/Contact/FAQ";

const Support = () => {
  return (
    <div className="pt-20">
      <Banner para="This is the support page" />
      <FAQ />
      <Form />
      <Map />
    </div>
  );
};

export default Support;
