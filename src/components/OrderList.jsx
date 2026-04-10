import { useEffect, useState } from "react";
import api from "../api/api";
import React from "react";
function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (  
    <div>
      <h3>Orders</h3>
      {orders.map((o) => (
        <div key={o._id}>
          <p>{o.itemId?.name}</p>
          <p>{o.itemId?.price}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
