import  { useEffect } from "react";
import ViewShopping from "../Components/ViewCart/ViewShopping";

const ViewCart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="md:pt-20 pt-16">
      <ViewShopping />
    </div>
  );
};

export default ViewCart;
