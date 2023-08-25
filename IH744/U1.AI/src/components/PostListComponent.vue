<!-- src/components/PostListComponent.vue -->

<template>
  <div class="mx-auto max-w-xl">
    <PostListItemComponent v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostListItemComponent from "@/components/PostListItemComponent.vue";


export default defineComponent({
  name: 'PostListComponent',
  components: {PostListItemComponent},
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
});
</script>
