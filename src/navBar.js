import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function NavBar() {
  let {
    isMainPage,
    setIsMainPage,
    setIsCartBar,
    amounts,
    setIsLogin,
    setLoggedIn,
    loggedIn,
    name,
    setLogInClicked,
    logInClicked,
    setEmail,
    setPassword,
    setAlertType,
    setProgWidth,
    setCartItems,
  } = useGlobalContext();

  let [linkMenu, setLinkMenu] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 801) {
      setLinkMenu(false);
    }
  }, [window.innerWidth]);

  return (
    <div className={isMainPage ? "nav-bar" : "nav-bar nav-bar-active"}>
      <div className="nav-bar-center">
        <div
          className="nav-link-menu-btn"
          onClick={() => setLinkMenu(!linkMenu)}
        >
          <FaBars />
        </div>
        <div
          className={
            linkMenu ? "nav-link-menu nav-link-menu-active" : "nav-link-menu"
          }
        >
          <div className="nav-link-menu-content">
            <div className="close-btn-nav" onClick={() => setLinkMenu(false)}>
              <FaTimes />
            </div>
            <ul className="nav-links">
              <li
                onClick={() => {
                  setIsMainPage(true);
                  setLinkMenu(false);
                }}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                onClick={() => {
                  setIsMainPage(false);
                  setLinkMenu(false);
                }}
              >
                <Link to="/products">Products</Link>
              </li>
              <li
                onClick={() => {
                  setIsMainPage(false);
                  setLinkMenu(false);
                }}
              >
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
        <ul className="nav-links">
          <li onClick={() => setIsMainPage(true)}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setIsMainPage(false)}>
            <Link to="/products">Products</Link>
          </li>
          <li onClick={() => setIsMainPage(false)}>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <img
          src={
            isMainPage
              ? "https://vanilla-js-store.netlify.app/images/logo-white.svg"
              : "https://vanilla-js-store.netlify.app/images/logo-black.svg"
          }
          alt="comfy-logo"
          className="comfy-logo"
        />
        <div className="logo-container">
          <div className="cart-logo-text" onClick={() => setIsCartBar(true)}>
            <div className="cart-logo">
              <FaShoppingCart />
              <p>{amounts}</p>
            </div>
          </div>
          {loggedIn ? (
            <div
              className="logged-in"
              onClick={(e) => {
                e.stopPropagation();
                if (logInClicked) {
                  setLogInClicked(false);
                } else {
                  setLogInClicked(true);
                }
              }}
            >
              <div className="logged-in-logo">
                <FaUserCircle className="logged-in-logo" />
              </div>
              <div
                className={
                  logInClicked
                    ? "user-detail-container user-detail-show"
                    : "user-detail-container"
                }
              >
                <p className="user-name">{name}</p>
                <div>
                  <p>Account</p>
                  <p>All Orders</p>
                </div>
                <button
                  className="login-btn-nav"
                  onClick={() => {
                    setProgWidth(0);
                    setAlertType({
                      show: true,
                      text: "Logged Out Successfully!",
                      color: "red",
                    });
                    signOut(auth);
                    setLoggedIn(false);
                    setEmail("");
                    setCartItems([]);
                    localStorage.removeItem("email");
                    localStorage.removeItem("password");
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div
              className="login-logo-text"
              onClick={() => {
                setIsLogin(true);
                setEmail("");
                setPassword("");
              }}
            >
              <button className="login-btn-nav">Sign In</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
