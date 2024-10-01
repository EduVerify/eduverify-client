<script setup lang="ts">
import ScrollToTop from '@core/components/ScrollToTop.vue'
import initCore from '@core/initCore'
import { initConfigStore, useConfigStore } from '@core/stores/config'
import { hexToRgb } from '@core/utils/colorConverter'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const { global } = useTheme()

// Initialize the core and config store
initCore()
initConfigStore()

const configStore = useConfigStore()
const router = useRouter()

onMounted(() => {
  const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
      const oauth = queryParams.get('oauth');
      const firstName = queryParams.get('first_name');
      const lastName = queryParams.get('last_name');
      const email = queryParams.get('email');
      const picture = queryParams.get('picture');
      const role = queryParams.get('role');

      if (token && oauth) {
        const accessToken = useCookie('accessToken');
        accessToken.value = token; // Save the token in a cookie
        localStorage.setItem('accessToken', token); // Save the token in local storage

        const user = {
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
          picture: picture || '',
          role: role || ''
        };

        localStorage.setItem('user', JSON.stringify(user)); // Save the user object in local storage
        // Redirect to a protected page
        router.push({ name: 'root' });
      }
})

onMounted(() => {
  // Check if accessToken is in localStorage
  const accessToken = localStorage.getItem('accessToken')
  
  if (accessToken) {
    // Redirect to home page if token exists
    router.push({ name: 'root' })
  } else {
    // Redirect to login page if token does not exist
    router.push({ name: 'login' })
  }
})
</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
