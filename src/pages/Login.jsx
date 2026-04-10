import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      alert("Login Successful ");
      window.location.href = "/dashboard";
    }
  }, []);

  const registerUser = async () => {
    if (!email || !password) {
      setMsg("Please fill all fields");

      return;
    }

    try {
      setLoading(true);
      setMsg("");
      setSuccessMsg("");

      const res = await axios.post("http://127.0.0.1:5000/api/auth/register", {
        email,
        password,
      });

      setSuccessMsg("Verification link sent to your email");
    } catch (error) {
      setMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async () => {
    try {
      setLoading(true);
      setMsg("");

      const res = await axios.post("http://127.0.0.1:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setMsg(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mx-auto flex justify-center  bg-gradient-to-br from-teal-900 via-slate-800 to-blue-950">
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md mx-auto p-6 border-2  border-white/20 mt-20 mb-2 backdrop-blur-lg bg-white/15 shadow-2xl rounded-lg">
          <h2
            className="text-center text-white font-bold text-3xl"
            style={{ fontFamily: "DynaPuff" }}
          >
            Login
          </h2>

          <div className="space-y-6 mt-10">
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="px-4 w-full py-3 rounded-lg border border-white/30 bg-white/20 text-white"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              className="px-4 w-full py-3 rounded-lg border border-white/30 bg-white/20 text-white"
              onChange={(e) => setPassword(e.target.value)}
            />

            {msg && (
              <p className="text-white/70 font-bold  text-xl text-center">
                {msg}
              </p>
            )}
            {successMsg && (
              <p className="text-green-400 text-center">{successMsg}</p>
            )}

            {/* 🔥 REGISTER BUTTON */}
            <button
              onClick={registerUser}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 duration-500 transition-all cursor-pointer text-white font-semibold"
            >
              {loading ? "Sending..." : "Register"}
            </button>

            {/* 🔥 LOGIN BUTTON */}
            <button
              onClick={loginUser}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gray-800 duration-500 transition-all  cursor-pointer text-white font-semibold hover:bg-black"
            >
              Login
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
