<template>
  <header class="bg-blue-600 text-white p-5">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/"  class="text-2xl font-bold">Mi Logo</RouterLink>
      <nav>
        <ul class="flex space-x-5">
          <li><RouterLink to="/" class="hover:underline">Inicio</RouterLink></li>
          <li><RouterLink to="/about" class="hover:underline">Sobre Nosotros</RouterLink></li>
          <li><RouterLink to="/contact" class="hover:underline">Contacto</RouterLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
</script>