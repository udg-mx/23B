<template>
  <div class="p-8 container mx-auto">
    <h1 class="text-3xl font-bold mb-6">Área de Administración</h1>
    <AdminPostsComponent />

    <div class="flex justify-end mt-4">
      <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" @click="() => handleRemoveAll()">
        Reestablecer Base de Datos
        <font-awesome-icon icon="refresh" />
      </button>

      <RouterLink to="/admin/posts/new" class="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Agregar
        <font-awesome-icon icon="plus" />
      </RouterLink>
    </div>
  </div>
  <ConfirmModal :isOpen="isModalOpen" @confirm="handleConfirm" @cancel="handleCancel" :context="currentContext" title="Reestablecer Base de Datos" message="¿Deseas reestablecer la base de datos?" />

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AdminPostsComponent from '@/components/AdminPostsComponent.vue';
import {resetPosts} from '@/stores/posts';
import ConfirmModal from "@/components/ConfirmModal.vue";



export default defineComponent({
  name: 'AdminView',
  components: {
    ConfirmModal,
    AdminPostsComponent
  },
  methods: {
    resetAll() {
      resetPosts();
      location.reload();
    }
  },
  setup() {

    const isModalOpen = ref(false);

    const handleRemoveAll = () => {
      isModalOpen.value = true;
    };

    const handleConfirm = () => {
      resetPosts();
      location.reload();
      isModalOpen.value = false;
    };

    const handleCancel = () => {
      isModalOpen.value = false;
    };


    return {
      isModalOpen,
      handleRemoveAll,
      handleConfirm,
      handleCancel,

    };
  }

});
</script>

<style scoped>
/* Puedes añadir estilos específicos para esta vista si es necesario. */
</style>
