<template>
  <div v-if="isOpen" class="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-4 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">

      <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
        {{ title }}
      </h3>

      <div class="mt-2">
        <p class="text-sm text-gray-500">
          {{ message }}
        </p>
      </div>

      <div class="mt-4 flex justify-end">
        <button @click="cancel" class="mr-2 px-4 py-2 bg-gray-300 text-black rounded">Cancelar</button>
        <button @click="confirm" class="px-4 py-2 bg-blue-500 text-white rounded">Confirmar</button>
      </div>

    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConfirmModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '¿Estás seguro?'
    },
    message: {
      type: String,
      default: '¿Quieres proceder con esta acción?'
    },
    context: {
      type: [String, Number, Object],
      default: null
    }
  },
  setup(props, { emit }) {
    const confirm = () => {
      emit('confirm');
    };

    const cancel = () => {
      emit('cancel', props.context);
    };

    return {
      confirm,
      cancel
    };
  }
});
</script>