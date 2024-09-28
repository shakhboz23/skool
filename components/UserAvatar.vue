<template>
  <el-dropdown placement="top-start" class="dropdown">
    <div v-if="height == 24">
      <slot></slot>
    </div>
    <div v-else class="relative max-w-fit">
      <img
        class="object-cover rounded-full min-w-[40px] max-h-[40px] not_open"
        :src="user?.image"
        :height="height"
        :width="height"
        alt=""
      />
      <div class="full_flex absolute -bottom-[2px] -right-[5px] z-10 not_open">
        <div class="relative not_open">
          <img
            src="@/assets/svg/community/user_messages.svg"
            alt=""
            class="not_open"
          />
          <p
            class="absolute not_open full_flex bottom-0 pb-0.5 w-5 h-5 text-[10px] text-white font-medium"
          >
            {{ user.level }}
          </p>
        </div>
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu
        class="!static min-w-[440px] max-w-[440px] !-ml-1 dropdown_shadow"
      >
        <div class="flex">
          <div class="border-r border-[#F2F2F2] min-w-[192px] p-4 space-y-3">
            <div class="relative user_img max-w-fit">
              <img
                class="h-[160px] w-[160px] object-cover rounded-full"
                :src="user?.image"
                alt=""
              />
              <div class="full_flex absolute -bottom-[2px] -right-[5px] z-10">
                <div class="relative">
                  <img
                    class="h-10 w-10"
                    src="@/assets/svg/community/user_messages.svg"
                    alt=""
                  />
                  <p
                    class="absolute full_flex bottom-0 w-10 h-10 pb-2 text-[22px] text-white font-medium"
                  >
                    {{ user.level }}
                  </p>
                </div>
              </div>
            </div>
            <p
              class="full_flex max-w-fit mx-auto text-xs font-semibold h-8 px-[10px] bg-[#D9ECFF] _c2a rounded-full"
            >
              Level {{ user.level }}
              {{ user.level_name ? " - " + user.level_name : "" }}
            </p>
            <div class="full_flex gap-1 text-xs">
              <span class="_c2a font-semibold">{{ user.points }}</span> points
              to level up
              <img src="@/assets/svg/level_up.svg" alt="" />
            </div>
          </div>
          <div>
            <div class="space-y-4 px-5 py-5 v border-b border-[#F2F2F2]">
              <h1 class="font-semibold text-xl leading-6">
                {{ user.name }} {{ user.surname }}
              </h1>
              <ul class="space-y-2">
                <li class="flex items-center gap-2 leading-[14px] _ca1">
                  <img src="@/assets/svg/clock.svg" alt="" />
                  <p>Active {{ formatDate(user.updated_at) }}</p>
                </li>
                <li v-if="user.address" class="flex items-center gap-2 _ca1">
                  <img src="@/assets/svg/location.svg" alt="" />
                  <p>{{ user.address }}</p>
                </li>
              </ul>
              <p
                class="line-clamp-3 overflow_hidden leading-[18px] text-[16px]"
              >
                {{ user.bio }}
              </p>
            </div>
            <div class="space-y-2 leading-[14px] p-4 font-semibold">
              <p v-if="user.membership">
                {{
                  user.membership <= 1
                    ? user.membership + " Membership"
                    : user.membership + " Memberships"
                }}
                <span v-if="user.common">({{ user.common }} <span v-if="$t('nav.uz') == 'en'">in</span> common)</span>
              </p>
              <p v-if="user.creator">
                Creator of
                {{
                  user.creator <= 1
                    ? user.creator + " group"
                    : user.creator + " groups"
                }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-3 gap-3 border-t border-[#F2F2F2] p-4 font-semibold text-sm w-full"
        >
          <button @click="$router.push(`/profile/${user.username}`)" class="uppercase border border-[#BCDEFF] r_8">{{$t("settings.Profile")}}</button>
          <!-- <button class="uppercase border border-[#BCDEFF] r_8">
                          follow
                        </button>
                        <button @click="openChatModal(user)" class="full_flex gap-[10px] uppercase b_ce0 _ca1 r_8">
                          chat
                          <img src="@/assets/svg/chat_x.svg" alt="" />
                        </button> -->
        </div>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useFormatDate } from "@/composables";
const { formatDate } = useFormatDate();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  height: {
    type: Number,
    default: 40,
  },
});

const user = reactive({
  ...props.user,
});

const height = ref(props.height);
</script>

<style lang="scss" scoped></style>
