import { defineStore } from "pinia";
import { ref } from "vue";

type UserProp = {
  userInfo: string;
  updated_at: Date;
};

type User = {
  email: string;
};

export default defineStore("auth", () => {
  const user = ref<User | null>(null);
  const updated_at = ref<Date | null>(null);
  const timer = ref<number | undefined>(undefined);

  function logout() {
    user.value = null;
  }

  function delay(ms: number) {
    return new Promise((resolve) => {
      clearTimeout(timer.value);
      timer.value = setTimeout(resolve, ms);
    });
  }

  /**
   * set the user from props and if there is a change revalidate it.
   * it also revalidate automatically every 5 minutes counting from
   * the last change.
   */
  function setPropUser(propUser: UserProp) {
    console.log(propUser, user.value);
    if (updated_at.value == propUser.updated_at) {
      return;
    }

    const getUserInfo = () =>
      fetch(propUser.userInfo)
        .then((response) => response.json())
        .then((data: User | null) => {
          console.log(data);
          user.value = data;
          delay(5000).then(getUserInfo);
        });
    getUserInfo();
  }

  return {
    user,
    logout,
    setPropUser,
  };
});
