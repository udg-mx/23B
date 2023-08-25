<template>
  <div>
    <table class="min-w-full bg-white">
      <thead>
      <tr>
        <th class="w-16 py-2 px-4 border-b">ID</th>
        <th class="w-20 py-2 px-4 border-b">Thumbnail</th>
        <th class="py-2 px-4 border-b">Nombre</th>
        <th class="w-40 py-2 px-4 border-b">Acciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td class="py-2 px-4 border-b">{{ post.id }}</td>
        <td class="py-2 px-4 border-b">
          <RouterLink :to="{ name: 'post', params: { id: post.id } }">
            <img :src="post.imageUrl" alt="Thumbnail" class="h-16 w-16 object-cover">
          </RouterLink>
        </td>
        <td class="py-2 px-4 border-b">{{ post.title }}</td>
        <td class="py-2 px-4 border-b flex space-x-4 justify-end items-center py-6">

          <button class="bg-red-500 text-white p-2 rounded flex items-center justify-center" @click="() => handleRemove(post.id)">
            <font-awesome-icon icon="trash" class="w-4 h-4"/>
          </button >

          <RouterLink :to="{ name: 'adminPostsEdit', params: { id: post.id } }"  class="bg-blue-500 text-white p-2 rounded flex items-center justify-center">
            <font-awesome-icon icon="edit" class="w-4 h-4"/>
          </RouterLink>

        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <ConfirmModal :isOpen="isModalOpen" @confirm="handleConfirm" @cancel="handleCancel" :context="currentContext" />
</template>



<script lang="ts">
import { defineComponent, ref } from 'vue';
import {getPosts} from "@/stores/posts";
import {deletePost} from "@/stores/posts";
import ConfirmModal from "@/components/ConfirmModal.vue";


export default defineComponent({
  components: {
    ConfirmModal
  },
  name: 'AdminPostsComponent',
  setup() {
    const posts = ref(getPosts());

    const isModalOpen = ref(false);
    const currentContext = ref(null);

    const handleRemove = (postId: string) => {
      currentContext.value = postId;
      isModalOpen.value = true;
    };
    const openModal = (context: any) => {
      currentContext.value = context;
      isModalOpen.value = true;
    };

    const handleConfirm = () => {
      deletePost(currentContext.value);
      location.reload();
      isModalOpen.value = false;
    };

    const handleCancel = (context: any) => {
      isModalOpen.value = false;
    };


    return {
      posts,
      isModalOpen,
      openModal,
      handleConfirm,
      handleCancel,
      handleRemove

    };
  }
});
</script>