import React, { useEffect, useContext, useState } from "react";

import Order from "../components/Order/Order";
import Spinner from "../../shared/components/UIElements/Spinner/Spinner";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import { useHttpClient } from "../../shared/hooks/httpHook";
import { AuthContext } from "../../shared/context/authContext";
import "./Orders.css";

const Orders = () => {
  const auth = useContext(AuthContext);
  const { showSpinner, error, sendRequest, clearError } = useHttpClient();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest(
        `http://localhost:5000/orders/${auth.userId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setOrders(response.orders);
    };
    fetchData();
  }, [auth.userId, sendRequest, setOrders, error, auth.token]);

  let myorders = null;
  if (orders) {
    myorders = orders.map((order) => {
      return (
        <Order
          key={order._id}
          orderId={order._id}
          products={order.products}
        />
      );
    });
  }

  return (
    <React.Fragment>
      {showSpinner && <Spinner show={showSpinner} />}
      <Modal show={error} clicked={clearError}>
        {error}
      </Modal>
      <div className="orders">
        <div className="orders__heading">
          <h1>Your Orders</h1>
        </div>
        {myorders}
      </div>
    </React.Fragment>
  );
};

export default Orders;
