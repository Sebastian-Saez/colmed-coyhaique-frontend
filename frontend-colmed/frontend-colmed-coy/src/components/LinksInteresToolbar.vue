<template>
    <div class="q-pa-xs q-gutter-xl">
        <q-card
        class="q-pa-md bg-grey-2"
        :class="isLargeScreen ? 'q-ml-lg q-mr-xl' : 'q-mx-lg'"
        style="border-radius: 20px; width:1200px"
      >
        <div class="text-h4 text-bold text-primary">Todos los links de interés</div>
        <q-separator spaced />
        <q-inner-loading
          v-if="loading_link"
          :showing="loading_link"
          label="Cargando links..."
          label-class="text-secondary"
          label-style="font-size: 1.1em"
        />
        <div v-else>
          <q-splitter
            v-model="splitterModel"
            style="height: 400px"
          >
          <template #before>
            <q-tabs
              v-model="tab"
              vertical
              active-color="white"
              indicator-color="red-11"
              active-class="bg-deep-orange-13"
            >
              <q-tab
                no-caps
                :class="
                  tab === 'links_web'
                    ? 'text-white'
                    : 'bg-light-green-1 text-primary'
                "
                class="q-mb-xs q-mr-md tab-button"
                name="links_web"
                label="Links página web"
              />
              <q-tab
                no-caps
                :class="
                  tab === 'links_movil'
                    ? 'text-white'
                    : 'bg-light-green-1 text-primary'
                "
                class="q-mb-xs q-mr-md tab-button"
                name="links_movil"
                label="Links App Móvil"
              />
            </q-tabs>
          </template>
          <template #after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="slide-up"
              transition-next="slide-up"
              class="bg-grey-1"
            >

              <q-tab-panel name="links_web" class="bg-grey-2">

                <div class="row q-col-gutter-md">
                  <div
                    v-for="(link, idx) in links_publicos"
                    :key="idx"
                    class="col-12"
                  >
                    <q-card class="bg-blue-grey-1 q-my-sm" bordered>
                      <q-card-section>
                        <q-input
                          v-model="link.titulo"
                          dense
                          outlined
                          label="Nombre"
                          class="text-h6 text-primary text-weight-medium "
                        />
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          v-model="link.descripcion"
                          dense
                          outlined
                          label="Descripción"
                          hint="Descripción larga de la URL"
                          class="text-h6 text-primary text-weight-medium "
                        />
                      </q-card-section>
                      <q-separator inset />
                      <q-card-section>
                        <q-input
                          v-model="link.url"
                          dense
                          outlined
                          label="URL"
                          hint="En formato 'www.nombre-de-la-pagina.cl/com/org'"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          v-model="link.clave"
                          dense
                          outlined
                          label="Clave"
                          hint="Clave o sigla para la url"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          v-model="link.orden"
                          dense
                          outlined
                          label="Orden"
                          hint="Orden en que aparecerá en la página web"
                          mask="###"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-card-actions align="center">
                        <q-btn
                          flat
                          small
                          color="negative"
                          label="Eliminar link"
                          @click="deleteLinkPublico(link)"
                        />
                      </q-card-actions>
                    </q-card>
                  </div>
                </div>


                <q-card class="q-mt-xs" flat>
                  <q-card-actions align="around" class="bg-grey-2 q-mt-md">
                    <q-btn
                      label="Guardar cambios en 'Links de Interés'"
                      color="primary"
                      no-caps
                      rounded
                      @click="saveLinks('links_web')"
                    />
                    <q-btn
                      label="Agregar link"
                      color="primary"
                      flat
                      no-caps
                      rounded
                      @click="addLink('links_web')"
                    />
                  </q-card-actions>
                </q-card>
              </q-tab-panel>
              <q-tab-panel name="links_movil" class="bg-grey-2">

                <div class="row q-col-gutter-md">
                  <div
                    v-for="(link, idx) in links_privados"
                    :key="idx"
                    class="col-12"
                  >
                    <q-card class="bg-blue-grey-1 q-my-sm" bordered>
                      <q-card-section>
                        <q-input
                          v-model="link.titulo"
                          dense
                          outlined
                          label="Nombre"
                          class="text-h6 text-primary text-weight-medium "
                        />
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          v-model="link.descripcion"
                          dense
                          outlined
                          label="Descripción"
                          hint="Descripción larga de la URL"
                          class="text-h6 text-primary text-weight-medium "
                        />
                      </q-card-section>
                      <q-separator inset />
                      <q-card-section>
                        <q-input
                          v-model="link.url"
                          dense
                          outlined
                          label="URL"
                          hint="En formato 'www.nombre-de-la-pagina.cl/com/org'"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          v-model="link.clave"
                          dense
                          outlined
                          label="Clave"
                          hint="Clave o sigla para la url"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          v-model="link.orden"
                          dense
                          outlined
                          label="Orden"
                          hint="Orden en que aparecerá en la app"
                          mask="###"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-card-actions align="center">
                        <q-btn
                          flat
                          small
                          color="negative"
                          label="Eliminar link"
                          @click="deleteLinkPrivado(link)"
                        />
                      </q-card-actions>
                    </q-card>
                  </div>
                  
                  
                </div>
                <q-card class="q-mt-xs" flat>
                  <q-card-actions align="around" class="bg-grey-2 q-mt-md">
                    <q-btn
                      label="Guardar cambios en 'Links de Interés'"
                      color="primary"
                      no-caps
                      rounded
                      @click="saveLinks('links_movil')"
                    />
                    <q-btn
                      label="Agregar link"
                      color="primary"
                      flat
                      no-caps
                      rounded
                      @click="addLink('links_movil')"
                    />
                  </q-card-actions>
                </q-card>

                </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
        </div>
       
      </q-card>
      <q-dialog v-model="exportDataDialog" persistent backdrop-filter="blur(4px)">
        <q-card>
          <q-card-section class="items-center text-h6">
            Generando archivo ...
          </q-card-section>
  
          <q-card-section class="items-center">
            <q-spinner color="primary" size="3em" :thickness="10" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  import { useRouter } from "vue-router";
  import { useQuasar } from "quasar";
  import { useLinksInteresStore } from "src/stores/interes";
  import { useUserStore } from "src/stores/authStore";

  const router = useRouter();
  const linksStore = useLinksInteresStore();
  const userStore = useUserStore();


  const userProfile = computed(() => userStore.user);
  const links_interes = computed(() => linksStore.links_interes || []);
  const links_publicos = computed(() => linksStore.links_publicos || []);
  const links_privados = computed(() => linksStore.links_privados || []);
  const loading_link = computed(() => linksStore.loading || false);



  // Responsive tracking
  const $q = useQuasar();
  const isLargeScreen = computed(() => {
    return $q.screen.gt.md;
  });
  
  const computedLimits = computed(() => {
    return isLargeScreen.value ? [45, 45] : [50, 50];
  });
  
  const splitterModel = ref(isLargeScreen.value ? 15 : 28);
  
  const tab = ref("links_web");
  
  
  
  // Unificado modelo de datos para links
  const linksList = ref([
    { categoria: 'links_web', 
      clave: 'colmed', 
      nombre: 'Colegio Médico de Chile', 
      valor: 'https://www.colegiomedico.cl/' 
    },
    { 
      categoria: 'links_web', clave: 'falmed', nombre: 'Fundación de Asistencia Legal de Colegio Médico', valor: 'https://www.falmed.cl/' },
    { 
      categoria: 'links_web', clave: 'fsg', nombre: 'Fondo Solidaridad Gremial', valor: 'https://www.colegiomedico.cl/fsg/' },
    { 
      categoria: 'links_web', clave: 'club', nombre: 'Club Médico', valor: 'https://www.clubmedico.cl/' },

    { categoria: 'links_movil', clave: 'colmedaysen', nombre: 'Colegio Médico Aysén', valor: 'https://www.colmedaysen.cl/' },
    { categoria: 'links_movil', clave: 'colmed', nombre: 'Colegio Médico de Chile', valor: 'https://www.colegiomedico.cl/' },
    { categoria: 'links_movil', clave: 'falmed', nombre: 'Fundación de Asistencia Legal de Colegio Médico', valor: 'https://www.falmed.cl/' },
    { categoria: 'links_movil', clave: 'fsg', nombre: 'Fondo Solidaridad Gremial', valor: 'https://www.colegiomedico.cl/fsg/' },
    { categoria: 'links_movil', clave: 'club', nombre: 'Club Médico', valor: 'https://www.clubmedico.cl/' }
  ]);


  const filteredLinks = computed(() => ({
    web: links_interes.value.filter(l => l.categoria === 'links_web'),
    movil: links_interes.value.filter(l => l.categoria === 'links_movil')
  }));

//   const links_interes = ref({
// visible_web: [
//   {
//     clave: "colmed",
//     valor: "https://www.colegiomedico.cl/",
//     nombre: "Colegio Médico de Chile",
//   },
//   {
//     clave: "falmed",
//     valor: "https://www.falmed.cl/",
//     nombre: "Fundación de Asistencia Legal de Colegio Médico",
//   },
//   {
//     clave: "fsg",
//     valor: "https://www.colegiomedico.cl/fsg/",
//     nombre: "Fondo Solidaridad Gremial",
//   },
//   {
//     clave: "club",
//     valor: "https://www.clubmedico.cl/",
//     nombre: "Club Médico",
//   }],
//  visible_movil: [
//     {
//     clave: "colmedaysen",
//     valor: "https://www.colmedaysen.cl/",
//     nombre: "Colegio Médico Aysén",
//   },
//     {
//     clave: "colmed",
//     valor: "https://www.colegiomedico.cl/",
//     nombre: "Colegio Médico de Chile",
//   },
//   {
//     clave: "falmed",
//     valor: "https://www.falmed.cl/",
//     nombre: "Fundación de Asistencia Legal de Colegio Médico",
//   },
//   {
//     clave: "fsg",
//     valor: "https://www.colegiomedico.cl/fsg/",
//     nombre: "Fondo Solidaridad Gremial",
//   },
//   {
//     clave: "club",
//     valor: "https://www.clubmedico.cl/",
//     nombre: "Club Médico",
//   }
//  ]
// });

  const saveLinks = async (categoria) => {    
    // await linksStore.saveLinksInteres(links_interes.value);
    await linksStore.saveLinksInteres(links_publicos.value.concat(links_privados.value));
  };

  const addLink = (categoria) => {

    const nuevoLink = {
      categoria, 
      clave: '', 
      nombre: '', 
      valor: ''
    }

    categoria == "links_web" ? links_publicos.value.push(nuevoLink) : links_privados.value.push(nuevoLink)
  };

  const deleteLinkPublico = (link) => {
    const i = links_publicos.value.indexOf(link);
    if (i > -1) links_publicos.value.splice(i, 1);
  };

  const deleteLinkPrivado = (link) => {
    const i = links_privados.value.indexOf(link);
    if (i > -1) links_privados.value.splice(i, 1);
  };


  // Variables para el diálogo de detalles
  const exportDataDialog = ref(false);
  
  dayjs.extend(customParseFormat);
  

  onMounted(async () => {
   // Verificar el estado de la conexión a internet
    if (!userProfile.value) {
      console.warn("Usuario no autenticado. Redirigiendo a login...");
      router.push("/login");
    }

    await linksStore.fetchLinksInteres();
    await linksStore.fetchLinksInteresPublicos();
    await linksStore.fetchLinksInteresPrivados();
    // await contactosStore.fetchContactosPrivados();
  });

  </script>
  <style lang="sass">

  </style>
  