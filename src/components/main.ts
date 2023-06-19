import type { App } from "vue";
import { HelloWorld, useAuth } from "@/components";

export default {
  install: (app: App) => {
    app.component("HelloWorld", HelloWorld);
  },
};

export { HelloWorld, useAuth };
