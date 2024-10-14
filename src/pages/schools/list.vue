<script setup lang="ts">
import { fetchUniversitites } from "@/utils/api";

const search = ref("");
const uploadsURL = import.meta.env.VITE_API_UPLOAD_URL;
// headers
const headers = [
  { title: "School", key: "name" },
  { title: "city", key: "city" },
  { title: "phone", key: "phone" },
  { title: "website", key: "website" },
  { title: "read more", key: "read" },
];

interface School {
  id: number;
  name: string;
  city: string;
  phone: string;
  website: string;
  logo: string;
  description: string;
}

const schoolsList = ref<School[]>();

schoolsList.value = await fetchUniversitites();
</script>

<template>
  <div>
    <VCardText>
      <VRow>
        <VCol cols="12" offset-md="8" md="4">
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
      :items="schoolsList || []"
      :search="search"
      :items-per-page="10"
      class="text-no-wrap"
    >
      <!-- product -->
      <template #item.name="{ item }">
        <div class="d-flex align-center">
          <div>
            <VImg :src="uploadsURL + item.logo" height="100" width="100" />
          </div>
          <div class="d-flex flex-column ms-3">
            <span
              class="d-block font-weight-medium text-truncate text-high-emphasis"
              >{{ item.name }}</span
            >
            <span class="text-xs"
              >{{ item.description.substring(0, 50) }}...</span
            >
          </div>
        </div>
      </template>

      <template #item.website="{ item }">
        <div class="d-flex align-center">
          <div class="d-flex flex-column ms-3">
            <a
              :href="item.website.startsWith('http') ? item.website : `http://${item.website}`"
              class="d-block font-weight-medium text-truncate text-high-emphasis"
              target="_blank"
              rel="noopener noreferrer"
              >{{ item.website }}</a
            >
          </div>
        </div>
      </template>

      <!-- Read more -->
      <template #item.read="{ item }">
        <VBtn color="info" :to="`/posts/${item.id}`">
          Read More
          <VIcon end icon="tabler-arrow-right" />
        </VBtn>
      </template>
    </VDataTable>
  </div>
</template>
