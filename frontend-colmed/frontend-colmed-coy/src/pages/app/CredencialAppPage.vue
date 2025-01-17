<template>
  <q-page class="q-pa-md bg-cyan-1">
    <q-card flat class="bg-cyan-1">
      <q-card-section>
        <div
          class="text-h3 text-primary text-center text-weight-bolder bg-"
          style="letter-spacing: 10px"
        >
          Credencial
        </div>
        <q-separator inset />
      </q-card-section>
      <q-card-section
        class="text-white bg-blue-1 text-center q-pt-xl q-pb-xl"
        style="border-radius: 20px 20px 0px 0px"
      >
        <!--AQUI DEBE IR UN CODIGO QR-->
        <q-img :src="qrSrc" spinner-color="primary" :ratio="1" />
      </q-card-section>
      <q-card-section
        class="bg-blue-14 text-white"
        style="border-radius: 0px 0px 20px 20px"
      >
        <div class="text-h4 text-weight-bold">Condiciones</div>
        <div class="text-body1 text-weight-semibold">
          Texto descriptivo con las condiciones de uso
        </div>
        <q-separator spaced inset />
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
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";

// Lógica, composables, etc.
const router = useRouter();
// Controla el slide activo en el carousel
const qrSrc =
  "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=HelloWorld";

function goMisDatos() {
  router.push("/colmed/detalle-afiliacion");
}
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
