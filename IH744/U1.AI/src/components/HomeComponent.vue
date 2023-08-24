<!-- src/views/HomeComponent.vue -->

<template>
  <div>
    <PostListComponent v-if="posts.length" :posts="posts" />
    <div v-else class="text-center py-10">
      <p>No hay posts disponibles en este momento.</p>
    </div>
  </div>
</template>

<script>
import postData from '@/assets/data.json'; // Asegúrate de que la ruta es correcta.
import PostListComponent from '@/components/PostListComponent.vue';
console.log(2222);

export default {
  name: 'HomeComponent',
  data() {
    return {
      posts: postData
    };
  },
  components: {
    PostListComponent
  }
}
</script>
