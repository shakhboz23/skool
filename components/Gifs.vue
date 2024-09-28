<template>
  <div>
    <input
      type="text"
      v-model="query"
      @change="searchGIFs"
      placeholder="Search for GIFs..."
    />
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="gif in gifs" :key="gif.id">
        <img :src="gif.images.original.url" :alt="gif.title" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const apiKey = "AzzvXfhGI1umCCiEjCRJFR4BIfoxPf23";
const query = ref("");
const gifs = ref([]);
const loading = ref(false);
async function searchGifs() {
  loading.value = true;
  try {
    const response = await axios.get(`/search`, {
      params: {
        api_key: apiKey,
        q: query.value,
        limit: 10,
      },
    });
    loading.value = false;
    return response.data.data;
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    return [];
  }
}
</script>

<style>
/* Add your styles here */
</style>
