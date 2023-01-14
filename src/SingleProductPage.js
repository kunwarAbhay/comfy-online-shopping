import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "./context";
import Loading from "./loading";

let singleURL = "https://course-api.com/javascript-store-single-product?";

function SinglePage() {
  let { addToCart, setIsMainPage, isLoading, setIsLoading } =
    useGlobalContext();
  let [product, setProduct] = useState({});
  let productId = useParams().id;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${singleURL}id=${productId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProduct({
          id: data.id,
          name: data.fields.name,
          price: data.fields.price,
          url: data.fields.image[0].url,
          company: data.fields.company,
        });
        setIsLoading(false);
      });
  }, []);

  let { id, name, price, url, company } = product;
  setIsMainPage(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="single-products-page">
      <div className="blank-space">
        <div className="blank-space-center">
          <p>Home / {name}</p>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="single-product-content">
          <img className="product-img" src={url} alt={name} />
          <div className="product-feature">
            <h1>{name}</h1>
            <p className="company">By {company}</p>
            <p className="price">${price}</p>
            <p className="about">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              libero illo quasi sed pariatur mollitia esse, ipsa eius quas
              inventore. Perferendis, iste? Omnis sapiente repudiandae nisi
              perspiciatis, earum voluptates sequi ad beatae temporibus
              asperiores, nihil corrupti voluptate possimus non accusantium.
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint
              iste numquam neque doloribus repellat. Doloremque illo provident
              autem distinctio officiis!
            </p>
            <button className="btn-all-products" onClick={() => addToCart(id)}>
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SinglePage;
