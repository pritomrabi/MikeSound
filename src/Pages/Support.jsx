import Form from "../Components/Contact/Form";
import FAQ from "../Components/Contact/FAQ";
import { useEffect } from "react";

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="md:pt-20 pt-16">
      <FAQ />
      <Form />
    </div>
  );
};

export default Support;
