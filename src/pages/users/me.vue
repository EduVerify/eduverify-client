<script setup lang="ts">


// const route = useRoute('apps-user-view-id')

const userTab = ref(null)

const tabs = [
  { icon: 'tabler-users', title: 'Account' },
  { icon: 'tabler-lock', title: 'Security' },
]

const { data: userData } = {
  data: {
    id: 1,
    fullName: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    username: 'john.doe',
    role: 'admin',
    country: 'United States',
    contact: '+1 (123) 456 7890',
    email: 'aoa@fkf.gfsd',
  avatar: 'https://randomuser.me/api/portraits',
    taskDone: 10,
  },  
}
</script>

<template>
  <VRow v-if="userData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <UserBioPanel :user-data="userData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            :size="18"
            :icon="tab.icon"
            class="me-1"
          />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <UserTabAccount />
        </VWindowItem>

        <VWindowItem>
          <UserTabSecurity />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
  <div v-else>
    <VAlert
      type="error"
      variant="tonal"
    >
      Invoice with ID not found!
    </VAlert>
  </div>
</template>
