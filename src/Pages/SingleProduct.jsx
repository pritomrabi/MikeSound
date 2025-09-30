import Description from "../Components/SingleProduct/Description";
import ProductPage from "../Components/SingleProduct/ProductPage";
import RelatedProduct from "../Components/SingleProduct/RelatedProduct";

const SingleProduct = () => {
  return (
    <div className="md:pt-20 pt-16">
      <ProductPage />
      <Description />
      <RelatedProduct />
    </div>
  );
};

export default SingleProduct;
