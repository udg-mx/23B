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
import type { RouteLocationNormalized } from 'vue-router';
import { useRoute } from 'vue-router';
import { getPost } from '@/stores/posts';
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
      const postId = parseInt(props.id as string);
      post.value = getPost(postId) as Post;
    });

    const beforeRouteLeave = (to: RouteLocationNormalized) => {

      if (typeof to.meta.title === 'string') {
        document.title = to.meta.title;
      } else {
        document.title = 'UDG Demo Blog';
      }
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
