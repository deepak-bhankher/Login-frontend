import axios from "axios";

const api = axios.create({
  baseURL: "https://login-backend-1-a5vl.onrender.com/api",
});

export default api;
