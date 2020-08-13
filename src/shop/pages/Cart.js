import React, { useEffect, useState, useContext } from "react";

import CartItem from "../components/CartItem/CartItem";
import Button from "../../shared/components/FormElements/Button/Button";
import Spinner from "../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import { useHttpClient } from "../../shared/hooks/httpHook";
import { AuthContext } from "../../shared/context/authContext";
import "./Cart.css";

const Cart = () => {
  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [isUpdateCart, setIsUpdateCart] = useState(false);
  const [products, setProducts] = useState(null);
  const [totalPrice, settotalPrice] = useState(0.0);

  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest(
        `http://localhost:5000/cart/${auth.userId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setProducts(response.products);
      settotalPrice(response.totalPrice);
      if(isUpdateCart) {
        setIsUpdateCart(false);
      }
    };
    fetchData();
  }, [setProducts, sendRequest, auth.userId, isUpdateCart]);

  const updateCartHandler = () => {
    setIsUpdateCart(true);
  }

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
          <Button className="cart__explore--btn" to="/">Explore Products</Button>
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
      {cartItems && <main className="cart">
        <div className="cart--heading">
          <h1>Your Cart</h1>
        </div>
        {cartItems}
        <div className="cart__totalPrice">
          <h1>Cart Total: ₹ {totalPrice.toFixed(2)}</h1>
          <Button to="/order" className="cart__orderNow">
            Order Now
          </Button>
        </div>
      </main>}
    </React.Fragment>
  );
};

export default Cart;
