<script setup lang="ts">
const productList = [
  {
    id: 1,
    logo: 'https://cdn.vuetifyjs.com/images/logos/logo.svg',
    school: 'Vuetify',
    startDate: '2021-09-01',
    endDate: '2021-09-30',
    read: 'Read more',
  },
  {
    id: 2,
    logo: 'https://cdn.vuetifyjs.com/images/logos/logo.svg',
    school: 'Vuetify',
    startDate: '2021-09-01',
    endDate: '2021-09-30',
    read: 'Read more',
  },
  {
    id: 3,
    logo: 'https://cdn.vuetifyjs.com/images/logos/logo.svg',
    school: 'Vuetify',
    startDate: '2021-09-01',
    endDate: '2021-09-30',
    read: 'Read more',
  },
  {
    id: 4,
    logo: 'https://cdn.vuetifyjs.com/images/logos/logo.svg',
    school: 'Vuetify',
    startDate: '2021-09-01',
    endDate: '2021-09-30',
    read: 'Read more',
  },
  {
    id: 5,
    logo: 'https://cdn.vuetifyjs.com/images/logos/logo.svg',
    school: 'Vuetify',
    startDate: '2021-09-01',
    endDate: '2021-09-30',
    read: 'Read more',
  }
] 

const search = ref('')

// headers
const headers = [
  { title: 'School', key: 'school' },
  { title: 'start date', key: 'startDate' },
  { title: 'end date', key: 'endDate' },
  { title: 'read more', key: 'read' },
]


</script>

<template>
  <div>
    <VCardText>
      <VRow>
        <VCol
          cols="12"
          offset-md="8"
          md="4"
        >
          <AppTextField
            v-model="search"
            placeholder="Search ..."
            append-inner-icon="tabler-search"
            single-line
            hide-details
            dense
            outlined
          />
        </VCol>
      </VRow>
    </VCardText>

    <!-- 👉 Data Table  -->
    <VDataTable
      :headers="headers"
      :items="productList || []"
      :search="search"
      :items-per-page="5"
      class="text-no-wrap"
    >
      <!-- product -->
      <template #item.school="{ item }">
        <div class="d-flex align-center">
          <div>
            <VImg
              :src="item.logo"
              height="40"
              width="40"
            />
          </div>
          <div class="d-flex flex-column ms-3">
            <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{ item.school }}</span>
            <span class="text-xs">{{ item.logo }}</span>
          </div>
        </div>
      </template>

      <!-- Read more -->
      <template #item.read="{ item }">
        <VBtn color="info" :to="`/posts/${item.id}`">
      Read More
      <VIcon
        end
        icon="tabler-arrow-right"
      />
    </VBtn>
      </template>
    </VDataTable>
  </div>
</template>
