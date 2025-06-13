import ProductPage from "../Components/SingleProduct/ProductPage";
import RelatedProduct from "../Components/SingleProduct/RelatedProduct";

const SingleProduct = () => {
  return (
    <div className="pt-20">
      <ProductPage />
      <RelatedProduct />
    </div>
  );
};

export default SingleProduct;
