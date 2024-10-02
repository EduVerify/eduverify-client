<script setup lang="ts">
import { useUserStore } from "@/@core/stores/userStore";
import { useToast } from "vue-toastification";

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  picture: string;
  role: string;
  username: string;
}

interface Props {
  userData?: UserData;
  isDialogVisible: boolean;
}

interface Emit {
  (e: "submit", value: UserData): void;
  (e: "update:isDialogVisible", val: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  userData: () => ({
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    picture: "",
    role: "",
    username: "",
  }),
});

const emit = defineEmits<Emit>();

const userData = ref<UserData>(structuredClone(toRaw(props.userData)));

watch(
  () => props,
  () => {
    userData.value = structuredClone(toRaw(props.userData));
  }
);

const onFormSubmit = async () => {
  const toast = useToast();
  const { updateUserData } = useUserStore();

  try {
    const { data } = await updateUserData(userData.value);
    emit("update:isDialogVisible", false);
    emit("submit", data);
    toast.success("User information updated successfully!");
  } catch (error) {
    toast.error("Failed to update user information.");
  }
};

const onFormReset = () => {
  userData.value = structuredClone(toRaw(props.userData));

  emit("update:isDialogVisible", false);
};

const dialogModelValueUpdate = (val: boolean) => {
  emit("update:isDialogVisible", val);
};
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-10 pa-2">
      <VCardText>
        <!-- 👉 Title -->
        <h4 class="text-h4 text-center mb-2">Edit User Information</h4>
        <p class="text-body-1 text-center mb-6">
          Updating user details will receive a privacy audit.
        </p>

        <!-- 👉 Form -->
        <VForm class="mt-6" @submit.prevent="onFormSubmit">
          <VRow>
            <!-- 👉 First Name -->
            <VCol cols="12" md="6">
              <AppTextField
                v-model="userData.first_name"
                label="First Name"
                placeholder="John"
              />
            </VCol>

            <!-- 👉 Last Name -->
            <VCol cols="12" md="6">
              <AppTextField
                v-model="userData.last_name"
                label="Last Name"
                placeholder="Doe"
              />
            </VCol>

            <!-- 👉 Username -->
            <VCol cols="12">
              <AppTextField
                v-model="userData.username"
                label="Username"
                placeholder="john.doe.007"
              />
            </VCol>

            <!-- 👉 Billing Email -->
            <VCol cols="12" md="6">
              <AppTextField
                v-model="userData.email"
                label="Email"
                placeholder="johndoe@email.com"
              />
            </VCol>

            <!-- 👉 Contact -->
            <VCol cols="12" md="6">
              <AppTextField
                v-model="userData.phone"
                label="Phone Number"
                placeholder="+21266666666"
              />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol cols="12" class="d-flex flex-wrap justify-center gap-4">
              <VBtn type="submit"> Submit </VBtn>

              <VBtn color="secondary" variant="tonal" @click="onFormReset">
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
