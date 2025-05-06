import React from "react";
import { Link, useParams } from "react-router-dom";
import RetingStar from "../../../components/RetingStar";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cart/CarSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: product, error, isLoading } = useFetchProductByIdQuery(id);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading product: {JSON.stringify(error)}
      </div>
    );
  if (!product)
    return <div className="text-center py-10">Product not found</div>;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Single Product Page</h2>
        <div className="section__subheader space-x-4">
          <span className="hover:text-primary">
            <Link to="/">home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">
            <Link to="/shop">shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{product.name}</span>
        </div>
      </section>
      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <div className="md:w-1/2 w-full">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-md w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
            <p className="text-xl text-primary mb-4">
              ${product.price}{" "}
              {product.oldPrice ? <s>${product.oldPrice}</s> : null}
            </p>
            <div>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Color:</strong> {product.color}
              </p>
              <p>
                <strong>Author:</strong> {product.author}{" "}
                {/* Display as string */}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Rating: </strong> <RetingStar rating={product.rating} />
              </div>
              <p className="mt-2">{product.description}</p>
            </div>
            <button
              className="mt-6 px-6 py-3 bg-primary text-white rounded-md"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
