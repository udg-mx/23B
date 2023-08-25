<template>
  <article class="bg-white p-5 rounded-md shadow-md mb-5">
    <RouterLink :to="{ name: 'post', params: { id: post.id } }">
      <img :src="post.imageUrl" alt="Imagen del post" class="post-img w-full h-64 object-cover rounded-md">
    </RouterLink>
    <h2 class="text-2xl font-bold mt-5">{{ post.title }}</h2>
    <p class="text-gray-600 mt-2">{{ post.description }}</p>
    <div class="mt-4 flex justify-between items-center">
      <span class="text-gray-500">{{ post.date }}</span>
      <span class="text-gray-500">{{ post.author }}</span>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type {Post} from "@/models/Post";


export default defineComponent({
  name: 'PostListItemComponent',
  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  }
});
</script>

<style scoped>
.post-img {
  height: 500px;
}
</style>
