import React, { useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const url = "https://course-api.com/javascript-store-products";

let appContext = React.createContext();

function AppProvider({ children }) {
  let [isLoading, setIsLoading] = useState(false);
  let [isMainPage, setIsMainPage] = useState(true);
  let [data, setData] = useState([]);
  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");
  let [price, setPrice] = useState(8000);
  let [name, setName] = useState("");
  let [email, setEmail] = useState(localStorage.getItem("email"));
  let [password, setPassword] = useState(localStorage.getItem("password"));
  let [cartItems, setCartItems] = useState(getCartItems);
  let [isCartBar, setIsCartBar] = useState(false);
  let [amounts, setAmounts] = useState(1);
  let [total, setTotal] = useState(0);
  let [isRegistration, setIsRegistration] = useState(false);
  let [isLogin, setIsLogin] = useState(false);
  let [curUser, setCurUser] = useState(null);
  let [loggedIn, setLoggedIn] = useState(false);
  let [logInClicked, setLogInClicked] = useState(false);
  let [alertType, setAlertType] = useState({
    show: false,
    text: "",
    color: "",
  });
  let [progWidth, setProgWidth] = useState(0);

  function getCartItems() {
    if (email && localStorage.getItem(email)) {
      return JSON.parse(localStorage.getItem(email));
    } else if (localStorage.getItem("noUser")) {
      return JSON.parse(localStorage.getItem("noUser"));
    } else {
      return [];
    }
  }

  // async function getCartData() {
  //   let docSnap = await getDoc(doc(db, "users", email));
  //   setCartItems(JSON.parse(docSnap.data().cart));
  // }

  // useEffect(() => {
  //   if (email) {
  //     getCartData();
  //   } else if (localStorage.getItem("noUser")) {
  //     setCartItems(JSON.parse(localStorage.getItem("noUser")));
  //   }
  // }, []);

  function fetchProducts() {
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        let data = items.map((item) => {
          return {
            id: item.id,
            name: item.fields.name,
            price: item.fields.price,
            url: item.fields.image[0].url,
            company: item.fields.company,
            amount: 1,
          };
        });
        setData(data);
        setProducts(data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function removeCartItems(id) {
    let newCartItems = cartItems.filter((cartItems) => {
      return cartItems.id !== id;
    });
    setCartItems(newCartItems);
  }

  function decreaseCount(id) {
    let newCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === id) {
        return { ...cartItem, amount: cartItem.amount - 1 };
      }
      return cartItem;
    });
    setCartItems(newCartItems);
  }

  function increaseCount(id) {
    let newCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === id) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    setCartItems(newCartItems);
  }

  function addToCart(id) {
    setIsCartBar(true);
    setProgWidth(0);
    setAlertType({
      show: true,
      text: "Added to cart!",
      color: "green",
    });
    let findItem = cartItems.find((cartItem) => {
      return cartItem.id === id;
    });
    if (findItem) {
      increaseCount(id);
    } else {
      let addToCartItem = data.find((product) => {
        return product.id === id;
      });
      setCartItems([...cartItems, addToCartItem]);
    }
  }

  return (
    <appContext.Provider
      value={{
        isLoading,
        setIsLoading,
        fetchProducts,
        isMainPage,
        setIsMainPage,
        data,
        products,
        setProducts,
        search,
        setSearch,
        price,
        setPrice,
        isCartBar,
        setIsCartBar,
        cartItems,
        setCartItems,
        amounts,
        setAmounts,
        total,
        setTotal,
        removeCartItems,
        decreaseCount,
        increaseCount,
        addToCart,
        isRegistration,
        setIsRegistration,
        isLogin,
        setIsLogin,
        curUser,
        setCurUser,
        name,
        setName,
        loggedIn,
        setLoggedIn,
        logInClicked,
        setLogInClicked,
        email,
        setEmail,
        password,
        setPassword,
        alertType,
        setAlertType,
        progWidth,
        setProgWidth,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(appContext);
}

export default AppProvider;
