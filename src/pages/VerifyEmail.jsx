import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

function VerifyEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // 🔥 backend ko call kar
      axios
        .get(`https://login-766w.onrender.com/api/auth/verify-email?token=${token}`)
        .then((res) => {
          // 🔥 backend se jo JWT aayega use save kar
          localStorage.setItem("token", res.data.token);

          // 🔥 auto login → dashboard
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          navigate("/"); // error ho to login page
        });
    }
  }, [navigate]);

  return (
 <h2 className="text-center mt-10 text-2xl font-bold " >Verifying... </h2>

  )
 
}

export default VerifyEmail;