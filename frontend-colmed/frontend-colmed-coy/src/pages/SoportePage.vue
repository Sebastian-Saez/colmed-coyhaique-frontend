<template>
    <q-layout view="lHh Lpr lFf" class="bg-page">
    <!-- Header -->
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn flat @click="goHome">
                    <img
                        src="~assets/CR-Region-de-Aysen_horizontal_white.png"
                        alt="Colegio Médico Logo"
                        style="width: 204px; height: 82px"
                    />
                </q-btn>
            </q-toolbar>
        </q-header>
        <q-inner-loading
            v-if="loading_contactos"
            :showing="loading_contactos"        
            label-class="text-secondary"
            label-style="font-size: 1.1em"
        />
        <div 
            v-else
            class="q-pa-sm fixed-center"
        >
            <q-card
                class="q-pa-sm bg-grey-1"
                style="border-radius: 20px; width: 400px; height: 350px"
            >
                <q-card-section>
                    <div
                        class="text-h5 text-weight-bold text-center text-primary q-pt-xl q-pb-md"
                    >
                        Soporte ColmedAysén App
                    </div>
                    <q-separator color="primary"/>
                    <div class="text-subtitle-1 text-primary text-center q-pt-md">
                        Si tienes dudas o problemas, escríbenos a:
                    </div>
                </q-card-section>
                <q-card-actions align="around">
                    <q-btn
                        :label="contactoSoporte.email"
                        no-caps
                        outline
                        rounded
                        icon="mail"
                        :href="'mailto:'+contactoSoporte.email+'?subject=Soporte Colmed Aysén'"
                    />
                </q-card-actions>
                <q-separator spaced inset />
            </q-card>
        </div>

    <!-- Footer -->
        <q-footer class="bg-primary text-white q-pa-md">
            <div class="text-center">
                <div class="text-weight-light text-center">
                    ©2025 Colegio Médico Aysén - Colegio Médico de Chile
                </div>
            </div>
        </q-footer>    
    </q-layout>
</template>

<script setup>
    import { onMounted, computed } from "vue";
    import { useRouter } from "vue-router";
    import { useContactoStore } from "src/stores/contactoInteres";

    const contactoStore = useContactoStore();    
    const router = useRouter();

    const contactoSoporte = computed (() => contactoStore.contacto_soporte || {});
    const loading_contactos = computed (() => contactoStore.loading || false);


    onMounted(async () => {
        await contactoStore.fetchContactoSoporte();
    });

    const goHome = () => {
    router.push("/home");
    };
</script>
<style lang="sass" scoped>
.btn-fixed-width
  width: 200px
</style>
