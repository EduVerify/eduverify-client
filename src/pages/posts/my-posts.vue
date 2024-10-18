s
<script setup lang="ts">
import MyPosts from '@/views/apps/posts/MyPosts.vue';

// const academyCourseIllustration2 = useGenerateImageVariant(
//   academyCourseIllustration2Light,
//   academyCourseIllustration2Dark
// );

const searchQuery = ref("");
</script>

<template>
  <div>
    <VCard class="mb-6">
      <VCardText class="py-12 position-relative">
        <div
          class="d-flex flex-column gap-y-4 mx-auto"
          :class="
            $vuetify.display.mdAndUp
              ? 'w-50'
              : $vuetify.display.xs
              ? 'w-100'
              : 'w-75'
          "
        >
          <h4
            class="text-h4 text-center text-wrap mx-auto"
            :class="$vuetify.display.mdAndUp ? 'w-75' : 'w-100'"
          >
            Education, talents, and career opportunities.
            <span class="text-primary text-no-wrap"> All in one place.</span>
          </h4>
          <p class="text-center text-wrap text-body-1 mx-auto mb-0">
            Grow your skill with the most reliable online courses and
            certifications in marketing, information technology, programming,
            and data science.
          </p>
          <div class="d-flex justify-center align-center gap-4 flex-wrap">
            <div class="flex-grow-1" style="max-inline-size: 350px;">
              <AppTextField
                v-model="searchQuery"
                placeholder="Find your course"
              />
            </div>
            <VBtn
              color="primary"
              density="comfortable"
              icon="tabler-search"
              class="rounded"
            />
          </div>
        </div>
  
      </VCardText>
    </VCard>

    <MyPosts :search-query="searchQuery" />
  </div>
</template>
