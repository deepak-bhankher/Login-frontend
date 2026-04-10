import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function VerifyEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      try {
        const res = await fetch(
          "https://login-766w.onrender.com/api/auth/verify-email?token=" + token
        );

        const data = await res.json();

        if (data.token) {
          // ✅ AUTO LOGIN
          localStorage.setItem("token", data.token);

          // ✅ redirect
          navigate("/dashboard");
        } else {
          alert("Verification failed");
        }
      } catch (err) {
        console.log(err);
      }
    };

    verify();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>⏳ Verifying your email...</h2>
    </div>
  );
}

export default VerifyEmail;