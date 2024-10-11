import { computed } from 'vue';
import { useUserStore } from "@/@core/stores/userStore"; // Adjust the import path as necessary
import { authType } from "@/@layouts/enums";

const { userData } = useUserStore();

const navigationItems = computed(() => {
  const items = [
    {
      title: "Dashboard",
      to: { name: "root" },
      icon: { icon: "tabler-smart-home" },
    },
  ];

  if (userData && userData.role === authType.STUDENT) {
    items.push(
      {
        title: "Posts",
        to: { name: "posts-list" },
        icon: { icon: "tabler-vocabulary" },
      },
      {
        title: "Account",
        to: { name: "users-me" },
        icon: { icon: "tabler-user" },
      }
    );
  }

  return items;
});

export default navigationItems;
