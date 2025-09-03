import React from "react";

const Heading = ({  Head }) => {
  return (
    <div className="container px-5 py-4 text-start">
      <h3 className="lg:text-3xl text-2xl text-primary-default dark:text-primary-dark font-medium font-Roboto py-2">
        {Head}
      </h3>
      <p className="lg:text-sm text-xs text-secandari-default dark:text-secandari-dark font-Lato font-normal md:w-1/2 w-[80%] text-center mx-auto">
        
      </p>
    </div>
  );
};

export default Heading;
