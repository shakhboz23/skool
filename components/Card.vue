<template>
  <div
    v-if="isLoading.isLoadingType('groupGroups')"
    v-for="i in 15"
    class="w-full cursor-pointer bg_loading animate-pulse md:rounded-2xl rounded-xl overflow-hidden"
  >
    <div>
      <p
        class="full_flex md:text-xs text-[8px] pb-0.5 font-medium absolute md:w-[30px] md:h-[30px] w-5 h-5 bg_loading md:rounded-lg rounded-[4px] m-3"
      ></p>
      <LoadingDiv
        class="card bg-gray-900 w-full object-cover md:h-[180px] sm:h-[140px] h-[120px]"
      />
    </div>
    <LoadingDiv class="md:p-4 h-[180px] p-3">
      <div class="flex items-center md:gap-4 gap-2">
        <p class="md:h-10 md:w-10 h-5 w-5 rounded-full bg-[#f5f5f5]"></p>
        <h1
          class="font-semibold md:text-lg text-sm w-[80%] h-6 rounded bg-[#f5f5f5]"
        ></h1>
      </div>
      <LoadingDiv class="h-[150px] w-full" />
    </LoadingDiv>
  </div>
  <div
    v-else-if="!useGroup.store.groups.length"
    class="min-h-[30vh] full_flex col-span-4"
  >
    {{$t("no_data")}}
  </div>
  <div
    v-else
    v-for="i in useGroup.store.groups"
    @click="$router.push(`/${i.username}/about`)"
    data-aos="zoom-in"
    class="w-full cursor-pointer bg-white md:rounded-2xl rounded-xl overflow-hidden"
  >
    <div class="relative">
      <p
        class="full_flex md:text-xs text-[8px] pb-0.5 font-medium absolute md:w-[30px] md:h-[30px] w-5 h-5 bg-white md:rounded-lg rounded-[4px] m-3"
      >
        #{{ i.id }}
      </p>
      <img
        v-if="i.image"
        class="card w-full object-cover md:h-[180px] sm:h-[140px] h-[120px]"
        :src="i.image"
        alt=""
      />
      <div
        v-else
        :style="`background: ${i.color}`"
        class="card w-full object-cover md:h-[180px] sm:h-[140px] h-[120px]"
      ></div>
    </div>
    <div class="md:p-4 p-3">
      <div class="flex items-center md:gap-4 gap-2">
        <img
          v-if="i.icon"
          class="md:h-10 md:w-10 h-5 w-5 rounded-full bg_loading object-cover"
          :src="i.icon"
          alt=""
        />
        <div
          v-else
          class="full_flex text-white uppercase md:h-10 md:min-w-[40px] h-5 min-w-[20px] md:text-[16px] text-[10px] rounded-full"
          :style="`background: ${i.color}`"
        >
          {{ i.initials }}
        </div>
        <p
          v-if="isLoading.isLoadingType('groupGroups')"
          class="md:h-10 md:w-10 h-5 w-5 rounded-full bg_loading"
        ></p>
        <h1 class="font-semibold md:text-lg text-sm truncate">
          {{ i.name }}
        </h1>
      </div>
      <p class="md:mt-4 mt-3 md:mb-7 mb-3 min-h-[40px] lg:text-[16px] text-sm line-clamp-2">
        {{ i.excerpt }}
      </p>
      <div
        class="flex flex-wrap items-center whitespace-nowrap gap-2 _c07 font-bold md:text-sm text-[10px]"
      >
        <p class="px-2 py-1 r_8 bg-[#F2F2F2] capitalize">
          {{$t(`nav.${i.group_type}`)}}
        </p>
        {{ i.members_count }}
        <p class="md:block hidden px-2 py-1 r_8 bg-[#F2F2F2]">
          {{ i.members }} {{$t("nav.members")}}
        </p>
        <p class="px-2 py-1 r_8 bg-[#F2F2F2] capitalize">
          <!-- {{ i.group_price == "free" ? "Free" : "Paid" }} -->
          {{$t(`nav.${i.group_price}`)}}
        </p>
        <p class="md:hidden block px-2 py-1 r_8 bg-[#F2F2F2]">
          {{ i.members }} {{ $t("nav.members") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLoadingStore, useGroupStore } from "@/store";

const isLoading = useLoadingStore();
const useGroup = useGroupStore();
</script>

<style lang="scss" scoped></style>
