import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "./context";
import ProductArray from "./productArray";
import Loading from "./loading";

function ProductsPage() {
  let {
    isLoading,
    data,
    products,
    setProducts,
    isMainPage,
    search,
    setSearch,
    price,
    setPrice,
    setIsMainPage,
  } = useGlobalContext();

  let sidebarRef = useRef(null);

  let companies = [
    "All",
    ...new Set(
      data.map((product) => {
        return product.company;
      })
    ),
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [isMainPage]);

  useEffect(() => {
    sidebarRef.current.style.position = "sticky";
    sidebarRef.current.style.top = "2rem";
  });

  setIsMainPage(false);

  function searchCompany(company) {
    if (company === "All") {
      setProducts(data);
    } else {
      let newProducts = data.filter((product) => {
        return product.company === company;
      });
      setProducts(newProducts);
    }
  }

  useEffect(() => {
    let searchText = search.toLowerCase();
    let newProducts = data.filter((product) => {
      return product.name.startsWith(searchText);
    });
    setProducts(newProducts);
  }, [search]);

  useEffect(() => {
    let newProducts = data.filter((product) => {
      return product.price <= price;
    });
    setProducts(newProducts);
  }, [price]);

  return (
    <div className="products-page">
      <div className="blank-space">
        <div className="blank-space-center">
          <p>Home / Products</p>
        </div>
      </div>
      <div className="products-content">
        <div>
          <div className="sidebar" ref={sidebarRef}>
            <form className="form-text">
              <input
                type="text"
                className="search-text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <div className="companies">
              <h4>Company</h4>
              {companies.map((company, index) => {
                return (
                  <p key={index} onClick={() => searchCompany(company)}>
                    {company}
                  </p>
                );
              })}
            </div>
            <form className="form-range">
              <label htmlFor="range-price">Price</label>
              <input
                className="range-scroll"
                type="range"
                min="0"
                max="8000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p>Value : ${price}</p>
            </form>
          </div>
        </div>

        <div
          className={
            isLoading ? "products-container-loading" : "products-container"
          }
        >
          {isLoading ? (
            <Loading />
          ) : (
            <div className="featured-content">
              {products.map((product) => {
                return <ProductArray key={product.id} {...product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
