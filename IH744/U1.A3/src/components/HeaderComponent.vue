<!-- src/components/HeaderComponent.vue -->

<template>
  <header class="bg-blue-600 text-white p-5">
    <div class="container mx-auto flex justify-between items-center">
      <a href="#" class="text-2xl font-bold">Mi Logo</a>
      <nav>
        <ul class="flex space-x-5">
          <li><router-link to="/" class="hover:underline">Inicio</router-link></li>
          <li><router-link to="/about" class="hover:underline">Sobre Nosotros</router-link></li>
          <li><router-link to="/contact" class="hover:underline">Contacto</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
/* Estilos específicos para el HeaderComponent si es necesario */
</style>
