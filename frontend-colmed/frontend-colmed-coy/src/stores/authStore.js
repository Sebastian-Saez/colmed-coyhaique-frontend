import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { isRunningOnCapacitor } from "src/utils/platform";
// import { FCM } from '@capacitor-community/fcm';
// import { notificationsGranted } from 'src/boot/firebase';

export const useUserStore = defineStore("user", {
  state: () => ({
    // profile: JSON.parse(localStorage.getItem("userProfile")) || null,
    profiles: JSON.parse(localStorage.getItem("userProfiles")) || [],
    token: null, // Inicializar el token desde el localStorage
    opcion_profile: localStorage.getItem("optionProfile") || null, // Inicializar el token desde el localStorage
    user: JSON.parse(localStorage.getItem("user")) || null, // Inicializar el user desde el localStorage
    refresh: null, // Inicializar el token desde el localStorage
    loading: false,
    //icm login app móvil
    error_login_mobile: null,
    icm: null,
    mensaje_firebase: true,
  }),
  actions: {
    async fetchProfile(email, password) {
      // Limpiar el token antes de iniciar sesión
      this.loading = true;
      this.token = null;
      this.refresh = null;
      this.profiles = [];
      this.user = null;
      this.opcion_profile = null;

      localStorage.removeItem("authToken");
      try {
        const response = await api.post("/api/colmed/login/", {
          email,
          password,
        });
        // Guardar el token en el estado y en el localStorage
        this.token = response.data.access;
        localStorage.setItem("authToken", this.token);

        this.user = response.data.user;
        localStorage.setItem("user", JSON.stringify(this.user));

        this.refresh = response.data.refresh;
        localStorage.setItem("refreshToken", this.refresh);

        // Guardar los perfiles en el estado y en el localStorage
        this.profiles = response.data.user.perfiles;
        localStorage.setItem("userProfiles", JSON.stringify(this.profiles));

        this.opcion_profile = this.profiles[0].tipo_perfil;
        localStorage.setItem("optionProfile", this.opcion_profile);
        this.loading = false;
      } catch (error) {        
        this.loading = false;
        throw error;
      }
    },
    async loginWithGoogle(id_token) {
      // Limpiar el token antes de iniciar sesión
      const router = useRouter();
      this.loading = true;
      this.token = null;
      this.refresh = null;
      this.profiles = [];
      this.user = null;
      this.opcion_profile = null;
      try {
        const response = await api.post("/api/auth/google/", {
          id_token: id_token,
        });
        
        // Guardar el token en el estado y en el localStorage
        // this.token = response.data.access;
        // localStorage.setItem("authToken", this.token);

        this.user = response.data.user;
        localStorage.setItem("user", JSON.stringify(this.user));

        // this.refresh = response.data.refresh;
        // localStorage.setItem("refreshToken", this.refresh);

        // Guardar los perfiles en el estado y en el localStorage
        this.profiles = response.data.user.perfiles;
        localStorage.setItem("userProfiles", JSON.stringify(this.profiles));

        this.opcion_profile = this.profiles[0].tipo_perfil;
        localStorage.setItem("optionProfile", this.opcion_profile);
        this.loading = false;
      } catch (error) {
        
        if (error === "User not authorized or not registered in the system") {
          console.error(error);
        } else {
          console.error("Error en login con Google:", error);
        }

        this.loading = false;
        throw error;
      }
    },
    async loginWithGoogleMobile(id_token) {
      this.loading = true;
      
      const fcmToken = await this.getFCMToken();
      if (!fcmToken) {
        console.log("⚠️ No se encontró FCM Token, el usuario podría no recibir notificaciones.");
      }

      

      try {
        const response = await api.post("/api/app/login-google/", {
          id_token: id_token,
          fcm_token: fcmToken || null,
        });      
        this.user = response.data.user;
        localStorage.setItem("user", JSON.stringify(this.user));

        this.profiles = response.data.user.perfiles;
        localStorage.setItem("userProfiles", JSON.stringify(this.profiles));

        this.opcion_profile = this.profiles[0].tipo_perfil;
        localStorage.setItem("optionProfile", this.opcion_profile);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async logout() {
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) return;

        await api.post("/api/auth/logout/", { refresh_token: refreshToken });

        // Limpiar almacenamiento local
        this.token = null;
        this.refresh = null;
        this.user = null;
        this.profiles = [];
        this.opcion_profile = null;

        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        localStorage.removeItem("userProfiles");
        localStorage.removeItem("optionProfile");

        // Redirigir a login
        this.router.push("/home");
      } catch (error) {
        console.error("Error en logout:", error);
      }
    },
    async logoutMobile() {
      try {
        // const refreshToken = localStorage.getItem("refresh_token");

        // if (!refreshToken) return;

        // await api.post("/api/auth/logout/", { refresh_token: refreshToken });

        // Limpiar almacenamiento local
        this.token = null;
        this.refresh = null;
        this.user = null;
        this.profiles = [];
        this.opcion_profile = null;

        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        localStorage.removeItem("userProfiles");
        localStorage.removeItem("optionProfile");

        // Redirigir a login
        // this.router.replace("/home");
      } catch (error) {
        console.error("Error en logout:", error);
      }
    },
    changeProfile(profile) {
      this.loading = true;
      this.opcion_profile = profile;
      this.loading = false;
    },
    async updatePassword_prev(email, oldPassword, newPassword) {
      this.loading = true;
      try {
        // Configurar el encabezado de autorización si es necesario
        const headers = {};
        if (this.token) {
          headers.Authorization = `Bearer ${this.token}`;
        }

        // Realizar la solicitud al backend para actualizar la contraseña
        const response = await api.post(
          "/api/colmed/update-password/",
          {
            email,
            old_password: oldPassword,
            new_password: newPassword,
          },
          { headers }
        );

        // Actualizar el perfil y el token si es necesario
        // Aquí asumimos que el backend devuelve un nuevo token y perfil
        if (response.data.access) {
          this.token = response.data.access;
          localStorage.setItem("authToken", this.token);
        }

        if (response.data.refresh) {
          this.refresh = response.data.refresh;
          localStorage.setItem("refreshToken", this.refresh);
        }

        if (response.data.user) {
          this.profile = response.data.user;
          localStorage.setItem("userProfile", JSON.stringify(this.profile));
        }
        this.loading = false;
        return response.data;
      } catch (error) {
        // Manejo de errores
        this.loading = false;
        throw error;
      }
    },
    async updatePassword(email, oldPassword, newPassword) {
      // Este método ya existe en tu ejemplo. Reemplázalo si gustas.
      this.loading = true;
      try {
        const headers = {};
        if (this.token) {
          headers.Authorization = `Bearer ${this.token}`;
        }

        const response = await api.post(
          "/api/app/update-password/",
          {
            email,
            old_password: oldPassword,
            new_password: newPassword,
          },
          { headers }
        );

        // Si el backend regresa nuevos tokens, se actualizan
        if (response.data.access) {
          this.token = response.data.access;
          localStorage.setItem("authToken", this.token);
        }

        if (response.data.refresh) {
          this.refresh = response.data.refresh;
          localStorage.setItem("refreshToken", this.refresh);
        }

        // Si regresa info del user, actualizar
        if (response.data.user) {
          this.user = response.data.user;
          localStorage.setItem("user", JSON.stringify(this.user));
        }
        this.loading = false;
        return response.data;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },

    // ------------------------------------------------
    // 1) SOLICITAR RESET (OLVIDO DE CONTRASEÑA)
    // ------------------------------------------------
    async requestPasswordReset(identifier) {
      /*
        identifier = email o ICM, según tu backend.
        Llamar al endpoint: POST /api/auth/request-password-reset/
        Body: { "identifier": identifier }
      */
      this.loading = true;
      try {
        const response = await api.post("/api/app/pass-reset/", {
          identifier,
        });
        this.loading = false;
        return response.data; // "Se ha enviado un correo con instrucciones..."
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },

    // ------------------------------------------------
    // 2) CONFIRMAR RESET (NUEVA CONTRASEÑA)
    // ------------------------------------------------
    async confirmPasswordReset(token, newPassword) {
      /*
        Llamar al endpoint: POST /api/auth/confirm-password-reset/
        Body: { "token": token, "new_password": newPassword }
      */
      this.loading = true;
      try {
        const response = await api.post("/api/app/confirm-pass-reset/", {
          token,
          new_password: newPassword,
        });
        this.loading = false;
        return response.data; // "La contraseña ha sido restablecida exitosamente."
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async registerWithIcm(icm, email, password) {
      /*
        Body: { icm, email, password }
      */
      this.loading = true;
      try {
        const response = await api.post("/api/app/register/", {
          icm,
          email,
          password,
        });
        
        this.loading = false;
        return response.data; // { detail: "Registro exitoso." }
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async loginWithIcm(icm, password) {
      /*
        Llama a /api/colmed/login-with-icm/
        Body: { icm, password }
      */
      this.loading = true;

      const fcmToken = await this.getFCMToken();
      if (!fcmToken) {
        console.log("⚠️ No se encontró FCM Token, el usuario podría no recibir notificaciones.");
      }

      this.token = null;
      this.refresh = null;
      this.profiles = [];
      this.user = null;
      this.opcion_profile = null;
      localStorage.removeItem("authToken");
      
      try {
        const response = await api.post("/api/app/login/", {
          icm,
          password,
          fcm_token: fcmToken || null,
        });
        // Manejar tokens y guardar en localStorage
        this.token = response.data.access;
        localStorage.setItem("authToken", this.token);

        this.refresh = response.data.refresh;
        localStorage.setItem("refreshToken", this.refresh);

        // Podrías guardar el ICM y/o email en el state:
        this.icm = response.data.icm;
        this.user = response.data.user;
        localStorage.setItem("user", JSON.stringify(this.user));

        this.profiles = response.data.user.perfiles;
        localStorage.setItem("userProfiles", JSON.stringify(this.profiles));

        this.loading = false;

        // Si tu backend también devolviera "perfiles" o algo similar,
        // puedes guardarlo tal como en login con email:
        //   this.profiles = response.data.profiles;
        //   localStorage.setItem("userProfiles", JSON.stringify(this.profiles));

        return response.data;
      } catch (error) {        
        this.loading = false;
        throw error;
      }
    },
    async getFCMToken () {
      if (!isRunningOnCapacitor()) {
        console.warn("Modo web: No se obtiene token FCM.");
        return null;
      }

      try {
        const { FCM} = await import('@capacitor-community/fcm');
        const {notificationsGranted} = await import('src/boot/firebase');

        if (!notificationsGranted) {
          console.warn("No se ha otorgado permiso para notificaciones; no se obtiene token.");
          return null;
        }else{
          const result = await FCM.getToken();
          
          return result.token;
        }
  
        // try {
          
        //   // Envía este token a tu backend para enviar notificaciones
        // } catch (error) {
        //   console.error('Error al obtener FCM token:', error);
        //   return null;
        // }
      }catch (error) {
        console.error("Error al obtener FCM token:", error);
        return null;
      }
      
    },
    async mensajeNotificacionFirebase () {
      if (!isRunningOnCapacitor()) {
        console.warn("Modo web: No se obtiene token FCM.");
        return null;
      }else{
        const {notificationsGranted} = await import('src/boot/firebase');
        if (!notificationsGranted) {
          this.mensaje_firebase = true;
        }else{
          this.mensaje_firebase = false;
        }
      }      
    },
    mensajeNotificacionFirebaseEntregado () {
      this.mensaje_firebase= false;
    }
  },
});
