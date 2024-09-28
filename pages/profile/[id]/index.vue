<template>
  <main class="flex md:flex-row flex-col-reverse gap-5">
    <div v-if="isLoading.isLoadingType('getProfile')">
      <div class="flex gap-6 w-full">
        <div class="w-full space-y-5">
        <LoadingDiv class="h-[280px] rounded-xl" />
        <LoadingDiv class="h-[200px] rounded-xl" />
      </div>
      <LoadingDiv class="min-w-[240px] min-h-screen rounded-xl" />
      </div>
    </div>
    <div v-else class="space-y-5 w-full overflow-hidden">
      <section class="bg-white px-4 py-6 rounded-xl">
        <h1 class="text-sm font-semibold mb-[20px]">
          {{ $t("profile.activity") }}
        </h1>
        <div>
          <div class="flex gap-6">
            <div
              class="text-xs mt-[30px] space-y-[18px] leading-[14px] whitespace-"
            >
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
                      ? $t('profile.noactivity')
                      : i[4] == 1
                      ? `1 ${$t('profile.activity')?.toLowerCase()}`
                      : i[4] + ` ${$t('profile.activities')}`
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
            <button @click="store.activity_info = true" class="_ca1">
              {{ $t("profile.what") }}
            </button>
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

      <section
        v-if="useProfile.store.profile.created_groups?.length"
        class="bg-white px-4 py-6 rounded-xl"
      >
        <h1 class="font-semibold text-sm mb-7">
          <span v-if="$t('nav.uz') == 'en' || $t('nav.uz') == 'ru'">{{
            $t("profile.createdby")
          }}</span>
          {{ useProfile.store.profile.user?.name }}
          <span class="lowercase" v-if="$t('nav.uz') == 'uz'">{{
            $t("profile.createdby")
          }}</span>
        </h1>
        <ul class="space-y-6">
          <li
            class="flex items-center justify-between h-10"
            v-for="i in useProfile.store.profile.created_groups"
          >
            <div class="full_flex gap-4">
              <div class="full_flex items-start gap-4">
                <img
                  class="!w-10 !h-10 min-w-[40px] object-cover r_8 !overflow-hidden"
                  v-if="i.icon"
                  :src="i.icon"
                  alt=""
                />
                <div
                  v-else
                  class="full_flex uppercase w-10 h-10 min-w-[40px] r_8"
                  :style="`background: ${i.color}`"
                >
                  {{ i.initials }}
                </div>
                <div>
                  <h1 class="font-semibold">{{ i.name }}</h1>
                  <p>
                    <span class="capitalize">{{
                      $t(`nav.${i.group_type}`)
                    }}</span>
                    •
                    <span class="capitalize">
                      {{
                        i.members +
                        `${
                          i.members > 1
                            ? ` ${$t("tabs.members")}`
                            : ` ${$t("profile.membership")}`
                        }`
                      }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <router-link :to="`/${i.username}`">
              <button class="b_cbc px-6 uppercase font-semibold r_8">
                {{ $t("profile.view") }}
              </button>
            </router-link>
          </li>
        </ul>
      </section>

      <section
        v-if="useProfile.store.profile.membership?.length"
        class="bg-white px-4 py-6 rounded-xl routerlinks"
      >
        <h1 class="font-semibold text-sm mb-7">Memberships</h1>
        <div class="lg:flex flex-wrap grid items-center gap-10">
          <!-- v-for="i in useProfile.store.profile.membership" -->
          <router-link
            :to="`/${i.username}`"
            v-for="i in useProfile.store.profile.membership"
            class="flex items-center lg:justify-center gap-4 h-10 cursor-pointer"
          >
            <img
              class="!w-10 !h-10 min-w-[40px] object-cover r_8 !overflow-hidden"
              v-if="i.icon"
              :src="i.icon"
              alt=""
            />
            <div
              v-else
              class="full_flex uppercase w-10 h-10 min-w-[40px] r_8"
              :style="`background: ${i.color}`"
            >
              {{ i.initials }}
            </div>
            <div>
              <h1 class="font-semibold">{{ i.name }}</h1>
              <p>
                <span class="capitalize">{{ $t(`nav.${i.group_type}`) }}</span>
                •
                <span class="capitalize">
                  {{
                    i.members +
                    `${
                      i.members > 1
                        ? ` ${$t("tabs.members")}`
                        : ` ${$t("profile.membership")}`
                    }`
                  }}
                </span>
              </p>
            </div>
          </router-link>
        </div>
      </section>

      <section>
        <nav
          class="lg:flex items-center justify-between pt-4 mb-5 lg:space-y-0 space-y-5"
        >
          <p
            v-if="useProfile.store.profile.contributions"
            class="text-sm font-semibold w-full"
          >
            {{
              useProfile.store.profile.contributions?.count +
              `${
                useProfile.store.profile.contributions > 1
                  ? " contributions"
                  : " contribution"
              }`
            }}
            to {{ store.currentGroup.name }}
          </p>
          <p v-else>{{ $t("profile.contributions") }}</p>
          <el-dropdown
            placement="bottom-end"
            class="dropdown"
            :trigger="'click'"
          >
            <div
              class="flex items-center h-10 lg:justify-start justify-end w-full whitespace-nowrap gap-5"
            >
              <p v-if="store.currentGroup?.name" class="_ca1 flex gap-1">
                Contributions for:
                <span class="_c2a truncate max-w-[200px]">{{
                  store.currentGroup.name
                }}</span
                ><img src="@/assets/svg/profile_arrow.svg" alt="" />
              </p>
              <p v-else>{{ $t("profile.select") }}</p>
              <img src="@/assets/svg/filter_blue.svg" alt="" />
            </div>
            <template #dropdown>
              <el-dropdown-menu
                @click="store.activeEdit = ''"
                class="community_dropdown min-w-[200px] routerlinks dropdown_shadow"
              >
                <router-link
                  :to="`?g=${i.username}`"
                  v-for="i in useGroup.store.mygroups"
                >
                  <el-dropdown-item>
                    <div class="full_flex gap-2">
                      <img
                        v-if="i.group_type == 'private'"
                        src="@/assets/svg/community/private.svg"
                        alt=""
                      />
                      <img
                        v-else
                        src="@/assets/svg/members/public.svg"
                        alt=""
                      />
                      <p>
                        {{ i.name }}
                      </p>
                    </div>
                  </el-dropdown-item>
                </router-link>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </nav>
      </section>
      <!-- comments -->
      <!-- <section
        v-if="useProfile.store.profile.contributions?.posts"
        class="w-full"
      >
        <div
          v-for="(comment, c_index) in useProfile.store.profile.contributions
            ?.posts"
          class="flex items-start gap-4 border-y border-[#F0F5FA] w-full py-5"
        >
          <div class="relative max-w-fit">
            <img
              class="h-10 w-10 min-w-[40px] min-h-[40px] rounded-full object-cover"
              :src="comment.user.image"
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
            <div class="flex items-center justify-between">
              <div class="space-y-[2px] h-10">
                <h1 class="font-semibold text-[16px]">
                  {{ comment.user.name }} {{ comment.user.surname }}
                </h1>
                <p class="text-xs _ca1">{{ formatDate(comment.created_at) }}</p>
              </div>
              <el-dropdown
                v-if="isLoading.user.id == comment.user.id"
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
                      @click="editComment(comment, c_index)"
                      class="!text-xs font-medium h-10 px-3"
                      >Edit</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click="deleteReply(comment.id)"
                      class="!text-xs font-medium h-10 px-3"
                      >Delete</el-dropdown-item
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
            <div class="space-y-3 mt-3">
              <div class="space-y-3">
                <p
                  v-html="comment.comment"
                  class="text-sm leading-4 text-black"
                ></p>
                <div class="w-full mt-4 mb-5">
                  <ul
                    v-if="comment.media_files?.length"
                    class="flex gap-5 min-w-fit w-full overflow-x-auto"
                  >
                    <li
                      @click="handleMediaShow(comment.media_files, index)"
                      class="relative imagelabel min-w-fit"
                      v-for="(i, index) in comment.media_files"
                    >
                      <img
                        v-if="i.type == 'image'"
                        class="max-h-[40px] min-h-[40px] r_8 object-cover"
                        :src="i.url"
                        alt=""
                      />
                      <div
                        v-else-if="
                          i.type == 'youtube' ||
                          i.type == 'wistia' ||
                          i.type == 'vimeo' ||
                          i.type == 'loom'
                        "
                        class="relative"
                      >
                        <iframe
                          class="max-h-[40px] min-h-[40px] r_8 max-w-[40px] object-cover text-[#0000]"
                          :src="i.url"
                        ></iframe>
                        <div
                          class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex"
                        >
                          <img src="@/assets/svg/video_btn.svg" alt="" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="flex items-center gap-3 h-[18px] text-xs">
                <p class="full_flex gap-1 _c2a">
                  <img
                    class="cursor-pointer"
                    v-show="comment.is_liked"
                    src="@/assets/svg/like_active.svg"
                    alt=""
                  />
                  <img
                    class="cursor-pointer"
                    v-show="!comment.is_liked"
                    src="@/assets/svg/community/like.svg"
                    alt=""
                  />
                  {{ comment.like_count }}
                </p>
              </div>
            </div>
            <div
              v-if="comment.comment_users"
              v-for="(reply, r_index) in comment.comment_users"
              class="flex items-start w-full gap-4 mt-5"
            >
              <div class="relative max-w-fit">
                <img
                  class="h-6 w-6 min-w-[24px] min-h-[24px] rounded-full object-cover"
                  :src="reply.user?.image"
                  alt=""
                />
                <div class="full_flex absolute -bottom-[2px] -right-[5px] z-10">
                  <div class="relative">
                    <img
                      class="h-3 w-3"
                      src="@/assets/svg/community/user_messages.svg"
                      alt=""
                    />
                    <p
                      class="absolute full_flex bottom-0 h-3 w-3 pb-0.5 pt-[1px] text-[8px] text-white font-medium"
                    >
                      1
                    </p>
                  </div>
                </div>
              </div>
              <div class="w-full">
                <div class="flex items-center justify-between">
                  <div class="space-y-[2px] h-10">
                    <h1 class="font-semibold text-[16px]">
                      {{ comment.user.name }} {{ comment.user.surname }}
                    </h1>
                    <p class="text-xs _ca1">
                      {{ formatDate(comment.created_at) }}
                    </p>
                  </div>
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
                          @click="editComment(reply, r_index)"
                          class="!text-xs font-medium h-10 px-3"
                          >Edit</el-dropdown-item
                        >
                        <el-dropdown-item
                          @click="deleteReply(reply.id, comment.id)"
                          class="!text-xs font-medium h-10 px-3"
                          >Delete</el-dropdown-item
                        >
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
                <div class="space-y-3 mt-4">
                  <div class="flex gap-1">
                    <el-dropdown placement="top-start" class="dropdown">
                      <div>
                        <p
                          v-if="reply.reply_user?.username"
                          class="_c2a border-b border-[#2A85FF]"
                        >
                          @{{ reply.reply_user?.username }}
                        </p>
                      </div>
                      <template #dropdown>
                        <el-dropdown-menu
                          class="min-w-[440px] max-w-[440px] !-ml-1 dropdown_shadow"
                        >
                          <div class="flex">
                            <div
                              class="border-r border-[#F2F2F2] min-w-[192px] p-4 space-y-3"
                            >
                              <div class="relative user_img max-w-fit">
                                <img
                                  class="h-[160px] w-[160px] object-cover rounded-full"
                                  :src="reply.reply_user?.image"
                                  alt=""
                                />
                                <div
                                  class="full_flex absolute -bottom-[2px] -right-[5px] z-10"
                                >
                                  <div class="relative">
                                    <img
                                      class="h-10 w-10"
                                      src="@/assets/svg/community/user_messages.svg"
                                      alt=""
                                    />
                                    <p
                                      class="absolute full_flex bottom-0 w-10 h-10 pb-2 text-[22px] text-white font-medium"
                                    >
                                      1
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <p
                                class="full_flex max-w-fit mx-auto text-xs font-semibold h-8 px-[10px] bg-[#D9ECFF] _c2a rounded-full"
                              >
                                Level 2 - Contributer
                              </p>
                              <div class="full_flex gap-1 text-xs">
                                <span class="_c2a font-semibold">40</span>
                                points to level up
                                <img src="@/assets/svg/level_up.svg" alt="" />
                              </div>
                            </div>
                            <div>
                              <div
                                class="space-y-4 px-5 py-5 v border-b border-[#F2F2F2]"
                              >
                                <h1 class="font-semibold text-xl leading-6">
                                  Gerry Gonzalez
                                </h1>
                                <ul class="space-y-2">
                                  <li
                                    class="flex items-center gap-2 leading-[14px] _ca1"
                                  >
                                    <img src="@/assets/svg/clock.svg" alt="" />
                                    <p>Active 19d ago</p>
                                  </li>
                                  <li class="flex items-center gap-2 _ca1">
                                    <img
                                      src="@/assets/svg/location.svg"
                                      alt=""
                                    />
                                    <p>San Jose, Costa Rica</p>
                                  </li>
                                </ul>
                                <p
                                  class="line-clamp-3 overflow_hidden leading-[18px] text-[16px]"
                                >
                                  We the descendants of old, chained up and
                                  confined within bars, are free spirited and
                                  apple apple
                                </p>
                              </div>
                              <div
                                class="space-y-2 leading-[14px] p-4 font-semibold"
                              >
                                <p>2 Memberships</p>
                                <p>Creator of 2 groups</p>
                              </div>
                            </div>
                          </div>
                          <div
                            class="grid grid-cols-3 gap-3 border-t border-[#F2F2F2] p-4 font-semibold text-sm w-full"
                          >
                            <button
                              class="uppercase border border-[#BCDEFF] r_8"
                            >
                              profile
                            </button>
                            <button
                              class="uppercase border border-[#BCDEFF] r_8"
                            >
                              follow
                            </button>
                            <button
                              @click="openChatModal(reply.reply_user?.id)"
                              class="full_flex gap-[10px] uppercase b_ce0 _ca1 r_8"
                            >
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->
      <section
        v-if="useProfile.store.profile.contributions?.posts"
        class="space-y-6"
      >
        <div
          class="bg-white px-4 pt-6 rounded-xl"
          v-for="post in useProfile.store.profile.contributions?.posts"
        >
          <div class="relative">
            <div>
              <div
                class="flex lg:flex-row flex-col-reverse lg:items-center justify-between gap-3"
              >
                <div class="flex lg:items-center gap-4 w-full">
                  <div class="relative max-w-fit">
                    <img
                      class="h-10 w-10 rounded-full object-cover"
                      :src="post.user.image"
                      alt=""
                    />
                    <div
                      class="full_flex absolute -bottom-[2px] -right-[5px] z-10"
                    >
                      <div class="relative">
                        <img
                          src="@/assets/svg/community/user_messages.svg"
                          alt=""
                        />
                        <p
                          class="absolute full_flex bottom-0 w-5 h-5 pb-0.5 text-[10px] text-white font-medium"
                        >
                          {{ post.user.level }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="space-y-[2px]">
                    <h1 class="font-semibold">
                      {{ post.user.name }} {{ post.user.surname }}
                    </h1>
                    <p class="text-xs">
                      {{ formatDate(post.created_at) }}
                      <span v-if="$t('nav.uz') == 'en'">in</span>
                      <span class="_c59">{{ post.category_name }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <h2
                class="mb-4 md:mt-8 mt-6 md:text-2xl text-lg font-semibold md:w-full"
              >
                {{ post.title }}
              </h2>
              <p
                v-html="post.description"
                class="md:text-sm text-xs min-h-[40px] leading-6 line-clamp-2 max-w-[80%]"
              ></p>
              <div
                v-if="post.poll_available"
                @click="() => showPostData(i.id)"
                class="flex items-center cursor-pointer mt-4 gap-4"
              >
                <div
                  class="b_cbc px-2 h-[26px] rounded-[4px] full_flex gap-1 text-xs"
                >
                  <img
                    class="md:block hidden"
                    src="@/assets/svg/poll.svg"
                    alt=""
                  />
                  <img
                    class="md:hidden block"
                    src="@/assets/svg/poll_md.svg"
                    alt=""
                  />
                  <p class="">Poll</p>
                </div>
                <p class="text-xs font-semibold md:_c2a _c07">
                  {{ post.poll_count }} members have voted
                </p>
              </div>
              <div
                class="flex items-center _c59 gap-4 md:text-[16px] text-sm md:mt-3 mt-4"
              >
                <p class="full_flex gap-1 cursor-pointer">
                  <img
                    class="not_open"
                    @click="usePost.setLike(post.id)"
                    v-show="post.is_liked"
                    src="@/assets/svg/like_active.svg"
                    alt=""
                  />
                  <img
                    class="not_open"
                    @click="usePost.setLike(post.id)"
                    v-show="!post.is_liked"
                    src="@/assets/svg/community/like.svg"
                    alt=""
                  />
                  <span @click="handleLikeModal('Likes', i)">
                    {{ post.like_count }}
                  </span>
                </p>
                <p
                  @click="() => showPostData(post.id)"
                  class="full_flex gap-1 cursor-pointer"
                >
                  <img src="@/assets/svg/community/message.svg" alt="" />
                  {{ post.comment_count }}
                </p>
                <div
                  v-if="post.comment_count"
                  @click="() => showPostData(post.id)"
                  class="flex -space-x-[5px] cursor-pointer"
                >
                  <el-tooltip
                    v-for="(user, index) in post.comment_users"
                    :content="`${user.name} ${user.surname} - ${
                      index < 3
                        ? comment_step[index] + ' commenter'
                        : 'Recent commenter'
                    }`"
                    placement="top"
                  >
                    <img
                      class="h-[26px] w-[26px] rounded-full xl:block md:hidden sm:block hidden object-cover"
                      :src="user.image"
                      alt=""
                      :style="`z-index: ${7 - index}`"
                    />
                  </el-tooltip>
                </div>
                <p
                  v-if="post.comment_count"
                  @click="() => showPostData(post.id)"
                  class="_c2a md:text-sm text-xs font-semibold cursor-pointer"
                >
                  {{ formatLastCommentDate(post.post_comment_date) }}
                </p>
              </div>
            </div>
            <ul
              v-if="post.media_files"
              class="flex gap-5 absolute bottom-0 right-0 min-w-fit max-w-[400px] overflow-hidden"
            >
              <li class="relative imagelabel">
                <img
                  v-if="post.media_files.type == 'image'"
                  class="max-w-[140px] max-h-[140px] rounded-tl-xl object-contain"
                  :src="post.media_files.url"
                  alt=""
                />
                <div
                  class="relative"
                  v-else-if="post.media_files.type == 'video'"
                >
                  <video
                    class="max-w-[140px] max-h-[140px] rounded-tl-xl object-contain"
                    controls
                  >
                    <source :src="post.media_files.url" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div
                    class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex"
                  >
                    <img src="@/assets/svg/video_btn.svg" alt="" />
                  </div>
                </div>
                <div
                  v-else-if="
                    post.media_files.type == 'youtube' ||
                    post.media_files.type == 'wistia' ||
                    post.media_files.type == 'vimeo' ||
                    post.media_files.type == 'loom'
                  "
                  class="relative"
                >
                  <iframe
                    class="rounded-tl-xl max-w-[140px] max-h-[140px] object-contain"
                    :src="post.media_files.url"
                  ></iframe>
                  <div
                    class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex"
                  >
                    <img src="@/assets/svg/video_btn.svg" alt="" />
                  </div>
                </div>
              </li>
            </ul>
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
                    <img
                      src="@/assets/svg/community/user_messages.svg"
                      alt=""
                    />
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
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
    <div class="w-" v-if="!isLoading.isLoadingType('getProfile')">
      <section class="bg-white rounded-xl p-5 pb-[60px] w-full max-h-fit">
        <div class="flex gap-20">
          <div
            class="flex flex-col items-center mx-auto relative min-w-[240px] min-h-[170px]"
          >
            <el-progress
              v-if="useProfile.store.profile.user?.level"
              :stroke-width="11"
              type="circle"
              :percentage="5"
            />
            <div class="absolute mx-auto top-[14.5px]">
              <div class="relative max-w-fit">
                <img
                  class="h-[138px] w-[138px] object-cover rounded-full"
                  :src="useProfile.store.profile.user?.image"
                  alt=""
                />
                <div
                  v-if="useProfile.store.profile.user?.level"
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
              v-if="useProfile.store.profile.user?.level"
              class="my-5 mb-3 _c2a font-semibold text-xs b_cd9 h-8 px-[10px] rounded-full"
            >
              Level {{ useProfile.store.profile.user?.level }} -
              {{ useProfile.store.profile.user?.level_name }}
            </button>
            <div
              v-if="useProfile.store.profile.user?.points"
              class="flex items-center gap-1 text-xs"
            >
              <p class="_c2a">
                {{
                  useProfile.store.profile.user?.points +
                  `${
                    useProfile.store.profile.user?.points > 1
                      ? " points"
                      : " point"
                  }`
                }}
              </p>
              <p class="_c07">to level up</p>
              <img src="@/assets/svg/members/pending.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <h1 class="text-xl font-semibold mt-5 w-full truncate">
            {{ useProfile.store.profile.user?.name }}
            {{ useProfile.store.profile.user?.surname }}
          </h1>
          <p class="_ca1 text-sm font-semibold">
            {{ useProfile.store.profile.user?.username }}
          </p>
          <p class="text-sm">{{ useProfile.store.profile.user?.bio }}</p>
          <div class="space-y-3 py-5">
            <!-- <button class="full_flex gap-1 b_cf2 h-7 px-2 r_8">
                <img class="h-3 w-3" src="@/assets/svg/online.svg" alt="" />
                Online now
              </button> -->
            <button class="full_flex gap-1 b_cf2 px-2 py-1 r_8 max-w-[240px]">
              <img
                class="h-4 w-4"
                src="@/assets/svg/calendar_black.svg"
                alt=""
              />
              <span class="truncate">
                {{ $t("members.joined") }}
              {{ formatDate(useProfile.store.profile.user?.created_at) }}
            </span>
            </button>
            <button
              v-if="useProfile.store.profile.user?.address"
              class="full_flex gap-1 b_cf2 px-2 py-1 r_8 max-w-[240px] min-h-fit"
            >
              <img
                class="h-4 w-4"
                src="@/assets/svg/location_black.svg"
                alt=""
              />
              <span class="truncate">{{ useProfile.store.profile.user?.address }}</span>
            </button>
          </div>
          <ul class="grid grid-cols-3 text-center gap-4 pb-5">
            <li>
              <p class="text-lg font-medium _c2a">
                {{ useProfile.store.profile.user?.contributions }}
              </p>
              <p class="_ca1 text-xs">{{ $t("profile.contributions") }}</p>
            </li>
            <li>
              <p class="text-lg font-medium _c2a">
                {{ useProfile.store.profile.user?.followers }}
              </p>
              <p class="_ca1 text-xs">{{ $t("profile.followers") }}</p>
            </li>
            <li>
              <p class="text-lg font-medium _c2a">
                {{ useProfile.store.profile.user?.following }}
              </p>
              <p class="_ca1 text-xs">{{ $t("profile.following") }}</p>
            </li>
          </ul>
          <!-- :class="useSettings.store.is_update ? 'b_cbc _c07' : 'b_ce0 _ca1'" -->
          <LoadingDiv class="h-8 w-full r_8" v-if="isLoading.isLoadingType('getProfile')" />
          <div v-else>
            <button v-if="isLoading.user.username == $router.currentRoute.value.params.id"
              @click="$router.push('/settings')"
              class="font-semibold px-6 r_8 w-full uppercase _c2a border_cbc mt-7"
            >
              {{ $t("profile.update") }}
            </button>
            <button v-if="isLoading.user.username != $router.currentRoute.value.params.id"
              @click="() => {}"
              class="font-semibold px-6 r_8 w-full uppercase _c2a border_cbc mt-7"
            >
              {{ $t("profile.follow") }}
            </button>
          </div>
        </div>
      </section>
    </div>

    <!-- activity_info -->
    <el-dialog
      v-model="store.activity_info"
      width="400"
      align-center
      class="bg-opacity-50 !rounded-lg"
    >
      <div class="_c07 space-y-4">
        <h1 class="font-semibold text-lg">{{ $t("profile.whatisthis[0]") }}</h1>
        <div class="space-y-4">
          <div>
            {{ $t("profile.whatisthis[1]") }}
          </div>
          <div>
            {{ $t("profile.whatisthis[2]") }}
          </div>
        </div>
      </div>
    </el-dialog>
  </main>
</template>

<script setup>
import { Calendar } from "calendar";
import { useProfileStore, useGroupStore, useLoadingStore } from "@/store";
import { useFormatDate } from "@/composables";

const { formatDate } = useFormatDate();
const useProfile = useProfileStore();
const isLoading = useLoadingStore();
const useGroup = useGroupStore();
const router = useRouter();
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
const comment_step = ["First", "Second", "Third"];
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
  currentGroup: {},
  activity_info: false,
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
  }
}

function formatLastCommentDate(date) {
  const data = formatDate(date);
  if (data == "just now" || data.includes("h ago")) {
    return "New comment " + data;
  } else {
    return "Last comment " + data;
  }
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
          for (let i of useProfile.store.profile.activities) {
            date1 = new Date(getFullYear, getMonth, getDate).setHours(
              0,
              0,
              0,
              0
            );
            date2 = new Date(i.date).setHours(0, 0, 0, 0);
            if (date1 == date2) {
              count = i.activity;
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

function setCurrentGroup() {
  const username = router.currentRoute.value.query.g;
  for (let i of useGroup.store.mygroups) {
    if (i.username == username) {
      store.currentGroup = i;
    }
  }
}
onBeforeMount(() => {
  useProfile.get_profile();
  setCurrentGroup();
});

watch(
  () => useProfile.store.profile,
  () => {
    getActivity();
  }
);

watch(
  () => useGroup.store.mygroups,
  () => setCurrentGroup()
);

watch(
  () => router.currentRoute.value.query.g,
  () => setCurrentGroup()
);
</script>

<style lang="scss" scoped></style>
