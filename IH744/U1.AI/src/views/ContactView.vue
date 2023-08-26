<template>
  <div class="max-w-xl mx-auto bg-white p-8 shadow-md rounded-md">
    <h1 class="text-2xl font-bold mb-6">Contáctanos</h1>

    <form>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="name">Nombre:</label>
        <input class="w-full px-3 py-2 border rounded" type="text" id="name" placeholder="Tu nombre">
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="email">Email:</label>
        <input class="w-full px-3 py-2 border rounded" type="email" id="email" placeholder="tu@email.com">
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="message">Mensaje:</label>
        <textarea class="w-full px-3 py-2 border rounded" id="message" placeholder="Tu mensaje" rows="4"></textarea>
      </div>

      <button class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Enviar</button>
    </form>
  </div>
</template>