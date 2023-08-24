<!-- src/components/PostListComponent.vue -->

<template>
  <div class="mx-auto max-w-xl">
    <PostItemComponent v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import PostItemComponent from './PostItemComponent.vue';

export default {
  name: 'PostListComponent',
  props: {
    posts: Array
  },
  components: {
    PostItemComponent
  }
}
</script>
