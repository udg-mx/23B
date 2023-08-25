<template>
  <div class="p-4 bg-white shadow-lg rounded mx-auto max-w-xl">
    <div v-if="post">
      <img :src="post.imageUrl" alt="" class="w-full rounded-t mb-4">
      <div class="p-4">
        <h2 class="text-2xl mb-4">{{ post.title }}</h2>
        <p class="text-gray-600 mb-4">{{ post.body }}</p>
        <div class="text-gray-500 mb-2">{{ post.date }} - {{ post.author }}</div>
        <router-link to="/" class="text-blue-600">Volver a la lista de posts</router-link>
      </div>
    </div>

    <div v-else class="text-center py-10">
      <p>Cargando detalles del post...</p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from 'vue';
import {RouteLocationNormalized, useRoute} from 'vue-router';
import type {Post} from "@/models/Post";
import {pullPost} from "@/stores/posts";


export default defineComponent({
  name: 'PostDetailComponent',
  props: {
    id: String
  },
  setup(props)
  {
    const post = ref<Post | null>(null);

    useRoute();

    onMounted(() => {
      const postId = parseInt(props.id, 10);
      post.value = pullPost(postId) as Post;
      if (post.value) {
        document.title = post.value.title;
      }
    });

    watch(post, (newPost) => {
      if (newPost) {
        document.title = newPost.title;
      }
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