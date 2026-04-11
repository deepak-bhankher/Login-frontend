import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function Dashboard() {
  
  return (
    <div className="p-6 min-h-screen flex items-center justify-center 
bg-gradient-to-br from-teal-900 via-slate-800 to-blue-900"
>

   
   <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="backdrop-blur-xl bg-white/10 border border-white/20 
shadow-[0_0_40px_rgba(0,0,0,0.4)] rounded-3xl 
text-center p-6 sm:p-12 text-white w-[90%] sm:w-[450px]"
>
  <h1
    className="text-2xl sm:text-4xl font-extrabold mb-4 tracking-wide"
    style={{ fontFamily: "DynaPuff" }}
  >
    Welcome Deep 
  </h1>

  <button
    className="px-6 mt-10 py-3 rounded-2xl 
  bg-white/10 hover:bg-white/20  border border-white/20
    text-white font-semibold 
    hover:shadow-[0_0_20px_rgba(99,150,10,0.8)] 
    hover:scale-105 hover:from-teal-600 hover:to-blue-700 
    transition duration-500 shadow-lg cursor-pointer"
  >
   <Link to="/orders"> Open Orders</Link>
  </button>
</motion.div>
 </div>
  );
}

export default Dashboard;
