<template>
  <div class="p-4 bg-white shadow-lg rounded mx-auto max-w-xl">
    <div v-if="post">
      <AdminPostForm :currentPost="post" />
    </div>

    <div v-else class="text-center py-10">
      <p>Cargando detalles del post...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { RouteLocationNormalized, useRoute } from 'vue-router';
import { pullPost } from '@/stores/posts';
import type { Post } from '@/models/Post';
import AdminPostForm from "@/components/AdminPostForm.vue";

export default defineComponent({
  name: 'AdminPostEdit',
  components: {AdminPostForm},
  props: {
    id: String
  },
  setup(props) {
    const post = ref<Post | null>(null);
    useRoute();

    onMounted(() => {
      const postId = parseInt(props.id, 10);
      post.value = pullPost(postId) as Post;
    });

    const beforeRouteLeave = (to: RouteLocationNormalized) => {
      document.title = to.meta.title || 'UDG Demo Blog';
    };

    return {
      post,
      beforeRouteLeave
    };
  }
});
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
