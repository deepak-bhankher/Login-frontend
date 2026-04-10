import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const registerUser = async () => {
    if (!email || !password) {
      setMsg("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setMsg("");
      setSuccessMsg("");

      await axios.post(
        "https://login-766w.onrender.com/api/auth/register",
        { email, password }
      );

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

      const res = await axios.post(
        "https://login-766w.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setMsg(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          className="w-full p-2 border rounded mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={registerUser}
          className="w-full bg-blue-500 text-white p-2 rounded mb-2 hover:bg-blue-600"
        >
          {loading ? "Sending..." : "Register"}
        </button>

        <button
          onClick={loginUser}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Login
        </button>

        <p className="text-red-500 mt-2">{msg}</p>
        <p className="text-green-600 mt-2">{successMsg}</p>
      </div>
    </div>
  );
}

export default Login;