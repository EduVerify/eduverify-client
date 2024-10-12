import { authType } from "@/@layouts/enums";
import { UserData } from "@/@layouts/types";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useUserStore = defineStore(
  "userStore",
  () => {
    const userData = ref<UserData>();
    const router = useRouter();
    const accessToken = useStorage("accessToken", "");

    function setAccessToken(token: string) {
      accessToken.value = token;
    }
    function removeAccessToken() {
      accessToken.value = "";
      userData.value = {
        taskDone: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        picture: "",
        role: authType.STUDENT,
        username: "",
        isOauth: false,
      };
    }
    function setUser(user: UserData) {
      userData.value = user;
    }
    function socialLogin(queryParams: URLSearchParams) {
      const token = queryParams.get("token");
      const oauth = queryParams.get("oauth");
      const first_name = queryParams.get("first_name");
      const last_name = queryParams.get("last_name");
      const email = queryParams.get("email");
      const picture = queryParams?.get("picture");
      const role = (queryParams.get("role") as authType) || authType.STUDENT;
      const username = queryParams.get("username");
      const phone = queryParams.get("phone");

      if (token && oauth) {
        setAccessToken(token);
        const user: UserData = {
          taskDone: "",
          first_name: first_name || "",
          last_name: last_name || "",
          email: email || "",
          picture: picture || "",
          role: role || "",
          username: username || "",
          phone: phone || "",
          isOauth: oauth === "google" ? true : false,
        };

        setUser(user);
        // Redirect to a protected page
        router.push({ name: "root" });
      }
    }

    async function login(credentials: any) {
      try {
        const { data } = await $api.post("/auth/login", credentials);
        setAccessToken(data.access_token);
        setUser(data.user);
        router.push({ name: "root" });
        // Toast success message
        toast.success("Login successful!");
      } catch (error) {
        console.error(error);
        //Toast error message
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || "Login failed!");
      }
    }

    async function fetchUserData() {
      try {
        const { data } = await $api.get("/users/me");
        setUser(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    }

    async function updateUserData(updatedData: any) {
      try {
        const { data } = await $api.put("/users/me", updatedData);
        setUser(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    }

    async function switchRole(role: authType) {
      try {
        const { data } = await $api.put("/auth/switch-role", { role });
        if (userData.value) {
          userData.value.role = role;
        }
        setAccessToken(data.access_token);

        return data;
        toast.success("Role switched successfully!");
        router.push({ name: "root" });
      } catch (error) {
        console.error(error);
      }
    }

    async function deleteUserData() {
      try {
        await $api.delete("/users/me");
        removeAccessToken();
        router.push({ name: "login" });
      } catch (error) {
        console.error(error);
      }
    }

    return {
      userData,
      fetchUserData,
      removeAccessToken,
      updateUserData,
      socialLogin,
      accessToken,
      login,
      deleteUserData,
      switchRole,
    };
  },
  {
    persist: true,
  }
);
