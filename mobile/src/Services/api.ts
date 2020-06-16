import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.100.127:3300",
});

export default api;
