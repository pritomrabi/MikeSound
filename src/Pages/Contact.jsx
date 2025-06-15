import React from "react";
import Banner from "../Utilities/Banner";
import Form from "../Components/Contact/Form";
import Map from "../Components/Contact/Map";

const Contact = () => {
  return (
    <div className="pt-20">
      <Banner para="This is the contact page" />
      <Form />
      <Map />
    </div>
  );
};

export default Contact;
