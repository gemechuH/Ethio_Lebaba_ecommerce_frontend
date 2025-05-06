import React, { useState } from "react";
import ProductCards from "../shop/ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const TrendingProduct = () => {
  const [visibleProducts, setVisibleProducts] = useState(4);

  const { data, error, isLoading } = useFetchAllProductsQuery({
    limit: visibleProducts,
    page: 1,
  });

  const products = data?.products || [];
  const totalProducts = data?.pagination?.total || 0;

  const loadMore = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products: {error.message}
      </div>
    );
  }

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
        incidunt tenetur omnis repellat laboriosam ad sint perferendis nam,
        totam ut?
      </p>
      <ProductCards products={products} />
      <div className="product__btn">
        {visibleProducts < totalProducts && (
          <button onClick={loadMore} className="btn">
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProduct;
