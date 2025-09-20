import ProductPage from "../Components/SingleProduct/ProductPage";
import RelatedProduct from "../Components/SingleProduct/RelatedProduct";

const SingleProduct = () => {
  return (
    <div className="md:pt-20 pt-16">
      <ProductPage />
      <RelatedProduct />
    </div>
  );
};

export default SingleProduct;
