import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";

function ProductArray({ id, name, price, url }) {
  let { addToCart } = useGlobalContext();
  let [showBtn, setShowBtn] = useState(false);

  return (
    <div key={id} className="single-content">
      <div
        className="image-content"
        onMouseOver={() => setShowBtn(true)}
        onMouseLeave={() => setShowBtn(false)}
      >
        <img
          className={
            showBtn ? "featured-image-active featured-image" : "featured-image"
          }
          src={url}
          alt={name}
        />
        <div
          className={showBtn ? "image-btns image-btns-active" : "image-btns"}
        >
          <div className="image-search-btn">
            <Link to={`/products/${id}`}>
              <FaSearch />
            </Link>
          </div>
          <div className="image-cart-btn" onClick={() => addToCart(id)}>
            <FaShoppingCart />
          </div>
        </div>
      </div>
      <h4>{name}</h4>
      <p>${price}</p>
    </div>
  );
}

export default ProductArray;
