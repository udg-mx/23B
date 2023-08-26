<script lang="ts">
import {defineComponent} from 'vue';
import PostListComponent from '@/components/PostListComponent.vue';
import {getPosts} from "@/stores/posts";

export default defineComponent({
  name: 'HomeView',
  components: {PostListComponent},
  data() {
    return {
      posts: getPosts()
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
