<script setup lang="ts">
import authV1BottomShape from "@images/svg/auth-v1-bottom-shape.svg?raw";
import authV1TopShape from "@images/svg/auth-v1-top-shape.svg?raw";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

definePage({
  meta: {
    layout: "blank",
    public: true,
  },
});

const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  phone: "",
  confirmPassword: "",
  privacyPolicies: false,
});
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const router = useRouter();

const onFormSubmit = async () => {
  const toast = useToast();

  try {
    await $api.post("/auth/register", form.value);
    toast.success("Please confirm your email!");
    router.push({ name: "verify-email", query: { email: form.value.email } });
  } catch (error) {
    console.log(error);
    toast.error("Failed to sign up.");
  }
};
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth card -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <VCardItem class="justify-center">
          <VCardTitle>
            <RouterLink to="/">
              <div class="app-logo">
                <VNodeRenderer :nodes="themeConfig.app.logo" />
                <h1 class="app-logo-title">
                  {{ themeConfig.app.title }}
                </h1>
              </div>
            </RouterLink>
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <h4 class="text-h4 mb-1">Adventure starts here 🚀</h4>
          <p class="mb-0">Make your app management easy and fun!</p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="onFormSubmit">
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.first_name"
                  autofocus
                  label="Fisrt Name"
                  placeholder="John"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="form.last_name"
                  autofocus
                  label="Last Name"
                  placeholder="doe"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.email"
                  label="Email"
                  type="email"
                  placeholder="johndoe@email.com"
                  :rules="[requiredValidator, emailValidator]"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="form.phone"
                  type="number"
                  placeholder="+1 123 456 7890"
                  persistent-placeholder
                  :rules="[requiredValidator]"
                  label="Phone"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.password"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  placeholder="Enter Password"
                  :rules="[requiredValidator, passwordValidator]"
                  autocomplete="on"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.confirmPassword"
                  label="Confirm Password"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  placeholder="Confirm Password"
                  :append-inner-icon="
                    form.confirmPassword ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  :rules="[
                    requiredValidator,
                    confirmedValidator(form.confirmPassword, form.password),
                  ]"
                  autocomplete="on"
                  @click:append-inner="
                    isConfirmPasswordVisible = !isConfirmPasswordVisible
                  "
                />
              </VCol>

              <VCol cols="12">
                <VBtn block type="submit"> Sign up </VBtn>
              </VCol>
              <!-- login instead -->
              <VCol cols="12" class="text-center text-base">
                <span>Already have an account?</span>
                <RouterLink class="text-primary ms-1" :to="{ name: 'login' }">
                  Sign in instead
                </RouterLink>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <GoogleLoginButton />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
