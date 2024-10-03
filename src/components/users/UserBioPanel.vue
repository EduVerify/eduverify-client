<script setup lang="ts">
import { useUserStore } from "@/@core/stores/userStore";
const isUserInfoEditDialogVisible = ref(false);
const isUpgradePlanDialogVisible = ref(false);

// 👉 Role variant resolver
const resolveUserRoleVariant = (role: string) => {
  if (role === "subscriber") return { color: "warning", icon: "tabler-user" };
  if (role === "author")
    return { color: "success", icon: "tabler-circle-check" };
  if (role === "maintainer")
    return { color: "primary", icon: "tabler-chart-pie-2" };
  if (role === "editor") return { color: "info", icon: "tabler-pencil" };
  if (role === "admin") return { color: "secondary", icon: "tabler-server-2" };

  return { color: "primary", icon: "tabler-user" };
};

const userStore = useUserStore();
const userData = computed(() => userStore.userData);
console.log("userdata", userData.value);
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard v-if="userData">
        <VCardText class="text-center pt-12">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            :size="100"
            :color="!userData.picture ? 'primary' : undefined"
            :variant="!userData.picture ? 'tonal' : undefined"
          >
            <VImg v-if="userData.picture" :src="userData.picture" />
            <span v-else class="text-5xl font-weight-medium">
              {{ avatarText(`${userData.first_name} ${userData.last_name}`) }}
            </span>
          </VAvatar>

          <!-- 👉 User fullName -->
          <h5 class="text-h5 mt-4">
            {{ `${userData.first_name} ${userData.last_name}` }}
          </h5>

          <!-- 👉 Role chip -->
          <VChip
            label
            :color="resolveUserRoleVariant(userData.role).color"
            size="small"
            class="text-capitalize mt-4"
          >
            {{ userData.role }}
          </VChip>
        </VCardText>

        <VCardText>
          <div
            class="d-flex justify-space-around gap-x-6 gap-y-2 flex-wrap mb-6"
          >
            <!-- 👉 Done task -->
            <div class="d-flex align-center me-8">
              <VAvatar
                :size="40"
                rounded
                color="primary"
                variant="tonal"
                class="me-4"
              >
                <VIcon icon="tabler-checkbox" size="24" />
              </VAvatar>
              <div>
                <h5 class="text-h5">
                  {{ `${userData.taskDone ? userData.taskDone : 0}` }}
                </h5>

                <span class="text-sm">Task Done</span>
              </div>
            </div>
          </div>

          <!-- 👉 Details -->
          <h5 class="text-h5">Details</h5>

          <VDivider class="my-4" />

          <!-- 👉 User Details list -->
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Username:
                  <div class="d-inline-block text-body-1">
                    {{ userData.username }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="text-h6"> Billing Email: </span>
                <span class="text-body-1">
                  {{ userData.email }}
                </span>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Role:
                  <div class="d-inline-block text-capitalize text-body-1">
                    {{ userData.role }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Contact:
                  <div class="d-inline-block text-body-1">
                    {{ userData.phone }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText class="d-flex justify-center gap-x-4">
          <VBtn variant="elevated" @click="isUserInfoEditDialogVisible = true">
            Edit
          </VBtn>

          <VBtn variant="tonal" color="error"> Suspend </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>

  <!-- 👉 Edit user info dialog -->
  <UserInfoEditDialog
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="userData"
  />

  <!-- 👉 Upgrade plan dialog -->
  <UserUpgradePlanDialog v-model:isDialogVisible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.5rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
