import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://poornesh-facebook-clone.herokuapp.com/",
});

export default axiosInstance;
