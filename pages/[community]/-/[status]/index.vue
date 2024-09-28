<template>
  <main class="flex md:flex-row flex-col-reverse md:gap-6 mt-[18px]">
    <div class="overflow-hidden w-full md:space-y-8 space-y-6">
      <p class="font-semibold">
        {{ useMembers.store.member_requests.length }} membership requests
      </p>

      <!-- posts -->
      <section class="md:space-y-5 space-y-4">
        <LoadingDiv
          v-if="isLoading.isLoadingType('groupMembesRequest')"
          v-for="i in 10"
          class="min-h-[200px] w-full r_16 overflow-hidden"
        />
        <div
          v-else-if="!useMembers.store.member_requests.length"
          class="min-h-[30vh] full_flex col-span-4"
        >
          {{$t("no_data")}}
        </div>
        <article
          v-else
          v-for="i in useMembers.store.member_requests"
          data-aos="zoom-in"
          class="relative md:flex items-start r_16 p-4 overflow-hidden bg-white"
        >
          <div class="flex items-start gap-4 w-full">
            <UserAvatar :user="i.user" />
            <div class="space-y-[2px]">
              <h1 class="font-semibold">
                {{ i.user?.name }} {{ i.user?.surname }}
              </h1>
              <p class="text-xs">
                {{ i.user?.address }}
              </p>
              <p class="text-xs">Requested {{ formatDate(i.created_at) }}</p>
              <p><span class="font-bold">Bio: </span>{{ i.user?.bio }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="handleRequest('active', i.user?.id)"
              class="uppercase border border_ce0 r_8 px-4"
            >
              Approve
            </button>
            <button
              @click="handleRequest('cancelling', i.user?.id)"
              class="uppercase border border_ce0 r_8 px-4"
            >
              Decline
            </button>
            <el-dropdown
              placement="bottom-end"
              class="border_ce0 dropdown r_8"
              trigger="click"
            >
              <div class="h-10 full_flex w-10">
                <img class="w-5 h-5" src="@/assets/svg/three_dot.svg" alt="" />
              </div>
              <template #dropdown>
                <el-dropdown-menu
                  class="community_dropdown min-w-[200px] dropdown_shadow"
                >
                  <el-dropdown-item>Chat</el-dropdown-item>
                  <el-dropdown-item>View profile</el-dropdown-item>
                  <el-dropdown-item>Ban from group</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </article>
        <!-- <Pagination_card class="pt-3" /> -->
      </section>
    </div>
    <GroupInfoCard />
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import { useMemberStore, useLoadingStore, useGroupStore } from "@/store";
import { useFormatDate } from "@/composables";

const { formatDate } = useFormatDate();
const useMembers = useMemberStore();
const useGroup = useGroupStore();
const isLoading = useLoadingStore();
const router = useRouter();
const { start, finish } = useLoadingIndicator();
isLoading.addLoading("groupMembesRequest");

useSeoMeta({
  title: computed(() => `Membership requests · ${useGroup.store.group_by_username.name}`),
  ogTitle: computed(() => `Membership requests · ${useGroup.store.group_by_username.name}`),
  description: computed(() => `Membership requests · ${useGroup.store.group_by_username.description}`),
  ogDescription: computed(() => `Membership requests · ${useGroup.store.group_by_username.description}`),
  ogImage: computed(() => `${useGroup.store.group_by_username.image}`),
  twitterCard: computed(() => `${useGroup.store.group_by_username.icon}`),
})

start();
await useAsyncData("requested_members", async () => {
  await useMembers.getMemberRequests();
  finish();
}, { server: false })

function handleRequest(type, id) {
  useMembers.store.user_id = id;
  useMembers.store.status = type;
  useMembers.setMemberJoinType();
}
</script>

<style lang="scss" scoped>
.textarea_icon {
  .icon {
    height: 40px;
    width: 40px;
    cursor: pointer;
    &:hover {
      background: #f2f2f2;
      border-radius: 8px;
    }
  }
}
</style>
