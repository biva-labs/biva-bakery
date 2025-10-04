import axios from "axios";

export const instance = axios.create({
  baseURL: "https://biva-bakery-backend.onrender.com",
});
