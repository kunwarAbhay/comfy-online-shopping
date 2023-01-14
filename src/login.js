import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { BsFillEyeFill } from "react-icons/bs";

function Login() {
  let {
    setIsRegistration,
    isLogin,
    setIsLogin,
    setName,
    setLoggedIn,
    email,
    setEmail,
    password,
    setPassword,
    setAlertType,
    setProgWidth,
    cartItems,
    setCartItems,
  } = useGlobalContext();

  let [showPassword, setShowPassword] = useState(false);

  async function fetchData() {
    let docSnap = await getDoc(doc(db, "users", email));
    setName(docSnap.data().name);
    setCartItems(JSON.parse(docSnap.data().cart));
  }

  useEffect(() => {
    if (email) {
      let entry = doc(db, "users", email);
      updateDoc(entry, {
        cart: JSON.stringify(cartItems),
      });
    }
  }, [cartItems]);

  useEffect(() => {
    if (email && password) {
      setLoggedIn(true);
      fetchData();
    }
  }, []);

  async function login(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        setIsLogin(false);
        setLoggedIn(true);

        fetchData();

        setProgWidth(0);
        setAlertType({
          show: true,
          text: `Welcome!`,
          color: "green",
        });
      })
      .catch((error) => {
        setProgWidth(0);
        setAlertType({
          show: true,
          text: "User not found! Kindly Sign Up first!",
          color: "red",
        });
      });
  }
  return (
    <div
      className={isLogin ? "login-form" : null}
      onClick={(e) => {
        if (e.target.classList.contains("login-form")) {
          setIsLogin(false);
          setShowPassword(false);
        }
      }}
    >
      {isLogin ? (
        <form className="form-content">
          <h1>LOGIN</h1>
          <div className="login-content">
            <label htmlFor="email">Email</label>
            <div className="input">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="login-content">
            <label htmlFor="password">Password</label>
            <div className={showPassword ? "input password-active" : "input"}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                <BsFillEyeFill className="eye-icon" />
              </span>
            </div>
          </div>

          <button className="btn-all-products login-btn" onClick={login}>
            Login
          </button>

          <p className="forgot-password">Forgot Password?</p>
          <p className="register-account">
            Don't have an account?{" "}
            <span
              onClick={() => {
                setIsRegistration(true);
                setIsLogin(false);
                setShowPassword(false);
              }}
            >
              Register Here
            </span>
          </p>
        </form>
      ) : null}
    </div>
  );
}

export default Login;
