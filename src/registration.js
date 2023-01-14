import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db, auth } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { BsFillEyeFill } from "react-icons/bs";

function Registration() {
  let {
    isRegistration,
    setIsRegistration,
    setIsLogin,
    setCurUser,
    setAlertType,
    setProgWidth,
  } = useGlobalContext();

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurUser(user);
    });
  }, []);

  async function register(e) {
    e.preventDefault();
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
          setDoc(doc(db, "users", email), {
            name: name,
            email: email,
            password: password,
            cart: "",
          });
        });
        setProgWidth(0);
        setAlertType({
          show: true,
          text: "Account created successfully!",
          color: "green",
        });
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setShowPassword(false);
      } else {
        setProgWidth(0);
        setAlertType({
          show: true,
          text: "Password and Confirm Password don't match!",
          color: "red",
        });
      }
    } else {
      setProgWidth(0);
      setAlertType({
        show: true,
        text: "No fields should be empty!",
        color: "red",
      });
    }
  }

  return (
    <div
      className={isRegistration ? "registration-form" : null}
      onClick={(e) => {
        if (e.target.classList.contains("registration-form")) {
          setIsRegistration(false);
          setShowPassword(false);
          setPassword("");
          setConfirmPassword("");
        }
      }}
    >
      {isRegistration ? (
        <form className="form-content">
          <h1>SIGN UP</h1>

          <div className="login-content">
            <label htmlFor="name">Name</label>
            <div className="input">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

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

          <div className="login-content">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input">
              <input
                type="text"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="btn-all-products login-btn" onClick={register}>
            CREATE ACCOUNT
          </button>

          <p className="register-account">
            Registered user?{" "}
            <span
              onClick={() => {
                setIsRegistration(false);
                setIsLogin(true);
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
              }}
            >
              Login
            </span>
          </p>
        </form>
      ) : null}
    </div>
  );
}

export default Registration;
