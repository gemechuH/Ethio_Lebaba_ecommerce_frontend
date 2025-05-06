import React, { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "under $50", min: 0, max: 50 },
    { label: "$50-$100", min: 50, max: 100 },
    { label: "$100-$200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [filterState, setFilterState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const { category, color, priceRange } = filterState;

  const getPriceRange = () => {
    if (!priceRange) return { min: "", max: "" };
    const selectedRange = filters.priceRanges.find(
      (range) => range.label === priceRange
    );
    return selectedRange
      ? { min: selectedRange.min, max: selectedRange.max }
      : { min: "", max: "" };
  };

  const { data, error, isLoading } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: getPriceRange().min,
    maxPrice: getPriceRange().max,
    limit: productsPerPage,
    page: currentPage,
  });

  console.log("API Response:", { data, error, isLoading });

  const products = data?.products || [];
  const pagination = data?.pagination || {};

  const clearFilter = () => {
    setFilterState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products: {JSON.stringify(error)}
      </div>
    );

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shopping Pages</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </section>
      <section className="section__container flex gap-12">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          <ShopFiltering
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            clearFilter={clearFilter}
          />
        </div>
        <div className="flex-1">
          
          <h3 className="text-xl font-medium mb-4">
            Showing {products.length} out of {pagination.total || 0} Products
          </h3>
          {products.length > 0 ? (
            <>
              <ProductCards products={products} />
              <div className="flex justify-center items-center gap-4 mt-6">
                
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded ${
                    currentPage === 1
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary-dark"
                  }`}
                >
                  Previous
                </button>

                {[...Array(pagination.pages || 0)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === index + 1
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, pagination.pages || 1)
                    )
                  }
                  disabled={currentPage === pagination.pages}
                  className={`px-4 py-2 border rounded ${
                    currentPage === pagination.pages
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary-dark"
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="text-center mt-2 text-gray-600">
                Page {currentPage} of {pagination.pages || 1}
              </div>
            </>
          ) : (
            <div className="text-center py-10">No products found</div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShopPage;
