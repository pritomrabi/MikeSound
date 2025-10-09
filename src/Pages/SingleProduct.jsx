import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../Components/SingleProduct/ProductPage";
import Description from "../Components/SingleProduct/Description";
import RelatedProduct from "../Components/SingleProduct/RelatedProduct";
import { getProductById, getProducts } from "../api/api"; // তোমার API ফাংশন

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      window.scrollTo(0, 0);

      try {
        // Single product fetch
        const data = await getProductById(id);
        if (!data.error && data.product) {
          setProduct(data.product);

          const allProducts = await getProducts();
          if (!allProducts.error && allProducts.products) {
            const subCategoryProducts = allProducts.products.filter(
              (p) => p.subcategory_name === data.product.subcategory_name && p.id !== data.product.id
            );

            if (subCategoryProducts.length > 0) {
              setRelatedProducts(subCategoryProducts);
            } else {
              const categoryProducts = allProducts.products.filter(
                (p) => p.category_name === data.product.category_name && p.id !== data.product.id
              );
              setRelatedProducts(categoryProducts);
            }
          }
        }
      } catch (error) {
        // console.error("Error fetching product:", error);
        return error
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="flex font-Nunito-font font-semibold sm:text-2xl text-xl justify-center items-center h-[40vh]">Loading...</p>;

  return (
    <div className="md:pt-20 pt-16">
      <ProductPage product={product} />
      <Description product={product} />
      {relatedProducts.length > 0 ? (
        <RelatedProduct currentProduct={product} allProducts={relatedProducts} />
      ) : (
        <p className="flex font-Nunito-font font-semibold sm:text-2xl text-xl justify-center items-center h-[40vh]">Related products not available</p>
      )}
    </div>
  );
};

export default SingleProduct;
