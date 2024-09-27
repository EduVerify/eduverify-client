<script lang="ts" setup>

// Images
import data from '@/views/data/tableData';

// Project Table Header

const dataList = ref(data);
const search = ref('')


const isConfirmDialogOpen = ref(false)
const isAccountDeactivated = ref(false)

const validateAccountDeactivation = [(v: string) => !!v || 'Please confirm account deactivation']


</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
          <h5 class="text-h5">
            Applied masters
          </h5>

          <div style="inline-size: 250px;">
            <AppTextField
              v-model="search"
              placeholder="Search Project"
            />
          </div>
        </VCardText>
        <VDivider />
        <!-- 👉 User Project List Table -->

        <!-- SECTION Datatable -->

        <MastersTable v-model="dataList" />
        <!-- !SECTION -->
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Delete Account">
        <VCardText>
          <!-- 👉 Checkbox and Button  -->
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              :rules="validateAccountDeactivation"
              label="I confirm my account deactivation"
            />
          </div>

          <VBtn
            :disabled="!isAccountDeactivated"
            color="error"
            class="mt-6"
            @click="isConfirmDialogOpen = true"
          >
            Deactivate Account
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
   <!-- Confirm Dialog -->
   <ConfirmDialog
    v-model:isDialogVisible="isConfirmDialogOpen"
    confirmation-question="Are you sure you want to deactivate your account?"
    confirm-title="Deactivated!"
    confirm-msg="Your account has been deactivated successfully."
    cancel-title="Cancelled"
    cancel-msg="Account Deactivation Cancelled!"
  />
</template>
