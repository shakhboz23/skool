<template>
  <main class="flex gap-6 mt-[18px]">
    <section
      class="md:min-w-[280px] md:w-[280px] w-full"
      :class="store.is_open ? 'md:block hidden' : ''"
    >
      <div class="b_cd9 rounded-xl p-5">
        <div class="flex items-center justify-between">
          <h1 :title="useClassroom.store.modules.title" class="text-lg font-semibold truncate">
            {{ useClassroom.store.modules.title }}
          </h1>
          <el-dropdown
            v-if="role_ac.includes(useGroup.store.group_by_username.type)"
            placement="bottom-end"
            class="dropdown min-w-fit"
          >
            <img src="@/assets/svg/three_dot.svg" alt="" />
            <template #dropdown>
              <el-dropdown-menu
                class="community_dropdown min-w-[200px] dropdown_shadow"
              >
                <el-dropdown-item @click="handleEditCourse"
                  >{{$t('course.edit')}}</el-dropdown-item
                >
                <el-dropdown-item @click="useClassroom.store.setModal = true"
                  >{{$t('classroom.addset')}}</el-dropdown-item
                >
                <el-dropdown-item @click="addModuleInSet()"
                  >{{$t('classroom.addmodule')}}</el-dropdown-item
                >
                <el-dropdown-item
                  @click="
                    () => {
                      useClassroom.store.delete = true;
                      useClassroom.store.username =
                        useClassroom.store.modules.slug;
                    }
                  "
                  >{{$t('course.delete')}}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="mt-10">
          <el-progress
            class="module_progress"
            :percentage="useClassroom.store.classroomReyting"
          />
          <p class="text-xs mt-2">
            {{ useClassroom.store.classroomReyting }}% {{$t('course.complete')}}
          </p>
        </div>
      </div>
      <aside
        v-loading="isLoading.isLoadingType('updatePosition')"
        v-if="useClassroom.store.modules?.set"
      >
        <ul class="_c07 text-sm mt-5">
          <draggable
            :list="useClassroom.store.modules?.set"
            @change="useClassroom.update_set_position"
            group="set"
            :animation="200"
            class="grid"
            handle=".drag-handle"
          >
            <li
              v-for="(i, index) in useClassroom.store.modules?.set"
              :class="i.type == 'lesson' ? 'lesson_type' : ''"
            >
            <div class="flex items-center h-[44px] r_8 cursor-pointer">
              <div
              @click="handleActive(i)"
              :class="
                    useClassroom.local_store.activeName == i.id &&
                    useClassroom.store.activeTab == i.type
                      ? 'bg-transparent _c2a font-semibold'
                      : 'bg-white r_8'
                  "
                  class="flex items-center justify-between h-full pr-5 w-full"
                  >
                  <div class="flex items-center md:w-[210px] w-[90%]">
                    <p
                    :class="
                        useClassroom.local_store.activeName == i.id &&
                        useClassroom.store.activeTab == i.type
                          ? 'b_c2a'
                          : 'bg-transparent'
                      "
                      class="mr-4 w-1 h-[44px]"
                      ></p>
                      <button v-if="role_ac.includes(useGroup.store.group_by_username.type)" class="drag-handle w-6">
                              <img
                              draggable="false"
                              class="h-6 w-6 min-w-[24px]"
                                    src="@/assets/svg/drag.svg"
                                    alt=""
                                  />
                            </button>
                      <span :title="i.type == 'lesson' ? i.title : i.name" class="max-w-[80%] truncate overflow-hidden">{{
                        i.type == "lesson"
                        ? (i.published ? "" : `(${$t('course.draft')}) `) + i.title
                        : i.name
                      }}</span>
                  </div>
                  <div class="flex items-center gap-[10px]">
                    <el-dropdown
                      v-if="
                        i.type == 'lesson' &&
                        role_ac.includes(useGroup.store.group_by_username.type)
                      "
                      placement="bottom-end"
                      class="dropdown"
                    >
                      <img
                        class="rotate-90 three_dot min-w-fit"
                        src="@/assets/svg/three_dot.svg"
                        alt=""
                      />
                      <template #dropdown>
                        <el-dropdown-menu
                          class="community_dropdown min-w-[200px] dropdown_shadow"
                        >
                          <el-dropdown-item @click="editModule(i)"
                            >{{$t('classroom.editmodule')}}</el-dropdown-item
                          >
                          <el-dropdown-item
                            @click="useClassroom.publish_module(i.id)"
                            >{{
                              i.published 
                                  ? $t('classroom.revert')
                                  : $t('classroom.publishmodule')
                            }}</el-dropdown-item
                          >
                          <el-dropdown-item @click="changeFolder(i)"
                            >{{$t('classroom.changefolder')}}</el-dropdown-item
                          >
                          <el-dropdown-item
                            @click="useClassroom.duplicate_module(i.id)"
                            >{{$t('classroom.duplicate')}}</el-dropdown-item
                          >
                          <el-dropdown-item @click="dripModule(i)"
                            >{{$t('classroom.dripstatus')}}:
                            {{ i.day > 0 ? i.day : "Off" }}</el-dropdown-item
                          >
                          <el-dropdown-item @click="deleteModal('module', i.id)"
                            >{{$t('classroom.deletemodule')}}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                    <el-dropdown
                      v-else-if="
                        role_ac.includes(useGroup.store.group_by_username.type)
                      "
                      placement="bottom-end"
                      class="dropdown"
                    >
                      <img
                        class="rotate-90"
                        src="@/assets/svg/three_dot.svg"
                        alt=""
                      />
                      <template #dropdown>
                        <el-dropdown-menu
                          @click="useClassroom.local_store.activeEdit = ''"
                          class="community_dropdown min-w-[200px] dropdown_shadow"
                        >
                          <el-dropdown-item @click="editSet(i)"
                            >{{$t('classroom.editset')}}</el-dropdown-item
                          >
                          <el-dropdown-item @click="deleteModal('set', i.id)"
                            >{{$t('classroom.deleteset')}}</el-dropdown-item
                          >
                          <el-dropdown-item @click="addModuleInSet(i.id)"
                            >{{$t('classroom.addmoduleset')}}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                    <p
                      v-if="i.completed && i.type == 'lesson'"
                      class="full_flex rounded-full b_c2a h-5 w-5 min-w-[20px]"
                    >
                      <img class="w-3 h-3" src="@/assets/svg/true.svg" alt="" />
                    </p>
                    <img
                      :class="
                        useClassroom.local_store.activeName == i.id &&
                        useClassroom.store.activeTab == i.type
                          ? 'rotate-180'
                          : ''
                      "
                      class="duration-500 lesson_img min-w-fit"
                      src="@/assets/svg/select_arrow.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <ul
                :class="
                  useClassroom.local_store.activeName == i.id &&
                  useClassroom.store.activeTab == i.type
                    ? ''
                    : 'h-0 overflow-hidden'
                "
                class="w-full duration-1000"
              >
                <draggable
                  :list="useClassroom.store.modules?.set[index].lesson"
                  @change="useClassroom.update_set_position"
                  group="set"
                  :animation="200"
                  class="grid"
                  handle=".drag-handle"
                >
                  <li
                    @click="() => activeModule(lesson.id, m_index, index)"
                    v-for="(lesson, m_index) in i.lesson"
                    :class="
                      useClassroom.local_store.moduleActiveId == lesson.id
                        ? 'b_cbc'
                        : ''
                    "
                    class="flex items-center justify-between md:w-[267px] w-[90%] module_name text-xs pl-9 pr-2 h-8 r_8 cursor-pointer"
                  >
                  <button
                  v-if="role_ac.includes(useGroup.store.group_by_username.type)"  class="drag-handle w-6">
                    <img
                    draggable="false"
                    class="h-6 w-6 min-w-[24px]"
                          src="@/assets/svg/drag.svg"
                          alt=""
                        />
                  </button>
                    <p :title="lesson.title" class="truncate w-full">
                      {{ (lesson.published ? "" : `(${$t('course.draft')}) `) + lesson.title }}
                    </p>
                    <div class="flex gap-2 items-center min-w-fit">
                      <p
                        v-if="lesson.completed && lesson.type == 'lesson'"
                        class="full_flex rounded-full b_c2a h-5 w-5 min-w-fit"
                      >
                        <img
                          class="w-3 h-3 "
                          src="@/assets/svg/true.svg"
                          alt=""
                        />
                      </p>
                      <el-dropdown
                        v-if="
                          role_ac.includes(
                            useGroup.store.group_by_username.type
                          )
                        "
                        placement="bottom-end"
                        class="dropdown"
                      >
                        <img
                          class="rotate-90 three_dot"
                          src="@/assets/svg/three_dot.svg"
                          alt=""
                        />
                        <template #dropdown>
                          <el-dropdown-menu
                            class="community_dropdown min-w-[200px] dropdown_shadow"
                          >
                            <el-dropdown-item @click="editModule(lesson)"
                              >{{$t('classroom.editmodule')}}</el-dropdown-item
                            >
                            <el-dropdown-item
                              @click="useClassroom.publish_module(lesson.id)"
                              >{{
                                lesson.published
                                  ? $t('classroom.revert')
                                  : $t('classroom.publishmodule')
                              }}</el-dropdown-item
                            >
                            <el-dropdown-item @click="changeFolder(lesson)"
                              >{{$t('classroom.changefolder')}}</el-dropdown-item
                            >
                            <el-dropdown-item
                              @click="useClassroom.duplicate_module(lesson.id)"
                              >{{$t('classroom.duplicate')}}</el-dropdown-item
                            >
                            <el-dropdown-item @click="dripModule(lesson)"
                              >{{$t('classroom.dripstatus')}}:
                              {{
                                lesson.day > 0 ? lesson.day : "Off"
                              }}</el-dropdown-item
                            >
                            <el-dropdown-item
                              @click="deleteModal('module', lesson.id)"
                              >{{$t('classroom.deletemodule')}}</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </div>
                  </li>
                </draggable>
              </ul>
            </li>
          </draggable>
        </ul>
      </aside>
    </section>
    <section
      v-if="useClassroom.local_store.moduleData.title"
      class="w-full"
      :class="store.is_open ? '' : 'md:block hidden'"
    >
      <div
        @click="store.is_open = false"
        class="md:hidden flex items-center mb-[45px] gap-3 cursor-pointer"
      >
        <img src="@/assets/svg/icon/back.svg" alt="" />
        <p>{{$t('classroom.back')}}</p>
      </div>
      <div
        class="bg-white r_16 overflow-hidden whitespace-nowrap"
        v-if="!useClassroom.local_store.edit_card"
      >
        <div
          v-if="
            useClassroom.local_store.moduleIndex ||
            useClassroom.local_store.moduleIndex == 0
          "
        >
          <div
            class="flex items-center justify-between gap-2 border-b border-[#E0E0E0] w-full min-h-[64px] py-1 px-5 bg-white"
          >
            <h1 class="text-xl font-semibold whitespace-pre-line">
              {{ useClassroom.local_store.moduleData?.title }}
            </h1>
            <div class="full_flex gap-4n min-w-fit">
              <button
                v-if="useClassroom.local_store.moduleData?.completed"
                v-loading="isLoading.isLoadingType('markAsCompleted')"
                @click="useClassroom.update_completed()"
                class="full_flex gap-1 min-w-fit r_8 _c07 bg-[#BCFFC7] h-9 px-3"
              >
                <img src="@/assets/svg/mark_as_read_black.svg" alt="" />
                <p class="lg:block hidden">{{$t('classroom.marked')}}</p>
              </button>
              <button
                v-else
                v-loading="isLoading.isLoadingType('markAsCompleted')"
                @click="useClassroom.update_completed()"
                class="full_flex gap-1 min-w-fit border border-[#BCDEFF] r_8 _c2a h-9 px-3"
              >
                <img src="@/assets/svg/mark_as_read.svg" alt="" />
                <p class="lg:block hidden">{{$t('classroom.markasdone')}}</p>
              </button>
              <button
                v-if="role_ac.includes(useGroup.store.group_by_username.type)"
                @click="editModule(useClassroom.local_store.moduleData)"
                class="full_flex gap-1 min-w-fit border border-[#BCDEFF] r_8 _c2a h-9 px-3"
              >
                <img src="@/assets/svg/edit.svg" alt="" />
                <p class="lg:block hidden">{{$t('edit')}}</p>
              </button>
            </div>
          </div>
          <div
            v-if="
            useClassroom.local_store.moduleData.drip ?
              checkDates(useClassroom.local_store.moduleData.drip) &&
              !role_ac.includes(useGroup.store.group_by_username.type) : false
            "
            class="full_flex flex-col gap-2 b_cf2 m-5 r_8 h-[250px]"
          >
            <img class="h-7 w-7" src="@/assets/svg/clock.svg" alt="" />
            <p>{{$t('classroom.unlock')}} {{ useClassroom.local_store.moduleData.day }} {{$t('classroom.days')}}</p>
          </div>
          <div v-else class="space-y-5 p-5">
            <div
              v-if="isLoading.isURL(useClassroom.local_store.moduleData?.link)"
              class="rounded-xl bg-[#0000004D] md:h-[400px] h-[200px] r_8 overflow-hidden"
            >
              <!-- <iframe
                class="md:h-[400px] h-[200px] w-full object-contain object-center"
                :src="useClassroom.local_store.moduleData?.link"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe> -->
              <ClientOnly v-if="store.changeVideo">
                            <vue-plyr class="md:h-[400px] h-[200px] w-full object-contain object-center">
                                <div class="plyr__video-embed">
                                    <iframe class="md:h-[400px] h-[200px] w-full object-contain object-center" :src="useClassroom.local_store.moduleData?.link" allowfullscreen allowtransparency allow="autoplay"></iframe>
                                </div>
                            </vue-plyr>
                        </ClientOnly>
            </div>
            <p
            class="!whitespace-pre-line"
              v-if="useClassroom.local_store.moduleData?.description?.length"
              v-html="useClassroom.local_store.moduleData?.description"
            ></p>
            <div v-if="useClassroom.local_store.moduleData.media?.length">
              <p class="font-semibold">{{$t("classroom.resources")}}</p>
              <ul class="max-w-fit text-sm space-y-1 mt-2 mb-4">
                <li
                  v-for="(media, index) in useClassroom.local_store.moduleData
                    .media"
                  class="full_flex !justify-start gap-2 _c2a hover:underline cursor-pointer"
                >
                  <img
                    v-if="media.type == 'link'"
                    class="w-5 h-5 p-0.5"
                    src="@/assets/svg/href.svg"
                    alt=""
                  />
                  <img
                    v-else
                    class="w-5 h-5"
                    src="@/assets/svg/file.svg"
                    alt=""
                  />
                  <p v-if="media.type == 'link'">
                    <a :href="media.url" target="_blank">{{ media.name }}</a>
                  </p>
                  <p v-else @click="handleMediaShow(useClassroom.local_store.moduleData.media, media.id)">{{ media.name }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- edit card -->
      <form @submit.prevent="handleSubmit" v-else class="bg-white p-6 r_16">
        <div>
          <input
            @input="handleInput('input')"
            v-model="useClassroom.module.title"
            type="text"
            placeholder="Title"
            class="text-xl h-12 font-semibold"
            required
          />
          <p class="text-end mt-2 _ca1 text-sm">
            {{ useClassroom.module.title?.length }}/50
          </p>
        </div>
        <div
          v-if="!useClassroom.module.video"
          @click="
            () => {
              useClassroom.local_store.addVideoModal = true;
              addVideo.store.files = [];
            }
          "
          class="full_flex flex-col cursor-pointer gap-1 md:h-[400px] h-[184px] r_8 mt-5 b_cf2"
        >
          <img src="@/assets/svg/add_video.svg" alt="" />
          <p class="font-medium _c2a">{{$t("classroom.addvideo")}}</p>
        </div>
        <div
          v-else
          class="relative full_flex imagelabel video_upload flex-col cursor-pointer overflow-hidden gap-1 md:h-[400px] h-[200px] r_8 mt-5 b_cf2"
        >
          <button
            @click="deleteImage"
            type="button"
            class="absolute deleteimage !hidden top-5 z-30 right-5 rounded-full w-10 h-10 full_flex border bg-white"
          >
            <img class="m-auto" src="@/assets/svg/x.svg" alt="" />
          </button>
          <div class="w-full h-full" v-for="(i, index) in addVideo.store.files">
            <img
              v-if="i.type == 'image'"
              class="w-full h-full rounded-xl object-cover"
              :src="i.url"
              alt=""
            />
            <div v-else-if="i.type == 'video'">
              <video
                class="w-full h-full border rounded-xl object-cover"
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
              class="w-full h-full rounded-xl object-cover text-[#0000]"
              :src="i.url"
              ></iframe>
          </div>
        </div>
        <Editor />
        <div v-if="useClassroom.store.files?.length">
          <p class="font-semibold">{{$t("classroom.resources")}}</p>
          <ul class="max-w-fit text-sm space-y-1 mt-2 mb-4">
            <li
              v-for="(i, index) in useClassroom.store.files"
              v-show="i.is_new != 'deleted'"
              class="full_flex !justify-start gap-2 _c2a hover:underline cursor-pointer"
            >
              <img
                v-if="i.type == 'link'"
                class="w-5 h-5 p-0.5"
                src="@/assets/svg/href.svg"
                alt=""
              />
              <img v-else class="w-5 h-5" src="@/assets/svg/file.svg" alt="" />
              <p>{{ i.name }}</p>
              <el-dropdown
                v-if="role_ac.includes(useGroup.store.group_by_username.type)"
                placement="bottom-end"
                class="dropdown ml-4"
              >
                <img
                  class="rotate-90 three_dot"
                  src="@/assets/svg/three_dot.svg"
                  alt=""
                />
                <template #dropdown>
                  <el-dropdown-menu
                    class="community_dropdown min-w-[200px] dropdown_shadow"
                  >
                    <el-dropdown-item @click="editModuleFile(index)"
                      >{{$t("edit")}}</el-dropdown-item
                    >
                    <el-dropdown-item @click="movefile('up', index)"
                      ><span :class="index == 0 ? '_ca1' : ''"
                        >{{$t("moveup")}}</span
                      ></el-dropdown-item
                    >
                    <el-dropdown-item @click="movefile('down', index)">
                      <span
                        :class="
                          index == useClassroom.store.files?.length - 1
                            ? '_ca1'
                            : ''
                        "
                        >{{$t("movedown")}}</span
                      ></el-dropdown-item
                    >
                    <el-dropdown-item @click="deleteModal('media', index)"
                      ><span>{{$t("delete")}}</span></el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </li>
          </ul>
        </div>

        <div
          class="lg:flex lg:items-center lg:justify-between lg:space-y-0 space-y-4 min-w-fit w-full"
        >
          <div
            class="flex items-center lg:justify-center justify-between gap-6 _c07 min-w-fit"
          >
            <el-dropdown
              placement="bottom-start"
              class="dropdown border border-[#E0E0E0] px-3 min-w-fit rounded-[4px]"
            >
              <button type="button" class="full_flex gap-2 text-sm">
                {{$t("add")}}<img src="@/assets/svg/select_arrow.svg" alt="" />
              </button>
              <template #dropdown>
                <el-dropdown-menu
                  class="community_dropdown !-ml-3 min-w-[200px] dropdown_shadow"
                >
                  <el-dropdown-item @click="handleLikeUpload"
                    >
                    {{$t("classroom.addresourcel")}}
                    </el-dropdown-item
                  >
                  <label for="upload_file">
                    <el-dropdown-item>
                      {{$t("classroom.addresourcef")}}
                      <input
                        @change="handleFileUpload"
                        type="file"
                        id="upload_file"
                        class="block w-0 h-0 !p-0 overflow-hidden !border-none"
                      />
                    </el-dropdown-item>
                  </label>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <div class="flex items-center gap-6 min-w-fit w-full">
              <p
                v-if="useClassroom.module.published"
                class="text-[16px] font-medium min-w-fit"
              >
              {{$t("course.published")}}
              </p>
              <p v-else class="text-[16px] font-medium">{{$t('course.draft')}}</p>
              <el-switch v-model="useClassroom.module.published" class="ml-2" />
            </div>
          </div>
          <div
            class="flex lg:justify-start justify-end w-full gap-3 text-sm font-semibold"
          >
            <button
              @click="useClassroom.local_store.edit_card = false"
              type="button"
              class="uppercase h-10 px-6 rounded-lg _ca1"
            >
            {{$t("cancel")}}
            </button>
            <button
              :type="
                isLoading.isLoadingType('createModule') ? 'button' : 'submit'
              "
              :class="useClassroom.module.title ? 'b_cbc _c07' : 'b_ce0 _ca1'"
              class="uppercase h-10 px-6 rounded-lg"
              v-loading="isLoading.isLoadingType('createModule')"
            >
            {{$t("save")}}
            </button>
          </div>
        </div>
      </form>
    </section>

    <!-- add Video link -->
    <ModalAddVideo />

    <!-- Change folder -->
    <el-dialog
      v-model="useClassroom.store.change_category"
      width="400"
      align-center
      class="!rounded-xl overflow-hidden px-6 py-7"
    >
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">{{$t("classroom.changefolder")}}</h1>
        <el-select
          class="block w-full mt-2"
          v-model="useClassroom.store.current_category"
          placeholder="Select"
        >
          <el-option :key="'None'" :label="'None'" :value="null">
            <div class="flex items-center gap-2">
              {{$t("discovery.none")}}
              <img
                v-if="useClassroom.store.current_category == null"
                src="@/assets/svg/checked.svg"
                alt=""
              />
            </div>
          </el-option>
          <el-option
            v-for="item in useClassroom.store.modules.set"
            :key="item.name"
            :label="item.name"
            :value="item.id"
            v-show="item.type == 'set'"
          >
            <div class="flex items-center gap-2">
              {{ item.name }}
              <img
                v-if="useClassroom.store.current_category == item.id"
                src="@/assets/svg/checked.svg"
                alt=""
              />
            </div>
          </el-option>
        </el-select>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button
            @click="useClassroom.store.change_category = false"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
          {{$t("cancel")}}
          </button>
          <button
            @click="useClassroom.change_folder"
            v-loading="isLoading.isLoadingType('changeFolder')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
          {{$t("save")}}
          </button>
        </div>
      </div>
    </el-dialog>

    <!-- add set -->
    <el-dialog
      v-model="useClassroom.store.setModal"
      align-center
      width="440"
      class="bg-opacity-50 !rounded-lg py-7 px-6"
    >
      <form @submit.prevent="useClassroom.create_set">
        <h1
          v-if="useClassroom.store.setEdit"
          class="text-2xl mb-7 font-semibold"
        >
        {{$t("classroom.editset")}}
        </h1>
        <h1 v-else class="text-2xl mb-7 font-semibold">{{$t("classroom.addset")}}</h1>
        <input
          v-model="useClassroom.set.name"
          class="text-sm"
          type="text"
          placeholder="Creating a set"
          required
        />
        <p class="text-end mt-2 _ca1 text-sm">
          {{ useClassroom.set.name?.length }}/50
        </p>
        <div class="flex justify-between gap-3 mt-7 text-sm font-semibold">
          <div class="flex items-center gap-6">
            <p
              v-if="useClassroom.set.published"
              class="text-[16px] font-medium _c07"
            >
            {{$t("course.published")}}
            </p>
            <p v-else class="text-[16px] font-medium">{{$t("course.draft")}}</p>
            <el-switch v-model="useClassroom.set.published" class="ml-2" />
          </div>
          <div class="flex items-center gap-">
            <button
              @click="useClassroom.store.setModal = false"
              type="button"
              class="uppercase h-10 px-6 rounded-lg _ca1"
            >
            {{$t("cancel")}}
            </button>
            <button
              :class="useClassroom.set.name ? 'b_cbc _c07' : 'b_ce0 _ca1'"
              class="uppercase h-10 px-6 rounded-lg"
              v-loading="isLoading.isLoadingType('createSet')"
            >
            {{$t("save")}}
            </button>
          </div>
        </div>
      </form>
    </el-dialog>

    <!-- drip off -->
    <el-dialog
      v-model="useClassroom.store.dripModal"
      align-center
      width="440"
      class="bg-opacity-50 !rounded-lg py-7 px-6"
    >
      <form @submit.prevent="useClassroom.update_drip">
        <h1 class="text-2xl mb-7 font-semibold">{{$t("classroom.editdrip")}}</h1>
        <div class="flex items-center gap-6">
          <p
            v-if="useClassroom.store.is_drip"
            class="text-[16px] font-medium _c07"
          >
          {{$t("classroom.dripon")}}
          </p>
          <p v-else class="text-[16px] font-medium">{{$t("classroom.dripoff")}}</p>
          <el-switch v-model="useClassroom.store.is_drip" class="ml-2" />
        </div>
        <div
          v-if="useClassroom.store.is_drip"
          class="whitespace-nowrap _c07 flex items-center gap-2 mt-4"
        >
          <p>{{$t("classroom.releasepage")}}</p>
          <input
            @input="handleInput('day')"
            v-model="useClassroom.store.drip_day"
            max="999"
            min="1"
            type="number"
            class="w-14"
          />
          <p>{{$t("classroom.daysafter")}}</p>
        </div>
        <div class="flex items-center justify-end gap-2 mt-4">
          <button
            @click="useClassroom.store.dripModal = false"
            type="button"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
          {{$t("cancel")}}
          </button>
          <button
            :class="
              useClassroom.store.is_drip
                ? useClassroom.store.drip_day
                  ? 'b_cbc _c07'
                  : 'b_ce0 _ca1 pointer-events-none'
                : 'b_cbc _c07'
            "
            class="uppercase h-10 px-6 rounded-lg"
            v-loading="isLoading.isLoadingType('updateDrip')"
          >
          {{$t("save")}}
          </button>
        </div>
      </form>
    </el-dialog>

    <!-- add label for file -->
    <el-dialog
      v-model="useClassroom.store.add_file"
      width="400"
      align-center
      class="bg-opacity-50 !rounded-lg py-7 px-6"
    >
      <form @submit.prevent="handleAddFile">
        <h1 class="text-2xl font-semibold mb-4">
          {{$t("add")}} {{ useClassroom.store.file_type }}
        </h1>
        <div
          v-if="useClassroom.store.file_type != 'link'"
          class="flex gap-2 _c2a mt-3 mb-4 hover:underline cursor-pointer"
        >
          <img class="w-5 h-5" src="@/assets/svg/file.svg" alt="" />
          <p class="truncate">{{ useClassroom.store.file.file.name }}</p>
        </div>
        <input
          @input="handleInput('label')"
          v-model="useClassroom.store.file.name"
          class="text-sm"
          type="text"
          placeholder="Label"
          required
        />
        <p class="text-end mt-2 _ca1 md:text-sm text-xs">
          {{ useClassroom.store.file.name?.length }}/34
        </p>
        <input
          v-if="useClassroom.store.file_type == 'link'"
          v-model="useClassroom.store.file.file"
          class="text-sm mt-4"
          type="url"
          placeholder="Enter a URL"
          required
        />
        <p
          v-if="useClassroom.local_store.is_url"
          class="leading-4 text-red-600 -mb-6 mt-2 vip"
        >
        {{$t("classroom.invalid")}}
        </p>
        <div class="flex justify-end gap-3 mt-7 text-sm font-semibold">
          <button
            @click="useClassroom.store.add_file = false"
            type="button"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
          {{$t("cancel")}}
          </button>
          <button
            :class="
              useClassroom.store.file_type == 'link'
                ? useClassroom.store.file.name?.length &&
                  useClassroom.store.file.file?.length
                : useClassroom.store.file.name?.length
                ? 'b_cbc _c07'
                : 'b_ce0 _ca1 pointer-events-none'
            "
            class="uppercase h-10 px-6 rounded-lg"
            v-loading="isLoading.isLoadingType('createModule')"
          >
            <span v-if="useClassroom.file_edit.edit">
              <span v-if="useClassroom.store.file_type == 'link'">{{$t("general.url")}}</span>
              <span v-else>{{$t("save")}}</span>
            </span>
            <span v-else-if="useClassroom.store.file_type == 'link'">{{$t("general.url")}}</span>
            <span v-else>{{$t("save")}}</span>
          </button>
        </div>
      </form>
    </el-dialog>

    <!-- Delete -->
    <el-dialog
      v-model="useClassroom.file_edit.delete"
      width="400"
      align-center
      class="!rounded-xl overflow-hidden px-6 py-7"
    >
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">
          {{ store.delete_data.title }}
        </h1>
        <p class="text-lg">{{ store.delete_data.description }}</p>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button
            @click="useClassroom.file_edit.delete = false"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
          {{$t("cancel")}}
          </button>
          <button
            v-if="store.deleteType == 'media'"
            @click="handleDeleteMedia"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            {{$t("delete")}}
          </button>
          <button
            v-else-if="store.deleteType == 'set'"
            v-loading="isLoading.isLoadingType('deleteSet')"
            @click="useClassroom.delete_set()"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            {{$t("delete")}}
          </button>
          <button
            v-loading="isLoading.isLoadingType('deleteModule')"
            v-else-if="store.deleteType == 'module'"
            @click="useClassroom.delete_module()"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
          {{$t("delete")}}
          </button>
          <button
            v-else-if="isLoading.membersModal.modalType == 'link'"
            @click="useLink.deleteLink"
            v-loading="isLoading.isLoadingType('deleteLink')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
          {{$t("delete")}}
          </button>
        </div>
      </div>
    </el-dialog>

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
              <div v-else-if="media.type == 'youtube' ||
    media.type == 'wistia' ||
    media.type == 'vimeo' ||
    media.type == 'loom'
    ">
<ClientOnly>
                            <vue-plyr class="md:max-h-[80vh] max-w-[80vw] min-w-full md:min-h-[80vh] min-h-[50vh]">
                                <div class="plyr__video-embed">
                                    <iframe class="md:max-h-[80vh] max-w-[80vw] min-w-full md:min-h-[80vh] min-h-[50vh]" :src="media.url" allowfullscreen allowtransparency allow="autoplay"></iframe>
                                </div>
                            </vue-plyr>
                        </ClientOnly>
              </div>
            <iframe
              v-else-if="media.url?.includes('pdf')"
              class="w-full rounded-xl object-cover text-[#0000] h-[80vh]"
              :src="media.url"
            ></iframe>
            <div v-else class="text-center routerlinks _c07 bg-white p-7 r_8 max-w-[500px] w-full">
              <p class="font-bold text-lg">No preview available</p>
              <p class="mb-4 mt-2">for {{media.name}}</p>
              <a :href="media.url" download>  <button type="button" class="b_cbc r_8 px-6 py-2 !h-auto _c07 w-full">
            {{$t("classroom.download")}}
          </button>
        </a>
            </div>
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

import {
  useLoadingStore,
  useClassroomStore,
  useAddVideoStore,
  useGroupStore,
  usePostStore,
} from "@/store";
import { VueDraggableNext as draggable } from "vue-draggable-next";
import { role_ac } from "@/composables";

const isLoading = useLoadingStore();
const useClassroom = useClassroomStore();
const useGroup = useGroupStore();
const router = useRouter();
const usePost = usePostStore();
const addVideo = useAddVideoStore();
useSeoMeta({
  title: computed(
    () =>
      `${useClassroom.store.modules.title} · ${useGroup.store.group_by_username.name}`
  ),
  ogTitle: computed(
    () => `Classroom · ${useGroup.store.group_by_username.name}`
  ),
  description: computed(
    () => `Classroom · ${useGroup.store.group_by_username.description}`
  ),
  ogDescription: computed(
    () => `Classroom · ${useGroup.store.group_by_username.description}`
  ),
  ogImage: computed(() => `${useGroup.store.group_by_username.image}`),
  twitterCard: computed(() => `${useGroup.store.group_by_username.icon}`),
});

addVideo.store.files = [];
const store = reactive({
  is_open: false,
  deleteType: "",
  delete_data: {},
  postMediaModal: false,
  postMediaList: [],
  slideStep: 0,
  isPreview: false,
  changeVideo: true,
});

const deleteMediaFile = {
  title: "Delete file?",
  description: "Are you sure you want to delete this file",
};

const deleteSet = {
  title: "Delete set?",
  description: "Are you sure you want to delete this set",
};

const deleteModule = {
  title: "Delete module?",
  description: "Are you sure you want to delete this module",
};

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

function onIframeLoad(e) {
  store.isPreview = true;
}

function onIframeError(e, id) {
          const iframe = document.getElementById(`iframe${id}`);
  setTimeout(() => {
        try {
          const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
          if (!iframeDocument.body.innerHTML) {
  store.isPreview = true;
          }
        } catch (e) {
  store.isPreview = false;
        }
      }, 1000);
}

function handleMediaShow(media, media_id) {
  store.postMediaList = [];
  let t = 0;
  for (let i of media) {
    if (i.type != 'link') {
      store.postMediaList.push(i);
      t++;
    }
    if (i.id == media_id) {
      store.slideStep = t - 1;
    }
  }
  store.postMediaModal = true;
  setTimeout(() => {
    const image = document.querySelector(".postmainSlider");
    image.style.transform = `translateX(-${store.slideStep * 100}%)`;
  }, 100)
}

function movefile(type, index) {
  if (type == "up") {
    [useClassroom.store.files[index - 1], useClassroom.store.files[index]] = [
      useClassroom.store.files[index],
      useClassroom.store.files[index - 1],
    ];
  } else {
    [useClassroom.store.files[index + 1], useClassroom.store.files[index]] = [
      useClassroom.store.files[index],
      useClassroom.store.files[index + 1],
    ];
  }
}

function deleteModal(type, index, data) {
  store.deleteType = type;
  if (type == "media") {
    useClassroom.store.media_id = index;
    store.delete_data = deleteMediaFile;
  } else if (type == "module") {
    useClassroom.local_store.moduleActiveId = index;
    store.delete_data = deleteModule;
  } else if (type == "set") {
    useClassroom.store.set_id = index;
    store.delete_data = deleteSet;
  }
  useClassroom.file_edit.delete = true;
}

function dripModule(data) {
  useClassroom.store.module_id = data.id;
  useClassroom.store.drip_day = data.day;
  if (data.day) {
    useClassroom.store.is_drip = true;
  } else {
    useClassroom.store.is_drip = false;
  }
  useClassroom.store.dripModal = true;
}

function checkDates(date) {
  date = new Date(date).getTime();
  const now_date = new Date().getTime();
  return now_date > date;
}

function handleEditCourse() {
  const data = useClassroom.store.modules;
  useClassroom.store.add_course = true;
  useClassroom.store.edit_course = true;
  for (let i in useClassroom.create) {
    useClassroom.create[i] = data[i];
  }
  useClassroom.create.published = data.published ? true : false;
  isLoading.store.croppedImage = useClassroom.create.image;
  isLoading.store.croppedFile = useClassroom.create.image;
}

function changeFolder(data) {
  useClassroom.store.module_id = data.id;
  useClassroom.store.current_category = data.set_id ? data.set_id : null;
  useClassroom.store.change_category = true;
}

function handleDeleteMedia() {
  if (useClassroom.store.files[useClassroom.store.media_id].is_new == false) {
    useClassroom.store.files[useClassroom.store.media_id] = {
      ...useClassroom.store.files[useClassroom.store.media_id],
      is_new: "deleted",
    };
  } else {
    useClassroom.store.files.splice(useClassroom.store.media_id, 1);
  }
  useClassroom.file_edit.delete = false;
}

function editModuleFile(index) {
  const data = useClassroom.store.files[index];
  useClassroom.store.file_type = data.type;
  useClassroom.store.media_id = index;
  useClassroom.store.file = {
    ...data,
    file: data.type == "link" ? data.url : {},
    name: data.name,
    type: data.type,
    is_new: data.id ? false : null,
  };
  if (data.type != "link") {
    useClassroom.store.file.file.name = data.name;
  }
  useClassroom.file_edit.edit = true;
  useClassroom.store.add_file = true;
}

function handleAddFile() {
  if (useClassroom.file_edit.edit) {
    useClassroom.store.files[useClassroom.store.media_id] = {
      ...useClassroom.store.file,
    };
    useClassroom.store.add_file = false;
    return;
  }
  if (useClassroom.store.file_type == "link") {
    useClassroom.store.file.type = "link";
    useClassroom.local_store.is_url = !isLoading.isURL(
      useClassroom.store.file.file
    );
    if (!useClassroom.local_store.is_url) {
      useClassroom.store.files.push({ ...useClassroom.store.file });
      useClassroom.local_store.is_url = false;
      useClassroom.store.add_file = false;
    } else {
      useClassroom.local_store.is_url = true;
    }
  } else {
    useClassroom.store.files.push({ ...useClassroom.store.file });
    useClassroom.store.add_file = false;
  }
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  useClassroom.store.file = {
    file,
    name: "",
    type: file.type.split("/")[0],
    is_new: "",
    data: "",
  };
  useClassroom.store.add_file = true;
  useClassroom.store.file_type = "file";
}

function handleLikeUpload(e) {
  useClassroom.store.file_type = "link";
  useClassroom.store.add_file = true;
}

function activeModule(id, m_index, s_index) {
  router.push(`?module=${id}`);
  store.changeVideo = false;
  setTimeout(() => {
    store.changeVideo = true;
  }, 100)
  useClassroom.local_store.moduleActiveId = id;
  useClassroom.local_store.moduleIndex = m_index;
  useClassroom.local_store.setIndex = s_index;
  useClassroom.local_store.moduleData =
    useClassroom.store.modules.set[s_index]?.lesson[m_index];
  for (let i in useClassroom.module) {
    useClassroom.module[i] = useClassroom.local_store.moduleData[i];
  }
  store.is_open = true;
}

function handleActive(data) {
  if (data.type == 'lesson') {
    router.push(`?module=${data.id}`);
    store.changeVideo = false;
    setTimeout(() => {
      store.changeVideo = true;
    }, 100)
  }
  useClassroom.local_store.edit_card = false
  useClassroom.local_store.moduleActiveId = data.id;
  useClassroom.store.activeTab = data.type;
  if (data.type == "lesson") {
    useClassroom.local_store.moduleData = data;
    for (let i in useClassroom.module) {
      useClassroom.module[i] = data[i];
    }
    store.is_open = true;
  }
  if (useClassroom.local_store.activeName == data.id) {
    useClassroom.local_store.activeName = "";
  } else {
    useClassroom.local_store.activeName = data.id;
  }
}

function addModuleInSet(id) {
  useClassroom.module.set_id = id;
  useClassroom.local_store.edit_card = true;
  useClassroom.local_store.activeName = id;
  useClassroom.module.title = "New module";
  useClassroom.create_module("new_module");
}

function editSet(set) {
  useClassroom.store.set_id = set.id;
  useClassroom.set.published = set.published ? true : false;
  useClassroom.set.name = set.name;
  useClassroom.store.setEdit = true;
  useClassroom.store.setModal = true;
}

function editModule(data) {
  for (let i in data) {
    useClassroom.module[i] = data[i];
  }
  useClassroom.store.files = [];
  useClassroom.module.video = data.link;
  useClassroom.module.video_content = data.description;
  useClassroom.module.published = data.published ? true : false;
  useClassroom.store.files = [];
  addVideo.store.files = [];
    addVideo.store.files.push({ file: data.link, is_new: false, type: data.link_type, url: data.link, });
    for (let i of data.media) {
        useClassroom.store.files.push({ ...i, is_new: false, data: i });
    }
  useClassroom.local_store.edit_card = true;
}

function deleteImage() {
  useClassroom.local_store.is_url = "";
  useClassroom.module.video = "";
  useClassroom.local_store.videoLink = "";
}

function handleInput(type) {
  if (type == "label") {
    useClassroom.store.file.name = useClassroom.store.file.name?.slice(0, 34);
  } else if (type == "day") {
    useClassroom.store.drip_day = +String(useClassroom.store.drip_day)?.slice(
      0,
      3
    );
  } else {
    useClassroom.module.title = useClassroom.module?.title?.slice(0, 50);
  }
}

function handleSubmit() {
  useClassroom.module.video_content =
    // document.querySelector(".tiptap").innerHTML;
    useClassroom.update_module();
}

watch(
  () => useClassroom.store.add_file,
  () => {
    if (!useClassroom.store.add_file) {
      useClassroom.store.file_type = "";
      useClassroom.file_edit.edit = false;
      useClassroom.store.file = {
        file: "",
        name: "",
        type: "",
        is_new: "",
        data: "",
      };
    }
  }
);

watch(
  () => useClassroom.store.setModal,
  () => {
    if (!useClassroom.store.setModal) {
      useClassroom.store.setEdit = false;
    }
  }
);

watch(
  () => useClassroom.local_store.addVideoModal,
  () => {
    if (!useClassroom.local_store.addVideoModal) {
      useClassroom.module.video = useClassroom.local_store.videoLink;
    }
  }
);

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
  useClassroom.get_module();
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
</script>

<style lang="scss" scoped>
.module_name:hover {
  .three_dot {
    display: block !important;
  }
}
</style>
