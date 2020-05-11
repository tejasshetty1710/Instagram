import axios from "axios";
import { ENDPOINTS } from "./url";

const AUTH_TOKEN = "-Gacl46xBw65KyouK4il";

const apiBase = axios.create({
  // eslint-disable-next-line
  baseURL: ENDPOINTS[process.env.NODE_ENV].BASE_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export default apiBase;
