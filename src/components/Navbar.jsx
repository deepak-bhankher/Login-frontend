import { Link } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
function Navbar() {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900

"
    >
      <div className="w-full text-white font-semibold px-6 py-4 flex gap-10">
        <Link to="/dashboard" className="hover:scale-105 duration-300">
          HOME
        </Link>
        <Link to="/create-item" className="hover:scale-105 duration-300">
          CREATE ITEM
        </Link>
        <Link to="/orders" className="hover:scale-105 duration-300">
          ORDERS
        </Link>
        <Link to="/LogOut" className="hover:scale-105 duration-300 ">
          LOG OUT
        </Link>
      </div>
    </motion.div>
  );
}

export default Navbar;
