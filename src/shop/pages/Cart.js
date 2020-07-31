import React from "react";

import CartItem from "../components/CartItem/CartItem";
import "./Cart.css";
import Button from "../../shared/components/FormElements/Button/Button";

const DUMMY_CARTITEMS = [
  {
    productId: "p1",
    title: "The world atlas of coffee",
    image:
      "https://images.pexels.com/photos/2187601/pexels-photo-2187601.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    quantity: 1,
    price: 19.99,
  },
  {
    productId: "p2",
    title: "Mountain Ranger Bicycle",
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
        key={cartItem.productId}
        title={cartItem.title}
        image={cartItem.image}
        price={cartItem.price}
        quantity={cartItem.quantity}
      />
    );
  });

  let totalCartPrice = 0.00;
  for (let i = 0; i < cartItems.length; i++) {
    totalCartPrice += cartItems[i].props.quantity * cartItems[i].props.price;
  }

  return (
    <main className="cart">
      <div className="cart--heading">
        <h1>Your Cart</h1>
      </div>
      {cartItems}
      <div className="cart__totalPrice">
        <h1>Cart Total: ₹ {totalCartPrice.toFixed(2)}</h1>
        <Button to="/order" className="cart__orderNow">Order Now</Button>
      </div>
    </main>
  );
};

export default Cart;
