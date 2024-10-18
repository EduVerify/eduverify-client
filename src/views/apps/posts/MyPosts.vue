<script setup lang="ts">
interface Props {
  searchQuery: string;
}
const props = defineProps<Props>();

// Data table options
const itemsPerPage = ref(6);
const page = ref(1);
const sortBy = ref();
const orderBy = ref();
const isDialogVisible = ref(false);

const hideCompleted = ref(true);
const label = ref("All Courses");

const coursesData = ref({
  courses: [
    {
      id: 1,
      tutorImg: "/images/avatars/svg/vuero-1.svg",
      tags: "Web",
      courseTitle: "Web Development",
      desc: "Learn web development from scratch and become a professional web developer.",
    },
    {
      id: 2,
      tutorImg: "/images/avatars/svg/vuero-2.svg",
      tags: "Art",
      courseTitle: "Art & Design",
      desc: "Learn art and design from scratch and become a professional designer.",
    },
    {
      id: 3,
      tutorImg: "/images/avatars/svg/vuero-3.svg",
      tags: "UI/UX",
      courseTitle: "UI/UX Design",
      desc: "Learn UI/UX design from scratch and become a professional UI/UX designer.",
    },
    {
      id: 4,
      tutorImg: "/images/avatars/svg/vuero-4.svg",
      tags: "Psychology",
      courseTitle: "Psychology",
      desc: "Learn psychology from scratch and become a professional psychologist.",
    },
    {
      id: 5,
      tutorImg: "/images/avatars/svg/vuero-5.svg",
      tags: "Design",
      courseTitle: "Design",
      desc: "Learn design from scratch and become a professional designer.",
    },
    {
      id: 6,
      tutorImg: "/images/avatars/svg/vuero-6.svg",
      tags: "Web",
      courseTitle: "Web Development",
      desc: "Learn web development from scratch and become a professional web developer.",
    },
  ],
  total: 6,
});

const courses = computed(() => coursesData.value.courses);
const totalCourse = computed(() => coursesData.value.total);

watch([hideCompleted, label, () => props.searchQuery], () => {
  page.value = 1;
});

const resolveChipColor = (tags: string) => {
  if (tags === "Web") return "primary";
  if (tags === "Art") return "success";
  if (tags === "UI/UX") return "error";
  if (tags === "Psychology") return "warning";
  if (tags === "Design") return "info";
};
</script>

<template>
  <VCard class="mb-6">
    <VCardText>
      <!-- 👉 Header -->
      <div
        class="d-flex justify-space-between align-center flex-wrap gap-4 mb-6"
      >
        <div>
          <h5 class="text-h5">My Posts</h5>
        </div>

        <div class="d-flex flex-wrap gap-x-6 gap-y-4 align-center">
          <VBtn @click="isDialogVisible = true"> add Post </VBtn>
        </div>
      </div>

      <!-- 👉 Course List -->
      <div v-if="courses.length" class="mb-6">
        <VRow>
          <template v-for="course in courses" :key="course.id">
            <VCol cols="12" md="4" sm="6">
              <VCard flat border>
                <div class="px-2 pt-2">
                  <VImg
                    :src="course.tutorImg"
                    class="cursor-pointer"
                    @click="() => $router.push({ name: 'root' })"
                  />
                </div>
                <VCardText>
                  <div class="d-flex justify-space-between align-center mb-4">
                    <VChip
                      variant="tonal"
                      :color="resolveChipColor(course.tags)"
                      size="small"
                    >
                      {{ course.tags }}
                    </VChip>
                  </div>
                  <h5 class="text-h5 mb-1">
                    <RouterLink :to="{ name: 'root' }" class="course-title">
                      {{ course.courseTitle }}
                    </RouterLink>
                  </h5>
                  <p>
                    {{ course.desc }}
                  </p>
                  <div class="d-flex flex-wrap gap-4">
                    <VBtn
                      variant="tonal"
                      color="primary"
                      class="flex-grow-1"
                      :to="{ name: 'root' }"
                    >
                      <template #prepend>
                        <VIcon icon="tabler-pencil" class="flip-in-rtl" />
                      </template>
                      Edit post
                    </VBtn>
                    <VBtn
                      variant="tonal"
                      color="error"
                      class="flex-grow-1"
                      :to="{ name: 'root' }"
                    >
                      <template #append>
                        <VIcon icon="tabler-trash" class="flip-in-rtl" />
                      </template>
                      Delete post
                    </VBtn>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          </template>
        </VRow>
      </div>

      <div v-else>
        <h4 class="text-h4 text-center mb-6">No Course Found</h4>
      </div>

      <VPagination
        v-model="page"
        active-color="primary"
        first-icon="tabler-chevrons-left"
        last-icon="tabler-chevrons-right"
        show-first-last-page
        :length="Math.ceil(totalCourse / itemsPerPage)"
      />
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.course-title {
  &:not(:hover) {
    color: rgba(var(--v-theme-on-surface), var(--v-text-high-emphasis));
  }
}
</style>
