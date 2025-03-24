<template>
  <q-page class="q-pa-md bg-cyan-1">
    <q-card flat class="bg-cyan-1">
      <q-card-section>
        <div
          class="text-h3 text-primary text-center text-weight-bolder bg-"
          style="letter-spacing: 10px"
        >
          Credencial Mi Colmed
        </div>
        <q-separator inset />
      </q-card-section>
      <!-- <q-card-section
        class="text-white bg-blue-1 text-center q-pt-xl q-pb-xl"
        style="border-radius: 20px 20px 0px 0px"
      >
        
        <q-img :src="qrSrc" spinner-color="primary" :ratio="1" />
      </q-card-section> -->
      <q-card-section
        class="bg-light-blue-10 text-white q-mt-lg"
        style="border-radius: 20px 20px"
      >
        <!-- <div class="text-h4 text-weight-bold">Condiciones</div> -->
        <div class="text-h6 text-weight-semibold text-justify">
          Descarga la aplicación <div class="text-weight-bold text-justify">Mi Colmed</div> donde además puedes realizar pagos,
          obtener certificados, solicitar beneficios del FSG, conocer nuestros
          convenios vigentes y recibir las últimas noticias del Gremio para
          estar siempre actualizad@.
        </div>
        <q-separator spaced inset color="primary" />
        <q-card-actions align="around" class="q-mt-lg q-mb-lg">
          <q-btn
            color="deep-orange"
            push
            no-caps
            href="https://apps.apple.com/us/app/mi-colmed/id1498381926?ls=1"
            target="_blank"
          >
            <div class="row items-center no-wrap">
              <q-icon left name="fab fa-apple" />
              <div class="text-center">
                Disponible en<br />
                <div class="text-weight-semibold text-h6">App Store</div>
              </div>
            </div>
          </q-btn>
          <q-btn
            color="deep-orange"
            push
            no-caps
            href="https://play.google.com/store/apps/details?id=cl.colegiomedico.miColMed"
            target="_blank"
          >
            <div class="row items-center no-wrap">
              <q-icon left name="fab fa-google-play" />
              <div class="text-center">
                Disponible en<br />
                <div class="text-weight-semibold text-h6">Play Store</div>
              </div>
            </div>
          </q-btn>
        </q-card-actions>
        <q-separator />
        <q-card-actions align="center" class="q-mt-md">
          <q-btn
            no-caps
            rounded
            style="width: 100%"
            color="blue-14"
            @click="$router.back()"
            size="lg"
          >
            <div class="text-h6">Volver</div></q-btn
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
