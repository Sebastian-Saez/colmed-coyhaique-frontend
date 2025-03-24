<template>
  <q-page class="q-pa-md bg-cyan-1">
    <q-inner-loading :showing="loadingMedico"  spinner-color="red-14" spinner-size="50px" />
    <div v-if="!loadingMedico">
      <q-card flat class="bg-cyan-1">
        <q-card-section>
          <div
            class="text-h3 text-primary text-center text-weight-bolder"
            style="letter-spacing: 10px"
          >
            Mis datos
          </div>
          <q-separator inset />
          <q-card
              v-if="!medico_app?.user"
              class="bg-blue-2 q-mx-sm q-mt-sm"
              style="border-radius: 20px;"
            >
              <div class="text-center q-pa-sm text-primary text-weight-light
                ">No hay información disponible.</div>
            </q-card>
        </q-card-section>
        <q-card-section
          class="text-white bg-red-7 text-center"
          style="border-radius: 20px 20px 0px 0px"
          v-if="medico_app?.user"
        >
          <div class="text-h4 text-weight-bold">
            {{ medico_app.user.first_name }} {{ medico_app.user.last_name }}
          </div>
          <div class="text-h5 text-weight-bold">RUT: {{ medico_app.rut }}</div>
        </q-card-section>
        <q-card-section
          class="bg-red-1 text-primary"
          style="border-radius: 0px 0px 20px 20px"
          v-if="medico_app?.user"
        >
          <q-item>
            <q-item-section>
              <q-item-label class="text-semibold text-h6">
                Fecha de nacimiento:
              </q-item-label>
              <q-item-label class="text-h6 text-weight-light">{{
                formatDate(medico_app.fecha_nacimiento)
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-semibold text-h6">
                Fecha de título:
              </q-item-label>
              <q-item-label class="text-h6 text-weight-light">{{
                formatDate(medico_app.fecha_titulo)
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-semibold text-h6">
                Dirección:
              </q-item-label>
              <q-item-label class="text-h6 text-weight-light">{{
                medico_app.direccion
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-semibold text-h6"> Comuna: </q-item-label>
              <q-item-label class="text-h6 text-weight-light">{{
                medico_app.comuna
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-semibold text-h6">
                Correo electrónico:
              </q-item-label>
              <q-item-label class="text-h6 text-weight-light">{{
                medico_app.user.email
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-semibold text-h6">
                Teléfono:
              </q-item-label>
              <q-item-label class="text-h6 text-weight-light">{{
                medico_app.contacto
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-card-actions align="center">
            <q-btn
              no-caps
              rounded
              style="width: 200px"
              color="primary"
              @click="$router.back()"
            >
              <div class="text-body1">Volver</div></q-btn
            >
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>
    
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useInformacionesStore } from "src/stores/informaciones";
import { useMedicoStore } from "src/stores/medicos";
import { useUserStore } from "src/stores/authStore";

import dayjs from "dayjs";

const userAuthStore = useUserStore();
const medicoStore = useMedicoStore();
const medico_app = computed(() => medicoStore.medico_app || null);
//const medico_app = computed(() =>  null);

// Estado de carga: inicialmente true, hasta que los datos estén listos.
const loadingMedico = computed(() => medicoStore.loading_medico_app || null);





const formatDate = (dateString) => {
  // Si está vacío o es "No informado", devuélvelo tal cual
  if (!dateString || dateString === "No informado") {
    return "No informado";
  }
  return dayjs(dateString).format("DD-MM-YYYY");
};


onMounted(async () => {
  let usuarioVisitante = userAuthStore.profiles.filter(
      (usuario) => usuario.tipo_perfil == "visitante"
    );

  if (usuarioVisitante[0].tipo_perfil === "visitante") {
      await medicoStore.fetchMedicoApp(userAuthStore.user.id);      
  } 
});


</script>

<style scoped>
/* Estilos específicos */
.text-wrap {
  /* Permite que las palabras largas se partan en varias líneas */
  white-space: pre-wrap; /* o normal */
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
