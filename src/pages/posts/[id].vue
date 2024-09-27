<script setup lang="ts">

import logo from '@images/pages/logo-uiz.png';
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
           Master UIZ results
          </h5>

          <div
            class="text-wrap text-body-1"
            style="max-inline-size: 360px;"
          >
            25 septembre 2024
          </div>
        </div>
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
         <!-- 👉 Time Spending -->
      <VCol
        cols="12"
        md="4"
      >
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex flex-column ps-3">
            <h5 class="text-h5 mb-1 text-no-wrap">
              Ibn Zohr Uneversity
            </h5>
            <div class="text-body-1 mb-7">
              Agadir, Morocco
            </div>
            <div>
              <PostDescription/>
            </div>
          </div>
          <div style="margin-inline-start: 3rem;">
            <VImg
              :src="logo"
              height="150"
              width="150"
            />
          </div>
        </div>
      </VCol>
      </VCol>
    </VRow>

    <VRow class="py-6">
      <VCol cols="12">
        <DemoFormWizardNumberedModernVertical />
    </VCol>
    </VRow>
  </div>
</template>
