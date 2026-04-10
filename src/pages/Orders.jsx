import { useEffect, useState } from "react";
import api from "../api/api";
import React from "react";

function Orders() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [payingId, setPayingId] = useState(null);
  const [paidItems, setPaidItems] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState({});
  useEffect(() => {
    api
      .get("/items")
      .then((res) => {
        setItems(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const deleteItem = async (id) => {
    try {
      setRemovingId(id);
      setTimeout(async () => {
        await api.delete(`/items/${id}`);
        setItems(items.filter((item) => item._id !== id));
      }, 1500);
    } catch (err) {
      console.log(err);
      setRemovingId(null);
    }
  };

  const handlePayment = async (item) => {
    try {
      setPayingId(item._id);

      const res = await api.post("/payment", {
        amount: item.price,
      });

      if (res.data.success) {
        // ✅ message sirf is item ke liye
        setPaymentStatus((prev) => ({
          ...prev,
          [item._id]: `✅ Paid for ${item.name}`,
        }));

        // ✅ paid list me add kar
        setPaidItems((prev) => [...prev, item]);

        // ✅ items list se hata
        setItems((prev) => prev.filter((i) => i._id !== item._id));

        // ✅ order create
        await api.post("/orders/create", {
          itemId: item._id,
          email: "test@gmail.com",
        });
      } else {
        setPaymentStatus((prev) => ({
          ...prev,
          [item._id]: "❌ Payment Failed",
        }));
      }

      setPayingId(null);
    } catch (err) {
      setPayingId(null);
      setPaymentStatus((prev) => ({
        ...prev,
        [item._id]: "❌ Payment Error",
      }));
    }
  };

  if (loading) {
    return <h1 className="text-2xl text-center mt-10">Loading orders...</h1>;
  }

  // 2️⃣ empty
  if (items.length === 0) {
    return (
      <div className="flex flex-col justify-center min-h-screen items-center bg-gradient-to-br from-slate-700 via-indigo-800 to-slate-600 text-white">
        <h2 className="text-3xl font-bold mb-2">No Orders Yet </h2>
        <p className="text-white/40">Create an item to see orders here.</p>
      </div>
    );
  }

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-teal-900 via-slate-800 to-blue-900">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => {
          return (
            <div
              key={item._id}
              className="backdrop-blur-xl text-white border border-white/20 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={`http://127.0.0.1:5000${item.image}`}
                className="h-44 w-full object-cover mb-2 rounded-2xl hover:scale-105 duration-300"
              />

              <h3 className="font-semibold  text-xl text-center">
                {item.name}
              </h3>
              <p className="text-center text-2xl font-bold text-yellow-300">
                ₹{item.price}
              </p>

              {paymentStatus[item._id] && (
                <p className="text-center mt-2 text-sm">
                  {paymentStatus[item._id]}
                </p>
              )}
              <button
                onClick={() => deleteItem(item._id)}
                disabled={removingId === item._id}
                className=" cursor-pointer py-3 rounded-lg 
                       bg-black/40 border border-white/20 
                       text-white font-semibold 
                       hover:bg-black/80 
                       hover:shadow-[0_0_20px_rgba(99,150,0,0.8)] 
                       transition duration-300 w-full mt-5"
              >
                {removingId === item._id ? "Removing..." : "Remove Order"}
              </button>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

export default Orders;
