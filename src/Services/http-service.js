import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store/store";
import { setFetchingData } from "../store/slices/authSlice";

const http = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
http.interceptors.request.use(
  (config) => {
    store.dispatch(setFetchingData(true));

    config.showToast = config.showToast !== false;
    // ... existing code ...
    return config;
  },
  (error) => {
    store.dispatch(setFetchingData(false));
    toast.error("Request error: " + error.message);
    return Promise.reject(error);
  }
);

// Response interceptor
http.interceptors.response.use(
  function (response) {
    store.dispatch(setFetchingData(false));

    if (response.config.showToast && response.data.successMessage) {
      toast.success(response.data?.successMessage || "Success");
    }
    return response;
  },
  function (error) {
    store.dispatch(setFetchingData(false));

    let errorMessage;
    if (error.code === "ERR_NETWORK") {
      errorMessage = "Failed, no connection to server";
    } else {
      errorMessage = error.response?.data || error.response.data.message;
    }

    if (error.config.showToast) {
      toast.error(errorMessage || "Failed, unknown error");
    }
    return Promise.reject(error);
  }
);

export default http;
