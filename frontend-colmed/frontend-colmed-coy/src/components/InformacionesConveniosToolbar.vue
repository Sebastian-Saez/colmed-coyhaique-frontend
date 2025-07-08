<template>
    <div class="">
      <q-card
        class="q-pa-md bg-grey-2"
        :class="isLargeScreen ? 'q-ml-lg q-mr-xl' : 'q-mx-lg'"
        style="border-radius: 20px; width: 1250px"
      >
        <div class="text-h4 text-bold text-primary">Todos los convenios</div>
        <q-separator spaced />
        <q-inner-loading
          v-if="loading_convenios"
          :showing="loading_convenios"
          label="Cargando Convenios..."
          label-class="text-secondary"
          label-style="font-size: 1.1em"
        />
        <div v-else>
          <q-form ref="formRef">
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
                name="regionales"
                label="Convenios regionales"
                :disable="linkError && tab === 'nacionales'"
                no-caps
                :class="
                  tab === 'regionales'
                    ? 'text-white'
                    : 'bg-deep-orange-1 text-primary'
                "
                class="q-mb-xs q-mr-md tab-button"
              />
              <q-tab
                name="nacionales"
                label="Convenios nacionales"
                no-caps
                :class="
                  tab === 'nacionales'
                    ? 'text-white'
                    : 'bg-deep-orange-1 text-primary'
                "
                class="q-mb-xs q-mr-md tab-button"
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
              <q-tab-panel name="nacionales" class="bg-grey-2">
                <div class="row q-col-gutter-xl">
                  <div
                    v-for="(convenio, index) in nuevosConvenios.nacionales"
                    :key="index"
                    class="col-12 col-md-4"
                  >
                    <q-card
                      class="bg-blue-grey-1 q-my-sm"
                      style="border-radius: 20px; height: 90%"
                      bordered
                    >
                      <!-- Editable Título -->
                      <q-card-section>
                        <q-input
                          v-model="convenio.titulo"
                          dense
                          outlined
                          label="Título"
                          class="text-h5 text-primary text-weight-medium"
                        />
                      </q-card-section>

                      <q-separator inset />


                      <q-separator inset />

                      <!-- Editable Enlace -->
                      <q-card-section>
                        <q-input
                          v-model="convenio.ref"
                          dense
                          outlined
                          label="Enlace"
                          class="text-body2 text-secondary"
                        />
                      </q-card-section>

                      <!-- Acciones: Eliminar convenio -->
                      <q-card-actions align="center">
                        <q-btn
                          flat
                          small
                          color="negative"
                          label="Eliminar convenio"
                          @click="deleteConvenio(convenio)"
                        />
                      </q-card-actions>

                    </q-card>
                    
                  </div>                  
                </div>
                <q-card class="bg-grey-2 q-mt-lg" flat>
                    <q-card-actions align="center" class="bg-grey-2">
                        <q-btn
                          label="Agregar nuevo Convenio Nacional"
                          color="primary"
                          flat
                          no-caps
                          rounded
                          @click="addConvenio('nacionales')"
                        />
                    </q-card-actions>
                  </q-card>
                <q-separator class="q-mt-md" />
                <q-card class="q-mt-md bg-grey-2" flat>
                  <q-input 
                      v-model="convenios.todos_convenios_link" 
                      outlined 
                      color="deep-orange-9" 
                      dense rounded 
                      bottom-slots 
                      bg-color="orange-1"
                      class="bg-grey-2 q-mx-xl q-pl-xl q-pr-xl"
                      :rules="[djangoUrlRule]"
                      hint="Formato http:// o https:// + nombre_de_pagina + .cl/.com/.org u otro"
                      filled
                      :error="linkError"
                      error-message="Ingrese una URL válida."
                      label="Link a todos los convenios nacionales">
                    
                      <template #append>
                        <q-btn 
                          round 
                          dense 
                          flat 
                          target="_blank" 
                          icon="open_in_new" 
                          :href="convenios.todos_convenios_link"
                          @click.stop                          
                        />
                      </template>
                  </q-input>
                  <q-card-actions align="center" class="bg-grey-2 q-mt-xs">
                    <q-btn
                      label="Guardar cambios en 'Convenios'"
                      color="primary"
                      no-caps
                      rounded
                      :disable="linkError"
                      @click="saveConvenios('nacional')"
                    />             
                  </q-card-actions>
                </q-card>
              </q-tab-panel>

              <q-tab-panel name="regionales" class="bg-grey-2">
                <div class="row q-col-gutter-md">

                  <div
                    v-for="(convenio, index) in nuevosConvenios.regionales"
                    :key="index"
                    class="col-12 col-md-4"
                  >
                    <q-card
                      class="bg-blue-grey-1 q-my-sm"
                      style="border-radius: 20px; height: 100%"
                      bordered
                    >
                      <q-card-section>
                        <q-input
                          v-model="convenio.titulo"
                          dense
                          outlined
                          label="Título"
                          class="text-h5 text-primary text-weight-medium"
                        />
                      </q-card-section>
                      
                      <q-separator inset />
                    
                      <!-- Editable Descripción -->
                      <q-card-section>
                        <q-input
                          v-model="convenio.descripcion"
                          type="textarea"
                          dense
                          outlined
                          label="Descripción"
                          autogrow
                          class="text-body2 text-secondary text-weight-medium"
                        />
                      </q-card-section>
                    
                      <!-- Acciones: Eliminar convenio -->
                      <q-card-actions align="center">
                        <q-btn
                          flat
                          small
                          color="negative"
                          label="Eliminar convenio"
                          @click="deleteConvenio(convenio)"
                        />
                      </q-card-actions>
                    </q-card>
                  </div>

                </div>
                <q-card class="q-mt-xl" flat>
                  <q-card-actions align="around" class="bg-grey-2 q-mt-md">
                    <q-btn
                      label="Guardar cambios en 'Convenios'"
                      color="primary"
                      no-caps
                      rounded
                      :disable="linkError"
                      @click="saveConvenios('regional')"
                    />

                    <q-btn
                      label="Agregar nuevo Convenio Regional"
                      color="primary"
                      flat
                      no-caps
                      rounded
                      @click="addConvenio('regionales')"
                    />
                  </q-card-actions> 
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
        </q-form>
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
  import { useQuasar } from "quasar";
  import { useConveniosStore } from "src/stores/convenios";
  import { useUserStore } from "src/stores/authStore";


  const conveniosStore = useConveniosStore();
  const userStore = useUserStore();


  const userProfile = computed(() => userStore.user);
  const convenios = computed(() => conveniosStore.convenios || {});
  const loading_convenios = computed(() => conveniosStore.loading || false);
  const formRef = ref(null);

  // Responsive tracking
  const $q = useQuasar();
  const isLargeScreen = computed(() => {
    return $q.screen.gt.md;
  });

  const computedLimits = computed(() => {
    return isLargeScreen.value ? [15, 30] : [28, 28];
  });
  const splitterModel = ref(isLargeScreen.value ? 25 : 58);
  const categoriaSomos = computed(() => somosStore.pagina_quienes_somos);

  // const tab = ref(categoriaSomos.value || "mision");
  // const tab = computed(() => categoriaSomos.value || "mision");
  const tab = ref("regionales");

  /* 1️⃣  — Django’s URLValidator pattern, flattened for JS.
   (Exact copy from Django 5.2 source, flags = i) */
  const djangoUrlRe = new RegExp(
    '^https?:\\/\\/' +                         // http:// or https://
    '(?:' +
    '(?:[\\w\\-]+\\.)+[A-Za-z]{2,63}\\.?|' + // domain…
    'localhost|' +                           // localhost…
    '\\d{1,3}(?:\\.\\d{1,3}){3}' +           // …or IPv4
    ')' +
    '(?::\\d+)?' +                             // optional port
    '(?:[/?#][^\\s]*)?$',                      // path / query / fragment
    'i'
  );  

  const djangoUrlRule = (val) =>  val === '' || djangoUrlRe.test(val) || false

  

  const nuevosConvenios = computed(() => ({
    regionales: convenios.value.regionales,
    nacionales: convenios.value.nacionales
  }));

const linkError = computed(() => {
  const val = convenios.value.todos_convenios_link || ''
  return val !== '' && !djangoUrlRe.test(val)
})

  async function saveConvenios(tipo) {
    
    const ok = formRef.value?.validate()

    if (!ok) {
      // 2️⃣ Evita envío y centra al usuario en la pestaña con error
      if (tab.value !== 'nacionales') tab.value = 'nacionales'
        $q.notify({ type: 'negative', message: 'Corrige el enlace antes de guardar' })
      return
    }
    
    await conveniosStore.saveConvenios(convenios.value);    
  };
  // Variables para el diálogo de detalles
  const exportDataDialog = ref(false);
  
  // Agregar nuevo convenio
  const addConvenio = (tipo) => {
    tipo == 'nacionales' ?  convenios.value.nacionales.push({ tipo: 'nacional', titulo: '', descripcion: '', link: '' }) :
                            convenios.value.regionales.push({ tipo: 'regional', titulo: '', descripcion: '', link: '' });
  };  
  
  // Eliminar convenio existente
  const deleteConvenio = (convenio) => {
    const isNacional = convenio.tipo === 'nacional'
    const key = isNacional ? 'nacionales' : 'regionales'

    const match = isNacional
      ? c => c.titulo === convenio.titulo && c.ref === convenio.ref
      : c => c.titulo === convenio.titulo && c.descripcion === convenio.descripcion

    convenios.value[key] = convenios.value[key].filter(c => !match(c))
  };

  dayjs.extend(customParseFormat);

  onMounted(async () => {
   // Verificar el estado de la conexión a internet
    if (!userProfile.value) {
      console.warn("Usuario no autenticado. Redirigiendo a login...");
      router.push("/login");
    }

    await conveniosStore.fetchConvenios();
    // await contactosStore.fetchContactosPrivados();
  });
  
  </script>
  <style lang="sass">

  </style>
  