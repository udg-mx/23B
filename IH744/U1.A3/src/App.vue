<template>
    <!-- Componente Header -->
    <HeaderComponent />

    <!-- Contenido principal (Vue Router inyectará los componentes de la ruta aquí) -->
    <main class="container mx-auto mt-10 p-5">
      <router-view />
    </main>


    <!-- Componente Footer -->
    <FooterComponent />

</template>

<script>
// Importa tus componentes
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
/* Estilos globales para la aplicación si los necesitas */
</style>