import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";

import CartItem from "../components/CartItem/CartItem";
import Button from "../../shared/components/FormElements/Button/Button";
import Spinner from "../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import CheckoutModal from "../../shared/components/UIElements/Modal/CheckoutModal";
import { useHttpClient } from "../../shared/hooks/httpHook";
import { AuthContext } from "../../shared/context/authContext";
import "./Cart.css";

const Cart = () => {
  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [isUpdateCart, setIsUpdateCart] = useState(false);
  const [products, setProducts] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [totalPrice, settotalPrice] = useState(0.0);

  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/cart/${auth.userId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setProducts(response.products);
      settotalPrice(response.totalPrice);
      if (isUpdateCart) {
        setIsUpdateCart(false);
      }
    };
    fetchData();
  }, [setProducts, sendRequest, auth.userId, isUpdateCart, auth.token]);

  const updateCartHandler = () => {
    setIsUpdateCart(true);
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const clearCheckoutHandler = () => {
    setIsCheckout(false);
  };

  let cartItems = null;
  if (products) {
    cartItems = products.map((cartItem) => {
      return (
        <CartItem
          key={cartItem.productId._id}
          productId={cartItem.productId._id}
          title={cartItem.productId.title}
          image={cartItem.productId.imageUrl}
          price={cartItem.productId.price}
          quantity={cartItem.quantity}
          updateCart={updateCartHandler}
        />
      );
    });

    if (cartItems.length === 0) {
      return (
        <div className="cart__empty">
          <h1>Your Cart is Empty!</h1>
          <Button className="cart__explore--btn" to="/">
            Explore Products
          </Button>
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      {showSpinner && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
      <CheckoutModal show={isCheckout} clicked={clearCheckoutHandler} />
      {cartItems && (
        <main className="cart">
          <motion.div
            className="cart--heading"
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.5,
              duration: 1,
              stiffness: 80,
              type: "spring",
            }}
          >
            <h1>Your Cart</h1>
          </motion.div>
          {cartItems}
          <motion.div
            className="cart__totalPrice"
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.5,
              duration: 1,
              stiffness: 80,
              type: "spring",
            }}
          >
            <h1>Cart Total: ₹ {totalPrice.toFixed(2)}</h1>
            <Button className="cart__orderNow" onClick={checkoutHandler}>
              Checkout Now
            </Button>
          </motion.div>
        </main>
      )}
    </React.Fragment>
  );
};

export default Cart;
