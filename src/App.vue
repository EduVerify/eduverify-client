<script setup lang="ts">
import ScrollToTop from "@core/components/ScrollToTop.vue";
import initCore from "@core/initCore";
import { initConfigStore, useConfigStore } from "@core/stores/config";
import { hexToRgb } from "@core/utils/colorConverter";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTheme } from "vuetify";
import { useUserStore } from "./@core/stores/userStore";

const { global } = useTheme();

// Initialize the core and config store
initCore();
initConfigStore();

const configStore = useConfigStore();
const router = useRouter();
const useUser = useUserStore();

onMounted(() => {
  const queryParams = new URLSearchParams(window.location.search);
  useUser.socialLogin(queryParams);
});

onMounted(() => {
  // Check if accessToken is in localStorage

  if (useUser.accessToken) {
    // Redirect to home page if token exists
    router.push({ name: "root" });
  } else {
    // Redirect to login page if token does not exist
    router.push({ name: "login" });
  }
});
</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <VApp
      :style="`--v-global-theme-primary: ${hexToRgb(
        global.current.value.colors.primary
      )}`"
    >
      <RouterView />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
