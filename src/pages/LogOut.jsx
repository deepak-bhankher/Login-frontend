import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

function LogOut() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/");
      setLoading(false);
    }, 1500);
  };
  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-br from-teal-900 via-slate-800 to-blue-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 
p-6 sm:p-10 rounded-3xl shadow-2xl text-center text-white w-[90%] sm:w-[400px]"
      >
        <div className="border p-8 rounded-2xl shadow-2xl text-center">
          <h1 className="text-3xl font-bold ">
            Are you sure you want to logout?{" "}
          </h1>
          <div className="flex gap-10 justify-center mt-10">
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-32 py-2 rounded-xl 
      bg-black/40 border border-white/20 
text-white font-semibold 
hover:bg-black/70 
hover:shadow-[0_0_20px_rgba(99,150,0,0.8)] duration-500 cursor-pointer"
            >
              {loading ? "Logging out..." : "Log Out"}
            </button>
            <button
              onClick={() => navigate(-1)}
              disabled={loading}
              className="w-32 py-2 rounded-xl 
      bg-white/10 border border-white/20 
      text-white font-semibold cursor-pointer
      hover:bg-white/20 hover:scale-105 
      transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default LogOut;
