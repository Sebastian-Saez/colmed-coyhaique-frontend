<template>
  <q-layout view="lHh lpr lFf" class="bg-light-blue-11">

    

    <q-card
      class="q-mx-xs bg-blue-10"
      flat
      bordered
      style="border-radius: 0px 0px 20px 20px"
    >
      <q-header
        class="bg-blue-10 text-white q-mx-xs"
        style="border-radius: 0px 0px 20px 20px"
      >
        <q-toolbar>
          <q-btn flat icon="menu" @click="drawer = !drawer" />
          <q-toolbar-title align="center">
            <div class="col items-center">
              <div class="text-caption text-weight-bold text-center">
                COLEGIO MÉDICO
              </div>
              <q-separator
                color="red-8"
                size="3px"
                style="border-radius: 20px"
              />
              <div class="text-caption text-weight-bold text-center">
                Región de Aysén
              </div>
            </div>
          </q-toolbar-title>
          <q-btn flat>
            <q-avatar size="xl">
              <img
                src="~assets/LogoCOLMEDAYSEN_2.png"
                alt="Colegio Médico Logo"
              />
            </q-avatar>
          </q-btn>
        </q-toolbar>
        <q-banner inline-actions class="text-white bg-red q-mx-xl q-mb-sm text-center"  style="border-radius:20px" v-if="!isOnline">
          Sin conexión a internet
        </q-banner>
      </q-header>

      <!-- Drawer lateral -->
      <q-drawer
        v-model="drawer"
        side="left"
        overlay
        class="bg-light-blue-2"
        :width="350"
      >
        <q-list padding>
          <q-item clickable v-ripple @click="drawer = false">
            <q-item-section avatar>
              <q-icon name="home" class="text-primary" />
            </q-item-section>
            <q-item-section class="text-h6 text-primary">
              Volver al Home
            </q-item-section>
          </q-item>

          <q-separator inset />

          <!-- Sección de Contactos de Interés -->
          <q-expansion-item
            group="somegroup"
            icon="contacts"
            label="Contactos de interés"
            header-class="text-h6 text-secondary"
          >
            <q-inner-loading
              v-if="loading_contactos"
              :showing="loading_contactos"
              label="Cargando contactos..."
              label-class="text-secondary"
              label-style="font-size: 1.1em"
            />
            <div v-else>
              <q-card
                v-if="contactos.length === 0"
                class="bg-teal-1 q-pa-sm q-mb-sm q-mx-sm"
                style="border-radius: 10px"
              >
                <div class="text-center text-secondary">
                  No hay contactos disponibles.
                </div>
              </q-card>
              <q-card
                v-for="(contacto, index) in contactos"
                :key="index"
                class="bg-teal-1 q-mb-sm q-mx-sm"
                style="border-radius: 10px"
              >
                <q-card-section>
                  <div class="text-secondary text-body1 text-weight-bold">
                    {{ contacto.nombre }}
                  </div>
                  <div class="text-secondary text-caption text-weight-bold">
                    {{ contacto.cargo }}
                  </div>
                  <q-list>
                    <q-separator inset />
                    <q-item clickable tag="a" :href="'mailto:' + contacto.email">
                      <q-item-section avatar>
                        <q-icon color="primary" name="mail" />
                      </q-item-section>
                      <q-item-section class="text-primary">
                        {{ contacto.email }}
                      </q-item-section>
                    </q-item>
                    <q-item
                      v-if="contacto.telefono"
                      clickable
                      tag="a"
                      :href="'tel:' + contacto.telefono"
                    >
                      <q-item-section avatar>
                        <q-icon color="primary" name="phone" />
                      </q-item-section>
                      <q-item-section class="text-primary">
                        {{ contacto.telefono }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
          </q-expansion-item>

          <q-separator inset />

          <!-- Sección de Links de Interés -->
          <q-expansion-item
            group="somegroup"
            icon="open_in_new"
            label="Links de interés"
            header-class="text-h6 text-secondary"
            dense
          >
            <q-inner-loading
              v-if="loading_link"
              :showing="loading_link"
              label="Cargando links..."
              label-class="text-secondary"
              label-style="font-size: 1.1em"
            />
            <div v-else>
              <q-card
                v-if="links.length === 0"
                class="bg-teal-1 q-pa-sm q-mb-sm q-mx-sm"
                style="border-radius: 10px"
              >
                <div class="text-center text-secondary">
                  No hay links disponibles.
                </div>
              </q-card>
              <q-card
                v-for="(link, index) in links.slice(1)"
                :key="index"
                class="bg-teal-1 q-mb-sm q-mx-sm"
                style="border-radius: 10px"
              >
                <q-card-section>
                  <div class="text-secondary text-body1 text-weight-bold">
                    {{ link.titulo }}
                  </div>
                  <div class="text-secondary text-caption text-weight-bold">
                    {{ link.descripcion }}
                  </div>
                  <q-card-actions>
                    <q-btn
                      :href="link.url"
                      no-caps
                      flat
                      target="_blank"
                      outline
                      rounded
                      color="primary"
                      style="width: 250px"
                    >
                      <div class="row items-center no-wrap">
                        <div class="text-center text-body1">
                          {{ link.url }}
                        </div>
                      </div>
                    </q-btn>
                  </q-card-actions>
                </q-card-section>
              </q-card>
            </div>
          </q-expansion-item>

          <q-separator inset />
          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" class="text-primary" />
            </q-item-section>
            <q-item-section class="text-h6 text-primary">
              Salir
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-inner-loading
          :showing="loading_medico_app"
          label="Cargando datos..."
          label-class="text-primary"
          label-style="font-size: 1.1em"
        />
      <!-- Datos del médico con inner-loading mientras se carga -->
      <q-card-section align="center" class="q-pt-xl q-mt-md">
        
        <q-avatar size="150px" v-if="!loading_medico_app && userProfile.picture">
          <img :src="userProfile.picture" />
        </q-avatar>
        <q-avatar size="150px" v-else-if="!loading_medico_app">
          <q-icon color="white" text-color="white" name="person" />
        </q-avatar>

        <div class="text-h5 text-white text-weight-bold" v-if="!loading_medico_app">
          {{ medico_app.user.first_name }} {{ medico_app.user.last_name }}
        </div>
        <div class="text-subtitle1 text-white" v-if="!loading_medico_app">
          {{ medico_app.user.email }}
        </div>
      </q-card-section>
     
      <q-separator inset class="bg-white" />
      <q-card-section align="left" v-if="!loading_medico_app">
        <div class="text-h5 text-white text-bold">ICM:</div>
        <div class="text-subtitle1 text-white">{{ medico_app.icm }}</div>
        <div class="text-h5 text-white text-bold">Estado afiliación:</div>
        <div class="text-subtitle1 text-white">
          {{ medico_app.afiliaciones[0].estado_pago }}
        </div>
        <div class="text-h5 text-white text-bold">Tipo de cuota:</div>
        <div class="text-subtitle1 text-white">
          {{ medico_app.afiliaciones[0].tipo_cuota }}
        </div>
      </q-card-section>
      <q-card-actions align="center" v-if="!loading_medico_app">
        <q-btn
          no-caps
          rounded
          class="bg-red-7 text-white"
          size="18px"
          align="around"
          @click="goTo('detalle-afiliacion')"
          
        >
          <div class="text-center text-weight-medium q-mx-xl">
            Detalle Afiliación
          </div>
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-card flat class="q-mt-sm q-mx-xs bg-light-blue-11">
      <q-card-actions align="around">
        <q-btn
          icon="handshake"
          label="Convenios"
          no-caps
          size="20px"
          stack
          color="pink-8"
          padding="xl xs"
          rounded
          @click="goTo('convenios-app')"
          
        />
        <q-btn
          icon="person_search"
          label="Afiliación"
          no-caps
          size="20px"
          padding="xl xs"
          stack
          rounded
          color="green-14"
          @click="goTo('afiliacion-app')"
          
        />
        <q-btn
          icon="qr_code_2"
          label="Credencial"
          no-caps
          size="20px"
          padding="xl xs"
          stack
          rounded
          color="blue-9"
          @click="goTo('credencial')"
          
        />
      </q-card-actions>
    </q-card>

    <q-separator inset color="red-14" size="2px" />

    <q-card flat class="q-mt-sm bg-light-blue-11">
      <q-card-actions align="around">
        <q-btn
          size="xl"
          dense
          no-caps
          color="amber-14"
          rounded
          align="around"
          @click="goTo('noticias-app')"
          
        >
          <div class="row q-mx-sm">
            <q-icon left name="newspaper" size="md" class="q-pt-xs" />
            <div class="text-center text-weight-regular">Noticias</div>
          </div>
        </q-btn>
        <q-btn
          dense
          size="xl"
          no-caps
          rounded
          color="orange-14"
          align="around"
          @click="goTo('eventos-app')"
          
        >
          <div class="row q-mx-sm">
            <q-icon left name="event" size="md" class="q-pt-xs" />
            <div class="text-center text-weight-regular">Eventos</div>
          </div>
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-footer bordered class="bg-blue-10 text-primary">
      <div class="text-white text-center text-caption">
        2024 - COLMED AYSÉN V1.1
      </div>
    </q-footer>

    <q-dialog v-model="mensajeNotificaciones">
      <q-card class="bg-red-1" style="border-radius:20px">
        <q-card-section>
          <div class="text-h6 text-red-9 text-center text-weight-bold">
            Activa las notificaciones de la App
          </div>
          <div class="text-body1 text-red-9 text-center">
            Y mantente al tanto de los Eventos del Colegio Médico Aysén
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn style="width: 40%;" no-caps rounded color="primary" @click="mensajeEntregado">
            <div class="text-white text-center text-subtitle1">
              Ok
            </div>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Contenido principal -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMedicoStore } from "src/stores/medicos";
import { useUserStore } from "src/stores/authStore";
import { useLinksInteresStore } from "src/stores/interes";
import { useContactoStore } from "src/stores/contactoInteres";
import { Network } from "@capacitor/network";

const drawer = ref(false);
const router = useRouter();
const medicoStore = useMedicoStore();
const userStore = useUserStore();
const linksStore = useLinksInteresStore();
const contactosStore = useContactoStore();

const medico_app = computed(() => medicoStore.medico_app || null);
const loading_medico_app = computed(() => medicoStore.loading_medico_app || false);
//const loading_medico_app = computed(() => true);
const userProfile = computed(() => userStore.user);
const mensajeNotificaciones = ref(computed(() => userStore.mensaje_firebase));

const links = computed(() => linksStore.links_interes || []);
const loading_link = computed(() => linksStore.loading || false);
//const loading_link = computed(() => true);

//const contactos = computed(() =>  []);
const contactos = computed(() => contactosStore.contactos_privados || []);
const loading_contactos = computed(() => contactosStore.loading_privados || false);
//const loading_contactos = computed(() => true);

// Variable reactiva para el estado de la conexión a internet
const isOnline = ref(true);

function goTo(path) {
  if(isOnline.value){
    drawer.value = false;
    router.push(`/colmed/${path}`);
  }  
}

const logout = async () => {
  await userStore.logoutMobile();
  router.replace("/");
};

const mensajeEntregado = () => {
  userStore.mensajeNotificacionFirebaseEntregado();
};

onMounted(async () => {
   // Verificar el estado de la conexión a internet
  const status = await Network.getStatus();
  isOnline.value = status.connected;
  
  // Suscribirse a cambios en el estado de la red
  Network.addListener("networkStatusChange", (status) => {
    isOnline.value = status.connected;
  });



  let usuarioVisitante = userStore.profiles.filter(
    (usuario) => usuario.tipo_perfil == "visitante"
  );

  if (usuarioVisitante[0] && usuarioVisitante[0].tipo_perfil === "visitante") {
    await medicoStore.fetchMedicoApp(userStore.user.id);
  }
  
  await linksStore.fetchLinksInteres();
  await contactosStore.fetchContactosPrivados();
});
</script>

<style lang="scss">
/* Estilos propios para la versión móvil (fuentes más grandes, colores distintos, etc.) */
</style>
