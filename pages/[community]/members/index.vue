<template>
  <main class="md:flex gap-6">
    <div class="w-full">
      <nav
        class="overflow-hidden overflow-x-auto flex flex-wrap space-y-1 items-center xl:flex-row flex-col-reverse xl:gap-0 gap-6 whitespace-nowrap justify-between mt-5"
      >
        <div class="flex gap-3 mr-auto overflow-hidden overflow-x-auto">
          <button
            v-if="user_roles.includes(useMembers.store.members.type)"
            v-for="i in categories"
            :class="
              $router.currentRoute.value.query?.type == i[0]
                ? 'b_cbc'
                : 'bg-white'
            "
            @click="isLoading.changeQuery('type', i[0])"
            class="py-2 px-3 space-x-1 rounded-full hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
          >
            <span>{{ $t(`members.${i[0]}`) }}</span>
            <span>{{ useMembers.store.members[i[1]] | 0 }}</span>
          </button>
          <button
            v-else
            v-for="i in categories_members"
            :class="
              $router.currentRoute.value.query?.type == i[0]
                ? 'b_cbc'
                : 'bg-white'
            "
            @click="isLoading.changeQuery('type', i[0])"
            class="py-2 px-3 space-x-1 rounded-full hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
          >
            <span class="capitalize">{{ $t(`members.${i[0]}`) }}</span>
            <span> {{ (" " + useMembers.store.members[i[1]]) | 0 }}</span>
          </button>
        </div>
        <div class="flex gap-3 ml-auto">
          <el-dropdown
            v-if="role_ac.includes(useGroup.store.group_by_username.type)"
            placement="bottom-start"
            trigger="click"
            :hide-on-click="false"
            class="filter_btn min-w-fit"
          >
            <button
              class="flex items-center gap-1 py-2 px-3 capitalize min-w-fit rounded-full bg-white"
            >
              <img src="@/assets/svg/filter.svg" alt="" />
              <span>{{ $t("nav.filter") }}</span>
            </button>
            <template #dropdown>
              <el-dropdown-menu
                class="min-w-[328px] filter_dropdown dropdown_shadow 2xl:!-ml-[60px]"
              >
                <div class="flex items-center mb-6 justify-between">
                  <h1 class="text-2xl font-semibold">
                    {{ $t("nav.filters") }}
                  </h1>
                  <button
                    class="uppercase font-semibold text-sm _c07 b_cbc h-10 px-6 r_8"
                  >
                    {{ $t("members.apply") }}
                  </button>
                </div>
                <div class="flex">
                  <div class="min-w-[150px] border-r border-[#E0E0E0]">
                    <h1 class="text-sm font-medium px-8 mb-2">
                      {{ $t("members.status") }}
                    </h1>
                    <el-dropdown-item
                      class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                    >
                      <el-checkbox
                        class="members_checkbox"
                        :label="$t('about.admins')"
                      />
                    </el-dropdown-item>
                    <el-dropdown-item
                      class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                    >
                      <el-checkbox
                        class="members_checkbox"
                        :label="$t('online')"
                      />
                    </el-dropdown-item>
                  </div>
                  <div class="min-w-[150px]">
                    <h1 class="text-sm font-medium px-8 mb-2">
                      {{ $t("nav.price") }}
                    </h1>
                    <el-dropdown-item
                      class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                    >
                      <el-checkbox
                        class="members_checkbox capitalize"
                        :label="$t('nav.free')"
                      />
                    </el-dropdown-item>
                  </div>
                  <div class="min-w-[150px]">
                    <h1 class="text-sm font-medium px-8 mb-2">
                      {{ $t("members.courses") }}
                    </h1>
                    <el-dropdown-item
                      class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                    >
                      <el-checkbox
                        class="members_checkbox"
                        label="Copywriting"
                      />
                    </el-dropdown-item>
                  </div>
                  <div class="min-w-[150px]">
                    <h1 class="text-sm font-medium px-8 mb-2">
                      {{ $t("members.sort") }}
                    </h1>
                    <el-dropdown-item
                      class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                    >
                      <input
                        id="price_all"
                        class="rounded-full"
                        type="radio"
                        name="price"
                      />
                      <label for="price_all">{{ $t("members.newest") }}</label>
                    </el-dropdown-item>
                    <el-dropdown-item
                      class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                    >
                      <input
                        id="price_public"
                        class="rounded-full"
                        type="radio"
                        name="price"
                      />
                      <label for="price_public">{{ $t("members.last") }}</label>
                    </el-dropdown-item>
                    <el-dropdown-item
                      class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                    >
                      <input
                        id="price_private"
                        class="rounded-full"
                        type="radio"
                        name="price"
                      />
                      <label for="price_private">{{
                        $t("members.most")
                      }}</label>
                    </el-dropdown-item>
                  </div>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <button
            v-if="role_ac.includes(useGroup.store.group_by_username.type)"
            class="full_flex gap-1 py-2 px-3 rounded-full bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
          >
            <img src="@/assets/svg/export.svg" alt="" />
            <span>{{ $t("members.export") }}</span>
          </button>
          <button
            @click="isLoading.openDrawer(role_ac.includes(useGroup.store.group_by_username.type) ? 2 : 3)"
            class="gap-1 uppercase py-2 px-6 r_8 b_cbc _c07 bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
          >
            {{ $t("members.invite") }}
          </button>
        </div>
      </nav>

      <section
        v-if="isLoading.isLoadingType('groupMembes')"
        class="space-y-3 mt-5"
      >
        <LoadingDiv
          v-for="i in 5"
          class="h-[200px] w-full bg-gray-700 animate-pulse rounded-xl"
        ></LoadingDiv>
      </section>
      <section
        v-else-if="!useMembers.store.members.data?.length"
        class="min-h-[30vh] full_flex col-span-4"
      >
        {{ $t("no_data") }}
      </section>
      <section class="space-y-3 mt-5 w-full" v-else>
        <article
          v-for="member in useMembers.store.members.data"
          data-aos="zoom-in"
          class="relative md:flex r_16 overflow-hidden p-4 bg-white"
        >
          <div class="w-full">
            <div class="flex items-start justify-between w-full">
              <div class="flex items-start gap-4">
                <UserAvatar :user="member.user" />
                <div class="space-y-[26px]">
                  <div class="space-y-[2px]">
                    <h1 class="font-semibold">
                      {{ member.user?.name }}
                      {{ member.user?.surname }}
                      <span
                        v-show="member.type != 'Member'"
                        class="_c59 font-medium text-xs"
                        >({{ member.type }})</span
                      >
                    </h1>
                    <p class="text-xs">{{ member.user?.username }}</p>
                  </div>
                  <div>
                    <h1 class="text-sm">
                      {{ member.user?.bio }}
                    </h1>
                    <div
                      class="grid md:grid-cols-4 gap-3 whitespace-nowrap mt-3 text-sm"
                    >
                      <!-- <button class="full_flex col-span-2 truncate max-w-fit gap-1 b_cf2 h-7 px-2 r_8">
                          <img class="h-3 w-3" src="@/assets/svg/online.svg" alt="" />
                          Online now
                        </button> -->
                      <button
                        class="full_flex col-span-2 truncate max-w-fit gap-1 b_cf2 h-7 px-2 r_8"
                      >
                        <img
                          class="h-4 w-4"
                          src="@/assets/svg/calendar_black.svg"
                          alt=""
                        />
                        <span class="max-w-[80%]"
                          >{{$t('members.joined')}} {{ formatDate(member.created_at) }}</span
                        >
                      </button>
                      <button
                        v-if="member.user.address"
                        class="full_flex col-span-2 truncate max-w-fit gap-1 b_cf2 h-7 px-2 r_8"
                      >
                        <img
                          class="h-4 w-4"
                          src="@/assets/svg/location_black.svg"
                          alt=""
                        />
                        <span class="max-w-[95%] truncate">{{
                          member.user.address
                        }}</span>
                      </button>
                      <button
                        class="full_flex col-span-2 capitalize truncate max-w-fit gap-1 b_cf2 h-7 px-2 r_8"
                      >
                        <img
                          class="h-4 w-4"
                          src="@/assets/svg/free.svg"
                          alt=""
                        />
                        {{ member.is_price == 'free' ? $t('nav.free') : member.price + '/' + $t("payment.month") }}
                      </button>
                      <button
                        class="full_flex col-span-2 truncate max-w-fit gap-1 b_cf2 h-7 px-2 r_8"
                      >
                        <img
                          class="h-4 w-4"
                          src="@/assets/svg/access.svg"
                          alt=""
                        />
                        {{$t('members.lifetime')}}
                      </button>
                      <button
                        v-if="member.status == 'churned'"
                        class="_ceb full_flex col-span-2 truncate max-w-fit gap-1 b_cf2 h-7 px-2 r_8"
                      >
                        <img
                          class="h-4 w-4 border border-[#eb5757] rounded-full p-[4px]"
                          src="@/assets/svg/red_x.svg"
                          alt=""
                        />
                        Churned {{ formatDate(member.churned_date) }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="full_flex gap-2">
                <!-- <button v-if="isLoading.user.id != member.user?.id" class="full_flex gap-3 h-10 b_ce0 _ca1 px-4 r_8">
                  Chat
                  <img src="@/assets/svg/chat_cross.svg" alt="" />
                </button> -->
                <button
                  @click="userManageRole(member)"
                  v-if="
                    isLoading.user.id != member.user?.id &&
                    user_roles.includes(useMembers.store.members.type)
                  "
                  class="full_flex gap-[10px] border border_cbc r_8 _c2a px-4 h-10 uppercase whitespace-nowrap font-semibold"
                >
                  {{$t('settings.profile.membership')}}
                  <img src="@/assets/svg/settings/settings.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </article>
        <Pagination_card class="pt-2" />
      </section>
    </div>

    <GroupInfoCard class="lg:block hidden lg:max-w-[280px]" />
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import { useMemberStore, useLoadingStore, useGroupStore } from "@/store";
import { useFormatDate } from "@/composables";
const { start, finish } = useLoadingIndicator();
import { role_ac } from "@/composables";
const { formatDate } = useFormatDate();
const useMembers = useMemberStore();
const isLoading = useLoadingStore();
const useGroup = useGroupStore();
isLoading.addLoading("groupMembes");
const router = useRouter();

useSeoMeta({
  title: computed(() => `Group · ${useGroup.store.group_by_username.name}`),
  ogTitle: computed(() => `Group · ${useGroup.store.group_by_username.name}`),
  description: computed(
    () => `Group · ${useGroup.store.group_by_username.description}`
  ),
  ogDescription: computed(
    () => `Group · ${useGroup.store.group_by_username.description}`
  ),
  ogImage: computed(() => `${useGroup.store.group_by_username.image}`),
  twitterCard: computed(() => `${useGroup.store.group_by_username.icon}`),
});

start();
await useAsyncData(
  "members",
  async () => {
    await useMembers.getMembers();
    finish();
  },
  { server: false }
);

const user_roles = ["Creator", "Admin", "Moderator"];

const categories = [
  ["active", "active_count"],
  ["cancelling", "cancelling_count"],
  ["churned", "churned_count"],
  ["banned", "banned_count"],
];

const categories_members = [
  ["member", "member_count"],
  ["admin", "admin_count"],
  // ["online", "online"],
];

function userManageRole(user) {
  useMembers.store.member_data = user;
  useMembers.store.member_type = user.type;
  isLoading.store.inviteModal = true;
  useMembers.store.manageUserRole = true;
}

watch(
  () => isLoading.store.pagination.current_page,
  () => {
    window.scrollTo(0, 0);
    useMembers.getMembers();
  }
);

watch(
  () => router.currentRoute.value.query?.type,
  () => {
    useMembers.getMembers();
  }
);
</script>

<style lang="scss" scoped></style>
