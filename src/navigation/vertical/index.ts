import { useUserStore } from "@/@core/stores/userStore"; // Adjust the import path as necessary
import { authType } from "@/@layouts/enums";

const userStore = useUserStore();
const userData = userStore.userData;

const navigationItems = [
  {
    title: "Dashboard",
    to: { name: "root" },
    icon: { icon: "tabler-smart-home" },
  },
];

if (userData && userData.role === authType.STUDENT) {
  navigationItems.push(
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

export default navigationItems;
