<script setup lang="ts">
import { useUserStore } from "@/@core/stores/userStore";
import { authType } from "@/@layouts/enums";

const useUser = useUserStore();
const isUniversityDialogVisible = ref(false);

const handleLogout = () => {
  useUser.removeAccessToken();

  // Optionally, you can redirect the user to the login page
  window.location.href = "/login";
};

const getUser = computed(() => useUser.userData);

const switchRole = async (role: authType) => {
  const data = await useUser.switchRole(role);

  if (data.isChecked === false) isUniversityDialogVisible.value = true;
};
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  >
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg v-if="getUser?.picture" :src="getUser?.picture" />
      <span v-else class="text-5xl font-weight-medium">
        {{ avatarText(`${getUser?.first_name} ${getUser?.last_name}`) }}
      </span>

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar color="primary" variant="tonal">
                    <VImg v-if="getUser?.picture" :src="getUser?.picture" />
                    <span v-else class="text-5xl font-weight-medium">
                      {{
                        avatarText(
                          `${getUser?.first_name} ${getUser?.last_name}`
                        )
                      }}
                    </span>
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ getUser?.first_name }} {{ getUser?.last_name }}
            </VListItemTitle>
            <VListItemSubtitle>{{ getUser?.role }}</VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="tabler-user" size="22" />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="tabler-settings" size="22" />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="tabler-currency-dollar" size="22" />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem>

          <!-- 👉 FAQ -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="tabler-switch-horizontal" size="22" />
            </template>

            <VListItemTitle
              v-if="getUser?.role === authType.STUDENT"
              @click="switchRole(authType.SCHOOL)"
            >
              Switch to Pro account
            </VListItemTitle>
            <VListItemTitle v-else @click="switchRole(authType.STUDENT)">
              Switch to student account
            </VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="handleLogout">
            <template #prepend>
              <VIcon class="me-2" icon="tabler-logout" size="22" />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>

  <UniversityDialog v-model:isDialogVisible="isUniversityDialogVisible" />
</template>
