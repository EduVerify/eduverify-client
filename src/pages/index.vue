<script setup lang="ts">
import { useUserStore } from "@/@core/stores/userStore";
import { authType } from "@/@layouts/enums";

const { userData } = useUserStore();
</script>

<template>
  <StudentsDash v-show="userData?.role === authType.STUDENT" />

  <SchoolsDash v-show="userData?.role === authType.SCHOOL" />
</template>
