<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { useAuth } from "./components";

const auth = useAuth();
auth.setPropUser({ userInfo: "pepe", updated_at: new Date() });
</script>

<template>
  <div v-if="auth.user?.email">{{ auth.user.email }}</div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
