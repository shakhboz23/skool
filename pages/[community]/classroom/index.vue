<template>
  <main>
    <section>
      <ClassCard />
    </section>
    <Pagination_card />
  </main>
</template>

<script setup>
import { useClassroomStore, useLoadingStore, useGroupStore } from "@/store";
const useClassroom = useClassroomStore();
const useGroup = useGroupStore();
useSeoMeta({
  title: computed(() => `Classroom · ${useGroup.store.group_by_username.name}`),
  ogTitle: computed(() => `Classroom · ${useGroup.store.group_by_username.name}`),
  description: computed(() => `Classroom · ${useGroup.store.group_by_username.description}`),
  ogDescription: computed(() => `Classroom · ${useGroup.store.group_by_username.description}`),
  ogImage: computed(() => `${useGroup.store.group_by_username.image}`),
  twitterCard: computed(() => `${useGroup.store.group_by_username.icon}`),
})
definePageMeta({
  layout: "community",
});
const { start, finish } = useLoadingIndicator();
const isLoading = useLoadingStore();
isLoading.addLoading("getClassrooms");
isLoading.store.page_name = "classroom";
start();
await useAsyncData("classroom", async () => {
  await useClassroom.get_classroom();
  finish();
}, { server: false })
</script>

<style lang="scss" scoped></style>