// import { createGoogleLogin } from "vue3-google-login";
import vue3GoogleLogin from "vue3-google-login";

export default async ({ app }) => {
  app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
  });
};
