<template>
  <!-- add Video link -->
  <el-dialog
    v-model="useClassroom.local_store.addVideoModal"
    width="400"
    align-center
    class="bg-opacity-50 !rounded-lg py-7 px-6"
  >
    <form @submit.prevent="handleVideoLink">
      <h1 class="text-2xl font-semibold">Add a video</h1>
      <p class="mt-6 mb-4 font-medium">
        Add a YouTube, Vimeo, Loom, or Wistia video link.
      </p>
      <input
        v-model="store.videoLink"
        class="text-sm"
        type="text"
        placeholder="Link"
      />
      <p
        v-if="useClassroom.local_store.is_url"
        class="leading-4 text-red-600 -mb-6 mt-2 vip"
      >
        Invalid video link
      </p>
      <div class="flex justify-end gap-3 mt-7 text-sm font-semibold">
        <button
          @click="useClassroom.local_store.addVideoModal = false"
          type="button"
          class="uppercase h-10 px-6 rounded-lg _ca1"
        >
          cancel
        </button>
        <button
        @click="handleSubmit"
          :class="
            useClassroom.local_store.videoLink ? 'b_cbc _c07' : 'b_ce0 _ca1'
          "
          class="uppercase h-10 px-6 rounded-lg"
          v-loading="isLoading.isLoadingType('createModule')"
        >
          save
        </button>
      </div>
    </form>
  </el-dialog>
</template>

<script setup>
import { useClassroomStore, useLoadingStore, useAddVideoStore,usePostStore } from "~/store";
import youtubeUrl from "youtube-url";
import getVideoId from "get-video-id";
import urlParser from "js-video-url-parser";
const useClassroom = useClassroomStore();
import axios from "axios";
const isLoading = useLoadingStore();
const addVideo = useAddVideoStore();
const usePost = usePostStore();

const store = reactive({
  video_id: "",
  video_type: "",
  is_saved: false,
  videoLink: "",
});

const file_types = [
  "youtu.be",
  "loom.com",
  "wistia.com",
  "vimeo.com",
  "youtube.com",
];

const file_urls = {
  youtube: "https://www.youtube.com/embed/",
  wistia: "https://fast.wistia.com/embed/iframe/",
  vimeo: "https://player.vimeo.com/video/",
  loom: "https://www.loom.com/embed/",
};

function handleSubmit() {
  useClassroom.local_store.videoLink = store.videoLink
}

async function handleVideoLink() {
  useClassroom.local_store.is_url = !isLoading.isURL(
    useClassroom.local_store.videoLink
  );
  if (!useClassroom.local_store.is_url) {
    useClassroom.local_store.is_url = await checkYouTubeVideoAvailability(
      useClassroom.local_store.videoLink
    );
    if (!useClassroom.local_store.is_url) {
      if (!isLoading.store.is_inline) {
        addVideo.store.files.push({
          url: file_urls[store.video_type] + store.video_id,
          file: file_urls[store.video_type] + store.video_id,
          type: store.video_type,
          is_new: true,
        });
        useClassroom.local_store.addVideoModal = false;
      } else{
        usePost.inline_comment.files.push({
          url: file_urls[store.video_type] + store.video_id,
          file: file_urls[store.video_type] + store.video_id,
          type: store.video_type,
          is_new: true,
        });
        useClassroom.local_store.addVideoModal = false;
        isLoading.store.is_inline = false;
      }
    }
  } else {
    useClassroom.local_store.is_url = true;
  }
}

async function checkYouTubeVideoAvailability(videoUrl) {
  try {
    let isAviableFile = false;
    for (let i of file_types) {
      if (videoUrl.includes(i)) {
        isAviableFile = true;
        break;
      }
    }
    let { id, service } = getVideoId(videoUrl);
    store.video_id = id;
    store.video_type = service;
    if (videoUrl.includes("wistia")) {
      store.video_id = extractWistiaVideoId(videoUrl);
      store.video_type = "wistia";
    } else if (videoUrl.includes("youtube")) {
      videoUrl = `https://youtu.be/${id}`;
    }
    if (!isAviableFile) {
      return true;
    } else if (!videoUrl.includes("loom.com")) {
      const data = urlParser.parse(videoUrl);
      if (data != undefined) {
        return false;
      }
      return true;
    }

    store.video_type = "loom";
    store.video_id = extractLoomVideoId(videoUrl);

    const response = await axios.get(videoUrl);
    if (response.status === 200) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return true;
  }
}

function extractLoomVideoId(url) {
  const urlParts = url.split("/share/");
  if (urlParts.length > 1) {
    const idPart = urlParts[1].split("?")[0]; // This removes any query parameters
    return idPart;
  }
  return null;
}

function extractWistiaVideoId(url) {
  const urlParts = url.split("/medias/");
  if (urlParts.length > 1) {
    return urlParts[1];
  }
  return null;
}

watch(
  () => useClassroom.local_store.addVideoModal,
  () => {
    if (!useClassroom.local_store.addVideoModal) {
      useClassroom.local_store.videoLink = "";
      store.videoLink = "";
      // isLoading.store.is_inline = false;
    }
  }
);
</script>

<style lang="scss" scoped></style>
