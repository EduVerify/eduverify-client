import { UserData } from '@/@layouts/types';
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const userData = ref<UserData>();
  const router = useRouter()
  const accessToken = useStorage('accessToken','')


  function setAccessToken(token: string) {
    accessToken.value = token;
  }
  function removeAccessToken() {
    accessToken.value = '';
    userData.value = {
      taskDone: '',
  email: '',
  first_name: '',
  last_name: '',
  phone: '',
  picture: '',
  role: '',
  username:'',
    };
  }
  function setUser(user: UserData) {
    userData.value = user;
  }
  function socialLogin (queryParams: URLSearchParams) {
    const token = queryParams.get('token');
    const oauth = queryParams.get('oauth');
    const first_name = queryParams.get('first_name');
    const last_name = queryParams.get('last_name');
    const email = queryParams.get('email');
    const picture = queryParams?.get('picture');
    const role = queryParams.get('role');
    const username = queryParams.get('username');
    const phone = queryParams.get('phone');

    if (token && oauth) {
      setAccessToken(token);
      const user: UserData = {
        taskDone: '',
        first_name: first_name || '',
        last_name: last_name || '',
        email: email || '',
        picture: picture || '',
        role: role || '',
        username: username || '',
        phone: phone || '',
      };

      setUser(user);
      // Redirect to a protected page
      router.push({ name: 'root' });
    }
  }

  async function login (credentials: any) {
    try {
      const { data } = await $api.post('/auth/login', credentials);
      setAccessToken(data.access_token);
      setUser(data.user);
      router.push({ name: 'root' });
    } catch (error) {
      console.error(error);
    }
  }



  async function fetchUserData () {
    try {
      const { data } = await $api.get('/users/me');
      userData.value = data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  async function updateUserData(updatedData: any)  {
    try {
      const { data } = await $api.put('/users/me', updatedData);
      userData.value = data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  async function deleteUserData() {
    try {
      await $api.delete('/users/me');
      removeAccessToken();
      router.push({ name: 'login' });
    } catch (error) {
      console.error(error)}}

  return {
    userData,
    fetchUserData,
    removeAccessToken,
    updateUserData,
    socialLogin,
    accessToken,
    login,
    deleteUserData
  };
}, {
  persist: true
});
