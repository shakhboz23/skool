<template>
  <footer
    class="flex lg:flex-row flex-col gap-5 items-center justify-between mx-auto xl:px-[200px] lg::px-[100px] md:px-[50px] sm:px-[50px] px-5 max-w-[1536px]"
  >
    <div class="flex items-center gap-[14px] capitalize">
      <p
        @click="changePage('dec')"
        :class="
          isLoading.store.pagination.current_page == 1
            ? 'pointer-events-none opacity-40'
            : ''
        "
        class="flex items-center c_pointer text-sm gap-2"
      >
        <img src="@/assets/svg/page_arrow.svg" alt="" />
        {{$t("nav.prev")}}
      </p>
      <el-pagination
        v-model:current-page="isLoading.store.pagination.current_page"
        :page-size="isLoading.store.pagination.per_page"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, prev, pager, next"
        :total="isLoading.store.pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="el-pagination"
      />
      <p
        @click="changePage('inc')"
        :class="
          isLoading.store.pagination.current_page ==
          isLoading.store.pagination.last_page
            ? 'pointer-events-none opacity-40'
            : ''
        "
        class="flex items-center c_pointer text-sm gap-2"
      >
        {{$t("nav.next")}}
        <img class="rotate-180" src="@/assets/svg/page_arrow.svg" alt="" />
      </p>
    </div>
    <ul class="flex items-center ul md:gap-6 gap-5 text-sm routerlinks">
      <li>
        <router-link to="/community"> {{ $t("nav.community") }} </router-link>
      </li>
      <!-- <li>
        <router-link to="/affiliate-program">
          {{ $t("nav.affiliates") }}
        </router-link>
      </li> -->
      <!-- <li>
        <router-link to="/careers"> {{ $t("nav.careers") }} </router-link>
      </li> -->
      <li>
        <router-link to="/legal?t=privacy">{{ $t("nav.privacy") }}</router-link>
      </li>
      <!-- <el-dropdown placement="top-start" trigger="click">
        <li class="routerlinks full_flex min-w-[40px] h-10">
          <img src="@/assets/svg/footer_dot.svg" alt="" />
        </li>

        <template #dropdown>
          <el-dropdown-menu
            class="pagination_dropdown routerlinks min-w-[140px] dropdown_shadow !mb-2 sm:!-ml-3 !-ml-28"
          >
            <router-link to="/pricing">
              <el-dropdown-item> {{ $t("nav.pricing") }} </el-dropdown-item>
            </router-link> -->
            <!-- <el-dropdown-item>Merch</el-dropdown-item> -->
            <!-- <router-link to="/help">
              <el-dropdown-item> {{ $t("nav.help") }} </el-dropdown-item>
            </router-link>
            <a href="mailto:help@learnify.com" target="_blank">
              <el-dropdown-item>help@learnify.com</el-dropdown-item>
            </a>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
    </ul>
  </footer>
</template>

<script setup>
import { useLoadingStore } from "@/store";

const isLoading = useLoadingStore();

function changePage(type) {
  if (type == "dec") {
    if (isLoading.store.pagination.current_page == 1) {
      return;
    }
    isLoading.store.pagination.current_page -= 1;
  } else if (type == "inc") {
    if (
      isLoading.store.pagination.current_page ==
      isLoading.store.pagination.last_page
    ) {
      return;
    } else {
      isLoading.store.pagination.current_page += 1;
    }
  } else {
    isLoading.store.pagination.current_page = type;
  }

  isLoading.changeQuery("page", isLoading.store.pagination.current_page);
  if (isLoading.store.page_name == "group") {
  }
}

const handleCurrentChange = (val) => {
  changePage(val);
};
</script>

<style lang="scss" scoped>
.ul li {
  cursor: pointer;
}
</style>
