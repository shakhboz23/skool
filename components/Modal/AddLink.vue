<template>
  <!-- add Video link -->
  <el-dialog
    v-model="isLoading.modal.add_link"
    width="400"
    align-center
    class="bg-opacity-50 !rounded-lg py-7 px-6"
  >
    <form @submit.prevent="handleLink">
      <h1 class="text-2xl font-semibold mb-2">Add link</h1>
      <input
        v-model="isLoading.modal.link"
        class="text-sm"
        type="text"
        placeholder="Enter a URL"
      />
      <p
        v-if="useClassroom.local_store.is_url"
        class="leading-4 text-red-600 -mb-6 mt-2 vip"
      >
        Invalid link
      </p>
      <div class="flex justify-end gap-3 mt-7 text-sm font-semibold">
        <button
          @click="isLoading.modal.add_link = false"
          type="button"
          class="uppercase h-10 px-6 rounded-lg _ca1"
        >
          cancel
        </button>
        <button
          :class="isLoading.modal.link ? 'b_cbc _c07' : 'b_ce0 _ca1'"
          class="uppercase h-10 px-6 rounded-lg"
          v-loading="isLoading.isLoadingType('createModule')"
        >
          Link
        </button>
      </div>
    </form>
  </el-dialog>
</template>

<script setup>
import { useClassroomStore, useLoadingStore } from "~/store";
const useClassroom = useClassroomStore();
const isLoading = useLoadingStore();

function handleLink() {
  useClassroom.local_store.is_url = !isLoading.isURL(
    isLoading.modal.link
  );
  if (!useClassroom.local_store.is_url) {
    isLoading.modal.add_link = false;
    useClassroom.local_store.is_url = false;
  } else {
    useClassroom.local_store.is_url = true;
  }
}

watch(() => isLoading.modal.add_link, () => {
  if (!isLoading.modal.add_link) {
    isLoading.store.is_inline = false;
  }
})
</script>

<style lang="scss" scoped></style>
