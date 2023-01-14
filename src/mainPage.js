import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import ProductArray from "./productArray";

let featuredProducts = [
  {
    id: "rec43w3ipXvP28vog",
    name: "high-back bench",
    price: 999,
    url: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1668084633/product-1_evgdfv.jpg",
  },
  {
    id: "recmg2a1ctaEJNZhu",
    name: "utopia sofa",
    price: 3995,
    url: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1668085569/product-3_ehcs5d.jpg",
  },
  {
    id: "recvKMNR3YFw0bEt3",
    name: "entertainment center",
    price: 2998,
    url: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1668084780/product-2_xpelnb.jpg",
  },
];

function MainPage() {
  let { setIsMainPage } = useGlobalContext();
  setIsMainPage(true);
  return (
    <>
      <div className="main-page">
        <div className="main-content">
          <h1 className="main-heading">
            Rest,Relax,<span>Unwind</span>
          </h1>
          <p className="main-para">Embrace Your Choices - We Do!</p>
          <button className="btn-shop-now" onClick={() => setIsMainPage(false)}>
            <Link to="/products">Shop Now</Link>
          </button>
        </div>
      </div>
      <div className="featured-section">
        <h1 className="featured-heading">
          <span>/ </span>Featured
        </h1>
        <div className="featured-content">
          {featuredProducts.map((product) => {
            return <ProductArray key={product.id} {...product} />;
          })}
        </div>
        <button
          className="btn-all-products"
          onClick={() => setIsMainPage(false)}
        >
          <Link to="/products">All Products</Link>
        </button>
      </div>
    </>
  );
}

export default MainPage;
