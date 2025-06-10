import React from "react";

const Heading = ({  Head }) => {
  return (
    <div className="py-8 text-center">
      <p className="lg:text-sm text-xs text-secandari font-Lato font-normal">
        WELCOME TO WOODMART
      </p>
      <h3 className="lg:text-4xl text-3xl text-primary font-medium font-Roboto py-2">
        {Head}
      </h3>
      <p className="lg:text-sm text-xs text-secandari font-Lato font-normal md:w-1/2 w-[80%] text-center mx-auto">
        Nec sem consequat mi gravida augue augue suspendisse condimentum
        condimentum vestibulum augue mi gravida ugue.
      </p>
    </div>
  );
};

export default Heading;
