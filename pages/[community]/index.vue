<template>
  <main v-if="useGroup.store.group_by_username.status == 'active'"
    class="flex md:flex-row flex-col-reverse md:gap-6 mt-[18px]">
    <div class="overflow-hidden w-full md:space-y-8 space-y-6">
      <ModalWriteSomething v-if="useGroup.store.group_by_username.status == 'active'" class="md:block hidden" />

      <section @click="routeToRequests"
        v-if="usePost.store.members_count && role_ac.includes(useGroup.store.group_by_username.type)"
        class="flex gap-2 justify-center">
        <p class="full_flex rounded-full text-white text-xs h-6 w-6 bg-[#e74c3c]">{{ usePost.store.members_count }}</p>
        <p class="_c2a hover:underline cursor-pointer">membership requests pending</p>
      </section>
      <section v-if="useEvent.store.fistevent.title" class="flex items-center gap-2 justify-center">
        <img src="@/assets/svg/calendar/calendar_black.svg" />
        <p class="full_flex text-xs font-bold hover:underline cursor-pointer" @click="routeToCalendar">{{
    useEvent.store.fistevent.title }}</p>
        <p class="text-xs">is happening in {{ isLoading.convertMilliseconds(useEvent.store.fistevent.date) }}</p>
      </section>
      <!-- category -->
      <section class="md:text-sm text-xs whitespace-nowrap">
        <div class="flex items-start justify-between gap-3">
          <div id="button-group" :class="store.is_show ? 'flex-wrap' : 'md:flex-nowrap'"
            class="relative flex md:flex-row flex-wrap gap-3 category_wrap w-full md:h-auto h-[80px] overflow-hidden">
            <button @click="handleCategory()" :class="usePost.store.filter.category_id != 'all' ? 'bg-white' : 'b_cbc'
    " class="py-2 px-3 rounded-full md:h-9 h-8 hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700">
                        {{$t('nav.all')}}
            </button>
            <LoadingDiv v-if="isLoading.isLoadingType('getPostCategories')" v-for="i in 10"
              class="flex items-center md:h-9 h-8 w-28 animate-pulse hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700 gap-1 py-2 px-3 rounded-full bg-gray-900" />
            <button v-else-if="usePost.store.categories?.length" @click="handleCategory(i.id)"
              v-for="i in usePost.store.categories" :class="usePost.store.filter.category_id == i.id ? 'b_cbc' : 'bg-white'
    " class="flex md:flex-row flex-wrap items-center md:h-9 h-8 min-w-fit hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700 gap-1 py-2 px-3 rounded-full">
              <!-- <img
                class="w-[14px] h-[21px] object-contain"
                :src="i.icon"
                alt=""
              /> -->
              {{ i.name }}
            </button>
            <img v-if="!store.is_show && usePost.store.categories" class="absolute md:block hidden -right-[2px]"
              src="@/assets/svg/shadow_hidden.svg" alt="" />
            <button @click="store.is_show = false" v-if="store.is_show && usePost.store.categories?.length"
              class="py-2 px-3 md:h-9 h-8 md:block hidden rounded-full min-w-fit bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700">
              {{$t('nav.less')}}...
            </button>
          </div>
          <button v-if="!store.is_show && usePost.store.categories?.length" @click="store.is_show = true"
            class="py-2 px-3 md:h-9 h-8 md:block hidden rounded-full min-w-fit bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700">
                      {{$t('nav.more')}}
          </button>
          <div class="min-w-fit text-end">
            <el-dropdown placement="bottom-start" trigger="click" :hide-on-click="false" class="min-w-fit filter_btn">
              <button class="flex items-center gap-1 py-2 px-3 rounded-full bg-white">
                <img src="@/assets/svg/filter.svg" alt="" />
              </button>
              <template #dropdown>
                <el-dropdown-menu class="flex min-w-[328px] filter_dropdown dropdown_shadow 2xl:!-ml-[60px]">
                  <div class="min-w-[150px] border-r border-[#E0E0E0]">
                    <h1 class="text-sm font-medium px-8 mb-2 capitalize">
          {{$t('nav.filter')}}
                    </h1>
                    <label @click="handleCategory(i.type, 'filter')" :for="i.type" v-for="i in filter_filter">
                      <el-dropdown-item class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs">
                        <input :id="i.type" class="rounded-full" type="radio" name="filter" :checked="usePost.store.filter.filter == i.type ? true : false
    " />
                        {{ i.title }}
                      </el-dropdown-item>
                    </label>
                  </div>
                  <div class="min-w-[150px]">
                    <h1 class="text-sm font-medium px-8 mb-2">Sort</h1>
                    <label @click="handleCategory(i.type, 'sort')" :for="i.type" v-for="i in filter_sort">
                      <el-dropdown-item class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs">
                        <input :id="i.type" class="rounded-full" type="radio" name="sort" :checked="usePost.store.filter.sort == i.type ? true : false
    " />
                        {{ i.title }}
                      </el-dropdown-item>
                    </label>
                  </div>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <button v-if="usePost.store.categories?.length" @click="store.drawer = true"
              class="py-2 px-3 md:h-9 h-8 mt-3 ml-auto md:hidden block rounded-full min-w-fit bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700">
                        {{$t('nav.more')}}...
            </button>
          </div>
        </div>
      </section>

      <section v-if="role_ac.includes(useGroup.store.group_by_username.type)"
        class="r_16 overflow-hidden bg-white px-4 community_data">
        <el-collapse v-model="store.activeCollapse" class="space-y-6 !w-full">
          <el-collapse-item name="open">
            <template #title>
              <p class="_c07 font-semibold">{{$t("community.setup")}}</p>
              <img src="@/assets/svg/select_arrow.svg" alt="">
            </template>
            <div class="space-y-6 px-1">
              <p class="b_cf2 h-[1px] w-full"></p>
              <ul class="space-y-3">
                <li @click="i[1]" v-for="i in setupgroup" class="flex items-center gap-3">
                  <p v-if="!usePost.store.setupgroup[i[2]]" class="!outline outline-[#E0E0E0] rounded-full h-5 w-5"></p>
                  <p v-else class="full_flex rounded-full b_c2a h-5 w-5">
                    <img class="w-3 h-3" src="@/assets/svg/true.svg" alt="" />
                  </p>
                  <p class="hover:underline cursor-pointer">
                    <!-- {{ i[0] }} -->
                    {{$t(`community.${i[0]}`)}}
                  </p>
                </li>
              </ul>
            </div>
          </el-collapse-item>
        </el-collapse>
      </section>

      <!-- posts -->
      <section class="md:space-y-5 space-y-4">
        <LoadingDiv v-if="isLoading.isLoadingType('getPosts')" v-for="i in 10"
          class="min-h-[250px] w-full r_16 overflow-hidden" />
        <div v-else-if="!usePost.store.posts?.length" class="min-h-[30vh] full_flex col-span-4">
          {{$t("no_data")}}
        </div>
        <article @click="(e) => handleClick(e, i.id)" v-else v-for="i in usePost.store.posts" data-aos="zoom-in"
          class="relative cursor-pointer md:flex r_16 overflow-hidden bg-white">
          <!-- hide -->
          <div v-if="i.group_pinned"
            class="md:!flex !hidden full_flex gap-1 _c2a absolute right-0 top-0 h-9 w-[88px] border-l border-b border-[#BCDEFF] hide_show rounded-bl-2xl">
            <img class="show_blue" src="@/assets/svg/show.svg" alt="" />
            <img class="show_black hidden" src="@/assets/svg/show_black.svg" alt="" />
            <p class="pb-0.5">Hide</p>
          </div>
          <div v-if="i.group_pinned" class="md:!flex !hidden full_flex flex-col b_cbc gap-1 min-w-[30px]">
            <img class="h-[42px]" src="@/assets/svg/pinned_text.svg" alt="" />
            <img class="w-4 h-4" src="@/assets/svg/community/pinned.svg" alt="" />
          </div>
          <div v-if="i.group_pinned"
            class="md:hidden flex justify-between items-center pl-4 h-[35px] border-b border-[#F0F5FA] w-full">
            <img class="show_blue" src="@/assets/svg/pinned_blue.svg" alt="" />
            <div class="full_flex gap-1 _c2a h-9 w-[88px] hide_show">
              <img class="show_blue" src="@/assets/svg/show.svg" alt="" />
              <img class="show_black hidden" src="@/assets/svg/show_black.svg" alt="" />
              <p class="pb-0.5">Hide</p>
            </div>
          </div>
          <div class="flex items-end relative md:gap-14 gap-3 p-4">
            <div>
              <div class="flex items-center gap-4">
                <div v-if="i.user?.name">
                <UserAvatar :user="i.user" />
                </div>
                <div class="space-y-[2px]">
                  <h1 class="font-semibold">
                    {{ i.user?.name }} {{ i.user?.surname }}
                  </h1>
                  <p class="text-xs">
                    {{ formatDate(i.created_at) }} <span v-if="$t('nav.uz') == 'en'">in</span> <span class="_c59">{{ i.category_name }}</span>
                  </p>
                </div>
              </div>
              <h2 class="md:mb-2 mb-4 md:mt-4 mt-6 truncate md:text-xl text-[16px] font-semibold md:w-full w-[120%]">
                {{ i.title }}
              </h2>
              <p v-html="i.description" class="md:text-sm text-xs min-h-[40px] leading-6 line-clamp-2 max-w-[80%]"></p>
              <div v-if="i.poll_available" @click="() => showPostData(i.id)"
                class="flex items-center cursor-pointer mt-4 gap-4">
                <div class="b_cbc px-2 h-[26px] rounded-[4px] full_flex gap-1 text-xs">
                  <img class="md:block hidden" src="@/assets/svg/poll.svg" alt="" />
                  <img class="md:hidden block" src="@/assets/svg/poll_md.svg" alt="" />
                  <p class="">Poll</p>
                </div>
                <p class="text-xs font-semibold md:_c2a _c07">
                  {{ i.poll_count }} members have voted
                </p>
              </div>
              <div class="flex items-center _c59 gap-4 md:text-[16px] text-sm md:mt-3 mt-4">
                <p class="full_flex gap-1 cursor-pointer">
                  <img class="not_open" @click="usePost.setLike(i.id)" v-show="i.is_liked"
                    src="@/assets/svg/like_active.svg" alt="" />
                  <img class="not_open" @click="usePost.setLike(i.id)" v-show="!i.is_liked"
                    src="@/assets/svg/community/like.svg" alt="" />
                  <span @click="handleLikeModal('Likes', i)">
                    {{ i.like_count }}
                  </span>
                </p>
                <p @click="() => showPostData(i.id)" class="full_flex gap-1 cursor-pointer">
                  <img src="@/assets/svg/community/message.svg" alt="" />
                  {{ i.comment_count }}
                </p>
                <div v-if="i.comment_count" @click="() => showPostData(i.id)"
                  class="flex -space-x-[5px] cursor-pointer">
                  <el-tooltip v-for="(user, index) in i.comment_users"
                    :content="`${user.name} ${user.surname} - ${index < 3 ? comment_step[index] + ' commenter' : 'Recent commenter'}`"
                    placement="top">
                    <img class="h-[26px] w-[26px] rounded-full xl:block md:hidden sm:block hidden object-cover"
                      :src="user.image" alt="" :style="`z-index: ${7 - index}`" />
                  </el-tooltip>
                </div>
                <p v-if="i.comment_count" @click="() => showPostData(i.id)"
                  class="_c2a md:text-sm text-xs font-semibold cursor-pointer">
                  {{ formatLastCommentDate(i.post_comment_date) }}
                </p>
              </div>
            </div>
          </div>
          <ul v-if="i.media_files" class="flex gap-5 absolute bottom-0 right-0 min-w-fit max-w-[400px] overflow-hidden">
            <li class="relative imagelabel">
              <img v-if="i.media_files.type == 'image'" class="max-w-[140px] max-h-[140px] rounded-tl-xl object-contain"
                :src="i.media_files.url" alt="" />
              <div class="relative" v-else-if="i.media_files.type == 'video'">
                <video class="max-w-[140px] max-h-[140px] rounded-tl-xl object-contain" controls>
                  <source :src="i.media_files.url" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div
                  class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                  <img src="@/assets/svg/video_btn.svg" alt="" />
                </div>
              </div>
    <div v-else-if="i.media_files.type == 'youtube' ||
    i.media_files.type == 'wistia' ||
    i.media_files.type == 'vimeo' ||
    i.media_files.type == 'loom'
    " class="relative">
<iframe class="rounded-tl-xl max-w-[140px] max-h-[140px] object-contain" :src="i.media_files.url"></iframe>  
              <div
                  class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                  <img src="@/assets/svg/video_btn.svg" alt="" />
                </div>
              </div>
            </li>
          </ul>
        </article>
        <Pagination_card class="pt-3" />
      </section>
    </div>
    <GroupInfoCard />

    <ModalWriteSomething v-if="useGroup.store.group_by_username.status == 'active'" class="md:hidden block mb-6" />

    <!-- card info -->
    <el-dialog v-model="usePost.store.card_info" width="780" align-center
      class="bg-opacity-50 !rounded-lg p-5 overflow-hidden">
      <div v-loading="isLoading.isLoadingType('getPostById')" v-if="usePost.modal.change_category
    ? true
    : usePost.modal.edit
      ? false
      : true
    ">
          <!-- {{usePost.store.postData?.user}}dmsd -->
        <div class="flex items-center justify-between">
          <div v-if="usePost.store.card_info" class="flex items-center gap-4">
            <div v-if="!isLoading.isLoadingType('getPostById') && !isLoading.isLoadingType('write_post')" class="relative max-w-fit">
              <UserAvatar :user="usePost.store.postData?.user" class="h-10 w-10 min-w-[40px] min-h-[40px] rounded-full" />
            </div>
            <div class="space-y-[2px]">
              <h1 class="font-semibold">
                {{ usePost.store.postData.user?.name }}
                {{ usePost.store.postData.user?.surname }}
              </h1>
              <p class="text-xs">
                {{ formatDate(usePost.store.postData.created_at) }} <span v-if="$t('nav.uz') == 'en'">in</span> <span class="_c59">{{
    usePost.store.postData.category_name }}</span>
              </p>
            </div>
          </div>
          <div class="flex gap-2">
            <!-- <button class="border border-[#BCDEFF] r_8 px-3 h-9">
              Watch (134)
            </button> -->
            <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
              <button class="full_flex comment_menu r_8 w-9 h-9">
                <img src="@/assets/svg/three_dot.svg" alt="" />
              </button>
              <template #dropdown>
                <el-dropdown-menu class="min-w-[140px] dropdown_shadow">
                  <el-dropdown-item v-if="usePost.store.postData.user?.username == isLoading.user?.username" @click="editPostData" class="!text-xs font-medium h-10 px-3">{{$t("edit")}}</el-dropdown-item>
                  <el-dropdown-item v-if="usePost.store.postData.user?.username == isLoading.user?.username" @click="editPostData('category')" class="!text-xs font-medium h-10 px-3">{{$t("community.changecategory")}}</el-dropdown-item>
                  <el-dropdown-item v-if="usePost.store.postData.user?.username == isLoading.user?.username" @click="deletePost" class="!text-xs font-medium h-10 px-3">{{$t("delete")}}</el-dropdown-item>
                  <!-- <el-dropdown-item @click="copyLink" class="!text-xs font-medium h-10 px-3">Copy
                    link</el-dropdown-item> -->
                  <el-dropdown-item v-if="usePost.store.postData.user?.username == isLoading.user?.username" @click="pinToFeed(usePost.store.postData.id)"
                    class="!text-xs font-medium h-10 px-3"><span v-if="usePost.store.postData?.group_pinned">{{$t("community.unpinfed")}}</span><span v-else>{{$t("community.pintofed")}}</span></el-dropdown-item>
                  <el-dropdown-item v-if="usePost.store.postData.user?.username != isLoading.user?.username" @click="store.reportAdmin = true" class="!text-xs font-medium h-10 px-3">Report to
                    admins</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <h2 class="mb-4 md:mt-8 mt-6 md:text-2xl text-lg font-semibold md:w-full">
          {{ usePost.store.postData.title }}
        </h2>
        <div class="block">
          <pre v-html="usePost.store.postData.description" class="text-sm float-left w-full whitespace-pre-line"
            :class="store.see_more ? '' : 'line-clamp-[11]'"></pre>
          <button @click="store.see_more = true" :class="usePost.store.postData.description && !store.see_more ? '':'!h-0 p-0 overflow-hidden'"
            class="text-sm _c2a h-4">
            {{$t("course.seemore")}}
          </button>
        </div>
        <div class="border border-transparent">
          <div class="mt-8 text-sm space-y-3">
            <div v-for="(poll, index) in usePost.store.postData.polls" class="flex items-center gap-3 h-10">
              <label @click="() => changeVote(poll)" class="flex items-center gap-3" :for="`poll${index}`">
                <input disabled :checked="poll.is_selected" :id="`poll${index}`" type="radio" name="poll" />
                <p>{{ poll.option }}</p>
              </label>
              <div v-if="poll.users?.length && usePost.store.userIsVoted" @click="handleLikeModal('Votes', poll.id)"
                class="flex items-center gap-1 cursor-pointer">
                <div class="flex -space-x-[5px]">
                  <img v-for="(user, index) in poll.users" v-show="index < 7"
                    class="h-[26px] w-[26px] min-w-[26px] rounded-full object-cover" :src="user.image"
                    :title="`${user.name} ${user.surname}`" alt="" />
                </div>
                <p class="text-xs _ca1">{{ poll.poll_selecet_count }} votes</p>
              </div>
            </div>
          </div>
          <button v-if="!usePost.store.userIsVoted && usePost.store.postData.polls?.length"
            class="flex justify-between mt-4 _ca1 text-sm font-bold w-full">
            <p>Results</p>
            <p>{{ usePost.store.postData.poll_count }} votes</p>
          </button>
        </div>
        <div class="w-full mt-4 mb-5">
          <ul v-if="usePost.store.postData.media_files?.length" class="flex gap-5 min-w-fit w-full overflow-x-auto">
            <li @click="handleMediaShow(usePost.store.postData.media_files, index)"
              class="relative imagelabel min-w-fit" v-for="(i, index) in usePost.store.postData.media_files">
              <img v-if="i.type == 'image'" class="max-h-[210px] min-h-[210px] rounded-[12px] object-cover" :src="i.url"
                alt="" />
              <div v-else-if="i.type == 'youtube' ||
    i.type == 'wistia' ||
    i.type == 'vimeo' ||
    i.type == 'loom'
    " class="relative">
                <iframe class="max-h-[210px] min-h-[210px] rounded-[12px] object-cover text-[#0000]"
                  :src="i.url"></iframe>
                <div
                  class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                  <img src="@/assets/svg/video_btn.svg" alt="" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="-mx-5 -mt-8" v-else-if="usePost.modal.edit && !usePost.modal.change_category">
        <div @click="usePost.store.writingModal = true"
          class="flex items-center md:px-5 px-3 bg-white r_16 md:h-[72px] h-[52px] gap-[14px]">
          <img class="md:h-10 md:w-10 h-7 w-7 object-cover rounded-full" :src="isLoading.user.image" alt="" />
          <button class="!border-0 placeholder-black md:text-xl font-semibold">
            {{$t("community.write")}}...
          </button>
        </div>
        <form @submit.prevent="addVideo.handleSubmit"
          class="b_cf0f relative z-50 r_16 overflow-hidden overflow-y-auto -mt-[72px]">
          <div class="flex md:items-center gap-3 b_cf0f md:h-[52px] h-[64px] px-5 py-3">
            <img class="h-5 w-5 object-cover rounded-full" :src="usePost.store.postData?.user?.image" alt="" />
            <p class="text-sm flex flex-wrap items-start gap-1 leading-4">
              <span class="font-semibold">{{usePost.store.postData?.user?.name}} {{usePost.store.postData?.user?.surname}}</span>
              <span class="_ca1" v-if="$t('nav.uz') == 'en' || $t('nav.uz') == 'ru'">{{$t("course.postingin")}}</span>
              <span class="font-semibold _c2a md:w-auto w-full">{{ usePost.store.postData.category_name }}</span>
              <!-- <span class="_ca1" v-if="$t('nav.uz') != 'en' || $t('nav.uz') != 'ru'">{{$t("course.postingin")}}</span> -->
            </p>
          </div>
          <div class="md:p-5 p-3 space-y-5 bg-white">
            <input v-model="usePost.create.title" class="h-10 !rounded-none" type="text" placeholder="Title" required />
            <div class="community_editor border h-[120px] whitespace-pre-wrap">
              <Editor />
            </div>
            <div v-if="Object.keys(usePost.store.polls)?.length" class="border_ce0 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <p class="font-medium">Poll</p>
                <p v-if="!usePost.store.userIsVoted" @click="removePoll"
                  class="font-medium cursor-pointer hover:underline text-sm _ca1">
                  {{$t("course.remove")}}
                </p>
              </div>
              <ul class="space-y-2 mt-2">
                <li v-for="(i, index) in Object.keys(usePost.store.polls)" class="flex items-center gap-4">
                  <input :disabled="usePost.store.userIsVoted ? true : false"
                    :class="usePost.store.userIsVoted ? 'b_cf2' : ''" v-model="usePost.store.polls[i]"
                    @input="addVideo.editPoll(index)" type="text" :placeholder="`Option ${index + 1}`" />
                  <img v-if="Object.keys(usePost.store.polls)?.length > 2 &&
    !usePost.store.userIsVoted
    " @click="addVideo.deletePoll(i, index)" class="opacity-50 hover:bg-gray-300 cursor-pointer rounded-full p-2"
                    src="@/assets/svg/x.svg" alt="" />
                </li>
              </ul>
              <button v-if="!usePost.store.userIsVoted" @click="addVideo.addPoll" type="button"
                class="uppercase border_ce0 px-3 rounded-md mt-2" :class="Object.keys(usePost.store.polls)?.length >= 10
    ? 'b_ce0 _ca1'
    : ''
    ">
                Add option
              </button>
              <p v-if="usePost.store.userIsVoted" class="mt-2">
                You cannot edit or remove a poll that already has votes
              </p>
            </div>
            <ul v-if="addVideo.store.files?.length" class="flex gap-5 overflow-x-auto">
              <draggable :list="addVideo.store.files" group="grid" :animation="200"
                class="flex gap-4 z-20 overflow-hidden overflow-x-auto min-w-fit">
                <li class="relative imagelabel" v-for="(i, index) in addVideo.store.files">
                  <button @click="deleteMedia(index)" type="button"
                    class="absolute deleteimage z-20 bg-white !hidden top-2 right-2 rounded-full w-7 h-7 full_flex border p-2">
                    <img src="@/assets/svg/x.svg" alt="" />
                  </button>
                  <img v-if="i.type == 'image'" class="w-40 h-40 min-w-[160px] border rounded-xl object-cover"
                    :src="i.url" alt="" />
                  <div v-else-if="i.type == 'video'" class="relative">
                    <video class="w-40 h-40 min-w-[160px] border rounded-xl object-cover" controls>
                      <source :src="i.url" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div
                  class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                  <img src="@/assets/svg/video_btn.svg" alt="" />
                </div>
                  </div>
                  <iframe v-else-if="i.type == 'youtube' ||
    i.type == 'wistia' ||
    i.type == 'vimeo' ||
    i.type == 'loom'
    " class="w-40 h-40 min-w-[160px] border rounded-xl object-cover text-[#0000]" :src="i.url"></iframe>
                </li>
              </draggable>
              <li>
                <label for="add_image"
                  class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm w-40 h-40">
                  <img class="w-1/3" src="@/assets/svg/add_photo.svg" alt="" />
                </label>
              </li>
            </ul>
            <input @change="addVideo.handleImage" type="file" id="add_image" class="h-0 w-0 overflow-hidden !p-0" />
            <p v-if="usePost.store.error" class="text-red-600 text-end text-sm pb-3">
              {{ usePost.store.error }}
            </p>
          </div>
          <div class="2xl:flex items-center justify-between 2xl:space-y-0 space-y-5 p-5 pt-0 2xl:mt-0 -mt-10 bg-white">
            <div class="textarea_icon flex items-center">
              <label for="add_image" class="icon full_flex h-10 w-10">
                <img src="@/assets/svg/textarea/upload.svg" alt="" />
              </label>
              <div @click="isLoading.modal.add_link = true" class="icon full_flex h-10 w-10">
                <img src="@/assets/svg/textarea/link.svg" alt="" />
              </div>
              <div @click="useClassroom.local_store.addVideoModal = true" class="icon full_flex h-10 w-10">
                <img src="@/assets/svg/textarea/video.svg" alt="" />
              </div>
              <div @click="addVideo.openPoll" class="icon full_flex h-10 w-10 cursor-pointer">
                <img src="@/assets/svg/textarea/poll.svg" alt="" />
              </div>
              <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
                <div id="emojidrop1" class="icon full_flex h-10 w-10 relative">
                  <img src="@/assets/svg/textarea/emoji.svg" alt="" />
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <div class="!overflow-hidden overflow-y-auto">
                      <EmojiPicker :native="true" theme="light" @select="addVideo.onSelectEmoji" />
                    </div>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="flex items-center justify-between">
              <el-dropdown @command="(command) => {
    usePost.store.category_id = command;
  }
    " placement="bottom-end" class="dropdown" trigger="click">
                <div class="flex items-center gap-1 mx-4 font-medium text-sm">
                  <p class="whitespace-nowrap max-w-[100px] truncate">
                    {{
    usePost.store.category_id
      ? usePost.store.category_id.name
      : "Select category"
  }}
                  </p>
                  <img src="@/assets/svg/textarea/select_arrow.svg" alt="" />
                </div>
                <template #dropdown>
                  <el-dropdown-menu class="min-w-[200px] !mt-3 !-mr-0 dropdown_shadow">
                    <el-dropdown-item v-for="(i, index) in usePost.store.categories" :command="i"
                      class="flex flex-col justify-center !items-start px-5 hover:bg-[#F2F2F2] cursor-pointer space-y-1 h-[63px]">
                      <h1 class="font-semibold">{{ i.name }}</h1>
                      <p class="text-xs">{{ i.description }}</p>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <div class="flex gap-3 font-semibold md:text-[16px] text-sm">
                <button type="button" @click="usePost.modal.edit = false" class="uppercase h-10 px-6 rounded-lg _ca1">
                  {{$t('cancel')}}
                </button>
                <button v-loading="isLoading.isLoadingType('writePost')" :type="isLoading.isLoadingType('writePost') ? 'button' : 'submit'
    " class="uppercase h-10 px-6 rounded-lg" :class="usePost.create.title ? 'b_cbc _c07' : 'b_ce0 _ca1'">
                                    {{$t('post')}}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="flex items-center _c59 gap-4 text-sm">
        <p class="full_flex border border-[#F0F5FA] r_8 p-[6px] cursor-pointer leading-[21px] h-8 gap-1">
        <p class="full_flex gap-1" @click="usePost.setLike(usePost.store.postData.id)">
          <img v-show="usePost.store.postData.is_liked" src="@/assets/svg/like_active.svg" alt="" />
          <img v-show="!usePost.store.postData.is_liked" src="@/assets/svg/community/like.svg" alt="" />
          {{$t("like")}} <span class="_cf0f pb-0.5">|</span>
        </p>
        <span @click="handleLikeModal('Likes', usePost.store.postData)">
          {{ usePost.store.postData.like_count }}
        </span>
        </p>
        <p class="full_flex h-8 gap-1">
          <img src="@/assets/svg/community/message.svg" alt="" />
          {{ usePost.store.postData.comment_count }} {{$t("comment")}}
        </p>
      </div>
      <!-- comment -->
      <section v-if="!usePost.modal.edit" class="mt-4">
        <div v-for="(comment, c_index) in usePost.store.postData.comments"
          class="flex items-start gap-4 border-y border-[#F0F5FA] w-full py-5">
          <div class="relative max-w-fit">
            <UserAvatar class="h-10 w-10 min-w-[40px] min-h-[40px] rounded-full" :user="comment.user" />
          </div>

          <div class="w-full">
            <div
              v-if="usePost.store.editComment[0] != comment.id || usePost.store.editComment[1] != comment.user.id || usePost.store.editComment[2] != c_index"
              class="flex items-center justify-between">
              <div class="space-y-[2px] h-10">
                <h1 class="font-semibold text-[16px]">
                  {{ comment.user.name }} {{ comment.user.surname }}
                </h1>
                <p class="text-xs _ca1">{{ formatDate(comment.created_at) }}</p>
              </div>
              <el-dropdown v-if="isLoading.user.id == comment.user.id" placement="bottom-end" class="dropdown"
                trigger="click">
                <button class="full_flex comment_menu r_8 w-9 h-9">
                  <img src="@/assets/svg/three_dot.svg" alt="" />
                </button>
                <template #dropdown>
                  <el-dropdown-menu class="min-w-[140px] dropdown_shadow">
                    <el-dropdown-item @click="editComment(comment, c_index)"
                      class="!text-xs font-medium h-10 px-3">{{$t("edit")}}</el-dropdown-item>
                    <el-dropdown-item @click="deleteReply(comment.id)"
                      class="!text-xs font-medium h-10 px-3">{{$t("delete")}}</el-dropdown-item>
                    <!-- <el-dropdown-item @click="copyLink" class="!text-xs font-medium h-10 px-3">Copy
                      link</el-dropdown-item> -->
                    <el-dropdown-item @click="store.reportAdmin = true" class="!text-xs font-medium h-10 px-3">{{$t("community.report")}}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="space-y-3 mt-3">
              <div
                v-if="usePost.store.editComment[0] != comment.id || usePost.store.editComment[1] != comment.user.id || usePost.store.editComment[2] != c_index"
                class="space-y-3">
                <p v-html="comment.comment" class="text-sm leading-4 text-black"></p>
                <div class="w-full mt-4 mb-5">
                  <ul v-if="comment.media_files?.length" class="flex gap-5 min-w-fit w-full overflow-x-auto">
                    <li @click="handleMediaShow(comment.media_files, index)" class="relative imagelabel min-w-fit" v-for="(i, index) in comment.media_files">
                      <img v-if="i.type == 'image'" class="max-h-[40px] min-h-[40px] r_8 object-cover" :src="i.url"
                        alt="" />
                        <div v-else-if="i.type == 'youtube' ||
    i.type == 'wistia' ||
    i.type == 'vimeo' ||
    i.type == 'loom'
    " class="relative">
<iframe class="max-h-[40px] min-h-[40px] r_8 max-w-[40px] object-cover text-[#0000]" :src="i.url"></iframe>                <div
                  class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                  <img src="@/assets/svg/video_btn.svg" alt="" />
                </div>
              </div>
                    </li>
                  </ul>
                </div>
              </div>
              <WriteInlineComment
                v-if="usePost.store.editComment[0] == comment.id && usePost.store.editComment[1] == comment.user.id && usePost.store.editComment[2] == c_index"
                class="w-full" />
              <div class="flex items-center gap-3 h-[18px] text-xs">
                <p class="full_flex gap-1 _c2a">
                  <img class="cursor-pointer" @click="usePost.setLike(comment.id, 'comment', 1)"
                    v-show="comment.is_liked" src="@/assets/svg/like_active.svg" alt="" />
                  <img class="cursor-pointer" @click="usePost.setLike(comment.id, 'comment', 1)"
                    v-show="!comment.is_liked" src="@/assets/svg/community/like.svg" alt="" />
                  {{ comment.like_count }}
                </p>
                <button @click="() => {usePost.store.comment_id = [comment.id, 1, comment.user.username, comment.user.id]; 
    usePost.inline_comment.files = [];
                }"
                  class="_ca1 font-semibold">
                  {{$t("reply")}}
                </button>
              </div>
              <div v-if="usePost.store.comment_id[0] == comment.id &&
    usePost.store.comment_id[1] == 1
    " class="flex w-full pt-1 md:gap-[14px] gap-[10px] md:ml-0 -ml-[92px]">
                <img class="h-6 w-6 mt-1 object-cover rounded-full" :src="isLoading.user.image" alt="" />
                <WriteInlineComment class="w-full" />
              </div>
            </div>
            <div v-for="(reply, r_index) in comment.replies" class="flex items-start w-full gap-4 mt-5">
              <div class="relative max-w-fit">
            <UserAvatar class="h-6 w-6 min-w-[24px] max-h-[24px] max-w-[24px] rounded-full" :height="24" :user="reply.user">
              <img class="h-6 w-6 min-w-[24px] min-h-[24px] rounded-full object-cover" :src="reply.user?.image"
                  alt="" />
                <div class="full_flex absolute -bottom-[2px] -right-[5px] z-10">
                  <div class="relative">
                    <img class="h-3 w-3" src="@/assets/svg/community/user_messages.svg" alt="" />
                    <p class="absolute full_flex bottom-0 h-3 w-3 pb-0.5 pt-[1px] text-[8px] text-white font-medium">
                      {{reply.user?.level}}
                    </p>
                  </div>
                </div>
            </UserAvatar>
              </div>
              <div class="w-full">
                <div
                  v-if="usePost.store.editComment[0] != reply.id || usePost.store.editComment[1] != reply.user.id || usePost.store.editComment[2] != r_index"
                  class="flex items-center justify-between">
                  <div class="space-y-[2px] h-10">
                    <h1 class="font-semibold text-[16px]">
                      {{ comment.user.name }} {{ comment.user.surname }}
                    </h1>
                    <p class="text-xs _ca1">{{ formatDate(comment.created_at) }}</p>
                  </div>
                  <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
                    <button class="full_flex comment_menu r_8 w-9 h-9">
                      <img src="@/assets/svg/three_dot.svg" alt="" />
                    </button>
                    <template #dropdown>
                      <el-dropdown-menu class="min-w-[140px] dropdown_shadow">
                        <el-dropdown-item @click="editComment(reply, r_index)"
                          class="!text-xs font-medium h-10 px-3">{{$t("edit")}}</el-dropdown-item>
                        <el-dropdown-item @click="deleteReply(reply.id, comment.id)" usePost.store.comment_id="id"
                          class="!text-xs font-medium h-10 px-3">{{$t("delete")}}</el-dropdown-item>
                        <el-dropdown-item @click="copyLink" class="!text-xs font-medium h-10 px-3">{{$t("community.copylink")}}</el-dropdown-item>
                        <el-dropdown-item @click="store.reportAdmin = true"
                          class="!text-xs font-medium h-10 px-3">{{$t("community.report")}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
                <div class="space-y-3 mt-4">
                  <div
                    v-if="usePost.store.editComment[0] != reply.id || usePost.store.editComment[1] != reply.user.id || usePost.store.editComment[2] != r_index"
                    class="flex gap-1">
                    <el-dropdown placement="top-start" class="dropdown">
                      <div>
                        <p v-if="reply.reply_user?.username" class="_c2a border-b border-[#2A85FF]">{{
    reply.reply_user?.username }}</p>
                      </div>
                      <template #dropdown>
                        <el-dropdown-menu class="min-w-[440px] max-w-[440px] !-ml-1 dropdown_shadow">
                          <div class="flex">
                            <div class="border-r border-[#F2F2F2] min-w-[192px] p-4 space-y-3">
                              <div class="relative user_img max-w-fit">
                                <img class="h-[160px] w-[160px] object-cover rounded-full"
                                  :src="reply.reply_user?.image" alt="" />
                                <div class="full_flex absolute -bottom-[2px] -right-[5px] z-10">
                                  <div class="relative">
                                    <img class="h-10 w-10" src="@/assets/svg/community/user_messages.svg" alt="" />
                                    <p
                                      class="absolute full_flex bottom-0 w-10 h-10 pb-2 text-[22px] text-white font-medium">
                                      1
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <p
                                class="full_flex max-w-fit mx-auto text-xs font-semibold h-8 px-[10px] bg-[#D9ECFF] _c2a rounded-full">
                                Level 2 - Contributer
                              </p>
                              <div class="full_flex gap-1 text-xs">
                                <span class="_c2a font-semibold">40</span> points to
                                level up
                                <img src="@/assets/svg/level_up.svg" alt="" />
                              </div>
                            </div>
                            <div>
                              <div class="space-y-4 px-5 py-5 v border-b border-[#F2F2F2]">
                                <h1 class="font-semibold text-xl leading-6">
                                  Gerry Gonzalez
                                </h1>
                                <ul class="space-y-2">
                                  <li class="flex items-center gap-2 leading-[14px] _ca1">
                                    <img src="@/assets/svg/clock.svg" alt="" />
                                    <p>Active 19d ago</p>
                                  </li>
                                  <li class="flex items-center gap-2 _ca1">
                                    <img src="@/assets/svg/location.svg" alt="" />
                                    <p>San Jose, Costa Rica</p>
                                  </li>
                                </ul>
                                <p class="line-clamp-3 overflow_hidden leading-[18px] text-[16px]">
                                  We the descendants of old, chained up and confined
                                  within bars, are free spirited and apple apple
                                </p>
                              </div>
                              <div class="space-y-2 leading-[14px] p-4 font-semibold">
                                <p>2 Memberships</p>
                                <p>Creator of 2 groups</p>
                              </div>
                            </div>
                          </div>
                          <div
                            class="grid grid-cols-3 gap-3 border-t border-[#F2F2F2] p-4 font-semibold text-sm w-full">
                            <button class="uppercase border border-[#BCDEFF] r_8">
                              profile
                            </button>
                            <button class="uppercase border border-[#BCDEFF] r_8">
                              follow
                            </button>
                            <button @click="openChatModal(reply.reply_user?.id)"
                              class="full_flex gap-[10px] uppercase b_ce0 _ca1 r_8">
                              chat
                              <img src="@/assets/svg/chat_x.svg" alt="" />
                            </button>
                          </div>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                    <p class="flex gap-1 text-sm leading-4 text-black">
                      <span v-html="reply.comment"></span>
                    </p>
                  </div>
                  <ul
                    v-if="reply.media_files?.length && usePost.store.editComment[0] != reply.id || usePost.store.editComment[1] != reply.user.id || usePost.store.editComment[2] != r_index"
                    class="flex gap-5 min-w-fit w-full overflow-x-auto">
                    <li  @click="handleMediaShow(reply.media_files, index)" class="relative imagelabel min-w-fit" v-for="(i, index) in reply.media_files">
                      <img v-if="i.type == 'image'" class="max-h-[40px] min-h-[40px] r_8 object-cover" :src="i.url"
                        alt="" />
                        <div v-else-if="i.type == 'youtube' ||
    i.type == 'wistia' ||
    i.type == 'vimeo' ||
    i.type == 'loom'
    " class="relative">
                <iframe class="max-h-[40px] min-h-[40px] r_8 max-w-[40px] object-cover text-[#0000]" :src="i.url"></iframe>
                <div
                  class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                  <img src="@/assets/svg/video_btn.svg" alt="" />
                </div>
              </div>
            </li>
                  </ul>
                  <WriteInlineComment
                    v-if="usePost.store.editComment[0] == reply.id && usePost.store.editComment[1] == reply.user.id && usePost.store.editComment[2] == r_index"
                    class="w-full -mt-4" />
                  <div class="flex items-center gap-3 h-[18px] text-xs">
                    <p class="full_flex gap-1 _ca1">
                      <img class="cursor-pointer" @click="usePost.setLike(reply.id, 'comment', 2)"
                        v-show="reply.is_liked" src="@/assets/svg/like_active.svg" alt="" />
                      <img class="cursor-pointer" @click="usePost.setLike(reply.id, 'comment', 2)"
                        v-show="!reply.is_liked" src="@/assets/svg/community/like.svg" alt="" />
                      {{ reply.like_count }}
                    </p>
                    <button
                      @click="() => {usePost.store.comment_id = [comment.id, 2, reply.user.username, reply.user.id, reply.id]; 
    usePost.inline_comment.files = [];
                      }"
                      class="_ca1 font-semibold">
                      {{$t("reply")}}
                    </button>
                  </div>
                  <div v-if="usePost.store.comment_id[0] == comment.id &&
    usePost.store.comment_id[1] == 2 && reply.id == usePost.store.comment_id[4]
    " class="flex pt-1 md:gap-[14px] gap-[10px] md:ml-0 -ml-[92px]">
                    <img class="h-6 w-6 mt-1 object-cover rounded-full" :src="isLoading.user.image" alt="" />
                    <WriteInlineComment />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- writing input -->
      <div v-if="!usePost.modal.edit" class="b_cf0f relative z-50 -mx-5 -mb-7 overflow-hidden">
        <div class="flex items-start py-3 px-5 gap-[14px]" :class="addVideo.store.files?.length ? '' : 'h-[112px]'">
          <img class="h-10 w-10 object-cover rounded-full" :src="isLoading.user.image" alt="" />
          <div class="w-full">
            <!-- <input class="text-sm !border-0" placeholder="Your comment" /> -->
            <div class="comment_editor h-10 whitespace-pre-wrap">
              <Editor />
            </div>
            <ul v-if="addVideo.store.files?.length" class="flex gap-5 py-5 overflow-x-auto">
              <draggable :list="addVideo.store.files" group="grid" :animation="200"
                class="flex gap-4 overflow-hidden overflow-x-auto min-w-fit">
                <li class="relative imagelabel"
                  v-for="(i, index) in addVideo.store.files">
                  <button @click="addVideo.deleteImage(index)" type="button"
                    class="absolute deleteimage z-10 bg-white !hidden top-2 right-2 rounded-full w-7 h-7 full_flex border p-2">
                    <img src="@/assets/svg/x.svg" alt="" />
                  </button>
                  <img v-if="i.type == 'image'" class="w-40 h-40 min-w-[160px] border rounded-xl object-cover"
                    :src="i.url" alt="" />
                  <div v-else-if="i.type == 'video'" class="relative">
                    <video class="w-40 h-40 min-w-[160px] border rounded-xl object-cover" controls>
                      <source :src="i.url" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div
                  class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                  <img src="@/assets/svg/video_btn.svg" alt="" />
                </div>
                  </div>
                  <iframe v-else-if="i.type == 'youtube' ||
    i.type == 'wistia' ||
    i.type == 'vimeo' ||
    i.type == 'loom'
    " class="w-40 h-40 min-w-[160px] border rounded-xl object-cover text-[#0000]" :src="i.url"></iframe>
                </li>
                <li>
                  <label for="add_image"
                    class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm w-40 h-40">
                    <img class="w-1/3" src="@/assets/svg/add_photo.svg" alt="" />
                  </label>
                </li>
              </draggable>
            </ul>
            <div class="flex items-center justify-between py-5 mt-2 pt-0">
              <div @click="usePost.store.writecomment_type = 'comment'" class="textarea_icon flex items-center">
                <div class="icon full_flex h-10 w-10">
                  <label for="add_image" class="icon full_flex h-10 w-10">
                    <img src="@/assets/svg/textarea/upload_black.svg" alt="" />
                  </label>
                </div>
                <div @click="isLoading.modal.add_link = true"
                  class="icon sm:flex hidden items-center justify-center h-10 w-10">
                  <img src="@/assets/svg/textarea/link_black.svg" alt="" />
                </div>
                <div @click="useClassroom.local_store.addVideoModal = true"
                  class="icon sm:flex hidden items-center justify-center h-10 w-10">
                  <img src="@/assets/svg/textarea/video_black.svg" alt="" />
                </div>
                <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
                  <div id="emojidrop1" class="icon full_flex h-10 w-10 relative">
                    <img src="@/assets/svg/textarea/emoji_black.svg" alt="" />
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <div class="!overflow-hidden overflow-y-auto">
                        <EmojiPicker :native="true" theme="light" @select="addVideo.onSelectEmoji" />
                      </div>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
              <div class="flex gap-3 font-semibold">
                <button @click="usePost.store.card_info = false" class="uppercase h-10 px-6 rounded-lg _ca1">
                  {{$t('cancel')}}

                </button>
                <button @click="() => {
    usePost.store.writecomment_type = 'comment';
    usePost.write_comment();
  }
    " class="uppercase h-10 px-6 rounded-lg" v-loading="isLoading.isLoadingType('writeComment') &&
    usePost.store.writecomment_type != 'inline'
    " :class="useClassroom.module.video_content
    ? 'b_cbc _c07'
    : 'b_ce0 _ca1'
    ">
                                    {{$t('post')}}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input @change="addVideo.handleImage" type="file" id="add_image" class="h-0 w-0 block overflow-hidden !p-0" />

      <input @change="addVideo.handleInlieImage" type="file" id="add_inline_image"
        class="h-0 w-0 block overflow-hidden !p-0" />
    </el-dialog>

    <!-- Report to group admins -->
    <el-dialog v-model="store.reportAdmin" width="400" align-center class="!rounded-xl overflow-hidden px-6 py-7">
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">{{$t("community.reporttoadmin")}}</h1>
        <p class="text-lg">
          {{$t("community.reportinfo")}}
        </p>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button @click="store.reportAdmin = false" class="uppercase h-10 px-6 rounded-lg _ca1">
            {{$t('cancel')}}
          </button>
          <button @click="reposrtToAdmins" class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            {{$t('yes')}}
          </button>
        </div>
      </div>
    </el-dialog>

    <!-- Delete post -->
    <el-dialog v-model="usePost.modal.delete" width="400" align-center class="!rounded-xl overflow-hidden px-6 py-7">
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">
          {{ usePost.store.changeVoteData.title }}
        </h1>
        <p class="text-lg">{{ usePost.store.changeVoteData.description }}</p>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button @click="usePost.modal.delete = false" class="uppercase h-10 px-6 rounded-lg _ca1">
            {{$t('cancel')}}

          </button>
          <button v-if="usePost.store.modalType == 'delete'" @click="usePost.deletePost"
            v-loading="isLoading.isLoadingType('deletePost')" class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            {{$t('delete')}}
          </button>
          <button v-else-if="usePost.store.modalType == 'changeVote'" @click="usePost.setUserVote"
            v-loading="isLoading.isLoadingType('setUserVote')" class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            {{$t('confirm')}}
          </button>
          <button v-else-if="usePost.store.modalType == 'media'" @click="() => addVideo.deleteImage(store.media_index)"
            v-loading="isLoading.isLoadingType('deleteMedia')" class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            {{$t('confirm')}}
          </button>
          <button v-else-if="usePost.store.modalType == 'poll'" @click="() => usePost.removePoll()"
            v-loading="isLoading.isLoadingType('removePoll')" class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            {{$t('confirm')}}
          </button>
          <button v-else-if="usePost.store.modalType == 'reply'" @click="() => usePost.deleteComment()"
            v-loading="isLoading.isLoadingType('deleteComment')" class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            {{$t('confirm')}}
          </button>
        </div>
      </div>
    </el-dialog>

    <!-- Change category -->
    <el-dialog v-model="usePost.modal.change_category" width="400" align-center
      class="!rounded-xl overflow-hidden px-6 py-7">
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">Change category to</h1>
        <el-select class="block w-full mt-2" v-model="usePost.create.category_id" @change="handleChangeCategory"
          placeholder="Select">
          <el-option v-for="item in usePost.store.categories" :key="item.name" :label="item.name" :value="item.id">
            <div class="flex items-center gap-2">
              {{ item.name }}
              <img v-if="usePost.store.category_id.name == item.name" src="@/assets/svg/checked.svg" alt="" />
            </div>
          </el-option>
        </el-select>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button @click="usePost.modal.change_category = false" class="uppercase h-10 px-6 rounded-lg _ca1">
            {{$t('cancel')}}
          </button>
          <button @click="addVideo.handleSubmit" v-loading="isLoading.isLoadingType('writePost')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            {{$t('change')}}
          </button>
        </div>
      </div>
    </el-dialog>

    <!-- Like modal -->
    <el-dialog v-model="store.likeModal" width="500" align-center class="!rounded-xl overflow-hidden px-6 py-7">
      <div class="space-y-7">
        <div class="flex items-center justify-between border-b pb-4 -mx-4 px-4">
          <h1 class="font-semibold">
            {{ usePost.store.likeModalData.length }}
            {{ usePost.store.likeModalType }}
          </h1>
          <img @click="store.likeModal = false" class="cursor-pointer" src="@/assets/svg/x.svg" alt="" />
        </div>
        <div v-if="usePost.store.likeModalData.length">
          <ul class="overflow-auto max-h-[300px]">
            <li v-for="i in usePost.store.likeModalData.users" :key="i.id" class="flex items-center gap-4 w-full">
              <img class="h-10 w-10 rounded-full object-cover" :src="i.image" title="user" />
              <div class="space-y-1 w-[65%]">
                <h1 class="truncate font-semibold">
                  {{ i.name }} {{ i.surname }}
                </h1>
                <p v-if="usePost.store.likeModalType == 'Votes'" class="truncate">
                  {{ i.username }}
                </p>
                <p v-else class="truncate">
                  💪 I want to work on building my self-confidence. Have you
                  ever struggled with this? How did you develop a stronger sense
                  of self-worth? 💪💖
                </p>
              </div>
              <button v-if="usePost.store.likeModalType != 'Votes'"
                class="full_flex gap-[10px] min-w-fit uppercase b_ce0 _ca1 r_8 px-3">
                chat
                <img src="@/assets/svg/chat_x.svg" alt="" />
              </button>
            </li>
            <button @click="load" v-if="!isLoading.isLoadingType('getLikes') &&
    isLoading.store.pagination_two.current_page !=
    isLoading.store.pagination_two.last_page"
              class="border border-[#BCDEFF] mt-4 _c2a rounded-lg w-full font-semibold text-sm uppercase">
              Load more
            </button>
          </ul>
        </div>
        <div v-else-if="!isLoading.isLoadingType('getLikes') &&
    !usePost.store.likeModalData?.length
    " class="full_flex py-5">
          No likes yet
        </div>
        <div v-if="isLoading.isLoadingType('getLikes')" class="my-2 text-center chat_loading">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 mx-auto animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
        </div>
      </div>
    </el-dialog>

    <el-drawer v-model="store.drawer" height="400" direction="btt"
      class="!w-full !h-[400px] !rounded-t-[16px] overflow-hidden">
      <div class="flex items-center justify-between sticky -top-[21px] bg-white z-20 pt-6 -mt-[21px] pb-6">
        <h1 class="font-semibold">Choose category</h1>
        <img class="cursor-pointer" @click="store.drawer = false" src="@/assets/svg/close_drawer.svg" alt="" />
      </div>
      <div class="flex gap-3 whitespace-nowrap flex-wrap items-center">
        <button @click="handleCategory('all')" :class="usePost.store.filter.category_id != 'all' ? 'bg-[#F0F5FA]' : 'b_cbc'
    " class="px-3 rounded-full md:h-9 h-8 hover:bg-[#F0F5FA] hover:bg-opacity-30 duration-700">
          {{$t('nav.all')}}
        </button>
        <button @click="handleCategory(i.id)" store.drawer="false" v-for="i in usePost.store.categories" :class="usePost.store.filter.category_id == i.id ? 'b_cbc' : 'bg-[#F0F5FA]'
    " class="flex items-center md:h-9 h-8 hover:bg-opacity-30 duration-700 gap-1 py-2 px-3 rounded-full">
          <img class="w-[14px] h-[21px] object-contain" :src="i.icon" alt="" />{{ i.name }}
        </button>
      </div>
    </el-drawer>

    <ModalAddVideo />
    <ModalAddLink />

    <!-- post media modal -->
    <el-dialog v-model="store.postMediaModal"
      class="!p-0 !bg-transparent w-full fixed top-0 !shadow-none bg-black bg-opacity-10 full_flex" style="width: 100%;"
      align-center>
      <!-- {{store.postMediaList}} -->
      <div class="min-w-[80vw] md:min-h-[80vh] full_flex overflow-hidden md:max-h-[80vh] md:max-w-[80vw]">
        <div class="postmainSlider bg-black bg-opacity-10 max-w-[80vw] duration-500 flex items-center w-full">
          <div class="full_flex min-w-[100%] min-h-full" v-for="(media, index) in store.postMediaList">
            <div class="relative w-full imagelabel full_flex">
              <img v-if="media.type == 'image'" class="full_flex" :src="media.url" alt="" />
              <div v-else-if="media.type == 'video'">
                <video class="md:max-h-[80vh] max-w-[80vw] min-w-full md:min-h-[80vh] min-h-[50vh]" controls>
                  <source :src="media.url" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div class="w-full full_flex">
              <iframe v-else-if="media.type == 'youtube' ||
    media.type == 'wistia' ||
    media.type == 'vimeo' ||
    media.type == 'loom'
    " class="md:max-h-[80vh] max-w-[80vw] min-w-full md:min-h-[80vh] min-h-[50vh]" :src="media.url"></iframe>
            </div>
          </div>
        </div>
      </div>

      <!-- buttons -->
      <button @click="() => handleMediaSlide('plus')"
        class="bg-black z-50 bg-opacity-20 backdrop-blur-lg absolute sm:right-5 right-3 top-0 bottom-0 my-auto full_flex rounded-full w-12 h-12 border border-white">
        <img src="@/assets/svg/slide_arrow.svg" alt="" />
      </button>
      <button @click="() => handleMediaSlide('minus')"
        class="bg-black z-50 bg-opacity-20 backdrop-blur-lg absolute sm:left-5 left-3 top-0 bottom-0 my-auto full_flex rotate-180 rounded-full w-12 h-12 border border-white">
        <img src="@/assets/svg/slide_arrow.svg" alt="" />
      </button>
      <button @click="store.postMediaModal = false"
        class="bg-black z-50 bg-opacity-20 backdrop-blur-lg absolute sm:right-5 right-3 sm:top-5 top-3 my-auto full_flex rotate-180 rounded-full w-12 h-12 border border-white">
        <img src="@/assets/svg/slide_x.svg" alt="" />
      </button>
    </el-dialog>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import { useI18n } from "vue-i18n";
import {
  usePostStore,
  useLoadingStore,
  useChatStore,
  useGroupStore,
  useClassroomStore,
  useAddVideoStore,
  useEventStore,
} from "@/store";
import { VueDraggableNext as draggable } from "vue-draggable-next";
import { useNotification, useFormatDate, role_ac } from "@/composables";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
const usePost = usePostStore();
const { formatDate } = useFormatDate();
const useChat = useChatStore();
const useGroup = useGroupStore();
const isLoading = useLoadingStore();
const useClassroom = useClassroomStore();
const addVideo = useAddVideoStore();
const useEvent = useEventStore();
const { showMessage } = useNotification();
const { start, finish } = useLoadingIndicator();

useSeoMeta({
  title: computed(() => `${useGroup.store.group_by_username.name}`),
  ogTitle: computed(() => `${useGroup.store.group_by_username.name}`),
  description: computed(() => `${useGroup.store.group_by_username.description}`),
  ogDescription: computed(() => `${useGroup.store.group_by_username.description}`),
  ogImage: computed(() => `${useGroup.store.group_by_username.image}`),
  twitterCard: computed(() => `${useGroup.store.group_by_username.icon}`),
})

const { t } = useI18n();

const router = useRouter();
isLoading.addLoading("getPosts");

onBeforeMount(() => {
  useEvent.firstevent();
});

start();
await useAsyncData("community", async () => {
  await usePost.get_posts();
  await usePost.get_categories();
  finish();
}, { server: false })
const comment_step = ["First", "Second", "Third"]
const store = reactive({
  is_show: false,
  writingModal: false,
  likeModal: false,
  card_info: false,
  reportAdmin: false,
  drawer: false,
  is_emoji: false,
  media_index: "",
  see_more: false,
  postMediaModal: false,
  postMediaList: [],
  activeCollapse: 'open',
  slideStep: 0,
});

usePost.store.filter.filter = router.currentRoute.value.query.filter;
usePost.store.filter.sort = router.currentRoute.value.query.sort;
usePost.store.filter.category_id = router.currentRoute.value.query.category_id;

const setupgroup = {
  "invite": ["invite", () => isLoading.openDrawer(2), "is_three_member"],
  "description": ["addgd", () => isLoading.openDrawer(3), "is_description"],
  "cover": ["cover", () => isLoading.openDrawer(3), "is_image"],
  "post": ["write_post", () => {
    // window.scrollTop();
    usePost.store.writingModal = true
  }, "is_post"],
}

const changeVoteData = {
  title: "Change vote?",
  description: "Are you sure you want to change your vote?",
};

const deleteVoteData = {
  title: "Remove vote?",
  description: "Are you sure you want to remove your vote?",
};

const deletePostReply = {
  title: "Delete reply?",
  description: "Are you sure you want to delete?",
};

const deleteMediaFile = {
  title: "Delete file?",
  description: "Are you sure you want to delete this file?",
};

const deletePostData = {
  title: "Delete post?",
  description: "Are you sure you want to delete?",
};

const deletePostPoll = {
  title: "Remove poll?",
  description: "Are you sure you want to remove this poll",
};

function handleMediaShow(media, index) {
  store.postMediaList = media;
  store.postMediaModal = true;
  store.slideStep = index;
  setTimeout(() => {
    const image = document.querySelector(".postmainSlider");
    image.style.transform = `translateX(-${store.slideStep * 100}%)`;
  }, 100)
}

function routeToRequests() {
  const username = router.currentRoute.value.params.community;
  router.push(`/${username}/-/pending`)
}

function formatLastCommentDate(date) {
  const data = formatDate(date);
  if (data == `${t("community.justnow")}` || data.includes(`${t("community.hago")}`)) {
    return `${t("community.newcomment")} ` + data;
  } else {
    return `${t("community.lastcomment")} ` + data;
  }
}

function deletePost() {
  usePost.store.modalType = "delete";
  usePost.store.changeVoteData = deletePostData;
  usePost.modal.delete = true;
}

function removePoll() {
  usePost.store.modalType = "poll";
  usePost.store.changeVoteData = deletePostPoll;
  usePost.modal.delete = true;
}

function deleteReply(id, comment_id) {
  if (comment_id) {
    usePost.store.deleteReplyData = [id, comment_id];
  } else {
    usePost.store.deleteReplyData = [];
  }
  usePost.store.comment_id = id;
  usePost.store.modalType = "reply";
  usePost.store.changeVoteData = deletePostReply;
  usePost.modal.delete = true;
}

function pinToFeed(id) {
  usePost.store.post_id = id;
  usePost.pinToFeed();
}

function deleteMedia(index) {
  store.media_index = index;
  usePost.store.modalType = "media";
  usePost.store.changeVoteData = deleteMediaFile;
  usePost.modal.delete = true;
}

function changeVote(poll) {
  usePost.store.poll_id = poll.id;
  if (usePost.store.userIsVoted) {
    if (poll.is_selected) {
      usePost.store.modalType = "changeVote";
      usePost.store.changeVoteData = deleteVoteData;
    } else {
      usePost.store.modalType = "changeVote";
      usePost.store.changeVoteData = changeVoteData;
    }
    usePost.modal.delete = true;
  } else {
    usePost.setUserVote();
  }
}

function editPostData(type) {
  const polls = JSON.parse(JSON.stringify(usePost.store.postData.polls));
  if (type == "category") {
    usePost.modal.change_category = true;
    usePost.modal.edit = true;
  } else {
    usePost.modal.edit = true;
  }
  usePost.create.polls = [];
  for (let i in usePost.create) {
    if (i != 'polls') {
      usePost.create[i] = usePost.store.postData[i];
    }
  }
  usePost.create.video_link = [];
  let t = 0;
  usePost.store.polls = {};
  for (let i of polls) {
    usePost.store.polls[`option${t}`] = i.option;
    t++;
  }
  if (!usePost.store.postData.polls?.length) {
    usePost.store.polls = {};
    usePost.store.isPollSaved = false;
  } else {
    usePost.store.isPollSaved = true;
  }
  for (let category of usePost.store.categories) {
    if (usePost.store.postData.category_name == category.name) {
      usePost.store.category_id = category;
    }
  }
  if (!usePost.store.polls) {
    usePost.store.polls = {};
  }
  addVideo.store.files = [];
  for (let i of usePost.store.postData.media_files) {
    addVideo.store.files.push({
      id: i.id,
      url: i.url,
      file: i.url,
      type: i.type,
      is_new: false,
    });
  }
  usePost.store.postData.polls = JSON.parse(JSON.stringify(polls));
}

function copyLink() {
  var copyText = "http://localhost:4000/allan55";

  navigator.clipboard.writeText(copyText);
  showMessage(t.messages.copied);
  store.reportAdmin = false;
}

function reposrtToAdmins() {
  showMessage("Reported to group admins.");
  store.reportAdmin = false;
}

const text_dropdown = [
  ["Product Feedback", "Share your general feedback about Learnify here"],
  ["Product Question", "Ask a question about the product, or search above"],
  [
    "Feature Requests",
    "Want a feature Learnify doesn't have? Ask for it, or search above",
  ],
  ["Bug Reports", "Found a bug? Report it here and we'll fix it"],
];

const filter_sort = [
  {
    type: "recent",
    title: "Recent activity",
  },
  {
    type: "newest",
    title: "Newest post",
  },
  {
    type: "best",
    title: "Best (this week)",
  },
];

const filter_filter = [
  {
    type: "none",
    title: "None",
  },
  {
    type: "pinned",
    title: "Pinned (3)",
  },
  {
    type: "watching",
    title: "Watching",
  },
  {
    type: "unread",
    title: "Unread",
  },
  {
    type: "no_comments",
    title: "No comments",
  },
];

function routeToCalendar() {
  const username = router.currentRoute.value.params.community;
  router.push(`/${username}/calendar?eid=${useEvent.store.fistevent.id}`)
}

function handleMediaSlide(type) {
  if (type == "plus") {
        if (store.slideStep < store.postMediaList?.length - 1) {
          store.slideStep += 1;
        }
      } else {
        if (store.slideStep > 0) {
          store.slideStep -= 1;
        }
      }
}

function editComment(comment, c_index) {
  usePost.inline_comment.comment = comment.comment;
  usePost.store.editComment = [comment.id, comment.user.id, c_index];
  usePost.inline_comment.files = [];
  for (let i of comment.media_files) {
    usePost.inline_comment.files.push({
      id: i.id,
      url: i.url,
      file: i.url,
      type: i.type,
      is_new: false,
    });
  }
}

function handleChangeCategory(item) {
  for (let i of usePost.store.categories) {
    if (i.id == usePost.create.category_id) {
      usePost.store.category_id = i;
    }
  }
}

function showPostData(id) {
  usePost.store.card_info = true;
  usePost.store.post_id = id;
  usePost.getPostById();
}

function handleClick(e, id) {
  if (e.target.classList.contains('not_open')) return;
  usePost.store.card_info = true;
  usePost.store.post_id = id;
  usePost.getPostById('open');
}

function handleLikeModal(type, data) {
  usePost.store.likeModalType = type;
  store.likeModal = true;
  if (type == "Likes") {
    isLoading.store.pagination_two.current_page = 1;
    usePost.store.post_id = data.id;
    usePost.get_likes();
  } else if (type == 'Votes') {
    isLoading.store.pagination_two.current_page = 1;
    usePost.store.poll_id = data;
    usePost.get_votes();
  }
}

function openChatModal(data) {
  isLoading.store.chatModal = true;
  useChat.store.chat_user_data = data;
  isLoading.store.chatModal = true;
  useChat.getChatMessages();
}

function onSelectEmoji(emoji) {
  useClassroom.module.video_content += emoji.i;
}

function handleCategory(id, type) {
  store.drawer = false;
  if (type == "sort") {
    usePost.store.filter.sort = id;
    isLoading.changeQuery("sort", id);
  } else if (type == "filter") {
    usePost.store.filter.filter = id;
    isLoading.changeQuery("filter", id);
  } else {
    usePost.store.filter.category_id = id;
    isLoading.changeQuery("category_id", id);
  }
  usePost.get_posts();
}

const load = () => {
  isLoading.store.pagination_two.current_page += 1;
  if (usePost.store.likeModalType == 'Votes') {
    usePost.get_votes();
  } else if (usePost.store.likeModalType == 'Likes') {
    usePost.get_likes();
  }
};

watch(
  () => isLoading.store.pagination.current_page,
  () => {
    window.scrollTo(0, 0);
    usePost.get_posts();
  }
);

watch(
  () => usePost.modal.change_category,
  () => {
    if (!usePost.modal.change_category) {
      usePost.modal.edit = false;
    }
  }
);

watch(() => usePost.store.card_info, () => {
  store.see_more = false;
  if (!usePost.store.card_info) {
    usePost.clearData();
  }
})

watch(
  () => useClassroom.local_store.addVideoModal,
  () => {
    if (
      !useClassroom.local_store.addVideoModal &&
      useClassroom.local_store.videoLink
    ) {
      usePost.create.video_link.push(useClassroom.local_store.videoLink);
      usePost.store.files_url.push(useClassroom.local_store.videoLink);
    }
  }
);

watch(() => usePost.modal.edit, () => {
  if (!usePost.modal.edit) {
    addVideo.store.files = [];
  }
})

watch(() => usePost.store.comment_id, () => {
  try {
    usePost.store.editComment[0] = -1
  } catch (_) {
    usePost.store.editComment = [];
    usePost.store.editComment[0] = -1
  }
})

watch(() => usePost.modal.edit, () => {
  if (!usePost.store.edit) {
    usePost.getPostById();
  }
})

watch(() => usePost.store.editComment, () => {
  try {
    usePost.store.comment_id[0] = -1
  } catch (_) {
    usePost.store.comment_id = []
    usePost.store.comment_id[0] = -1
  }
})


watch(
  () => store.slideStep,
  () => {
    try {
      const image = document.querySelector(".postmainSlider");
      image.style.transform = `translateX(-${store.slideStep * 100}%)`;
    } catch (error) { }
  }
);


onBeforeMount(() => {
  document.addEventListener("keydown", function (event) {
    // Check if Ctrl key is pressed and the key pressed along with it
    if (store.postMediaModal) {
      if (event.key == "ArrowRight") {
        if (store.slideStep < store.postMediaList?.length - 1) {
          store.slideStep += 1;
        }
      } else if (event.key == "ArrowLeft") {
        if (store.slideStep > 0) {
          store.slideStep -= 1;
        }
      }
    }else {
      if (usePost.store.writingModal && event.key == "Enter") {
        event.preventDefault();
      }
    }
  });
});

onUnmounted(() => {
  try {
    document.removeEventListener("keydown");
  } catch (_) { }
})
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
