<template>
  <main>
    <section
      v-if="isLoading.isLoadingType('getByUsername')"
      class="flex sm:flex-row flex-col-reverse gap-6 community_page"
    >
      <LoadingDiv class="h-[700px] w-full r_16" />
      <LoadingDiv class="h-[429px] min-w-[280px] r_16" />
    </section>
    <!-- info card -->
    <section v-else class="min-w-[280px] md:max-w-[280px]">
      <div class="rounded-2xl overflow-hidden bg-white">
        <img
          class="w-full h-[150px] object-cover"
          v-if="useGroup.store.group_by_username?.image"
          :src="useGroup.store.group_by_username?.image"
          alt=""
        />
        <div
          v-else-if="role_ac.includes(useGroup.store.group_by_username.type)"
          @click="() => isLoading.openDrawer(3)"
          class="full_flex hover:underline cursor-pointer w-full h-[150px] text-white"
          :style="`background: ${useGroup.store.group_by_username?.color}`"
        >
          {{ $t("about.coverphoto") }}
        </div>
        <div
          v-else
          class="full_flex hover:underline cursor-pointer w-full h-[150px] text-white"
          :style="`background: ${useGroup.store.group_by_username?.color}`"
        ></div>
        <div class="p-4 space-y-4">
          <h1 class="font-medium text-lg">
            {{ useGroup.store.group_by_username?.name }}
          </h1>
          <p class="flex items-center _ca1 gap-1 capitalize">
            <img src="@/assets/svg/community/grey_private.svg" alt="" />
            {{ $t(`nav.${useGroup.store.group_by_username?.group_type}`) }}
            <span class="lowercase">{{ $t("about.pg") }}</span>
          </p>
          <pre
            class="text-sm leading-[21px] whitespace-pre-line"
            v-html="useGroup.store.group_by_username?.excerpt"
          ></pre>
          <ul
            v-if="
              useGroup.store.showLinksPublic &&
              useGroup.store.group_by_username.links?.length
            "
            class="py-1 text-sm border-y border-[#E0E0E0]"
          >
            <li v-for="link in useGroup.store.group_by_username.links">
              <a
                :href="link.url"
                target="_blank"
                v-if="link.is_public == 0"
                class="flex items-center gap-1 h-7 px-3 _c59"
              >
                <img src="@/assets/svg/href.svg" alt="" />
                {{ link.label }}
              </a>
              <a
                v-else-if="useGroup.store.group_by_username.status == 'active'"
                :href="link.url"
                target="_blank"
                v-if="link.is_public"
                class="flex items-center gap-1 h-7 px-3 _c59"
              >
                <img src="@/assets/svg/href.svg" alt="" />
                {{ link.label }}
              </a>
            </li>
          </ul>
          <div class="flex items-center justify-around text-xs text-center">
            <div>
              <p class="_c2a text-lg">
                {{ useGroup.store.group_by_username.members_count }}
              </p>
              <p class="_ca1">{{ $t("nav.members") }}</p>
            </div>
            <!-- <div>
              <p class="_c2a text-lg">
                {{ useGroup.store.group_by_username.online }}
              </p>
              <p class="_ca1">Online</p>
            </div> -->
            <div>
              <p class="_c2a text-lg">
                {{ useGroup.store.group_by_username.admin_count }}
              </p>
              <p class="_ca1">{{ $t("about.admins") }}</p>
            </div>
          </div>
          <!-- <div class="flex -space-x-[5px]">
            <img v-for="(i, index) in 7" class="h-[26px] w-[26px] object-cover rounded-full" :src="isLoading.user.image"
              alt="" :style="`z-index: ${7 - index}`" />
          </div> -->
          <div>
            <div v-if="!isLoading.user.username">
              <button
                @click="useAuth.modal.login = true"
                class="b_cbc rounded-lg w-full font-semibold text-sm uppercase"
              >
                {{ $t("nav.login") }}
              </button>
            </div>
            <div
              v-else-if="useGroup.store.group_by_username.status == 'pending'"
            >
              <button
                class="b_cf2 rounded-lg pointer-events-none w-full font-semibold text-sm uppercase"
              >
                {{ $t("about.membership_pending") }}
              </button>
              <button
                @click="useMember.joinToGroup"
                v-loading="isLoading.isLoadingType('joinGroup')"
                class="_ca1 hover:underline text-[10px] text-center w-full uppercase"
              >
                {{ $t("about.cancel_membership") }}
              </button>
            </div>
            <button
              v-else-if="useGroup.store.group_by_username.status == 'active'"
              @click="isLoading.store.inviteModal = true"
              class="border border-[#f2f2f2] _ca1 rounded-lg w-full font-semibold text-sm uppercase"
            >
              {{ $t("nav.settings") }}
            </button>
            <div
              v-else-if="useGroup.store.group_by_username.status == 'banned'"
            >
              <button
                class="b_cf2 _ca1 rounded-lg pointer-events-none w-full font-semibold text-sm uppercase"
              >
                {{ $t("about.banned") }}
              </button>
              <p class="_ca1 text-[10px] my-2">
                {{ $t("about.sorry_banned") }}
              </p>
            </div>
            <button
              v-else
              @click="joinToGroup"
              v-loading="isLoading.isLoadingType('joinGroup')"
              class="b_cbc rounded-lg w-full font-semibold text-sm uppercase"
            >
              {{
                useGroup.store.group_by_username.group_price == "free"
                  ? $t("about.join")
                  : `${$t('payment.join')} ${useGroup.store.group_by_username.price} UZS/${$t(
                      "payment.month"
                    )}`
              }}
            </button>
          </div>
        </div>
      </div>
      <div
        class="bg-white mt-5 r_16 px-4 py-5"
        v-if="useMember.store.activities30?.length"
      >
        <h1 class="font-semibold">Leaderboard (30-day)</h1>
        <div class="text-sm border-t borer-[#E0E0E0] py-4 mt-4">
          <div
            v-for="(i, index) in useMember.store.activities30"
            class="flex items-center h-[44px] justify-between"
          >
            <div class="flex items-center gap-2 max-w-[80%]">
              <p
                :class="
                  index == 0
                    ? 'b_c2a !text-white'
                    : index == 1
                    ? 'b_c59 !text-white'
                    : index == 2
                    ? 'b_cbc'
                    : ''
                "
                class="full_flex _c07 font-medium rounded-full w-7 h-7 min-w-[28px]"
              >
                {{ index + 1 }}
              </p>
              <img
                class="h-5 w-5 min-w-[20px] rounded-full object-cover"
                :src="i.user.image"
                title="user"
              />
              <p class="truncate font-semibold w-[70%] text-start">
                {{ i.user.name }} {{ i.user.surname }}
              </p>
            </div>
            <p class="_c2a font-medium text-xs min-w-[42px] text-end">
              +{{ i.like_count }}
            </p>
          </div>
        </div>
        <router-link
          class="_c2a text-sm font-semibold"
          :to="`/${$router.currentRoute.value.params.community}/leaderboards`"
          >See all leaderboards</router-link
        >
      </div>
      <div
        v-if="$router.currentRoute.value?.name == 'community-about'"
        class="full_flex flex-wrap mt-8 gap-2 leading-[18px]"
      >
        <span v-if="$t('nav.uz') == 'en' || $t('nav.uz') == 'ru'">{{
          $t("about.poweredby")
        }}</span>
        <img class="mt-0.5" src="/logo.svg" alt="" />
        <span v-if="$t('nav.uz') != 'en' && $t('nav.uz') != 'ru'">{{
          $t("about.poweredby")
        }}</span>
      </div>
    </section>

    <!-- Membership pending -->
    <el-dialog
      v-model="useGroup.modal.pending"
      width="400"
      align-center
      class="!rounded-xl overflow-hidden px-6 py-7"
    >
      <div class="space-y-7 _c07 text-center">
        <h1 class="text-2xl font-semibold">
          {{ $t("about.membership_pending") }}
        </h1>
        <p class="text-lg">
          {{ $t("about.modal_title") }}
        </p>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button
            @click="useGroup.modal.pending = false"
            v-loading="isLoading.isLoadingType('deletePost')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg w-full"
          >
            {{ $t("about.gotit") }}
          </button>
        </div>
      </div>
    </el-dialog>
  </main>
</template>

<script setup>
import {
  useLoadingStore,
  useGroupStore,
  usePaymentStore,
  useMemberStore,
  useAuthStore,
} from "@/store";
import { role_ac } from "@/composables";

const router = useRouter();
const isLoading = useLoadingStore();
const useMember = useMemberStore();
const useGroup = useGroupStore();
const usePayment = usePaymentStore();
const useAuth = useAuthStore();

function joinToGroup() {
  if (useGroup.store.group_by_username.group_price == "paid") {
    usePayment.store.joinToGroupModal = true;
  } else {
    useMember.joinToGroup();
    // router.push(`/${router.currentRoute.value.params.community}`);
  }
}

onBeforeMount(() => {
  useMember.getActivity30();
});
</script>

<style lang="scss" scoped></style>
