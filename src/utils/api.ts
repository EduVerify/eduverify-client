import { useUserStore } from "@/@core/stores/userStore";
import axios from "axios";
import { useToast } from "vue-toastification";
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

export const $api = axios.create({
  baseURL,
});

$api.interceptors.request.use(
  (config) => {
    const accessToken = useUserStore().accessToken;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      const userStore = useUserStore();
      const toast = useToast();
      toast.error("Unauthorized access, please login again");
      setTimeout(() => {
        userStore.removeAccessToken(); // Assuming you have a method to clear storage
        window.location.href = "/login"; // Redirect to login page
      }, 2500);
    }
    return Promise.reject(error);
  }
);

export async function fetchUniversitites() {
  const { data } = await $api.get("/universities");
  return data;
}
