<template>
  <nav class="max-w-[100vw] overflow-hidden overflow-x-auto">
    <el-tabs class="min-w-fit" v-model="store.activeName" @click="handleClick">
      <el-tab-pane
        v-for="i in tabs"
        :label="$t(`tabs.${i.label}`)"
        :name="i.value"
      ></el-tab-pane>
    </el-tabs>
  </nav>
</template>

<script setup>
const router = useRouter();
const store = reactive({
  activeName: "first",
});

const tabs = [
  {
    label: "community",
    value: "",
  },
  {
    label: "classroom",
    value: "classroom",
  },
  {
    label: "calendar",
    value: "calendar",
  },
  {
    label: "members",
    value: "members",
  },
  {
    label: "leaderboards",
    value: "leaderboards",
  },
  {
    label: "about",
    value: "about",
  },
];

const handleClick = (tab, event) => {
  router.push(
    `/${router.currentRoute.value.params.community}/${store.activeName}`
  );
};

onBeforeMount(() => {
  const route_name = router.currentRoute.value.name?.split("-")[1];
  if (route_name) {
    store.activeName = route_name;
  } else {
    store.activeName = "";
  }
});

watch(
  () => router.currentRoute.value,
  () => {
    const route_name = router.currentRoute.value.name?.split("-")[1];
    if (route_name) {
      store.activeName = route_name;
    } else {
      store.activeName = "";
    }
  }
);
</script>

<style lang="scss" scoped></style>
