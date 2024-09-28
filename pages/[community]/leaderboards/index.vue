<template>
  <main class="mt-[10px]">
    <section class="bg-white rounded-xl p-5 pb-[60px]">
      <img
      v-if="role_ac.includes(useGroup.store.group_by_username.type)"
        @click="isLoading.openDrawer(8)"
        class="mb-4 cursor-pointer"
        src="@/assets/svg/leaderboards/settings.svg"
        alt=""
      />
      <div class="sm:flex lg:gap-20 gap-10">
        <div class="flex flex-col items-center relative min-w-[240px]">
          <el-progress
            :stroke-width="11"
            type="circle"
            :percentage="isLoading.user.percent"
          />
          <div class="absolute mx-auto top-[14.5px]">
            <div class="relative max-w-fit">
              <img
                class="h-[138px] w-[138px] rounded-full object-cover"
                :src="isLoading.user.image"
                alt=""
              />
              <div class="full_flex absolute -bottom-[2px] -right-[16px] z-10">
                <div class="relative">
                  <img
                    class="h-10 w-10"
                    src="@/assets/svg/community/user_messages.svg"
                    alt=""
                  />
                  <p
                    class="absolute full_flex bottom-0 h-10 w-10 pb-1 text-[22px] text-white font-medium"
                  >
                    1
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h1 class="text-xl font-semibold mt-5 w-full text-center truncate">
            {{ isLoading.user?.name }} {{ isLoading.user?.surname }}
          </h1>
          <button
            class="my-5 mb-3 _c2a font-semibold text-xs b_cd9 h-8 px-[10px] rounded-full"
          >
            {{$t("leaderboard.level")}} {{ isLoading.user.level }} {{ isLoading.user.level_name ? `- ${isLoading.user.level_name}` : "" }}
          </button>
          <div class="flex items-center gap-1 text-xs">
            <p class="_c2a">{{ isLoading.user.points }}</p>
            <p class="_c07">{{$t("leaderboard.levelup")}}</p>
            <img src="@/assets/svg/members/pending.svg" alt="" />
          </div>
        </div>
        <div class="md:grid grid-cols-2 gap-5 w-full sm:mt-0 mt-8">
          <div>
            <div
              v-show="index < 5"
              class="max-w-[310px]"
              v-for="(i, index) in useMembers.store.levels"
            >
              <div v-if="index != 0" class="h-6 w-[42px] overflow-hidden my-1">
                <img
                  class="mx-auto"
                  src="@/assets/svg/leaderboards/line.svg"
                  alt=""
                />
              </div>
              <div class="flex items-center gap-5">
                <p
                  v-if="index <= isLoading.user.level - 1"
                  class="full_flex font-medium min-w-[42px] h-[42px] r_8 b_cbc"
                >
                  {{ index + 1 }}
                </p>
                <p
                  v-else
                  class="full_flex font-medium min-w-[42px] h-[42px] r_8 b_cf2"
                >
                  <img src="@/assets/svg/members/private.svg" alt="" />
                </p>
                <div class="_c07 space-y-1">
                  <p class="font-semibold leading-[19px]">
                    {{$t("leaderboard.level")}} {{ index + 1 }} {{ i.level ? `- ${i.level}` : "" }}
                  </p>
                  <div class="text-xs leading-[14px] line-clamp-2">
                    <div
                      class="flex gap-1 flex-wrap line-clamp-1"
                      v-if="i.courses?.length"
                    >
                      <p>{{$t("leaderboard.unlock")}}</p>
                      <div>
                        <a
                          target="_blank"
                          :href="getLink(course)"
                          class="_c2a font-bold hover:underline"
                          v-for="(course, index) in i.courses"
                          >"{{ course.title }}"
                          <span
                            v-if="index < i.courses?.length - 1"
                            class="_c07"
                            >,</span
                          ></a
                        >
                      </div>
                    </div>
                    {{ i.members }}% {{$t("leaderboard.members")}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="sm:hidden block min-h-[24px] w-[42px] overflow-hidden my-1"
          >
            <img
              class="mx-auto"
              src="@/assets/svg/leaderboards/line.svg"
              alt=""
            />
          </div>
          <div>
            <div
              v-show="index > 4"
              class="max-w-[310px]"
              v-for="(i, index) in useMembers.store.levels"
            >
              <div v-if="index != 5" class="h-6 w-[42px] overflow-hidden my-1">
                <img
                  class="mx-auto"
                  src="@/assets/svg/leaderboards/line.svg"
                  alt=""
                />
              </div>
              <div class="flex items-center gap-5">
                <p
                  v-if="i.completed"
                  class="full_flex font-medium min-w-[42px] h-[42px] r_8 b_cbc"
                >
                  {{ index + 6 }}
                </p>
                <p
                  v-else
                  class="full_flex font-medium min-w-[42px] h-[42px] r_8 b_cf2"
                >
                  <img src="@/assets/svg/members/private.svg" alt="" />
                </p>
                <div class="_c07 space-y-1">
                  <p class="font-semibold leading-[19px]">
                    {{$t("leaderboard.level")}} {{ index + 1 }} {{ i.level ? `- ${i.level}` : "" }}
                  </p>
                  <div class="text-xs leading-[14px] line-clamp-2">
                    <div class="flex gap-1 flex-wrap" v-if="i.courses?.length">
                      <p>{{$t("leaderboard.unlock")}}</p>
                      <div>
                        <a
                          target="_blank"
                          :href="getLink(course)"
                          class="_c2a font-bold hover:underline"
                          v-for="(course, index) in i.courses"
                          >"{{ course.title }}"
                          <span
                            v-if="index < i.courses?.length - 1"
                            class="_c07"
                            >,</span
                          ></a
                        >
                      </div>
                    </div>
                    {{ i.members }}% {{$t("leaderboard.members")}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <p class="py-6 _c07">
        <span
          v-if="
            useMembers.store.activities?.data_7?.length ||
            useMembers.store.activities?.data_30?.length ||
            useMembers.store.activities?.data_all?.length
          "
        >
          Last updated:
          {{
            formatCustomDate(useMembers.store.activities.leaderboard_date)
          }}</span
        >
        <span v-else
          >{{$t("leaderboard.dateinfo")}}</span
        >
      </p>
      <div v-if="useMembers.store.activities" class="grid md:grid-cols-3 gap-5">
        <div v-for="i in activity_step" class="bg-white r_8 text-center">
          <h1 class="font-semibold py-5">Leaderboard ({{ i[0] }})</h1>
          <hr class="border_ce0" />
          <div
            v-if="!useMembers.store.activities[i[1]]?.length"
            class="space-y-2 py-6 _ca1 text-xs"
          >
            <img
              class="mx-auto"
              src="@/assets/svg/leaderboards/pending.svg"
              alt=""
            />
            <p>No activity yet</p>
          </div>
          <ul v-else class="space-y-4 overflow-auto max-h-[300px] p-6">
            <li
              v-for="(i, index) in useMembers.store.activities[i[1]]"
              :key="i.id"
              class="flex items-center gap-4 w-full"
            >
              <div class="relative full_flex" v-if="index < 3">
                <p
                  class="z-10 h-7 w-7 min-w-[28px] mx-2 full_flex rounded-full"
                  :style="{ background: step[index][0] }"
                >
                  {{ index + 1 }}
                </p>
                <IconStep
                  class="absolute bottom-[-8px]"
                  :fill="step[index][1]"
                />
              </div>
              <p
                v-else
                class="h-7 w-7 min-w-[28px] mx-2 full_flex rounded-full"
              >
                {{ index + 1 }}
              </p>
              <img
                class="h-10 w-10 min-w-[40px] rounded-full object-cover"
                :src="i.user.image"
                title="user"
              />
              <p class="truncate font-semibold w-[50%] text-start">
                {{ i.user.name }} {{ i.user.surname }}
              </p>
              <p class="_c2a text-sm">+{{ i.like_count }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});
import {
  useAuthStore,
  useMemberStore,
  useLoadingStore,
  useGroupStore,
} from "~/store";
import { role_ac } from "@/composables";

const useAuth = useAuthStore();
const useMembers = useMemberStore();
const isLoading = useLoadingStore();
const useGroup = useGroupStore();
const router = useRouter();
const { start, finish } = useLoadingIndicator();

useSeoMeta({
  title: computed(
    () => `Leaderboard · ${useGroup.store.group_by_username.name}`
  ),
  ogTitle: computed(
    () => `Leaderboard · ${useGroup.store.group_by_username.name}`
  ),
  description: computed(
    () => `Leaderboard · ${useGroup.store.group_by_username.description}`
  ),
  ogDescription: computed(
    () => `Leaderboard · ${useGroup.store.group_by_username.description}`
  ),
  ogImage: computed(() => `${useGroup.store.group_by_username.image}`),
  twitterCard: computed(() => `${useGroup.store.group_by_username.icon}`),
});

start();
await useAsyncData(
  "leaderboard",
  async () => {
    await useMembers.getLevels();
    await useMembers.getActivity();
    await useAuth.getUserWithGroup();
    finish();
  },
  { server: false }
);

const step = [
  ["#f8d481", "#F8CA60"],
  ["#909090", "#909090"],
  ["#a77b53", "#a77b53"],
];

const activity_step = [
  ["7-day", "data_7"],
  ["30-day", "data_30"],
  ["all-time", "data_all"],
];

function getLink(course) {
  const username = router.currentRoute.value.params.community;
  return `/${username}/classroom/${course.slug}`;
}
function formatCustomDate(date) {
  date = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 ni 12 ga o'zgartiramiz

  // Tegishli qo'shimchalarni topish
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayWithSuffix = day + getOrdinalSuffix(day);

  return `${month} ${dayWithSuffix} ${year} ${hours}:${minutes}${ampm}`;
}
</script>

<style lang="scss" scoped></style>
