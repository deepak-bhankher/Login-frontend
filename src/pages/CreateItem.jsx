import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

function CreateItem() {
  const navigate = useNavigate();
  const [create, setCreate] = useState(false);
  const [itemFill, setItemFill] = useState(false);
  const [image, setImage] = useState(null);

  const [item, setItem] = useState({
    name: "",
    price: "",
    image: "",
  });

  const submitItem = async () => {
    if (!item.name || !item.price || !image) {
      setItemFill("fill all details");
      setCreate(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("price", item.price);
      formData.append("image", image);

      await api.post("/items/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setItemFill(false);
      setCreate("Item Created  ");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-900 via-slate-800 to-blue-900 text-white flex justify-center items-center min-h-screen ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-lg bg-white/20 border border-white/30 w-[90%] sm:max-w-md mx-auto p-4 sm:p-6 rounded-lg shadow-2xl"
      >
        <h2
          className="text-xl font-mono mb-4 text-center"
          style={{ fontFamily: "DynaPuff" }}
        >
          Create Item{" "}
        </h2>
        <div className="space-y-6 sm:space-y-10">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
             focus:outline-none focus:ring-2 bg-white/20 focus:ring-slate-600
             focus:border-white transition duration-200
placeholder-white"
            onChange={(e) => setItem({ ...item, name: e.target.value })}
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
             focus:outline-none focus:ring-2 bg-white/20 focus:ring-slate-600
             focus:border-white transition duration-200
             shadow-sm placeholder-white"
            onChange={(e) => setItem({ ...item, price: e.target.value })}
          />

          <input
            type="file"
            accept="image/*"
            placeholder="Image URL"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
             focus:outline-none focus:ring-2 bg-white/20 focus:ring-slate-600
             focus:border-white transition duration-200
             shadow-sm placeholder-white"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />

          {create && (
            <h2 className="text-white font-bold text-center mt-3 ">{create}</h2>
          )}
          {itemFill && (
            <h2 className="text-white font-bold text-center mt-3">
              {itemFill}
            </h2>
          )}
        </div>

        {image && (
          <div className="flex justify-center">
            <img
              src={URL.createObjectURL(image)}
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded mt-3"
            />
          </div>
        )}

        <button
          className="w-full mt-10 cursor-pointer py-3 rounded-2xl 
bg-black/40 border border-white/20 
text-white font-semibold 
hover:bg-black/70 
hover:shadow-[0_0_20px_rgba(99,150,0,0.8)] 
transition duration-300"
          onClick={submitItem}
        >
          Submit
        </button>
      </motion.div>
    </div>
  );
}

export default CreateItem;
