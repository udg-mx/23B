<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Nuevo Post</h1>
    <AdminPostForm />
  </div>
</template>

<script>
import AdminPostForm from '@/components/AdminPostForm.vue';

export default {
  components: {
    AdminPostForm
  }
};
</script>
