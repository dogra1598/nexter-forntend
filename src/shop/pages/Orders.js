import React from "react";

import Order from "../components/Order/Order";
import "./Orders.css";

const DUMMY_ORDERS = [
  {
    _id: "#N23CE34ddze23",
    products: [
      {
        _id: "p1",
        title: "The world atlas of coffee",
        quantity: 3
      },
      {
        _id: "p2",
        title: "Mountain Ranger Bicycle",
        quantity: 1
      },
    ],
    totalPrice: 459.96
  },
  {
    _id: "#N23CE34ddze24",
    products: [
      {
        _id: "p1",
        title: "The world atlas of coffee",
        quantity: 1,
        price: 19.99,
      },
      {
        _id: "p2",
        title: "Mountain Ranger Bicycle",
        quantity: 1,
        price: 399.99,
      },
    ],
    totalPrice: 419.98
  },
];

const Orders = () => {
  const orders = DUMMY_ORDERS.map(order => {
    return (
      <Order
        key={order._id}
        orderId={order._id}
        products={order.products}
        totalPrice={order.totalPrice}
      />
    );
  });
  return <div className="orders">
      <div className="orders__heading">
          <h1>Your Orders</h1>
      </div>
      {orders}
  </div>;
};

export default Orders;
