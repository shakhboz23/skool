<template>
  <main>
    <section v-if="isLoading.isLoadingType('getByUsername')"
      class="flex sm:flex-row flex-col-reverse gap-6 community_page">
      <LoadingDiv class="h-[700px] w-full r_16" />
      <LoadingDiv class="h-[429px] min-w-[280px] r_16" />
    </section>
    <div v-else class="flex sm:flex-row flex-col-reverse gap-6 community_page">
      <div class="w-full">
        <section class="w-full bg-white md:px-7 md:py-6 p-3 r_16 overflow-hidden">
          <h1 class="font-semibold md:text-2xl text-lg mb-6">{{ useGroup.store.group_by_username?.name }}</h1>
          <pre v-if="!role_ac.includes(useGroup.store.group_by_username.type) && useGroup.store.group_by_username.description" class="text-sm leading-[21px] whitespace-pre-line mb-6 r_8">{{
                  useGroup.store.group_by_username.description
                }}</pre>
          <div class="w-full overflow-hidden r_16">
            <div v-if="useGroup.store.group_by_username.medias?.length"
              @click="() => { store.slideModal = true; useGroup.store.slideStep2 = useGroup.store.slideStep }"
              class="aboutmainSlider cursor-pointer duration-500 lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] flex items-center w-full r_16">
              <div class="min-w-full" v-for="(post, index) in useGroup.store.group_by_username.medias">
                <div v-if="post.type == 'image'"
                  class="lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] w-full min-w-[100%] object-cover">
                  <img class="lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] w-full min-w-[100%] object-cover"
                    @click="useGroup.store.slideStep = index" :src="post.link" />
                </div>
                <div v-else-if="post.type == 'video'">
                  <ClientOnly>
                            <vue-plyr>
                                <div class="plyr__video-embed">
                                  <video class="lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] w-full min-w-[100%] object-cover">
                                    controls>
                                    <source :src="post.link" type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                </div>
                            </vue-plyr>
                        </ClientOnly>
                </div>
                <div v-else @click="useGroup.store.slideStep = index" class="relative rounded-xl overflow-hidden">
                  <!-- <iframe class="lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] min-w-full" :src="post.link">
                  </iframe> -->
                  <ClientOnly>
                            <vue-plyr class="lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] min-w-full" :src="post.link">
                                <div class="plyr__video-embed">
                                    <iframe class="lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] min-w-full" :src="post.link" allowfullscreen allowtransparency allow="autoplay" ></iframe>
                                </div>
                            </vue-plyr>
                        </ClientOnly>
                  <div
                    class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                    <img src="@/assets/svg/video_btn.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="role_ac.includes(useGroup.store.group_by_username.type)"
              @click="useGroup.store.add_media = true"
              class="full_flex bg-[#F2F2F2] cursor-pointer duration-500 lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] flex items-center w-full r_16">

              <p>Upload images / videos</p>
            </div>
          </div>
          <div v-loading="isLoading.isLoadingType('positionMedia')"
            class="flex gap-4 mt-4 md:mb-6 mb-4 overflow-hidden overflow-x-auto">
            <draggable :disabled="!role_ac.includes(useGroup.store.group_by_username.type)" @change="useGroup.update_media_position" :list="useGroup.store.group_by_username.medias"
              group="grid" :animation="200" class="flex gap-4 overflow-hidden overflow-x-auto min-w-fit">
              <template v-for="(post, index) in useGroup.store.group_by_username.medias" :key="post.id">
                <div class="relative" :class="useGroup.store.slideStep == index ? 'border p-[1px] rounded-xl' : ''">
                  <button @click="() => deleteMedia(post.id)" type="button"
                    class="absolute deleteimage top-1 right-1 z-20 rounded-full w-6 h-6 full_flex border bg-white"
                    :class="role_ac.includes(useGroup.store.group_by_username.type) ? '' : '!hidden'">
                    <img class="m-auto" src="@/assets/svg/x.svg" alt="" />
                  </button>
                  <div v-if="post.type == 'image'">
                    <img @click="useGroup.store.slideStep = index"
                      class="md:min-w-[90px] md:h-[90px] min-w-[56px] max-w-[56px] h-[56px] cursor-pointer object-cover rounded-xl"
                      :src="post.link" />
                  </div>
                  <div v-else-if="post.type == 'video'">
                    <video
                      class="md:min-w-[90px] md:h-[90px] min-w-[56px] max-w-[56px]  h-[56px] cursor-pointer object-cover rounded-xl"
                      controls>
                      <source :src="post.link" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div v-else-if="post.type == 'youtube' ||
      post.type == 'wistia' ||
      post.type == 'vimeo' ||
      post.type == 'loom'
      " @click="useGroup.store.slideStep = index" class="relative rounded-xl overflow-hidden">
                    <!-- <iframe :src="post.link" class="md:min-w-[90px] md:h-[90px] min-w-[56px] max-w-[56px]  h-[56px] cursor-pointer object-cover rounded-xl"
                      ></iframe> -->
                      <div class="md:min-w-[90px] md:h-[90px] min-w-[56px] max-w-[56px]  h-[56px] cursor-pointer object-cover rounded-xl">
                        <ClientOnly>
                            <vue-plyr>
                                <div class="plyr__video-embed">
                                    <iframe class="md:min-w-[90px] md:h-[90px] min-w-[56px] max-w-[56px]  h-[56px] cursor-pointer object-cover rounded-xl" :src="post.link" allowfullscreen allowtransparency allow="autoplay" ></iframe>
                                </div>
                            </vue-plyr>
                        </ClientOnly>
                      </div>
                    <div
                      class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                      <img src="@/assets/svg/video_btn.svg" alt="" />
                    </div>
                  </div>
                </div>
              </template>
            </draggable>
            <div
              v-if="useGroup.store.group_by_username.medias?.length < 6 && useGroup.store.group_by_username.medias?.length > 0 && role_ac.includes(useGroup.store.group_by_username.type)"
              @click="useGroup.store.add_media = true"
              class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm md:min-w-[90px] md:h-[90px] min-w-[56px] max-w-[56px]  h-[56px]">
              <img class="w-1/3" src="@/assets/svg/add_photo.svg" alt="" />
            </div>
          </div>
          <div class="flex flex-wrap gap-4 text-sm font-medium whitespace-nowrap capitalize">
            <p class="full_flex h-9 px-3 gap-1 rounded-lg bg-[#F2F2F2]">
              <img v-if="useGroup.store.group_by_username.group_type == 'private'"
                src="@/assets/svg/community/private.svg" alt="" />
              <img v-else src="@/assets/svg/members/public.svg" alt="" />
              <!-- {{ useGroup.store.group_by_username.group_type == "private" ? "Private group" : "Public group" }} -->
              {{ $t(`nav.${useGroup.store.group_by_username?.group_type}`) }}
              <span class="lowercase">{{ $t("about.pg") }}</span>
            </p>
            <p class="full_flex h-9 px-3 gap-1 rounded-lg bg-[#F2F2F2]">
              <img src="@/assets/svg/community/members.svg" alt="" />
              {{ useGroup.store.group_by_username.members_count }} {{ $t("nav.members") }}
            </p>
            <p class="full_flex h-9 px-3 gap-1 rounded-lg bg-[#F2F2F2] capitalize">
              <img src="@/assets/svg/community/paid.svg" alt="" />
              {{ $t(`nav.${useGroup.store.group_by_username.group_price}`) }}
            </p>
            <p class="full_flex h-9 px-3 gap-1 rounded-lg bg-[#F2F2F2]">
              <img v-if="useGroup.store.group_by_username.user?.image"
                class="h-5 w-5 rounded-full bg_loading object-cover" :src="useGroup.store.group_by_username.user?.image"
                alt="" />
            <p v-else class="h-5 w-5 rounded-full bg_loading"></p>
            <span v-if="$t('nav.uz') == 'en'">By</span> {{ useGroup.store.group_by_username.user?.name }} {{
      useGroup.store.group_by_username.user?.surname }}
            </p>
          </div>
          <pre v-if="role_ac.includes(useGroup.store.group_by_username.type) && !useGroup.store.description_modal"
            :class="role_ac.includes(useGroup.store.group_by_username.type) ? '' : 'pointer-events-none'"
            @click="editDescription"
            class="md:mt-8 mt-4 text-sm leading-[21px] whitespace-pre-line hover:bg-[#F2F2F2] cursor-pointer p-4 -m-4 r_8">{{
      useGroup.store.group_by_username.description ? useGroup.store.group_by_username.description : 'Add a description...'
    }}</pre>
          <div v-else-if="role_ac.includes(useGroup.store.group_by_username.type)" class="md:mt-8 mt-4">
            <el-input v-model="useGroup.store.description" @input="handleInput" class="w-full"
              :autosize="{ minRows: 2, maxRows: 20 }" type="textarea" :placeholder="$t('about.description') + '...'" />
            <p class="text-end mt-2 _ca1 md:text-sm text-xs">
              {{ useGroup.store.description?.length }}/1000
            </p>
            <div class="flex justify-end md:mt-6">
              <button type="button"
                @click="() => { useGroup.store.description_modal = false; useGroup.store.description = '' }"
                class="_ca1 font-semibold px-6 r_8 uppercase">
                {{ $t("cancel") }}
              </button>
              <button v-loading="isLoading.isLoadingType('changeGroupDescription')"
                class="_c07 b_cbc font-semibold px-6 r_8 uppercase" @click="useGroup.updateGroupDescription">
                {{ $t("save") }}
              </button>
            </div>
          </div>
        </section>
      </div>
      <!-- info card -->
      <GroupInfoCard class="md:max-w-[280px] sm:max-w-[200px]" />
    </div>

    <!-- about info modal -->
    <el-dialog v-model="store.slideModal"
      class="!p-0 !bg-transparent w-full fixed top-0 !shadow-none bg-black bg-opacity-10 full_flex" style="width: 100%;"
      align-center>
      <div class="min-w-[80vw] md:min-h-[80vh] full_flex overflow-hidden md:max-h-[80vh] md:max-w-[80vw]">
        <div class="aboutmainSlider2 bg-black bg-opacity-10 max-w-[80vw] duration-500 flex items-center w-full">
          <div class="full_flex min-w-[100%] min-h-full"
            v-for="(post, index) in useGroup.store.group_by_username.medias">
            <div v-if="post.type == 'image'">
              <img @click="useGroup.store.slideStep = index" class="full_flex" :src="post.link" />
            </div>
            <div v-else-if="post.type == 'video'">
              <video
                class="md:min-w-[90px] md:h-[90px] min-w-[56px] max-w-[56px]  h-[56px] cursor-pointer object-cover rounded-xl"
                controls>
                <source :src="post.link" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div v-else-if="post.type == 'youtube' ||
      post.type == 'wistia' ||
      post.type == 'vimeo' ||
      post.type == 'loom'
      " @click="useGroup.store.slideStep = index" class="relative min-h-full w-full">
                        <ClientOnly 
                class="md:min-w-[90px] md:h-[150px] min-w-[56px] max-w-[56px]  h-[400px] cursor-pointer object-cover rounded-xl"
                        >
                            <vue-plyr 
                class="h-[400px] cursor-pointer object-cover rounded-xl"
                            >
                                <div class="plyr__video-embed min-h-full">
                                    <iframe class="relative min-h-[400px] min-w-full" :src="post.link" allowfullscreen allowtransparency allow="autoplay" ></iframe>
                                </div>
                            </vue-plyr>
                        </ClientOnly>
            </div>
          </div>
        </div>
      </div>

      <!-- buttons -->
      <button @click="() => handleSlideChange('right')"
        class="bg-black z-50 bg-opacity-20 backdrop-blur-lg absolute sm:right-5 right-3 top-0 bottom-0 my-auto full_flex rounded-full w-12 h-12 border border-white">
        <img src="@/assets/svg/slide_arrow.svg" alt="" />
      </button>
      <button @click="() => handleSlideChange('left')"
        class="bg-black z-50 bg-opacity-20 backdrop-blur-lg absolute sm:left-5 left-3 top-0 bottom-0 my-auto full_flex rotate-180 rounded-full w-12 h-12 border border-white">
        <img src="@/assets/svg/slide_arrow.svg" alt="" />
      </button>
      <button @click="store.slideModal = false"
        class="bg-black z-50 bg-opacity-20 backdrop-blur-lg absolute sm:right-5 right-3 sm:top-5 top-3 my-auto full_flex rotate-180 rounded-full w-12 h-12 border border-white">
        <img src="@/assets/svg/slide_x.svg" alt="" />
      </button>
    </el-dialog>

    <!-- join to group -->
    <el-dialog v-model="usePayment.store.joinToGroupModal" width="400" align-center class="bg-opacity-50 !rounded-lg">
      <div class="text-center mb-4 space-y-2">
        <img v-if="useGroup.store.group_by_username?.image" class="w-14 h-14 mx-auto object-cover rounded-full" :src="useGroup.store.group_by_username?.image" alt="">
        <div v-else class="w-14 h-14 mx-auto object-cover rounded-full">
                <img
                  class="sm:h-10 sm:w-10 h-7 w-7 min-w-[40px] min-h-[40px] object-cover rounded-full"
                  v-if="useGroup.store.group_by_username.icon"
                  :src="useGroup.store.group_by_username.icon"
                  alt=""
                />
                <div
                  v-else
                  class="full_flex text-white uppercase md:h-10 md:min-w-[40px] h-5 min-w-[20px] md:text-[16px] text-[10px] rounded-full"
                  :style="`background: ${useGroup.store.group_by_username.color}`"
                >
                  {{ useGroup.store.group_by_username.initials }}
                </div>
              </div>
        <p>{{ useGroup.store.group_by_username?.name }}</p>
      </div>
      <h1 class="text-black text-sm text-center">{{ useGroup.store.group_by_username?.price }} UZS/{{$t('payment.month')}}  {{$t('payment.membership')}}.
        {{$t('payment.canceltime')}}</h1>
      <form v-if="usePayment.store.join_step == 1" @submit.prevent="usePayment.joinToGroup">
        <label for="name" class="_ca1 mb-2 block mt-5"> {{$t('payment.cardnumber')}}</label>
        <div class="flex items-center justify-between">
          <input @input="usePayment.getCardType" v-model="usePayment.card.cardNumber"
            class="placeholder-[#A1A1A1] w-full" type="text" name="credit-number" placeholder="0000 0000 0000 0000"
            required>
          <div class="flex items-center gap-2 -ml-[108px] pr-3">
            <img v-if="usePayment.store.cardType.type == 'visa'" src="@/assets/svg/billing/electron.svg" alt="">
            <img v-else-if="usePayment.store.cardType.type == 'maestro'" src="@/assets/svg/billing/maestro.svg" alt="">
            <img v-else-if="usePayment.store.cardType.type == 'mastercard'" src="@/assets/svg/billing/mastercard.svg"
              alt="">
            <img v-else-if="usePayment.store.cardType.type == 'uzcard'" src="@/assets/svg/billing/uzcard.svg" alt="">
            <img v-else-if="usePayment.store.cardType.type == 'humo'" src="@/assets/svg/billing/humo.svg" alt="">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5 mt-4">
          <div>
            <label for="expdate" class="_ca1 mb-2 block"> {{$t('payment.expdate')}}</label>
            <input @input="usePayment.prettyCardExpiryDate" v-model="usePayment.card.expiryDate"
              class="w-full placeholder-[#A1A1A1]" type="text" id="expdate" name="credit-expires" placeholder="MM/YY" required>
          </div>
          <div v-if="usePayment.store.cardType.type == 'visa' || usePayment.store.cardType.type == 'mastercard'">
            <label for="name" class="_ca1 mb-2 block">CVV</label>
            <input @input="usePayment.prettyCardCvc" v-model="usePayment.card.cvc" class="w-full placeholder-[#A1A1A1]"
              type="number" name="credit-cvc" placeholder="123" required>
          </div>
        </div>
        <p class="text-[#e74c3c] mt-2">{{usePayment.store.payment_error}}</p>
        <div class="flex justify-end mt-4">
          <button type="button" @click="usePayment.store.joinToGroupModal = false"
            class="_ca1 font-semibold px-6 r_8 uppercase">
            {{ $t("cancel") }}
          </button>
          <button :class="usePayment.card.cardNumber && usePayment.card.expiryDate ? 'b_cbc _c07' : ''" type="submit"
            class="_ca1 font-semibold b_ce0 px-6 r_8 uppercase">
            {{ $t("add") }}
          </button>
        </div>
      </form>
      <form v-else-if="usePayment.store.join_step == 2" @submit.prevent="usePayment.paymentConfirmData">
        <p class="mt-4"> {{$t('payment.sendto')}} {{usePayment.store.payment_phone}}</p>
        <div class="grid grid-cols-2 gap-5 mt-2">
          <div>
            <label for="name" class="_ca1 mb-2 block"> {{$t('payment.code')}}</label>
            <input v-model="usePayment.store.code" class="w-full placeholder-[#A1A1A1]" type="text"
              name="credit-expires" placeholder="000000" required>
          </div>
        </div>
        <p class="text-[#e74c3c] mt-2">{{usePayment.store.payment_error}}</p>
        <div class="flex justify-end mt-4">
          <button type="button" @click="usePayment.store.joinToGroupModal = false"
            class="_ca1 font-semibold px-6 r_8 uppercase"> {{$t('cancel')}}</button>
          <button v-loading="isLoading.isLoadingType('reactiveConfirm')" :class="usePayment.store.code ? 'b_cbc _c07' : '_ca1 b_ce0'" class=" font-semibold px-6 r_8 uppercase"> {{$t('payment.add')}}</button>
        </div>
      </form>
    </el-dialog>

    <!-- delete media -->
    <el-dialog v-model="useGroup.store.delete_media" width="400" align-center
      class="!rounded-xl overflow-hidden px-6 py-7">
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">
          {{ $t("about.delete") }}
        </h1>
        <p class="text-lg">
          {{ $t("about.deleteaccept") }}
        </p>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button @click="useGroup.store.delete_media = false" class="uppercase h-10 px-6 rounded-lg _ca1">
            {{ $t("cancel") }}
          </button>
          <button @click="useGroup.delete_media" v-loading="isLoading.isLoadingType('deleteMedia')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            {{ $t("delete") }}
          </button>
        </div>
      </div>
    </el-dialog>

    <!-- add media -->
    <el-dialog v-model="useGroup.store.add_media" width="400" align-center class="bg-opacity-50 !rounded-lg py-7 px-6">
      <form @submit.prevent="handleVideoLink">
        <h1 class="text-2xl font-semibold">
          {{ $t("about.addmedia") }}
        </h1>
        <p class="mt-6 font-medium">
          {{ $t("about.uploadredommend") }}
        </p>
        <label for="add_image"
          class="_ca1 font-semibold border_ce0 h-10 inline-block full_flex max-w-fit px-6 r_8 mt-4 uppercase">
          {{ $t("about.upload_image") }}
        </label>
        <input @change="handleMediaUpload" type="file" id="add_image" accept="image/*"
          class="h-0 w-0 overflow-hidden !p-0" />
        <p class="mt-6 mb-4 font-medium">
          {{ $t("about.upload_list") }}
        </p>
        <input v-model="useGroup.media.link" class="text-sm" type="url" :placeholder="$t('about.link')" />
        <p v-if="useGroup.store.is_url" class="leading-4 text-red-600 -mb-6 mt-2 vip">
          {{ $t("about.invalid") }}
        </p>
        <div class="flex justify-end gap-3 mt-7 text-sm font-semibold">
          <button @click="useGroup.store.add_media = false" type="button" class="uppercase h-10 px-6 rounded-lg _ca1">
            {{ $t("cancel") }}
          </button>
          <button :class="useGroup.media.link ? 'b_cbc _c07' : 'b_ce0 _ca1'
      " class="uppercase h-10 px-6 rounded-lg" v-loading="isLoading.isLoadingType('createMedia')">
            {{ $t("add") }}
          </button>
        </div>
      </form>
    </el-dialog>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});
import { role_ac } from "@/composables";
import { useGroupStore, useLoadingStore, usePaymentStore } from "@/store";
import { VueDraggableNext as draggable } from 'vue-draggable-next';
const { start, finish } = useLoadingIndicator();
const isLoading = useLoadingStore();
import getVideoId from "get-video-id";
import urlParser from "js-video-url-parser";
const useGroup = useGroupStore();
const usePayment = usePaymentStore();
isLoading.addLoading("getByUsername");
const videoIframe = ref("");
const store = reactive({
  slideModal: false,
  video_id: "",
  video_type: "",
  is_saved: false,
  videoLink: "",
});
isLoading.store.page_name = "calendar";

useSeoMeta({
  title: computed(() => `About · ${useGroup.store.group_by_username.name}`),
  ogTitle: computed(() => `About · ${useGroup.store.group_by_username.name}`),
  description: computed(() => `About · ${useGroup.store.group_by_username.description}`),
  ogDescription: computed(() => `About · ${useGroup.store.group_by_username.description}`),
  ogImage: computed(() => `${useGroup.store.group_by_username.image}`),
  twitterCard: computed(() => `${useGroup.store.group_by_username.icon}`),
})

start()
await useAsyncData("about", async () => {
  await useGroup.groupByUsername();
  finish();
}, { server: false })


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

function deleteMedia(id) {
  useGroup.store.media_id = id;
  useGroup.store.delete_media = true
}

function handleMediaUpload(e) {
  useGroup.media.image = e.target.files[0];
  useGroup.media.type = "image";
  useGroup.create_media();
  document.querySelector('#add_image').value = "";
}

function handleSlideChange(type) {
  if (type == "right") {
    if (useGroup.store.slideStep2 < useGroup.store.group_by_username.medias?.length - 1) {
      useGroup.store.slideStep2 += 1;
    }
  } else if (type == "left") {
    if (useGroup.store.slideStep2 > 0) {
      useGroup.store.slideStep2 -= 1;
    }
  }
}

function editDescription() {
  useGroup.store.description_modal = true;
  useGroup.store.description = useGroup.store.group_by_username.description;
}

function handleInput() {
  useGroup.store.description =
    useGroup.store.description?.slice(0, 1000);
}

async function handleVideoLink() {
  useGroup.store.is_url = !isLoading.isURL(
    useGroup.media.link
  );
  if (!useGroup.store.is_url) {
    useGroup.store.is_url = await checkYouTubeVideoAvailability(
      useGroup.media.link
    );
    if (!useGroup.store.is_url) {
      useGroup.media.type = store.video_type;
      useGroup.media.link = file_urls[store.video_type] + store.video_id
      useGroup.create_media();
    }
  } else {
    useGroup.store.is_url = true;
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
  () => store.slideModal,
  () => {
    useGroup.store.slideStep2 = useGroup.store.slideStep;

    if (store.slideModal) {
      setTimeout(() => {
        const image = document.querySelector(".aboutmainSlider2");
        image.style.transform = `translateX(-${useGroup.store.slideStep2 * 100}%)`;
      }, 100)
    }

    const video = document.getElementById("math_video");
    try {
      video.pause();
    } catch (error) { }
  }
);

watch(
  () => useGroup.store.slideStep,
  () => {
    try {
      // useGroup.store.slideStep2 = useGroup.store.slideStep;
      const image = document.querySelector(".aboutmainSlider");
      image.style.transform = `translateX(-${useGroup.store.slideStep * 100}%)`;
    } catch (error) { }
  }
);

watch(()=> usePayment.store.joinToGroupModal, () => {
  usePayment.store.join_step = 1;
  usePayment.clearCard();
})

watch(
  () => useGroup.store.slideStep2,
  () => {
    const video = document.querySelector("video");
    try {
      video.pause();
    } catch (error) { }
    try {
      const image = document.querySelector(".aboutmainSlider2");
      image.style.transform = `translateX(-${useGroup.store.slideStep2 * 100}%)`;
    } catch (error) { }
  }
);

onBeforeMount(() => {
  document.addEventListener("keydown", function (event) {
    // Check if Ctrl key is pressed and the key pressed along with it
    if (!store.slideModal) {
      if (event.key == "ArrowRight") {
        if (useGroup.store.slideStep < useGroup.store.group_by_username.medias?.length - 1) {
          useGroup.store.slideStep += 1;
        }
      } else if (event.key == "ArrowLeft") {
        if (useGroup.store.slideStep > 0) {
          useGroup.store.slideStep -= 1;
        }
      }
    } else {
      if (event.key == "ArrowRight") {
        if (useGroup.store.slideStep2 < useGroup.store.group_by_username.medias?.length - 1) {
          useGroup.store.slideStep2 += 1;
        }
      } else if (event.key == "ArrowLeft") {
        if (useGroup.store.slideStep2 > 0) {
          useGroup.store.slideStep2 -= 1;
        }
      }
    }
  });
});

onUnmounted(() => {
  try {
    document.removeEventListener("keydown");
  } catch (_) { }
})

const ids = [
  {
    module_id: 1,
    lesson_ids: [2, 3, 4],
  },
  {
    module_id: null,
    lesson_ids: [2, 3, 4],
  },
]
</script>

<style lang="scss" scoped></style>
