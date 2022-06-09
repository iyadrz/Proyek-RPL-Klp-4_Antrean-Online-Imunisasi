import Axios from "axios";
const BASE_URL = "http://168.138.180.185:3000/api";
// const BASE_URL = "http://localhost:8080/api";

export default Axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = Axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
