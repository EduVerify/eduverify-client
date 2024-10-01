<script setup lang="ts">
import { useTheme } from 'vuetify';

const { global } = useTheme()
const router = useRouter()

const loginWithGoogle = () => {
  window.location.href = 'http://localhost:3000/api/auth/google';
}
</script>

<template>
  <div class="d-flex justify-center flex-wrap gap-1">
    <VBtn
      key="tabler-brand-google-filled"
      icon
      variant="text"
      size="small"
      :color="global.name.value === 'dark' ? '#fff' : '#db4437'"
      @click="loginWithGoogle"
    >
      <VIcon
        size="20"
        icon="tabler-brand-google-filled"
      />
    </VBtn>
  </div>
</template>
