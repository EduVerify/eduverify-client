<script setup lang="ts">
import { useToast } from "vue-toastification";

interface Props {
  isDialogVisible: boolean;
}

interface Emit {
  (e: "update:isDialogVisible", val: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<Emit>();
const toast = useToast();

const onFormReset = () => {
  emit("update:isDialogVisible", false);
};

const dialogModelValueUpdate = (val: boolean) => {
  emit("update:isDialogVisible", val);
};

const file = ref<File | null>(null);

const universityData = ref({
  name: "",
  city: "",
  address: "",
  website: "",
  email: "",
  phone: "",
  description: "",
  logo: "",
});

onMounted(() => {
  universityData.value.logo = localStorage.getItem("logo") || "";
});
async function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement;

  file.value = target.files?.[0] || null;

  if (file.value) {
    try {
      const formData = new FormData();

      formData.append("file", file.value);

      const { data } = await $api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("logo", data.file.path);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload file.");
    }
  }
}

const onFormSubmit = async () => {
  try {
    const data = await $api.post("/universities", universityData.value);

    console.log(data);

    emit("update:isDialogVisible", false);
    localStorage.removeItem("logo");
    toast.success("University information added successfully!");
  } catch (error) {
    toast.error("Failed to add university information.");
  }
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
        <h4 class="text-h4 text-center mb-2">Add University Information</h4>
        <p class="text-body-1 text-center mb-6">
          Updating University details will receive a privacy audit.
        </p>

        <!-- 👉 Form -->
        <VForm class="mt-6" @submit.prevent="onFormSubmit">
          <VRow>
            <!-- 👉 University Name" -->
            <VCol cols="12" md="6">
              <AppTextField
                v-model="universityData.name"
                label="University Name"
                placeholder="Fs University"
              />
            </VCol>

            <!-- 👉 University City" -->
            <VCol cols="12" md="6">
              <AppTextField
                v-model="universityData.city"
                label="City"
                placeholder="Agadir"
              />
            </VCol>

            <!-- 👉 University Address" -->
            <VCol cols="12" md="6">
              <AppTextField
                v-model="universityData.address"
                label="Address"
                placeholder="Avenue Hassan II"
              />
            </VCol>

            <!-- 👉 University WebSite" -->
            <VCol cols="12" md="6">
              <AppTextField
                v-model="universityData.website"
                label="WebSite"
                placeholder="www.fsa.ac.ma"
              />
            </VCol>

            <!-- 👉 Billing Email -->
            <VCol cols="12" md="6">
              <AppTextField
                v-model="universityData.email"
                label="Email"
                placeholder="johndoe@fsa.com"
              />
            </VCol>

            <!-- 👉 Contact -->
            <VCol cols="12" md="6">
              <AppTextField
                v-model="universityData.phone"
                label="Phone Number"
                placeholder="+21266666666"
              />
            </VCol>

            <!-- 👉 University Description" -->
            <VCol cols="12" md="6">
              <AppTextarea
                v-model="universityData.description"
                label="Description"
                placeholder="Description"
              />
            </VCol>

            <!-- 👉 University Logo" -->
            <VCol cols="12" md="6">
              <VFileInput label="File input" @change="onFileChange" />
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
