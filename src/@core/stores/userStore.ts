import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const userData = ref();
  const router = useRouter()
  const accessToken = useStorage('accessToken','')


  function setAccessToken(token: string) {
    accessToken.value = token;
  }
  function removeAccessToken() {
    accessToken.value = '';
    userData.value = '';
  }
  function setUser(user: any) {
    userData.value = user;
  }
  function socialLogin (queryParams: URLSearchParams) {
    const token = queryParams.get('token');
    const oauth = queryParams.get('oauth');
    const firstName = queryParams.get('first_name');
    const lastName = queryParams.get('last_name');
    const email = queryParams.get('email');
    const picture = queryParams.get('picture');
    const role = queryParams.get('role');
    const username = queryParams.get('username');

    if (token && oauth) {
      setAccessToken(token);
      const user = {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        picture: picture || '',
        role: role || '',
        username: username || '',
      };

      setUser(user);
      // Redirect to a protected page
      router.push({ name: 'root' });
    }
  }

  const login = async (credentials: any) => {
    try {
      const { data } = await $api.post('/auth/login', credentials);
      accessToken.value = data.accessToken;

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const fetchUserData = async () => {
    try {
      const { data } = await $api.get('/users/me');
      userData.value = data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserData = async (updatedData: any) => {
    try {
      const { data } = await $api.put('/users/me', updatedData);
      userData.value = data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    userData,
    fetchUserData,
    removeAccessToken,
    updateUserData,
    socialLogin,
    accessToken
  };
}, {
  persist: true
});
