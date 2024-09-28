<template>
  <main class="flex md:flex-row flex-col-reverse gap-5">
    <div class="space-y-5 w-full overflow-hidden">
      <section class="bg-white px-4 py-6 rounded-xl">
        <h1 class="text-sm font-semibold mb-[20px]">{{ $t("profile.activity") }}</h1>
        <div>
          <div class="flex gap-6">
            <div class="text-xs mt-[30px] space-y-[18px] leading-[14px] whitespace-">
              <p v-for="(i, index) in weeks">{{ i }}</p>
            </div>
            <div class="max-w-[900px] w-[ overflow-auto overflow-x-auto">
              <div class="flex text-xs ml-6 mr-14 leading-[14px] mb-4">
                <p
                  class=""
                  :style="`padding-left: ${
                    (monthNames.indexOf(monthNames[index + 1]) -
                      monthNames.indexOf(monthNames[index])) *
                    50
                  }px`"
                  v-for="(i, index) in months"
                >
                  {{ findMonth(index) }}
                </p>
              </div>
              <div
                class="flex flex-col flex-wrap h-[108px] gap-[4px] cursor-pointer"
              >
                <el-tooltip
                  v-for="(i, index) in store.calendar"
                  :content="`<div class='text-center text-xs font-medium'><p>${
                    i[4] == 0
                      ? 'No activities'
                      : i[4] == 1
                      ? '1 activity'
                      : i[4] + ' activities'
                  }</p><p class='_ca1 font-semibold'>${i[3]}, ${i[1]} ${
                    i[2]
                  }, ${i[0]}</p></div>`"
                  placement="bottom"
                  raw-content
                >
                  <p
                    :style="{
                      background: `${i[4] < 4 ? colors[i[4]] : colors[5]}`,
                    }"
                    class="h-3 w-3 rounded-[1px] text-[8px]"
                  ></p>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between ml-[44px] mt-4">
            <p class="_ca1">{{ $t("profile.what") }}</p>
            <ul class="flex gap-1 items-center">
              <li class="pr-1">{{ $t("nav.less") }}</li>
              <li>
                <p class="h-3 w-3 rounded-[1px] b_ce0"></p>
              </li>
              <li>
                <p class="h-3 w-3 rounded-[1px] bg-[#DAEDFF]"></p>
              </li>
              <li>
                <p class="h-3 w-3 rounded-[1px] b_cbc"></p>
              </li>
              <li>
                <p class="h-3 w-3 rounded-[1px] b_c59"></p>
              </li>
              <li>
                <p class="h-3 w-3 rounded-[1px] b_c2a"></p>
              </li>
              <li class="pl-1">{{ $t("nav.more") }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="bg-white px-4 py-6 rounded-xl">
        <h1 class="font-semibold text-sm mb-7">{{ $t("profile.createdby") }} Xayot</h1>
        <div class="flex items-center justify-between h-10">
          <div class="full_flex gap-4">
            <div
              class="w-10 h-10 b_c2a r_8 full_flex overflow-hidden"
              v-if="true"
            >
              <p class="font-semibold text-white">DM</p>
              <!-- <img class="w-10 h-10 object-cover" :src="i.image"
                                                            alt=""> -->
            </div>
            <img v-else src="@/assets/image/picture.png" alt="" />
            <div>
              <h1 class="font-semibold">Digital Marketer</h1>
              <p><span class="capitalize">Private</span> • 1 member</p>
            </div>
          </div>
          <button class="b_cbc px-6 uppercase font-semibold r_8">view</button>
        </div>
      </section>

      <section class="bg-white px-4 py-6 rounded-xl ">
        <h1 class="font-semibold text-sm mb-7">Memberships</h1>
        <div class="lg:flex grid items-center gap-10">
          <div v-for="i in 2" class="flex items-center lg:justify-center gap-4 h-10">
            <div
              class="w-10 h-10 b_c2a r_8 full_flex overflow-hidden"
              v-if="true"
            >
              <p class="font-semibold text-white">DM</p>
              <!-- <img class="w-10 h-10 object-cover" :src="i.image"
                                                            alt=""> -->
            </div>
            <img v-else src="@/assets/image/picture.png" alt="" />
            <div>
              <h1 class="font-semibold">Digital Marketer</h1>
              <p><span class="capitalize">Private</span> • 1 member</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <nav class="lg:flex items-center justify-between pt-4 mb-5 lg:space-y-0 space-y-5">
          <p class="text-sm font-semibold w-full">
            1 contribution to Digital Marketer
          </p>
          <div class="flex items-center lg:justify-start justify-end w-full whitespace-nowrap gap-5">
            <p class="_ca1 flex gap-1">
              Contributions for: <span class="_c2a">Digital Marketer</span
              ><img src="@/assets/svg/profile_arrow.svg" alt="" />
            </p>
            <img src="@/assets/svg/filter_blue.svg" alt="" />
          </div>
        </nav>
      </section>
      <section class="bg-white px-4 pt-6 rounded-xl">
        <div class="flex lg:flex-row flex-col-reverse lg:items-center justify-between gap-3">
          <div class="flex lg:items-center gap-4 w-full">
            <div class="relative max-w-fit">
              <img src="@/assets/image/user.svg" alt="" />
              <div class="full_flex absolute -bottom-[2px] -right-[5px] z-10">
                <div class="relative">
                  <img src="@/assets/svg/community/user_messages.svg" alt="" />
                  <p
                    class="absolute full_flex bottom-0 w-5 h-5 pb-0.5 text-[10px] text-white font-medium"
                  >
                    1
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-[2px]">
              <h1 class="font-semibold">Cameron Williamson</h1>
              <p class="text-xs">
                19d ago in <span class="_c59">Announcements</span>
              </p>
            </div>
          </div>
          <div class="flex gap-2 whitespace-nowrap lg:w-auto w-full lg:justify-start justify-end">
            <button class="border border-[#BCDEFF] bg-[#F0F5FA] r_8 px-3 h-9">
              Watching (1)
            </button>
            <el-dropdown
              placement="bottom-end"
              class="dropdown"
              trigger="click"
            >
              <button class="full_flex comment_menu r_8 w-9 h-9">
                <img src="@/assets/svg/three_dot.svg" alt="" />
              </button>
              <template #dropdown>
                <el-dropdown-menu class="min-w-[140px] dropdown_shadow">
                  <el-dropdown-item
                    @click="copyLink"
                    class="!text-xs font-medium h-10 px-3"
                    >Copy link</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="store.reportAdmin = true"
                    class="!text-xs font-medium h-10 px-3"
                    >Report to admins</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <h2
          class="mb-4 md:mt-8 mt-6 md:text-2xl text-lg font-semibold md:w-full"
        >
          Introducing "The Learnify Games"
        </h2>
        <pre
          class="text-sm line-clamp-[11] float-left w-full whitespace-pre-line"
        >
Ready?</pre
        >
        <button class="text-sm _c2a h-4">See more</button>
        <div class="w-full mt-4 mb-5">
          <!-- <img
          class="max-h-[210px] rounded-[12px]"
          src="@/assets/image/picture.png"
          alt=""
        /> -->
        </div>
        <div class="flex items-center _c59 gap-4 text-sm">
          <p
            class="full_flex border border-[#F0F5FA] r_8 p-[6px] leading-[21px] h-8 gap-1"
          >
            <img src="@/assets/svg/community/like.svg" alt="" /> Like
            <span class="_cf0f pb-0.5">|</span> 355
          </p>
          <p class="full_flex h-8 gap-1">
            <img src="@/assets/svg/community/message.svg" alt="" />
            609 comments
          </p>
        </div>
        <!-- comment -->
        <section class="mt-4">
          <div
            class="flex items-start gap-4 border-y border-[#F0F5FA] w-full -mx-5 p-5"
          >
            <div class="relative max-w-fit">
              <img
                class="h-10 w-10 object-cover"
                src="@/assets/image/user.svg"
                alt=""
              />
              <div class="full_flex absolute -bottom-[2px] -right-[5px] z-10">
                <div class="relative">
                  <img src="@/assets/svg/community/user_messages.svg" alt="" />
                  <p
                    class="absolute full_flex bottom-0 w-5 h-5 pb-0.5 text-[10px] text-white font-medium"
                  >
                    1
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full">
              <div class="space-y-[2px] h-10">
                <h1 class="font-semibold text-[16px]">Cameron Williamson</h1>
                <p class="text-xs _ca1">19d ago</p>
              </div>
              <div class="space-y-3 mt-3">
                <div class="space-y-3">
                  <p class="text-sm leading-4 text-black">Nice🔥🔥</p>
                  <div class="relative max-w-fit">
                    <img
                      class="max-h-20 r_8"
                      src="@/assets/image/photo.svg"
                      alt=""
                    />
                    <img
                      class="absolute z-10 tblr m-auto"
                      src="@/assets/svg/gif.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div class="flex items-center gap-3 h-[18px] text-xs">
                  <p class="full_flex gap-1 _c2a">
                    <img src="@/assets/svg/like_active.svg" alt="" />14
                  </p>
                  <button class="_ca1 font-semibold">Reply</button>
                </div>
              </div>
              <div class="flex items-start w-full gap-4 mt-5">
                <div class="relative max-w-fit">
                  <img
                    class="h-6 w-6 object-cover"
                    src="@/assets/image/user.svg"
                    alt=""
                  />
                  <div
                    class="full_flex absolute -bottom-[2px] -right-[5px] z-10"
                  >
                    <div class="relative">
                      <img
                        class="h-3 w-3"
                        src="@/assets/svg/community/user_messages.svg"
                        alt=""
                      />
                      <p
                        class="absolute full_flex bottom-0 h-3 w-3 pb-0.5 text-[8px] text-white font-medium"
                      >
                        1
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-full">
                  <div class="space-y-[1px] h-10">
                    <h1 class="font-semibold text-[16px] leading-4">
                      Cameron Williamson
                    </h1>
                    <p class="text-xs _ca1 leading-[14px]">19d ago</p>
                  </div>
                  <div class="space-y-3 mt-4">
                    <p class="text-sm leading-4 text-black">
                      <a
                        class="_c2a border-b border-[#2A85FF]"
                        href="/@gerry_gonzalez"
                        >@Gerry Gonzalez</a
                      >
                      Continue making progress
                    </p>
                    <div class="flex items-center gap-3 h-[18px] text-xs">
                      <p class="full_flex gap-1 _ca1">
                        <img src="@/assets/svg/like_grey.svg" alt="" />14
                      </p>
                      <button class="_ca1 font-semibold">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
    <div class="w-">
      <section class="bg-white rounded-xl p-5 pb-[60px] w-full max-h-fit">
        <div class="flex gap-20">
          <div
            class="flex flex-col items-center mx-auto relative min-w-[240px]"
          >
            <el-progress :stroke-width="11" type="circle" :percentage="5" />
            <div class="absolute mx-auto top-[14.5px]">
              <div class="relative max-w-fit">
                <img
                  class="h-[138px] w-[138px] object-cover"
                  src="@/assets/image/user.svg"
                  alt=""
                />
                <div
                  class="full_flex absolute -bottom-[2px] -right-[16px] z-10"
                >
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
            <button
              class="my-5 mb-3 _c2a font-semibold text-xs b_cd9 h-8 px-[10px] rounded-full"
            >
              Level 1 - STARTER
            </button>
            <div class="flex items-center gap-1 text-xs">
              <p class="_c2a">40</p>
              <p class="_c07">points to level up</p>
              <img src="@/assets/svg/members/pending.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <h1 class="text-xl font-semibold mt-5 w-full truncate">
            Xayot Sharapov
          </h1>
          <p class="_ca1 text-sm font-semibold">@xayot-sharapov-7295</p>
          <p class="text-sm">Digital Marketer</p>
          <div class="space-y-3 py-5">
            <button class="full_flex gap-1 b_cf2 h-7 px-2 r_8">
              <img class="h-3 w-3" src="@/assets/svg/online.svg" alt="" />
              Online now
            </button>
            <button class="full_flex gap-1 b_cf2 h-7 px-2 r_8">
              <img
                class="h-4 w-4"
                src="@/assets/svg/calendar_black.svg"
                alt=""
              />
              Joined Feb 3, 2024
            </button>
            <button class="full_flex gap-1 b_cf2 h-7 px-2 r_8">
              <img
                class="h-4 w-4"
                src="@/assets/svg/location_black.svg"
                alt=""
              />
              Tashkent
            </button>
          </div>
          <ul class="grid grid-cols-3 text-center gap-4 pb-5">
            <li>
              <p class="text-lg font-medium _c2a">1</p>
              <p class="_ca1 text-xs">Contributions</p>
            </li>
            <li>
              <p class="text-lg font-medium _c2a">0</p>
              <p class="_ca1 text-xs">Followers</p>
            </li>
            <li>
              <p class="text-lg font-medium _c2a">3</p>
              <p class="_ca1 text-xs">Following</p>
            </li>
          </ul>
          <!-- :class="useSettings.store.is_update ? 'b_cbc _c07' : 'b_ce0 _ca1'" -->
          <button
            class="font-semibold px-6 r_8 w-full uppercase _c2a border_cbc mt-7"
          >
            update profile
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { Calendar } from "calendar";
import { useProfileStore } from "@/store";

const useProfile = useProfileStore();
const cal = new Calendar(1);
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

const colors = [
  "#F2F2F2",
  "#E0E0E0",
  "#DAEDFF",
  "#BCDEFF",
  "#59ACFF",
  "#2A85FF",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const weeks = ["Mon", "Wed", "Fri", "Sun"];

const store = reactive({
  t: 0,
  calendar: [],
  startAndEndDate: [],
  currentDate: new Date().getDate(),
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  is_current: false,
  data: true,
  monthIndex: [],
});

function findMonth(index) {
  const data = [...new Set(store.monthIndex)][index + 1];
  const month = monthNames.indexOf(data);
  return months[month];
}

function getActivity() {
  store.calendar = [];
  store.t = 0;
  const currentDate = new Date();
  const endDate = new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000);
  endDate.setMonth(endDate.getMonth() + 1);
  for (let i = 0; i < 12; i++) {
    getCalendar(endDate.getFullYear(), endDate.getMonth());
    endDate.setMonth(endDate.getMonth() + 1);
  };
}

function getCalendar(year, month) {
  let count = 0;
  let date1, date2, getMonth, getDate, getDay, getFullYear;
  cal.monthDates(
    year,
    month,
    function (d) {
      getDay = d.getDay();
      getDate = d.getDate();
      getMonth = d.getMonth();
      getFullYear = d.getFullYear();
      if (getMonth == month) {
        if (getDay == 1 && !store.is_current && store.data) {
          store.is_current = true;
          store.data = false;
        }
        if (store.is_current) {
          for (let i of useProfile.store.profile) {
            date1 = new Date(getFullYear, getMonth, getDate).setHours(
              0,
              0,
              0,
              0
            );
            date2 = new Date(i.date).setHours(0, 0, 0, 0);
            if (date1 == date2) {
              count =
                +i.comments_count +
                +i.created_groups +
                +i.joined_groups_count +
                +i.likes_count;
              break;
            }
          }
          store.monthIndex.push(monthNames[getMonth]);
          store.calendar.push([
            getFullYear,
            monthNames[getMonth],
            (" " + getDate).slice(-2),
            weekNames[getDay],
            count,
          ]);
          count = 0;
        }
        if (
          store.currentYear == getFullYear &&
          store.currentMonth == getMonth &&
          store.currentDate == getDate
        ) {
          store.is_current = false;
          return;
        }
        store.t++;
      }
      //   return [d.getMonth(), (" " + getDate).slice(-2), t];
    },
    function (w) {
      return w;
    }
  );
}
onBeforeMount(() => {
  useProfile.get_profile();
});

watch(
  () => useProfile.store.profile,
  () => {
    getActivity();
  }
);
</script>

<style lang="scss" scoped></style>
