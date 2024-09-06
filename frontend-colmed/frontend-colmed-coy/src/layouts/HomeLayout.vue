<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <div class="q-pa-md flex justify-center">
      <div class="q-ma-md q-px-md" style="max-width: 1600px; width: 90%">
        <!-- Toolbar -->
        <q-card flat class="q-mb-lg q-pa-md custom-header text-primary">
          <q-toolbar>
            <q-toolbar-title>
              <img
                src="~assets/LogoCOLMEDAYSEN_blanco.png"
                alt="Colegio Médico Logo"
                style="width: 204px; height: 82px"
              />
            </q-toolbar-title>
            <q-btn flat label="Quiénes Somos" />
            <q-btn flat label="Servicios" />
            <q-btn flat label="Informaciones" />
            <q-btn flat label="Contacto" />
            <q-btn flat label="Otra opción" />
            <q-btn
              flat
              label="Mi gestión"
              color="grey-6"
              outline
              @click="irALogin"
            />
            <q-btn label="Mi Colmed" color="red" />
          </q-toolbar>
        </q-card>

        <!-- Principales Noticias (Image Carousel) -->
        <q-card class="q-mb-lg q-pa bg-page">
          <div class="q-pa-md">
            <q-carousel
              animated
              v-model="imageSlide"
              navigation
              infinite
              :autoplay="autoplay"
              arrows
              transition-prev="slide-right"
              transition-next="slide-left"
              padding
              height="300px"
              class="rounded-borders"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
            >
              <q-carousel-slide
                v-for="(noticia, index) in lista_principales_noticias"
                :key="index"
                :name="index + 1"
                class="column no-wrap"
              >
                <div
                  class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
                >
                  <div class="col-6">
                    <h3 class="text-lg text-bold text-primary">
                      {{ noticia.title }}
                    </h3>
                    <p class="text-body1 text-description mt-2">
                      {{ noticia.description }}
                    </p>
                  </div>
                  <q-img
                    class="rounded-borders col-6 full-height"
                    :src="noticia.img"
                  />
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-card>

        <!-- Noticias (News Carousel) -->
        <q-card class="q-mb-lg q-pa-md bg-white">
          <h2 class="text-2xl text-bold text-primary mb-6">Noticias</h2>
          <div class="row q-col-gutter-md">
            <div
              v-for="(noticia, index) in lista_noticias"
              :key="index"
              class="col-12 col-md-4"
            >
              <q-img :src="noticia.img" alt="Noticia" class="rounded-md" />
              <h4 class="text-red-500 mt-4 text-semibold">
                {{ noticia.title }}
              </h4>
              <p class="font-semibold text-description">
                {{ noticia.description }}
              </p>
              <q-btn
                flat
                label="Leer >"
                class="text-primary mt-2 inline-block"
              />
            </div>
          </div>
          <div class="mt-8 text-center">
            <q-btn
              label="Ver todas las noticias"
              class="bg-primary text-white px-6 py-2 rounded-full"
            />
          </div>
        </q-card>

        <!-- Próximos Eventos (Events Carousel) -->
        <q-card class="q-mb-lg q-pa-md bg-white">
          <h2 class="text-2xl text-bold text-primary mb-6">Próximos Eventos</h2>
          <div class="row q-col-gutter-md">
            <div
              v-for="(evento, index) in lista_eventos"
              :key="index"
              class="col-12 col-md-4"
            >
              <q-img :src="evento.img" alt="Evento" class="rounded-md" />
              <h4 class="text-red-500 mt-4 text-semibold">
                {{ evento.title }}
              </h4>
              <p class="font-semibold text-description">
                {{ evento.description }}
              </p>
              <q-btn
                flat
                label="Leer >"
                class="text-primary mt-2 inline-block"
              />
            </div>
          </div>
          <div class="mt-8 text-center">
            <q-btn
              label="Ir a Eventos"
              class="bg-primary text-white px-6 py-2 rounded-full"
              @click="irAEventos"
            />
          </div>
        </q-card>
      </div>
    </div>

    <!-- Footer -->
    <q-card flat class="bg-footer-secondary text-white q-pa-md">
      <!-- First part of footer (Links) -->
      <div
        class="row justify-between q-px-md q-pb-sm"
        style="max-width: 100%; margin: 0"
      >
        <div class="col">
          <h3 class="text-lg text-bold">Colegio Médico Aysén</h3>
          <ul class="q-mt-md space-y-2 text-sm">
            <li><q-btn flat label="Cómo colegiarse" class="text-white" /></li>
            <li><q-btn flat label="Quiénes somos" class="text-white" /></li>
            <li><q-btn flat label="Pago de cuotas" class="text-white" /></li>
          </ul>
        </div>
        <div class="col">
          <h3 class="text-lg text-bold">Servicios</h3>
          <ul class="q-mt-md space-y-2 text-sm">
            <li>
              <q-btn
                flat
                label="Aportes, patrocinios e instituciones"
                class="text-white"
              />
            </li>
            <li><q-btn flat label="Bolsa de trabajo" class="text-white" /></li>
            <li>
              <q-btn
                flat
                label="Fondo concursos e instituciones asociadas"
                class="text-white"
              />
            </li>
          </ul>
        </div>
        <div class="col">
          <h3 class="text-lg text-bold">Mantente informado</h3>
          <ul class="q-mt-md space-y-2 text-sm">
            <li>
              <q-btn
                flat
                label="Calendario de Actividades"
                class="text-white"
              />
            </li>
            <li><q-btn flat label="Noticias" class="text-white" /></li>
            <li><q-btn flat label="Podcast" class="text-white" /></li>
            <li><q-btn flat label="Colmed TV" class="text-white" /></li>
            <li>
              <q-btn flat label="Preguntas frecuentes" class="text-white" />
            </li>
            <li>
              <q-btn flat label="Próximas actividades" class="text-white" />
            </li>
          </ul>
        </div>
      </div>

      <!-- Second part of footer (Copyright) -->
      <div
        class="row justify-between items-center q-px-md q-pt-sm q-pb-xs bg-footer-main"
        style="max-width: 100%; margin: 0"
      >
        <div>
          <p class="text-xs">
            ©2024 Colegio Médico Aysén - Colegio Médico de Chile
          </p>
        </div>
        <div class="flex space-x-2">
          <q-btn flat round icon="fab fa-facebook-f" class="text-white" />
          <q-btn flat round icon="fab fa-twitter" class="text-white" />
          <q-btn flat round icon="fab fa-instagram" class="text-white" />
          <q-btn flat round icon="fab fa-youtube" class="text-white" />
        </div>
      </div>
    </q-card>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const imageSlide = ref(1);
const newsSlide = ref(1);
const eventsSlide = ref(1);
const autoplay = ref(true);

const lista_principales_noticias = [
  {
    title: "Noticia destacada 1",
    description: "Descripción de la noticia destacada 1.",
    img: "https://cdn.quasar.dev/img/mountains.jpg",
  },
  {
    title: "Noticia destacada 2",
    description: "Descripción de la noticia destacada 2.",
    img: "https://cdn.quasar.dev/img/parallax1.jpg",
  },
  {
    title: "Noticia destacada 3",
    description: "Descripción de la noticia destacada 3.",
    img: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
];

const lista_noticias = [
  {
    title: "Noticia 1",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    img: "https://placehold.co/300x200",
  },
  {
    title: "Noticia 3",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    img: "https://placehold.co/300x200",
  },
  {
    title: "Noticia 3",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    img: "https://placehold.co/300x200",
  },
];

const lista_eventos = [
  {
    title: "Evento 1",
    description: "Descripción del evento 1",
    img: "https://cdn.quasar.dev/img/mountains.jpg",
  },
  {
    title: "Evento 2",
    description: "Descripción del evento 2",
    img: "https://cdn.quasar.dev/img/parallax1.jpg",
  },
  {
    title: "Evento 3",
    description: "Descripción del evento 3",
    img: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
];

const router = useRouter();

const irAEventos = () => {
  router.push("/eventos");
};

const irALogin = () => {
  router.push("/login"); // Redirección a la página de login
};
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
