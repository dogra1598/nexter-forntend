import React, { useEffect, useContext, useState } from "react";
import { motion } from "framer-motion";

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
        `${process.env.REACT_APP_BACKEND_URL}/orders/${auth.userId}`,
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
        <Order key={order._id} orderId={order._id} products={order.products} />
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
        {myorders && (
          <motion.div
            className="orders__heading"
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.5,
              duration: 1,
              stiffness: 80,
              type: "spring",
            }}
          >
            <h1>Your Orders</h1>
          </motion.div>
        )}
        {myorders}
      </div>
    </React.Fragment>
  );
};

export default Orders;
