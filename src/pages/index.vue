<script setup lang="ts">
import data from '@/views/data/tableData';
import customCheck from '@images/svg/Check.svg';
import customLaptop from '@images/svg/laptop.svg';
import customLightbulb from '@images/svg/lightbulb.svg';

const headers = [
  { title: 'NAME', key: 'fullName' },
  { title: 'EMAIL', key: 'email' },
  { title: 'DATE', key: 'startDate' },
  { title: 'SALARY', key: 'salary' },
  { title: 'AGE', key: 'age' },
  { title: 'STATUS', key: 'status' },
]

const resolveStatusVariant = (status: number) => {
  if (status === 1)
    return { color: 'primary', text: 'Current' }
  else if (status === 2)
    return { color: 'success', text: 'Professional' }
  else if (status === 3)
    return { color: 'error', text: 'Rejected' }
  else if (status === 4)
    return { color: 'warning', text: 'Resigned' }
  else
    return { color: 'info', text: 'Applied' }
}

const userData = {
}
</script>

<template>
  <div>
    <VRow class="py-6">
      <VCol
        cols="12"
        md="8"
        :class="$vuetify.display.mdAndUp ? 'border-e' : 'border-b'"
      >
        <div class="pe-3">
          <h5 class="text-h5 mb-2">
            Welcome back,<span class="text-h4"> Felecia 👋🏻 </span>
          </h5>

          <div
            class="text-wrap text-body-1"
            style="max-inline-size: 360px;"
          >
            Your progress this week is Awesome. let's keep it up
            and get a lot of points reward!
          </div>

          <div class="d-flex justify-space-between flex-wrap gap-4 flex-column flex-md-row mt-4">
            <div
              v-for="{ title, value, icon, color } in [
                { title: 'Hours Spent', value: '34h', icon: customLaptop, color: 'primary' },
                { title: 'Test Results', value: '82%', icon: customLightbulb, color: 'info' },
                { title: 'Course Completed', value: '14', icon: customCheck, color: 'warning' },
              ]"
              :key="title"
            >
              <div class="d-flex align-center">
                <VAvatar
                  variant="tonal"
                  :color="color"
                  rounded
                  size="54"
                  class="text-primary me-4"
                >
                  <VIcon
                    :icon="icon"
                    size="38"
                  />
                </VAvatar>
                <div>
                  <h6 class="text-h6 text-medium-emphasis">
                    {{ title }}
                  </h6>
                  <h4
                    class="text-h4"
                    :class="`text-${color}`"
                  >
                    {{ value }}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <!-- <TimelineOutlined /> -->
        <IdCard />
      </VCol>
    </VRow>

    <VRow class="match-height">
      <VCol cols="12">
        <VDataTable
          :headers="headers"
          :items="data"
          :items-per-page="5"
        >
          <!-- full name -->
          <template #item.fullName="{ item }">
            <div class="d-flex align-center">
              <VAvatar
                size="32"
                :color="item.avatar ? '' : 'primary'"
                :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
                :variant="!item.avatar ? 'tonal' : undefined"
              >
                <VImg
                  v-if="item.avatar"
                  :src="item.avatar"
                />
                <span v-else>{{ avatarText(item.fullName) }}</span>
              </VAvatar>
              <div class="d-flex flex-column ms-3">
                <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
                <small>{{ item.post }}</small>
              </div>
            </div>
          </template>

          <template #item.status="{ item }">
            <VChip
              :color="resolveStatusVariant(item.status).color"
              class="font-weight-medium"
              size="small"
            >
              {{ resolveStatusVariant(item.status).text }}
            </VChip>
          </template>
        </VDataTable>
      </VCol>

      <VCol
        cols="12"
        md="4"
        sm="6"
      >
        <AcademyCardTopCourses />
      </VCol>
      <VCol
        cols="12"
        md="4"
        sm="6"
      >
        <AcademyUpcomingWebinar />
      </VCol>

      <VCol
        cols="12"
        md="4"
        sm="6">
        <AcademyCardPopularInstructors />
      </VCol>
    </VRow>
  </div>
</template>
