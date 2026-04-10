import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("TOKEN MILA:", token); // 🔥 DEBUG

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h2 className="text-xl font-bold">Verifying... ⏳</h2>
    </div>
  );
}

export default VerifyEmail;