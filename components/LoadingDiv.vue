<template>
  <div class="is_loading"><slot></slot></div>
</template>

<script setup></script>

<style lang="scss" scoped>
.is_loading {
  background: #ededed;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1.5s loading_animation linear infinite;
}

@keyframes loading_animation {
  to {
    background-position-x: -200%;
  }
}
</style>