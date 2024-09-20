<script setup>
import avatar1 from '@images/avatars/avatar-1.png';

const solidCardData = 
  {
    cardBg: '#3B5998',
    title: 'Facebook Card',
    icon: 'tabler-brand-facebook',
    text: 'You\'ve read about the importance of being courageous, rebellious and imaginative. These are all vital ingredients in an.',
    avatarImg: avatar1,
    avatarName: 'Eugene Clarke',
    likes: '3.2k',
    share: '49',
  }

</script>

<template>
      <VCard :color="solidCardData.cardBg">
        <VCardItem>
          <template #prepend>
            <VIcon
              size="1.9rem"
              color="white"
              :icon="solidCardData.icon"
            />
          </template>
          <VCardTitle class="text-white">
            {{ solidCardData.title }}
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <p class="clamp-text text-white mb-0">
            {{ solidCardData.text }}
          </p>
        </VCardText>

        <VCardText class="d-flex justify-space-between align-center flex-wrap">
          <div class="text-no-wrap">
            <VAvatar
              size="34"
              :image="solidCardData.avatarImg"
            />
            <span class="text-white ms-2">{{ solidCardData.avatarName }}</span>
          </div>

          <div class="d-flex align-center">
            <IconBtn
              icon="tabler-heart"
              color="white"
              class="me-1"
            />
            <span class="text-subtitle-2 text-white me-4">{{ solidCardData.likes }}</span>

            <IconBtn
              icon="tabler-share"
              color="white"
              class="me-1"
            />
            <span class="text-subtitle-2 text-white mt-1">{{ solidCardData.share }}</span>
          </div>
        </VCardText>
      </VCard>
</template>
