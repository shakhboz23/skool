<template>
  <section>
    <div
      @click="openClick"
      class="flex items-center md:px-5 px-3 bg-white r_16 md:h-[72px] h-[52px] gap-[14px]"
    >
      <img
        class="md:h-10 md:w-10 h-7 w-7 object-cover rounded-full"
        :src="isLoading.user.image"
        alt=""
      />
      <button class="!border-0 placeholder-black md:text-xl font-semibold">
        {{ $t("community.write") }}...
      </button>
    </div>

    <div
      v-if="usePost.store.writingModal"
      @click="usePost.store.writingModal = false"
      class="fixed top-0 bg-black bg-opacity-50 min-h-screen w-full z-50 left-0"
    ></div>
    <form
      @submit.prevent="addVideo.handleSubmit"
      v-if="usePost.store.writingModal"
      class="b_cf0f relative z-50 r_16 overflow-hidden overflow-y-auto max-h-[calc(100vh_-_177px)] -mt-[72px]"
    >
      <div
        class="flex md:items-center gap-3 b_cf0f md:h-[52px] h-[64px] px-5 py-3"
      >
        <img
          class="h-5 w-5 object-cover rounded-full"
          :src="isLoading.user.image"
          alt=""
        />
        <p class="text-sm flex flex-wrap items-start gap-1 leading-4">
          <span class="font-semibold"
            >{{ isLoading.user_update_checker.name }}
            {{ isLoading.user_update_checker.surname }}</span
          >
          <span
            class="_ca1"
            v-if="$t('nav.uz') == 'en' || $t('nav.uz') == 'ru'"
            >{{ $t("course.postingin") }}</span
          >

          <span class="font-semibold _c2a md:w-auto w-full"
            >{{ useGroup.store.group_by_username.name }}
            <span
              class="_ca1"
              v-if="$t('nav.uz') != 'en' || $t('nav.uz') != 'ru'"
              >{{ $t("course.postingin") }}</span
            >
          </span>
        </p>
      </div>
      <div class="md:p-5 p-3 space-y-5 bg-white">
        <FloatingInput type="text" :label="$t('title')" v-model="usePost.create.title" required  />
        <div class="community_editor border h-[120px] whitespace-pre-wrap">
          <Editor />
        </div>
        <div
          v-if="Object.keys(usePost.store.polls).length"
          class="border_ce0 rounded-lg p-4"
        >
          <div class="flex items-center justify-between">
            <p class="font-medium">
            {{$t("course.poll")}}
            </p>
            <p
              @click="usePost.store.polls = {}"
              class="font-medium cursor-pointer hover:underline text-sm _ca1"
            >
            {{$t("course.remove")}}
            </p>
          </div>
          <ul class="space-y-2 mt-2">
            <li
              v-for="(i, index) in Object.keys(usePost.store.polls)"
              class="flex items-center gap-4"
            >
              <input
                v-model="usePost.store.polls[i]"
                type="text"
                :placeholder="`${$t('course.option')} ${index + 1}`"
              />
              <img
                v-if="Object.keys(usePost.store.polls).length > 2"
                @click="addVideo.deletePoll(i)"
                class="opacity-50 hover:bg-gray-300 cursor-pointer rounded-full p-2"
                src="@/assets/svg/x.svg"
                alt=""
              />
            </li>
          </ul>
          <button
            @click="addVideo.addPoll"
            type="button"
            class="uppercase border_ce0 px-3 rounded-md mt-2"
            :class="
              Object.keys(usePost.store.polls).length >= 10 ? 'b_ce0 _ca1' : ''
            "
          >
          {{$t("course.addoption")}}
          </button>
        </div>
        <ul
          v-if="addVideo.store.files.length"
          class="flex gap-5 overflow-x-auto"
        >
          <draggable
            :list="addVideo.store.files"
            group="grid"
            :animation="200"
            class="flex gap-4 overflow-hidden overflow-x-auto min-w-fit"
          >
            <li
              class="relative imagelabel"
              v-for="(i, index) in addVideo.store.files"
            >
              <button
                @click="addVideo.deleteImage(index)"
                type="button"
                class="absolute deleteimage z-10 bg-white !hidden top-2 right-2 rounded-full w-7 h-7 full_flex border p-2"
              >
                <img src="@/assets/svg/x.svg" alt="" />
              </button>
              <img
                v-if="i.type == 'image'"
                class="w-40 h-40 min-w-[160px] border rounded-xl object-cover"
                :src="i.url"
                alt=""
              />
              <div v-else-if="i.type == 'video'">
                <video
                  class="w-40 h-40 min-w-[160px] border rounded-xl object-cover"
                  controls
                >
                  <source :src="i.url" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <iframe
                v-else-if="
                  i.type == 'youtube' ||
                  i.type == 'wistia' ||
                  i.type == 'vimeo' ||
                  i.type == 'loom'
                "
                class="w-40 h-40 min-w-[160px] border rounded-xl object-cover text-[#0000]"
                :src="i.url"
              ></iframe>
            </li>
            <li>
              <label
                for="add_image"
                class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm w-40 h-40"
              >
                <img class="w-1/3" src="@/assets/svg/add_photo.svg" alt="" />
              </label>
            </li>
          </draggable>
        </ul>
        <input
          @change="addVideo.handleImage"
          type="file"
          id="add_image"
          class="h-0 w-0 overflow-hidden !p-0"
        />
        <p
          v-if="usePost.store.error"
          class="text-red-600 text-end text-sm pb-3"
        >
          {{ usePost.store.error }}
        </p>
      </div>
      <div
        class="2xl:flex items-center justify-between 2xl:space-y-0 space-y-5 p-5 pt-0 2xl:mt-0 -mt-10 bg-white"
      >
        <div class="textarea_icon flex items-center">
          <label
            for="add_image"
            class="icon full_flex h-10 w-10 hover:bg-[#F2F2F2] r_8"
          >
            <img src="@/assets/svg/textarea/upload.svg" alt="" />
          </label>
          <div
            @click="isLoading.modal.add_link = true"
            class="icon full_flex h-10 w-10 cursor-pointer hover:bg-[#F2F2F2] r_8"
          >
            <img src="@/assets/svg/textarea/link.svg" alt="" />
          </div>
          <div
            @click="useClassroom.local_store.addVideoModal = true"
            class="icon full_flex h-10 w-10 cursor-pointer hover:bg-[#F2F2F2] r_8"
          >
            <img src="@/assets/svg/textarea/video.svg" alt="" />
          </div>
          <div
            @click="addVideo.openPoll"
            class="icon full_flex h-10 w-10 cursor-pointer hover:bg-[#F2F2F2] r_8"
          >
            <img src="@/assets/svg/textarea/poll.svg" alt="" />
          </div>
          <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
            <div
              id="emojidrop1"
              class="icon full_flex h-10 w-10 relative hover:bg-[#F2F2F2] r_8"
            >
              <img src="@/assets/svg/textarea/emoji.svg" alt="" />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <div class="!overflow-hidden overflow-y-auto">
                  <EmojiPicker
                    :native="true"
                    theme="light"
                    @select="addVideo.onSelectEmoji"
                  />
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- <div class="icon full_flex h-10 w-10 cursor-pointer hover:bg-[#F2F2F2] r_8">
            <img src="@/assets/svg/textarea/gif.svg" alt="" />
          </div> -->
          <div class="flex items-center justify-between">
            <el-dropdown
              @command="
                (command) => {
                  usePost.store.category_id = command;
                }
              "
              placement="bottom-end"
              class="dropdown"
              trigger="click"
            >
              <div class="flex items-center gap-1 mx-4 font-medium text-sm">
                <p class="whitespace-nowrap max-w-[120px] truncate">
                  {{
                    usePost.store.category_id
                      ? usePost.store.category_id.name
                      : $t("course.select_category")
                  }}
                </p>
                <img src="@/assets/svg/textarea/select_arrow.svg" alt="" />
              </div>
              <template #dropdown>
                <el-dropdown-menu
                  class="min-w-[200px] !mt-3 !-mr-0 dropdown_shadow"
                >
                  <el-dropdown-item
                    v-for="(i, index) in usePost.store.categories"
                    :command="i"
                    class="flex flex-col justify-center !items-start px-5 hover:bg-[#F2F2F2] cursor-pointer space-y-1 h-[63px]"
                  >
                    <h1 class="font-semibold">{{ i.name }}</h1>
                    <p class="text-xs">{{ i.description }}</p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="flex gap-3 font-semibold md:text-[16px] text-sm">
          <button
            @click="usePost.store.writingModal = false"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
            {{ $t("cancel") }}
          </button>
          <button
            v-loading="isLoading.isLoadingType('writePost')"
            :type="isLoading.isLoadingType('writePost') ? 'button' : 'submit'"
            class="uppercase h-10 px-6 rounded-lg"
            :class="usePost.create.title ? 'b_cbc _c07' : 'b_ce0 _ca1'"
          >
            {{ $t("post") }}
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { useAddVideoStore } from "@/store";
import "vue3-emoji-picker/css";
import EmojiPicker from "vue3-emoji-picker";

import {
  usePostStore,
  useLoadingStore,
  useChatStore,
  useGroupStore,
  useClassroomStore,
} from "@/store";

const usePost = usePostStore();
const useChat = useChatStore();
const addVideo = useAddVideoStore();
const useGroup = useGroupStore();
const isLoading = useLoadingStore();
const useClassroom = useClassroomStore();
const { showMessage } = useNotification();

const store = reactive({
  is_show: false,
  writingModal: false,
  card_info: false,
  reportAdmin: false,
  drawer: false,
  is_emoji: false,
  poll_step: 3,
});

function openClick() {
  if (useGroup.store.group_by_username.is_paid == 'pending') {
    isLoading.store.notPayedModal = true;
  } else {
    usePost.store.writingModal = true
  }
}

watch(
  () => usePost.store.writingModal,
  () => {
    if (usePost.store.writingModal) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      addVideo.store.files = [];
      usePost.clearData();
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }
);

watch(
  () => isLoading.modal.add_link,
  () => {
    if (!isLoading.modal.add_link && !isLoading.store.is_inline) {
      if (isLoading.modal.link) {
        useClassroom.module.video_content += `<a href="${isLoading.modal.link}" target="_blank">${isLoading.modal.link}</a>`;
      }
      isLoading.modal.link = "";
      isLoading.store.is_inline = false;
    } else if (isLoading.store.is_inline) {
      if (isLoading.modal.link) {
        usePost.inline_comment.comment += `<a href="${isLoading.modal.link}" target="_blank">${isLoading.modal.link}</a>`;
        isLoading.store.is_inline = false;
      }
      isLoading.modal.link = "";
    }
  }
);
</script>

<style lang="scss" scoped></style>
