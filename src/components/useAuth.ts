import { defineStore } from "pinia";
import { ref } from "vue";

type UserProp = {
  userInfo: string;
  updated_at: Date;
};

type User = {
  email: string;
};

const envRevalidation = parseInt(
  import.meta.env?.VITE_SSG_AUTH_REVALIDATION || "",
  10
);

const TIMEOUT = Number.isInteger(envRevalidation) ? envRevalidation : 5 * 60000;

export default defineStore("auth", () => {
  const user = ref<User | null>(null);
  const updated_at = ref<Date | null>(null);
  const timer = ref<number | undefined>(undefined);

  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", TIMEOUT);

  function logout() {
    user.value = null;
  }

  function delay(ms: number) {
    return new Promise((resolve) => {
      clearTimeout(timer.value);
      timer.value = window.setTimeout(resolve, ms);
    });
  }

  /**
   * set the user from props and if there is a change revalidate it.
   * it also revalidate automatically every 5 minutes counting from
   * the last change.
   */
  function setPropUser(propUser: UserProp) {
    if (updated_at.value == propUser.updated_at) {
      return;
    }
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", TIMEOUT);
    console.log(propUser, user.value, TIMEOUT);

    const getUserInfo = () =>
      fetch(propUser.userInfo)
        .then((response) => response.json())
        .then((data: User | null) => {
          user.value = data;
          delay(TIMEOUT).then(getUserInfo);
        });
    getUserInfo();
  }

  return {
    user,
    logout,
    setPropUser,
  };
});
