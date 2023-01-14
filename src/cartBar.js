import React, { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";

function CartBar() {
  let {
    isCartBar,
    setIsCartBar,
    cartItems,
    amounts,
    setAmounts,
    total,
    setTotal,
    removeCartItems,
    decreaseCount,
    increaseCount,
    email,
  } = useGlobalContext();

  useEffect(() => {
    amounts = 0;
    total = 0;
    cartItems.forEach((cartItem) => {
      amounts += cartItem.amount;
      total += cartItem.amount * cartItem.price;
    });
    setAmounts(amounts);
    setTotal(total);

    if (email) {
      localStorage.setItem(email, JSON.stringify(cartItems));
    } else {
      localStorage.setItem("noUser", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <div
      className={isCartBar ? "cart-bar cart-bar-active" : "cart-bar"}
      onClick={(e) => {
        if (e.target.classList.contains("cart-bar-active")) {
          setIsCartBar(false);
        }
      }}
    >
      <div
        className={
          isCartBar ? "cart-sidebar cart-sidebar-active" : "cart-sidebar"
        }
      >
        <div>
          <div className="close-btn" onClick={() => setIsCartBar(false)}>
            <FaTimes />
          </div>
          <p className="your-bag">Your Bag</p>
          <div>
            {cartItems.map((cartItem) => {
              let { id, name, price, url, amount } = cartItem;
              return (
                <div key={id} className="item-details">
                  <img src={url} alt={name} />
                  <div className="title-price-remove">
                    <p className="title">{name}</p>
                    <p className="price">${price}</p>
                    <p className="remove" onClick={() => removeCartItems(id)}>
                      Remove
                    </p>
                  </div>
                  <div className="quntity-plus-minus">
                    <div
                      className="plus-minus"
                      onClick={() => increaseCount(id)}
                    >
                      <FaPlusCircle />
                    </div>
                    <p className="quantity">
                      {amount === 0 ? removeCartItems(id) : amount}
                    </p>
                    <div className="plus-minus">
                      <FaMinusCircle onClick={() => decreaseCount(id)} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="total">
          <p>Total : ${total}</p>
          <button className="btn-all-products">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartBar;
