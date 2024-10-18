import { useUserStore } from "@/@core/stores/userStore"; // Adjust the import path as necessary
import { authType } from "@/@layouts/enums";
import { computed } from "vue";

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
      },
      {
        title: "Schools",
        to: { name: "schools-list" },
        icon: { icon: "tabler-school" },
      }
    );
  }

  if (userData && userData.role === authType.SCHOOL) {
    items.push({
      title: "Posts",
      to: { name: "posts-my-posts" },
      icon: { icon: "tabler-vocabulary" },
    });
  }

  return items;
});

export default navigationItems;
