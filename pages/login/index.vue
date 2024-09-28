<template>
  <main
    class="flex items-center justify-center overflow-hidden overflow-y-auto min-h-screen max-h-screen"
  >
    <NuxtLoadingIndicator height="4" color="#2a85ff" />
    <Login class="max-w-sm" />
  </main>
</template>

<script setup>
definePageMeta({
  layout: false,
});
</script>

<style lang="scss" scoped></style>
