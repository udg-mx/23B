<template>
  <div class="container mt-8">
    <div class="mt-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 ">Código:</h2>
      <a href="https://stackblitz.com/edit/ih744-u1-ai" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">https://stackblitz.com/edit/ih744-u1-ai</a>
    </div>


    <div class="video-container mt-4">
      <img class="video-preview" src="https://udg.s3.amazonaws.com/LDSW/IH744/U1.AI/IH744.U1.AI.cover.jpg" alt="Preview del video">
      <video id="my-video" class="video-js vjs-default-skin" controls preload="auto" width="100%" height="auto">
        <source src="https://udg.s3.amazonaws.com/LDSW/IH744/U1.AI/IH744.U1.AI.mp4" type="video/mp4">
      </video>
    </div>

  </div>

</template>

<style scoped>
body {
  background-color: #f0f4f8;
}
.container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  max-width: 1024px;
  margin: 2rem auto;
}
.video-container {
  position: relative;
  padding-top: 56.25%;
  max-width: 100%;
}
.video-preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.video-js {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.video-js .vjs-control-bar {
  font-size: 1.0rem;
}
.tab {
  display: none;
}
.tab-link {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem 0.25rem 0 0;
  background-color: #fff;
  color: #718096;
  cursor: pointer;
}
.tab-link.active {
  background-color: #edf2f7;
  color: #4a5568;
  font-weight: bold;
}
.tab-link i {
  margin-right: 0.5rem;
}
</style>
<script setup lang="ts">
</script>