<template>
  <main>
    <section
      class="sm:static sticky -top-8 z-20 duration-700"
      :class="
        store.scrollHeight > 135 ? 'sm:bg-transparent bg-white px-5 -mx-5' : ''
      "
    >
      <div
        class="md:space-y-5 space-y-3 text-center md:mt-[72px] mt-8 font-semibold text-xl"
      >
        <h1 class="md:text-[45px] text-2xl">{{ $t("nav.discover") }}</h1>
        <p>
          {{ $t("nav.or") }}
          <router-link
            to="/signup"
            class="_c2a cursor-pointer hover:opacity-70"
            >{{ $t("nav.create_your_own") }}</router-link
          >
        </p>
      </div>
      <div
        class="xl:relative !sticky top-40 md:w-[616px] mx-auto mt-8 md:mb-[52px] mb-6"
      >
        <img
          :class="store.scrollHeight < 135 ? '' : 'sm:absolute hidden'"
          class="md:my-[18px] my-[14px] w-5 h-5 left-5 absolute z-50"
          src="@/assets/svg/search.svg"
          alt=""
        />
        <img
          :class="store.scrollHeight > 135 ? '' : 'sm:absolute hidden'"
          class="md:my-[18px] my-[14px] w-5 h-5 left-5 absolute"
          src="@/assets/svg/blue_search.svg"
          alt=""
        />
        <input
          @input="handleSearch"
          v-model="useGroup.store.filter.search"
          autofocus
          class="md:h-[56px] h-12 !pl-[60px] b_none font-medium w-full !rounded-lg"
          :class="
            store.scrollHeight > 135
              ? 'sm:bg-[#FFFFFF] bg-[#F0F5FA] sm:placeholder-[#A1A1A1] placeholder-[#9CCDFE] sm:mb-0 mb-5'
              : ''
          "
          type="text"
          :placeholder="$t('nav.search')"
        />
      </div>
    </section>

    <!-- category -->
    <section class="md:text-sm text-xs whitespace-nowrap">
      <div class="flex items-start justify-between gap-3">
        <div
          :class="store.is_show ? 'flex-wrap' : ''"
          class="relative flex gap-3 md:h-auto category_wrap w-full h-[80px] overflow-hidden"
        >
          <button
            @click="handleCategory('all')"
            :class="useGroup.store.filter.category_id ? 'bg-white' : 'b_cbc'"
            class="py-2 px-3 rounded-full md:h-9 h-8 hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
          >
            {{ $t("nav.all") }}
          </button>
          <LoadingDiv
            v-if="isLoading.isLoadingType('groupCategories')"
            v-for="i in 10"
            class="flex items-center md:h-9 h-8 w-28 animate-pulse hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700 gap-1 py-2 px-3 rounded-full bg-gray-900"
          />
          <button
            v-else-if="useCategory.store.categories"
            @click="handleCategory(i.id)"
            v-for="i in useCategory.store.categories"
            :class="
              useGroup.store.filter.category_id == i.id ? 'b_cbc' : 'bg-white'
            "
            class="flex items-center md:h-9 h-8 min-w-fit hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700 gap-1 py-2 px-3 rounded-full"
          >
            {{ i[`name_${$t("nav.uz")}`] }}
          </button>
          <img
            v-if="!store.is_show && useCategory.store.categories"
            class="absolute md:block hidden -right-[2px]"
            src="@/assets/svg/shadow_hidden.svg"
            alt=""
          />
          <button
            @click="store.is_show = false"
            v-if="store.is_show && useCategory.store.categories?.length"
            class="py-2 px-3 md:h-9 h-8 md:block hidden rounded-full min-w-fit bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
          >
            {{ $t("nav.less") }}...
          </button>
        </div>
        <button
          v-if="!store.is_show && useCategory.store.categories?.length"
          @click="store.is_show = true"
          class="py-2 px-3 md:h-9 h-8 md:block hidden rounded-full min-w-fit bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
        >
          {{ $t("nav.more") }}...
        </button>
        <div class="min-w-fit text-end">
          <el-dropdown
            placement="bottom-start"
            trigger="click"
            :hide-on-click="false"
            class="min-w-fit filter_btn"
          >
            <button
              class="flex items-center gap-1 py-2 px-3 md:h-9 h-8 rounded-full bg-white"
            >
              <img
                class="md:h-5 md:w-5 h-4 w-4"
                src="@/assets/svg/filter.svg"
                alt=""
              />
              <p class="sm:block hidden">{{ $t("nav.filter") }}</p>
            </button>
            <template #dropdown>
              <el-dropdown-menu
                class="flex min-w-[328px] filter_dropdown dropdown_shadow 2xl:!-ml-[60px]"
              >
                <div class="w-[150px] border-r border-[#E0E0E0] capitalize">
                  <h1 class="text-sm font-medium px-8 mb-2">
                    {{ $t("nav.type") }}
                  </h1>
                  <label :for="`${i.type}`" v-for="i in filter_type">
                    <el-dropdown-item
                      class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                    >
                      <input
                        @change="onFilterType"
                        :id="`${i.type}`"
                        class="rounded-full"
                        type="radio"
                        name="type"
                      />
                      {{ $t(`nav.${i.title.toLowerCase()}`) }}
                    </el-dropdown-item>
                  </label>
                </div>
                <div class="w-[150px] capitalize">
                  <h1 class="text-sm font-medium px-8 mb-2">
                    {{ $t("nav.price") }}
                  </h1>
                  <label :for="`price_${i.type}`" v-for="i in filter_price">
                    <el-dropdown-item
                      class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                    >
                      <input
                        @change="onFilterPrice"
                        :id="`price_${i.type}`"
                        class="rounded-full"
                        type="radio"
                        name="price"
                      />
                      <!-- {{ i.title }} -->
                      {{ $t(`nav.${i.title.toLowerCase()}`) }}
                    </el-dropdown-item>
                  </label>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <button
            v-if="useCategory.store.categories"
            @click="store.drawer = true"
            class="py-2 px-3 md:h-9 h-8 mt-3 ml-auto md:hidden block rounded-full min-w-fit bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
          >
            {{ $t("nav.more") }}...
          </button>
        </div>
      </div>
    </section>

    <!-- cards -->
    <section
      class="grid md:grid-cols-3 grid-cols-2 md:gap-6 gap-5 justify-between md:mt-7 mt-6"
    >
      <Card />
    </section>

    <el-drawer
      v-model="store.drawer"
      height="400"
      direction="btt"
      class="!w-full !h-[400px] !rounded-t-[16px] overflow-hidden"
    >
      <div
        class="flex items-center justify-between sticky -top-[21px] bg-white z-20 pt-6 -mt-[21px] pb-6"
      >
        <h1 class="font-semibold">Choose category</h1>
        <img
          class="cursor-pointer"
          @click="store.drawer = false"
          src="@/assets/svg/close_drawer.svg"
          alt=""
        />
      </div>
      <div class="flex gap-3 whitespace-nowrap flex-wrap items-center">
        <button
          @click="handleCategory('all')"
          :class="useGroup.store.filter.category_id ? 'bg-[#F0F5FA]' : 'b_cbc'"
          class="px-3 rounded-full md:h-9 h-8 hover:bg-[#F0F5FA] hover:bg-opacity-30 duration-700"
        >
          {{ $t("nav.all") }}
        </button>
        <button
          @click="handleCategory(i.id)"
          store.drawer="false"
          v-for="i in useCategory.store.categories"
          :class="
            useGroup.store.filter.category_id == i.id ? 'b_cbc' : 'bg-[#F0F5FA]'
          "
          class="flex items-center md:h-9 h-8 hover:bg-opacity-30 duration-700 gap-1 py-2 px-3 rounded-full"
        >
          {{ i[`name_${$t("nav.uz")}`] }}
        </button>
      </div>
    </el-drawer>
  </main>
</template>

<script setup>
import { useLoadingStore, useCategoryStore, useGroupStore } from "@/store";

useSeoMeta({
  title: "Learnify: Discover Communities or Create your own",
  ogTitle: "Learnify: Discover Communities or Create your own",
  description: "Learnify: Discover Communities or Create your own",
  ogDescription: "Learnify: Discover Communities or Create your own",
  ogImage: "/logo.svg",
  twitterCard: "/logo.svg",
});

const obj = { x: 1, y: 2 };
let { x: a, y: b } = obj;
a = 2;
const isLoading = useLoadingStore();
const useCategory = useCategoryStore();
const useGroup = useGroupStore();
const router = useRouter();
const { start, finish } = useLoadingIndicator();

isLoading.addLoading("groupCategories");
isLoading.changeQuery();
const currentQueries = { ...router.currentRoute.value.query };
for (let i in currentQueries) {
  if (currentQueries[i]) {
    useGroup.store.filter[i] = currentQueries[i];
  }
}
start();
await useAsyncData(
  "learnify",
  async () => {
    await useGroup.filterGroups();
    await useCategory.getCategories();
    finish();
  },
  { server: false }
);

isLoading.store.page_name = "group";

const filter_type = [
  {
    title: "All",
    type: "all",
  },
  {
    title: "Public",
    type: "public",
  },
  {
    title: "Private",
    type: "private",
  },
];

const filter_price = [
  {
    title: "All",
    type: "all",
  },
  {
    title: "Free",
    type: "free",
  },
  {
    title: "Paid",
    type: "paid",
  },
];

const store = reactive({
  is_show: false,
  drawer: false,
  scrollHeight: 0,
});

function handleSearch() {
  isLoading.changeQuery("search", useGroup.store.filter.search);
}

function handleCategory(id) {
  store.drawer = false;
  if (id == "all") {
    useGroup.store.filter.category_id = null;
    isLoading.changeQuery("category_id", "");
  } else {
    useGroup.store.filter.group_id = id;
    isLoading.changeQuery("category_id", id);
  }
}

function onFilterPrice(e) {
  if (e.target.id == "price_all") {
    useGroup.store.filter.price = "all";
  } else {
    if (e.target.id == "price_free") {
      useGroup.store.filter.price = "free";
    } else if (e.target.id == "price_paid") {
      useGroup.store.filter.price = "paid";
    }
  }
  isLoading.changeQuery("price", useGroup.store.filter.price);
}

function onFilterType(e) {
  if (e.target.id == "type_all") {
    useGroup.store.filter.type = "all";
  } else {
    useGroup.store.filter.type = e.target.id;
  }
  isLoading.changeQuery("type", useGroup.store.filter.type);
}

async function watchQuery() {
  const currentQueries = { ...router.currentRoute.value.query };
  for (let i in currentQueries) {
    if (currentQueries[i]) {
      useGroup.store.filter[i] = currentQueries[i];
    }
  }
  await useGroup.filterGroups();
}

watch(
  () => router.currentRoute.value,
  () => {
    if (router.currentRoute.value.params.community) return;
    watchQuery();
  }
);

onBeforeMount(() => {
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      store.is_show = true;
    } else {
      store.drawer = false;
    }
  });

  window.addEventListener("scroll", () => {
    store.scrollHeight = window.scrollY;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", () => {});
});
</script>

<style lang="scss" scoped>
/*.grid {
  grid-template-columns: repeat(auto-fill, 331px);
} */

@media (max-width: 768px) {
  .category_wrap {
    flex-wrap: wrap !important;
  }
}
</style>
