<template>
  <div class="q-pa-xs q-gutter-xl">
      <q-card
        class="q-pa-md bg-grey-2"
        :class="isLargeScreen ? 'q-ml-xl q-mr-xl' : 'q-mx-xs'"
        style="border-radius: 20px; width:1200px"
      >
        <div class="text-h4 text-bold text-primary">Todos los contactos de interés</div>
        <q-separator spaced />
        <q-inner-loading
          v-if="loading_contactos"
          :showing="loading_contactos"
          label="Cargando contactos..."
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
                tab === 'publico'
                ? 'text-white' : 'bg-light-green-1 text-primary'
                "
                class="q-mb-xs q-mr-md tab-button"
                name="publico"
                label="Contactos públicos"
              />
              <q-tab
                no-caps
                :class="
                  tab === 'privado'
                    ? 'text-white'
                    : 'bg-light-green-1 text-primary'
                "
                class="q-mb-xs q-mr-md tab-button"
                name="privado"
                label="Contactos privados"
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
            class="bg-grey-1 "
          >

            <q-tab-panel name="publico" class="bg-grey-2">              
                <div class="row q-col-gutter-md">
                  <div
                    v-for="(contact, idx) in filteredContacts.publico"
                    :key="contact.id || idx"
                    class="col-12"
                  >
                    <q-card class="bg-blue-grey-1 q-my-sm" bordered>
                      <q-card-section>
                        <q-input
                          v-model="contact.nombre"
                          dense
                          outlined
                          label="Nombre"
                          class="text-h6 text-primary text-weight-medium"
                        />
                      </q-card-section>
                      <q-separator inset />
                      <q-card-section>
                        <q-input
                          v-model="contact.cargo"
                          dense
                          outlined
                          label="Cargo"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-separator inset />
                      <q-card-section>
                        <q-input
                          v-model="contact.telefono"
                          dense
                          outlined
                          label="Teléfono"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-separator inset />
                      <q-card-section>
                        <q-input
                          v-model="contact.email"
                          dense
                          outlined
                          label="Email"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-separator inset />
                      <q-card-section>
                        <q-input
                          v-model="contact.direccion"
                          dense
                          outlined
                          label="Dirección"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-card-actions align="center">
                        <q-btn
                          flat
                          small
                          color="negative"
                          label="Eliminar contacto"
                          @click="deleteContact(contact)"
                        />
                      </q-card-actions>
                    </q-card>
                  </div>
                </div>
                <q-card class="q-mt-xs" flat>
                  <q-card-actions align="around" class="bg-grey-2 q-mt-md">
                    <q-btn
                      label="Guardar cambios en 'Contactos'"
                      color="primary"
                      no-caps
                      rounded
                      @click="saveContacts('publico')"
                    />
                    <q-btn
                      label="Agregar contacto"
                      color="primary"
                      flat
                      no-caps
                      rounded
                      @click="addContact('publico')"
                    />
                  </q-card-actions>
                </q-card>

              </q-tab-panel>
              <q-tab-panel name="privado" class="bg-grey-2">
                <div class="row q-col-gutter-md">
                  <div
                    v-for="(contact, idx) in filteredContacts.privado"
                    :key="contact.id || idx"
                    class="col-12"
                  >
                    <q-card class="bg-blue-grey-1 q-my-sm" bordered>
                      <q-card-section>
                        <q-input
                          v-model="contact.nombre"
                          dense
                          outlined
                          label="Nombre"
                          class="text-h6 text-primary text-weight-medium"
                        />
                      </q-card-section>
                      <q-separator inset />
                      <q-card-section>
                        <q-input
                          v-model="contact.cargo"
                          dense
                          outlined
                          label="Cargo"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-separator inset />
                      <q-card-section>
                        <q-input
                          v-model="contact.telefono"
                          dense
                          outlined
                          label="Teléfono"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-separator inset />
                      <q-card-section>
                        <q-input
                          v-model="contact.email"
                          dense
                          outlined
                          label="Email"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-separator inset />
                      <q-card-section>
                        <q-input
                          v-model="contact.direccion"
                          dense
                          outlined
                          label="Dirección"
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                      </q-card-section>
                      <q-card-actions align="center">
                        <q-btn
                          flat
                          small
                          color="negative"
                          label="Eliminar contacto"
                          @click="deleteContact(contact)"
                        />
                      </q-card-actions>
                    </q-card>
                  </div>
                </div>

                <q-card class="q-mt-xs" flat>
                  <q-card-actions align="around" class="bg-grey-2 q-mt-md">
                    <q-btn
                      label="Guardar cambios en 'Contactos'"
                      color="primary"
                      no-caps
                      rounded
                      @click="saveContacts('privado')"
                    />
                    <q-btn
                      label="Agregar contacto"
                      color="primary"
                      flat
                      no-caps
                      rounded
                      @click="addContact('privado')"
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
  import { useRouter } from "vue-router";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  import { useQuasar } from "quasar";
  import { useUserStore } from "src/stores/authStore";
  import { useContactoStore } from "src/stores/contactoInteres";

  const router = useRouter();
  const userStore = useUserStore();
  const contactoStore = useContactoStore();

  const userProfile = computed(() => userStore.user);
  const contactos_interes = computed (() => contactoStore.todos_contactos || []);
  const loading_contactos = computed (() => contactoStore.loading || false);
  
  // Responsive tracking
  const $q = useQuasar();
  const isLargeScreen = computed(() => {
  return $q.screen.gt.xl;
  });

  const computedLimits = computed(() => {
  return isLargeScreen.value ? [45, 45] : [50, 50];
  });

  const splitterModel = ref(isLargeScreen.value ? 15 : 28);

  const tab = ref("publico");

  // const contactos_interes = ref({
  // publico: [
  //   {
  //         "id": 1,
  //         "nombre": "Colmed Aysén",
  //         "cargo": "regional",
  //         "telefono": "67-2232833",
  //         "email": "reg.coyhaique@colegiomedico.cl",
  //         "privado": false
  //     }],
  // privado: [
  //   {
  //         "id": 2,
  //         "nombre": "Mónica Guerra V.",
  //         "cargo": "Encargada Administrativa - Presidencia",
  //         "telefono": null,
  //         "email": "mguerra@colegiomedico.cl",
  //         "privado": true
  //     },
  //     {
  //         "id": 3,
  //         "nombre": "Catalina Oyarzún Martinez",
  //         "cargo": "Abogada Colegio Médico Aysén",
  //         "telefono": null,
  //         "email": "coyarzun@colegiomedico.co",
  //         "privado": true
  //     }
  // ]
  // });
  
  const contactsList = ref([
    { id: 1, categoria: 'publico', nombre: 'Colmed Aysén', cargo: 'regional', telefono: '67-2232833', email: 'reg.coyhaique@colegiomedico.cl' },
    { id: 2, categoria: 'privado', nombre: 'Mónica Guerra V.', cargo: 'Encargada Administrativa - Presidencia', telefono: '', email: 'mguerra@colegiomedico.cl' },
    { id: 3, categoria: 'privado', nombre: 'Catalina Oyarzún Martinez', cargo: 'Abogada Colegio Médico Aysén', telefono: '', email: 'coyarzun@colegiomedico.co' }
  ]);

  // Variables para el diálogo de detalles
  const exportDataDialog = ref(false);

  dayjs.extend(customParseFormat);

  const filteredContacts = computed(() => ({
      publico: contactos_interes.value.filter(c => c.privado === false),
      privado: contactos_interes.value.filter(c => c.privado === true)
    }));

  



  const saveContacts = async (categoria) => {
    await contactoStore.saveContactosInteres(contactos_interes.value);
  }

  const addContact = (categoria) => {
    contactos_interes.value.push(
      {privado: categoria=='privado', nombre: '', cargo: '', telefono: '', email: '' , direccion: ''});
  }

  const deleteContact = (contact) => {
    const i = contactos_interes.value.indexOf(contact);
    if (i > -1) contactos_interes.value.splice(i, 1);
  };

  onMounted(async () => {
     // Verificar el estado de la conexión a internet
    if (!userProfile.value) {
      console.warn("Usuario no autenticado. Redirigiendo a login...");
      router.push("/login");
    }

    await contactoStore.fetchContactos();
    // await contactosStore.fetchContactosPrivados();
  });

</script>
<style lang="sass">

</style>
