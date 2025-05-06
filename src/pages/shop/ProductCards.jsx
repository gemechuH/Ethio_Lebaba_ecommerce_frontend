import React from "react";
import { Link } from "react-router-dom";
import RetingStar from "../../components/RetingStar";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/CarSlice";

const ProductCards = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Product already has _id from API
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div className="product__card" key={product._id}>
          <div className="relative">
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300 mt-12"
              />
            </Link>

            
            <div className="absolute top-3 right-3 hover:block">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                <i className="ri-shopping-cart-2-line w-full bg-primary-dark text-white hover:bg-primary"></i>
              </button>
            </div>
          </div>

          <div className="product__card__content">
            <h4>{product.name}</h4>
            <p>
              ${product.price}{" "}
              {product.oldPrice ? <s>${product.oldPrice}</s> : null}
            </p>
            <RetingStar rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
