<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="custom-header">
      <!-- <q-toolbar>
        <q-toolbar-title> Colegio Médico Coyhaique </q-toolbar-title>

        <div>quasareto??? v{{ $q.version }}</div>
      </q-toolbar> -->
    </q-header>

    <q-toolbar>
      <q-toolbar-title> Colegio Médico Coyhaique </q-toolbar-title>

      <div>quasareto??? v{{ $q.version }}</div>
    </q-toolbar>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "HomeLayout",
});

const leftDrawerOpen = ref(false);
</script>
