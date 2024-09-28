<template>
  <footer v-show="isLoading.store.pagination.total" class="flex md:flex-wrap-reverse md:flex-row flex-col-reverse md:items-center justify-between">
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
    <div class="ml-auto md:mb-0 mb-3">
      <p>
        {{ isLoading.store.pagination.from }}-{{
          isLoading.store.pagination.to
        }}
        of {{ isLoading.store.pagination.total }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import { useLoadingStore, useClassroomStore, useEventStore, useMemberStore } from "@/store";

const isLoading = useLoadingStore();
const useClassroom = useClassroomStore();
const useEvent = useEventStore();
const useMember = useMemberStore();

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
  if (isLoading.store.page_name == "classroom") {
    useClassroom.get_classroom();
  } else if (isLoading.store.page_name == "members") {
    useMember.getMembers();
  }
}

const handleCurrentChange = (val) => {
  changePage(val)
}
</script>

<style lang="scss" scoped>
.ul li {
  cursor: pointer;
}
</style>
