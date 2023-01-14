import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./mainPage";
import NavBar from "./navBar";
import AboutPage from "./aboutPage";
import ProductsPage from "./productsPage";
import SinglePage from "./SingleProductPage";
import CartBar from "./cartBar";
import Login from "./login";
import Registration from "./registration";
import { useGlobalContext } from "./context";
import AlertBar from "./alertBar";
import Footer from "./footer";

function App() {
  let { setLogInClicked } = useGlobalContext();
  window.onclick = (e) => {
    if (!e.target.classList.contains("logged-in-logo")) {
      setLogInClicked(false);
    }
  };
  return (
    <Router>
      <AlertBar />
      <NavBar />
      <Login />
      <Registration />
      <CartBar />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/products">
          <ProductsPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/products/:id" children={<SinglePage />}></Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
