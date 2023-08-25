<script lang="ts">
import { defineComponent } from 'vue';
import postData from '@/assets/data.json';
import PostListComponent from '@/components/PostListComponent.vue';

export default defineComponent({
  name: 'HomeView',
  components: {PostListComponent},
  data() {
    return {
      posts: postData as PostData[] // Asume que tienes una interfaz PostData que define la estructura de tus posts.
    };
  }
});
</script>
<template>
  <div>
    <PostListComponent v-if="posts.length" :posts="posts" />
    <div v-else class="text-center py-10">
      <p>No hay posts disponibles en este momento.</p>
    </div>
  </div>
</template>
