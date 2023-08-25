<template>
  <div>
    <form @submit.prevent="submitForm" class="max-w-lg mx-auto">
      <div class="mb-4">
        <label for="title" class="block font-medium text-gray-700">Título</label>
        <input v-model="post.title" type="text" id="title" class="mt-1 p-2 w-full border rounded" />
      </div>
      <div class="mb-4">
        <label for="body" class="block font-medium text-gray-700">Descripción</label>
        <textarea v-model="post.description" id="body" class="mt-1 p-2 w-full border rounded" rows="3"></textarea>
      </div>
      <div class="mb-4">
        <label for="body" class="block font-medium text-gray-700">Contenido</label>
        <textarea v-model="post.body" id="body" class="mt-1 p-2 w-full border rounded" rows="12"></textarea>
      </div>

      <div class="mb-4">
        <label for="title" class="block font-medium text-gray-700">Autor</label>
        <input v-model="post.author" type="text" id="title" class="mt-1 p-2 w-full border rounded" />
      </div>
      <div class="flex justify-end">
        <button type="button" @click="cancel" class="mr-2 px-4 py-2 bg-gray-300 text-black rounded">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">{{ currentPost ? 'Guardar' : 'Agregar' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { updatePost, addPost } from '@/stores/posts';
import type { Post } from '@/models/Post';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';



const { currentPost } = defineProps({
  currentPost: Object
});

const post = ref(currentPost || {
  id: 0,
  title: '',
  imageUrl: '',
  description: '',
  body: '',
  date: '',
  author: ''
} as Post);
const router = useRouter();

const submitForm = async () => {
  if (post.value.imageUrl === '') {
    await fetchImageUrl();
  }

  post.value.date = format(new Date(), 'd ' + 'MMMM, yyyy', { locale: es });

  if (currentPost) {
    updatePost(post.value);
  } else {
    addPost(post.value);
  }

  router.push('/admin/posts');
};

const cancel = () => {
  router.push('/admin/posts');
};

const fetchImageUrl = async () => {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    post.value.imageUrl = data.message;
  } catch (error) {
    console.error('Error fetching image:', error);
  }
};
</script>
