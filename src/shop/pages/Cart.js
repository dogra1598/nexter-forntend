import React from "react";

import CartItem from "../components/CartItem/CartItem";
import "./Cart.css";

const DUMMY_CARTITEMS = [
  {
    productId: "p1",
    title: "Book",
    image:
      "https://images.pexels.com/photos/2187601/pexels-photo-2187601.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    quantity: 1,
    price: 19.99,
  },
  {
    productId: "p2",
    title: "Bicycle",
    image:
      "https://images.pexels.com/photos/544997/pexels-photo-544997.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    quantity: 1,
    price: 399.99,
  },
];

const Cart = () => {
  const cartItems = DUMMY_CARTITEMS.map(cartItem => {
    return (
      <CartItem
        key={cartItem.id}
        title={cartItem.title}
        image={cartItem.image}
        price={cartItem.price}
        quantity={cartItem.quantity}
      />
    );
  });

  return (
    <main className="cart">
      <div className="cart--heading">
        <h1>Your Cart</h1>
      </div>
      {cartItems}
    </main>
  );
};

export default Cart;
