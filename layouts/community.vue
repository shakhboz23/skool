<template>
  <header class="pb-[60px] relative">
    <!-- <marquee class="fixed bottom-0 left-0 z-10 bg-white">
      <ul class="flex gap-40 py-0.5">
        <li>The site is working in test mode</li>
        <li>The site is working in test mode</li>
        <li>The site is working in test mode</li>
        <li>The site is working in test mode</li>
        <li>The site is working in test mode</li>
        <li>The site is working in test mode</li>
      </ul>
    </marquee> -->
    <NuxtLoadingIndicator height="4" color="#2a85ff" />
    <div class="h-[64px] mb-10">
      <Navbar />
    </div>
    <Pinned class="absolute top-0 left-0" />
    <div
      class="pb-[40px] mx-auto xl:px-[200px] lg:px-[100px] md:px-[100px] sm:px-[50px] px-5 max-w-[1536px]"
    >
      <div
        v-if="useGroup.store.group_by_username.status == 'active'"
        :class="
          isLoading.isLoadingType('getByUsername') ? 'pointer-events-none' : ''
        "
      >
        <Community_tabs />
      </div>
      <slot />
    </div>
    <Pagination v-if="$router.currentRoute.value.name == 'index'" />

    <!-- cropper image -->
    <el-dialog
      v-model="isLoading.store.inviteModal"
      width="1036px"
      align-center
      class="bg-opacity-50 !p-0 !rounded-lg members_dialog overflow-hidden"
    >
      <MembersModal />
    </el-dialog>

    <!-- add course -->
    <el-dialog
      v-model="useClassroom.store.add_course"
      align-center
      class="lg:min-w-[780px] min-w-[calc(100vw_-_40px)] bg-opacity-50 p-6 !rounded-lg"
    >
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <h1 class="md:text-2xl text-lg pb-2 font-semibold _c07">
          <span v-if="$t('nav.uz') == 'en' || $t('nav.uz') == 'ru'">
            <span v-if="useClassroom.store.edit_course">{{ $t("edit") }}</span
            ><span v-else>{{ $t("add") }}</span>
          </span>
          {{ $t("course.course") }}
          <span
            class="lowercase"
            v-if="$t('nav.uz') != 'en' || $t('nav.uz') != 'ru'"
          >
            <span v-if="useClassroom.store.edit_course">{{ $t("edit") }}</span
            ><span v-else>{{ $t("add") }}</span>
          </span>
        </h1>
        <div>
          <input
            @input="handleInput('input')"
            v-model="useClassroom.create.title"
            type="text"
            class="text-sm"
            :placeholder="$t('course.name')"
            required
          />
          <p class="text-end mt-2 _ca1 md:text-sm text-xs">
            {{ useClassroom.create.title?.length }}/50
          </p>
        </div>
        <div>
          <textarea
            @input="handleInput('textarea')"
            id="write_message"
            v-model="useClassroom.create.description"
            class="h-[90px] text-sm w-full rounded-[4px]"
            :placeholder="$t('course.description')"
          ></textarea>
          <p class="text-end mt-2 _ca1 md:text-sm text-xs">
            {{ useClassroom.create.description?.length }}/150
          </p>
        </div>
        <div>
          <label class="_ca1 text-xs" for="access">{{
            $t("course.access")
          }}</label>
          <el-select
            class="block w-full mt-2"
            v-model="useClassroom.create.access"
            placeholder="Select"
          >
            <el-option
              v-for="item in access_list"
              :key="item.value"
              :label="$t(`course.${item.label}`)"
              :value="item.value"
              :disabled="item.disabled"
            >
              <div class="flex items-center gap-2">
                {{ $t(`course.${item.label}`) }}
                <img
                  v-if="useClassroom.create.access == item.value"
                  src="@/assets/svg/checked.svg"
                  alt=""
                />
              </div>
            </el-option>
          </el-select>
        </div>
        <div v-if="useClassroom.create.access == 'level_lock'">
          <label class="_ca1 text-xs" for="access"
            >Access starts at level</label
          >
          <el-select
            class="block w-full mt-2 el_select"
            v-model="useClassroom.create.level"
            placeholder="Select"
          >
            <el-option
              v-for="item in 9"
              :key="item"
              :label="item"
              :value="item"
            >
              <div class="flex items-center gap-2">
                {{ item }}
                <img
                  v-if="useClassroom.create.level == item"
                  src="@/assets/svg/checked.svg"
                  alt=""
                />
              </div>
            </el-option>
          </el-select>
        </div>
        <div class="sm:flex gap-4">
          <label
            v-if="!isLoading.store.croppedImage"
            for="add_photo_course"
            class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm sm:h-[188px] h-[164px] sm:w-[366px] w-full"
          >
            <img src="@/assets/svg/add_photo.svg" alt="" />
            <p>{{ $t("course.photo") }}</p>
          </label>
          <label class="relative imagelabel" v-else for="add_photo_course">
            <button
              @click="deleteImage"
              type="button"
              class="absolute deleteimage !hidden top-2 right-2 rounded-full w-7 h-7 full_flex border p-2"
            >
              <img src="@/assets/svg/x.svg" alt="" />
            </button>
            <img
              class="sm:h-[188px] h-[164px] sm:w-[366px] w-full overflow-hidden rounded-xl object-cover"
              :src="isLoading.store.croppedImage"
              alt=""
            />
          </label>
          <div class="sm:block flex items-center justify-between py-5">
            <div class="sm:mb-5">
              <p class="text-xl font-medium _c07">{{ $t("course.cover") }}</p>
              <p class="_ca1 text-xs font-medium mt-1">1460x752 px</p>
            </div>
            <label
              for="add_photo_course"
              class="_ca1 full_flex uppercase block h-10 px-6 text-sm font-semibold border border-[#E0E0E0] r_8"
            >
              {{ $t("course.change") }}
            </label>
          </div>
          <input
            @change="handleAddedPhoto"
            id="add_photo_course"
            type="file"
            class="w-0 h-0 overflow-hidden !p-0"
          />
        </div>
        <div
          class="flex items-center justify-between !sm:mt-6 !mt-1"
          :class="useClassroom.store.add_course ? '' : 'pb-12'"
        >
          <div class="flex items-center gap-6">
            <p
              v-if="useClassroom.create.published"
              class="text-[16px] _c07 font-medium"
            >
              {{ $t("course.published") }}
            </p>
            <p v-else class="text-[16px] font-medium">
              {{ $t("course.draft") }}
            </p>
            <el-switch v-model="useClassroom.create.published" class="ml-2" />
          </div>
          <div
            v-if="!useClassroom.store.edit_course"
            class="flex gap-3 text-sm font-semibold"
          >
            <button
              type="button"
              @click="useClassroom.store.add_course = false"
              class="uppercase h-10 px-6 rounded-lg _ca1"
            >
              {{ $t("cancel") }}
            </button>
            <button
              :type="
                isLoading.isLoadingType('createCourse') ? 'button' : 'submit'
              "
              :class="useClassroom.create.title ? 'b_cbc _c07' : 'b_ce0 _ca1'"
              @click="reposrtToAdmins"
              class="uppercase h-10 px-6 rounded-lg"
              v-loading="isLoading.isLoadingType('createCourse')"
            >
              {{ $t("add") }}
            </button>
          </div>
        </div>
        <div
          v-if="useClassroom.store.edit_course"
          class="flex items-center justify-between text-sm font-semibold whitespace-nowrap"
        >
          <div class="flex justify-end w-full gap-3">
            <button
              type="button"
              @click="useClassroom.store.add_course = false"
              class="uppercase h-10 px-6 rounded-lg _ca1"
            >
              {{ $t("cancel") }}
            </button>
            <button
              :type="
                isLoading.isLoadingType('createCourse') ? 'button' : 'submit'
              "
              :class="useClassroom.create.title ? 'b_cbc _c07' : 'b_ce0 _ca1'"
              @click="reposrtToAdmins"
              class="uppercase h-10 px-6 rounded-lg"
              v-loading="isLoading.isLoadingType('addEvents')"
            >
              <span v-if="useClassroom.store.edit_course">{{
                $t("save")
              }}</span>
              <span v-else>{{ $t("add") }}</span>
            </button>
          </div>
        </div>
      </form>
    </el-dialog>

    <!-- Delete -->
    <el-dialog
      v-model="useClassroom.store.delete"
      width="400"
      align-center
      class="!rounded-xl overflow-hidden px-6 py-7"
    >
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">{{ $t("course.delete") }}</h1>
        <p class="text-lg">{{ $t("about.deleteaccept") }}</p>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button
            @click="useClassroom.store.delete = false"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
            {{ $t("cancel") }}
          </button>
          <button
            @click="useClassroom.delete_course"
            v-loading="isLoading.isLoadingType('deleteCourse')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            {{ $t("delete") }}
          </button>
        </div>
      </div>
    </el-dialog>

    <!-- join to group -->
    <el-dialog
      v-model="usePayment.store.reactive"
      width="400"
      align-center
      class="bg-opacity-50 !rounded-lg"
    >
      <div class="text-center mb-4 space-y-2">
        {{ $t("payment.archivedgroup") }}
      </div>
      <h1 class="text-black text-sm text-center">
        {{ $t("payment.reactiveinfo[0]") }}
        {{ isLoading.getCurrentSetting("group_price") }}
        {{ $t("payment.reactiveinfo[1]") }}
      </h1>
      <form
        v-if="usePayment.store.join_step == 1"
        @submit.prevent="usePayment.reactiveGroup"
      >
        <label for="name" class="_ca1 mb-2 block mt-5">{{
          $t("payment.cardnumber")
        }}</label>
        <div class="flex items-center justify-between">
          <input
            @input="usePayment.getCardType"
            v-model="usePayment.card.cardNumber"
            class="placeholder-[#A1A1A1] w-full"
            type="text"
            name="credit-number"
            placeholder="0000 0000 0000 0000"
            required
          />
          <div class="flex items-center gap-2 -ml-[108px] pr-3">
            <img
              v-if="usePayment.store.cardType.type == 'visa'"
              src="@/assets/svg/billing/electron.svg"
              alt=""
            />
            <img
              v-else-if="usePayment.store.cardType.type == 'maestro'"
              src="@/assets/svg/billing/maestro.svg"
              alt=""
            />
            <img
              v-else-if="usePayment.store.cardType.type == 'mastercard'"
              src="@/assets/svg/billing/mastercard.svg"
              alt=""
            />
            <img
              v-else-if="usePayment.store.cardType.type == 'uzcard'"
              src="@/assets/svg/billing/uzcard.svg"
              alt=""
            />
            <img
              v-else-if="usePayment.store.cardType.type == 'humo'"
              src="@/assets/svg/billing/humo.svg"
              alt=""
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5 mt-4">
          <div>
            <label for="name" class="_ca1 mb-2 block">{{
              $t("payment.expdate")
            }}</label>
            <input
              @input="usePayment.prettyCardExpiryDate"
              v-model="usePayment.card.expiryDate"
              class="w-full placeholder-[#A1A1A1]"
              type="text"
              name="credit-expires"
              placeholder="MM/YY"
              required
            />
          </div>
          <div
            v-if="
              usePayment.store.cardType.type == 'visa' ||
              usePayment.store.cardType.type == 'mastercard'
            "
          >
            <label for="name" class="_ca1 mb-2 block">CVV</label>
            <input
              @input="usePayment.prettyCardCvc"
              v-model="usePayment.card.cvc"
              class="w-full placeholder-[#A1A1A1]"
              type="number"
              name="credit-cvc"
              placeholder="123"
              required
            />
          </div>
        </div>
        <p class="text-[#e74c3c] mt-2">{{ usePayment.store.payment_error }}</p>
        <button
          :class="
            usePayment.card.cardNumber && usePayment.card.expiryDate
              ? 'b_cbc _c07'
              : ''
          "
          type="submit"
          class="_ca1 mt-4 w-full font-semibold b_ce0 px-6 r_8 uppercase"
        >
          {{ $t("payment.reactive") }}
        </button>
      </form>
      <form
        v-else-if="usePayment.store.join_step == 2"
        @submit.prevent="usePayment.reactiveConfirmData"
      >
        <p class="mt-4">
          {{ $t("payment.sendto") }} {{ usePayment.store.payment_phone }}
        </p>
        <div class="grid grid-cols-2 gap-5 mt-2">
          <div>
            <label for="name" class="_ca1 mb-2 block">{{
              $t("payment.code")
            }}</label>
            <input
              v-model="usePayment.store.code"
              class="w-full placeholder-[#A1A1A1]"
              type="text"
              name="credit-expires"
              placeholder="000000"
              required
            />
          </div>
        </div>
        <p class="text-[#e74c3c] mt-2">{{ usePayment.store.payment_error }}</p>
        <div class="flex justify-end mt-4">
          <button
            type="button"
            @click="usePayment.store.reactive = false"
            class="_ca1 font-semibold px-6 r_8 uppercase"
          >
            {{ $t("cancel") }}
          </button>
          <button
            v-loading="isLoading.isLoadingType('reactiveConfirm')"
            :class="usePayment.store.code ? 'b_cbc _c07' : ''"
            class="font-semibold px-6 r_8 uppercase"
          >
            {{ $t("add") }}
          </button>
        </div>
      </form>
    </el-dialog>

    <!-- Delete -->
    <el-dialog
      v-model="isLoading.store.notPayedModal"
      width="400"
      align-center
      class="!rounded-xl overflow-hidden px-6 py-7"
    >
      <div class="space-y-7 _c07 text-center">
        <h1 class="font-semibold font-semibold text-lg">
          {{ $t("payment.archivedgroup") }}
        </h1>
        <p class="text-lg">
          {{ $t("payment.archivedinfo") }}
        </p>
        <button
          @click="isLoading.store.notPayedModal = false"
          v-loading="isLoading.isLoadingType('deleteCourse')"
          class="uppercase h-10 px-6 b_cbc _c07 rounded-lg w-full"
        >
          {{ $t("about.gotit") }}
        </button>
      </div>
    </el-dialog>

    <footer
      v-if="
        useGroup.store.group_by_username.is_paid == 'pending' &&
        role_ac.includes(useGroup.store.group_by_username.type)
      "
      class="flex items-center justify-center gap-6 w-full h-12 fixed bottom-0 bg-[#e74c3c] py-2 text-sm"
    >
      <p class="text-white">{{ $t("payment.archivedgroup") }}</p>
      <button
        @click="usePayment.store.reactive = true"
        class="bg-white px-4 h-9 rounded-lg uppercase text-xs font-semibold"
      >
        {{ $t("payment.reactive") }}
      </button>
    </footer>
  </header>
</template>

<script setup>
import {
  useLoadingStore,
  useGroupStore,
  useMemberStore,
  useClassroomStore,
  usePaymentStore,
} from "@/store";
import { role_ac } from "@/composables";

const isLoading = useLoadingStore();
const useMembers = useMemberStore();
const useClassroom = useClassroomStore();
const useGroup = useGroupStore();
const usePayment = usePaymentStore();

watch(
  () => isLoading.store.inviteModal,
  () => {
    if (!isLoading.store.inviteModal) {
      useMembers.store.manageUserRole = false;
    }
  }
);

function handleInput(type) {
  if (type == "input") {
    useClassroom.create.title = useClassroom.create.title?.slice(0, 50);
  } else {
    useClassroom.create.description = useClassroom.create.description?.slice(
      0,
      150
    );
  }
}

const access_list = [
  {
    label: "all",
    value: "public",
  },
  {
    label: "only",
    value: "private",
  },
  {
    label: "level",
    value: "level_lock",
  },
];

function handleAddedPhoto(e) {
  isLoading.store.cropModal = false;
  const file = e.target.files[0];
  // useClassroom.create.image = file;
  isLoading.store.previewImage = URL.createObjectURL(file);
  document.getElementById("add_photo_course").value = "";
  setTimeout(() => {
    isLoading.store.cropModal = true;
  }, 100);
}

function deleteImage() {
  useClassroom.create.image = "";
  isLoading.store.croppedImage = "";
}

function handleSubmit() {
  useClassroom.create_course();
}

watch(
  () => useClassroom.store.add_course,
  () => {
    if (!useClassroom.store.add_course) {
      useClassroom.clearCreate();
    }
  }
);

watch(
  () => usePayment.store.reactive,
  () => {
    usePayment.store.join_step = 1;
    usePayment.clearCard();
  }
);
</script>

<style lang="scss" scoped></style>
