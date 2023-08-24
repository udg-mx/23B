<template>
  <div class="p-4 bg-white shadow-lg rounded mx-auto max-w-xl">
    <img :src="post.imageUrl" alt="" class="w-full rounded-t mb-4">
    <div class="p-4">
      <h2 class="text-2xl mb-4">{{ post.title }}</h2>
      <p class="text-gray-600 mb-4">{{ post.body }}</p>
      <div class="text-gray-500 mb-2">{{ post.date }} - {{ post.author }}</div>
      <router-link to="/" class="text-blue-600">Volver a la lista de posts</router-link>
    </div>
  </div>
</template>

<script>
import postData from '@/assets/data.json';

export default {
  props: ['id'],
  data() {
    return {
      post: {}
    };
  },
  mounted() {
    const postId = parseInt(this.id, 10);
    this.post = postData.find(p => p.id === postId);
    document.title = this.post.title;

  },
  beforeRouteLeave(to, from, next) {
    document.title = to.meta.title || 'UDG Demo Blog';
    next();
  },
  watch: {
    post(newPost) {
      document.title = newPost.title;
    }
  },
}
</script>

<style scoped>

</style>
