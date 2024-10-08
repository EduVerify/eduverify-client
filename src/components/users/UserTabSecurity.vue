<script setup lang="ts">
import { useToast } from "vue-toastification";

const isNewPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
const toast = useToast();
// Recent devices Headers
const recentDeviceHeader = [
  { title: "BROWSER", key: "browser" },
  { title: "DEVICE", key: "device" },
  { title: "LOCATION", key: "location" },
  { title: "RECENT ACTIVITY", key: "activity" },
];

const recentDevices = [
  {
    browser: " Chrome on Windows",
    icon: "tabler-brand-windows",
    color: "info",
    device: "HP Spectre 360",
    location: "Switzerland",
    activity: "10, July 2021 20:07",
  },
  {
    browser: "Chrome on Android",
    icon: "tabler-brand-android",
    color: "success",
    device: "Oneplus 9 Pro",
    location: "Dubai",
    activity: "14, July 2021 15:15",
  },
  {
    browser: "Chrome on macOS",
    icon: "tabler-brand-apple",
    color: "secondary",
    device: "Apple iMac",
    location: "India",
    activity: "16, July 2021 16:17",
  },
  {
    browser: "Chrome on iPhone",
    icon: "tabler-device-mobile",
    color: "error",
    device: "iPhone 12x",
    location: "Australia",
    activity: "13, July 2021 10:10",
  },
];
const passData = ref({
  newPassword: "",
  confirmPassword: "",
});
const updatePassword = () => {
  $api
    .put("/users/me/password", {
      new_password: passData.value.newPassword,
    })
    .then(() => {
      passData.value.newPassword = "";
      passData.value.confirmPassword = "";
      toast.success("Password updated successfully!");
    })
    .catch(() => {
      toast.error("Failed to update password.");
    });
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- 👉 Change password -->
      <VCard title="Change Password">
        <VCardText>
          <VAlert
            closable
            variant="tonal"
            color="warning"
            class="mb-4"
            title="Ensure that these requirements are met"
            text="Minimum 8 characters long, uppercase & symbol"
          />

          <VForm @submit.prevent="updatePassword">
            <VRow>
              <VCol cols="12" md="6">
                <AppTextField
                  v-model="passData.newPassword"
                  label="New Password"
                  placeholder="············"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isNewPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="
                    isNewPasswordVisible = !isNewPasswordVisible
                  "
                />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField
                  v-model="passData.confirmPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="
                    isConfirmPasswordVisible = !isConfirmPasswordVisible
                  "
                />
              </VCol>

              <VCol cols="12">
                <VBtn type="submit"> Change Password </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Recent devices -->

      <VCard title="Recent devices">
        <VDivider />
        <VDataTable
          :items="recentDevices"
          :headers="recentDeviceHeader"
          hide-default-footer
          class="text-no-wrap"
        >
          <template #item.browser="{ item }">
            <div class="d-flex align-center gap-x-4">
              <VIcon :icon="item.icon" :color="item.color" :size="22" />
              <div class="text-body-1 text-high-emphasis">
                {{ item.browser }}
              </div>
            </div>
          </template>
          <!-- TODO Refactor this after vuetify provides proper solution for removing default footer -->
          <template #bottom />
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>
