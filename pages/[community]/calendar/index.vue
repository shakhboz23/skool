<template>
  <main class="rounded-xl">
    <div v-if="!store.table">
      <section
        class="flex items-center justify-between sm:py-4 sm:px-5 py-6 sm:mt-0 -mt-8"
      >
        <div class="flex md:gap-7 sm:gap-5 gap-2">
          <div class="full_flex text-center gap-2">
            <img
              @click="decMonth"
              class="h-7 w-7 hover:bg-gray-200 rounded-full rotate-180 cursor-pointer p-2"
              src="@/assets/svg/calendar_arrow.svg"
              alt=""
            />
            <div>
              <h1 class="font-semibold">{{ FormatDate() }}</h1>
              <p class="md:block hidden _c07 text-xs">06 pm Tashkent time</p>
            </div>
            <img
              @click="incMonth"
              class="h-7 w-7 hover:bg-gray-200 rounded-full cursor-pointer p-2"
              src="@/assets/svg/calendar_arrow.svg"
              alt=""
            />
          </div>
          <button @click="getToday('today')" class="_c2a font-medium">
            {{$t("calendar.today")}}
          </button>
        </div>
        <div class="full_flex gap-4">
          <button
            v-if="role_ac.includes(useGroup.store.group_by_username.type)"
            class="full_flex border border-[#BCDEFF] hover:bg-[#BCDEFF] h-9 w-9 r_8"
            @click="useEvent.store.add_event = true"
          >
            <img src="@/assets/svg/plus.svg" alt="" />
          </button>
          <button
            class="full_flex border border-[#BCDEFF] hover:bg-[#BCDEFF] h-9 w-9 r_8"
            @click="store.table = true"
          >
            <img src="@/assets/svg/table.svg" alt="" />
          </button>
        </div>
      </section>
      <div class="bg-white md:rounded-[16px] rounded-[8px]">
        <section class="grid grid-cols-7 font-semibold">
          <div
            class="flex items-center px-4 text-start font-medium sm:text-sm text-[10px] sm:h-9 h-7"
            v-for="(i, index) in weeks"
            :class="
              index + 1 != weeks.length
                ? '!border-0 sm:!border-r sm:border_cf2'
                : ''
            "
          >
            {{ $t(`calendar.${i}`) }}
          </div>
        </section>
        <section class="-mt-[1px]">
          <div class="grid grid-cols-7" v-for="date in useEvent.store.calendar">
            <div
              @click="handleCalendarData(useEvent.store.data_events[i[2]])"
              class="flex flex-col justify-center hover:sm:bg-transparent hover:bg-[#BCDEFF] sm:rounded-none sm:cursor-auto cursor-pointer r_12 items-center sm:border sm:border-[#F2F2F2] -ml-[1px] -mb-[1px] sm:h-[120px] h-[70px] px-4 py-[6px]"
              v-for="i in date"
            >
              <p
                :class="
                  store.today[1] == i[1] && store.today[0] == i[0]
                    ? 'b_cbc'
                    : ''
                "
                class="full_flex text-xs font-medium _c07 p-1 h-6 -ml-1 rounded-full max-w-fit min-w-[24px]"
              >
                {{ i[1] }}
              </p>
              <div class="_c07 cursor-pointer text-xs sm:w-full">
                <div class="space-y-1 sm:block hidden">
                  <div
                    v-for="(e, index) in useEvent.store.data_events[i[2]]"
                    @click="openEventData(e)"
                  >
                    <div
                      v-if="index == 0"
                      class="flex items-center pr-2 gap-[6px] rounded-[4px] b_cf0f overflow-hidden max-w-[100%]"
                    >
                      <p class="min-w-[2px] b_c2a h-6"></p>
                      <p class="truncate max-w-[100%] overflow-hidden">
                        {{ e.time }} - {{ e.title }}
                      </p>
                    </div>
                    <div
                      v-if="
                        index == 1 &&
                        useEvent.store.data_events[i[2]]?.length == 2
                      "
                      class="flex items-center w-fit pr-2 gap-[6px] rounded-[4px] b_cf0f overflow-hidden max-w-[100%]"
                    >
                      <p class="min-w-[2px] b_c2a h-6"></p>
                      <p class="truncate max-w-[100%] overflow-hidden">
                        {{ e.time }} - {{ e.title }}
                      </p>
                    </div>
                  </div>
                  <el-dropdown
                    v-if="useEvent.store.data_events[i[2]]?.length > 2"
                    placement="top-start"
                    class="dropdown"
                  >
                    <p class="_c2a text-xs font-medium">
                      +{{ useEvent.store.data_events[i[2]]?.length - 1 }} more
                    </p>
                    <template #dropdown>
                      <el-dropdown-menu
                        class="community_dropdown min-w-[200px] dropdown_shadow"
                      >
                        <div class="p-4 space-y-2">
                          <h1 class="_ca1 font-semibold">
                            {{ useEvent.store.data_events[i[2]]?.length - 1 }}
                            more events
                          </h1>
                          <div
                            class="cursor-pointer"
                            v-for="(e, index) in useEvent.store.data_events[
                              i[2]
                            ]"
                            @click="openEventData(e)"
                          >
                            <div
                              v-if="index != 0"
                              class="flex items-center w-fit pr-2 gap-[6px] hover:underline rounded-[4px] overflow-hidden max-w-[100%]"
                            >
                              <p class="">{{ index }})</p>
                              <p
                                class="truncate max-w-[100%] font-semibold _c2a overflow-hidden"
                              >
                                {{ e.time }} - {{ e.title }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
                <p
                  class="sm:hidden block w-[6.5px] h-[6px] b_c2a rounded-full -mb-[6px] -ml-[4px] mt-[2px]"
                  v-if="useEvent.store.data_events[i[2]]?.length"
                ></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <section
      class="flex md:flex-row flex-col-reverse md:gap-6 mt-[18px]"
      v-else
    >
      <div class="w-full">
        <div class="flex items-center justify-between -ml-2">
          <div class="flex items-center text-center gap-1 pt-5 lg:pb-5 pb-8">
            <img
              @click="decMonth"
              class="h-7 w-7 hover:bg-gray-200 rounded-full rotate-180 cursor-pointer p-2"
              src="@/assets/svg/calendar_arrow.svg"
              alt=""
            />
            <h1 class="font-semibold">{{ FormatDate() }}</h1>
            <img
              @click="incMonth"
              class="h-7 w-7 hover:bg-gray-200 rounded-full cursor-pointer p-2"
              src="@/assets/svg/calendar_arrow.svg"
              alt=""
            />
          </div>
          <button
            class="full_flex border border-[#BCDEFF] hover:bg-[#BCDEFF] h-9 w-9 r_8"
            @click="store.table = false"
          >
            <img src="@/assets/svg/calendar.svg" alt="" />
          </button>
        </div>
        <div>
          <div class="space-y-4" v-if="isLoading.isLoadingType('getEvents')">
            <LoadingDiv v-for="i in 4" class="h-[140px] r_8" />
          </div>
          <div
            v-else-if="useEvent.store.table_events?.length"
            class="_c07 text-sm space-y-4"
          >
            <div
              @click="openEventData(e)"
              class="flex gap-5 items-center bg-white rounded-[12px] cursor-pointer overflow-hidden"
              v-for="(e, index) in useEvent.store.table_events"
              v-show="checkDates(e.date)"
              :class="
                isLoading.store.pagination.to >= index + 1 &&
                isLoading.store.pagination.from <= index + 1
                  ? ''
                  : 'hidden'
              "
            >
              <img
                v-if="e.image"
                class="md:h-[140px] h-[120px] md:w-[260px] w-[140px] object-cover"
                :src="e.image"
                alt=""
              />
              <div v-else class="md:h-[140px] h-[120px] md:w-[260px] w-[140px] b_cf2 full_flex">
                <img
                  src="@/assets/svg/calendar/calendar_img.svg"
                  alt=""
                  class="w-14"
                />
              </div>
              <div class="md:space-y-4 space-y-2">
                <p class="leading-4 md:text-[16px] text-[12px]" v-for="i in formatCalendarDate(e, true)">
                  {{ i[0] }} @ {{ e.time }} - {{ i[1] }}
                </p>
                <p class="leading-6 md:text-xl text-[16px] font-semibold">{{ e.title }}</p>
                <p
                  v-show="item.label == e.location"
                  class="flex items-center gap-2"
                  v-for="item in location_list"
                >
                  <img :src="item.value" alt="" />
                  {{ item.label }}
                </p>
              </div>
            </div>
          </div>
          <div v-else>
            {{$t("calendar.noevent")}}
          </div>
        </div>
        <Pagination_card class="mt-7" />
      </div>
      <GroupInfoCard class="lg:block hidden lg:max-w-[280px]" />
    </section>

    <!-- event full info -->
    <el-dialog
      v-model="useEvent.store.eventModal"
      class="!rounded-2xl overflow-hidden !p-0 max-w-[400px] min-w-[350px]"
      align-center
    >
      <img
        v-if="useEvent.store.eventInfo.image"
        class="w-full -mt-2 mb-1"
        :src="useEvent.store.eventInfo.image"
        alt=""
      />
      <div
        v-else
        class="md:h-[242px] h-[190px] -mt-2 mb-1 w-full b_cf2 full_flex"
      >
        <img
          class="md:w-[100px] w-[80px]"
          src="@/assets/svg/calendar/calendar_img.svg"
          alt=""
        />
      </div>
      <div class="p-5 space-y-6">
        <div class="mb-7 flex _c00 items-center justify-between">
          <div>
            <h1 class="md:text-2xl text-xl font-semibold">
              {{ useEvent.store.eventInfo.title }}
            </h1>
          </div>
          <button
            v-if="role_ac.includes(useGroup.store.group_by_username.type)"
            @click="editEvent(useEvent.store.eventInfo.id)"
            class="border_cbc w-9 h-9 r_8 full_flex"
          >
            <img src="@/assets/svg/edit.svg" alt="" />
          </button>
        </div>
        <div class="flex items-center gap-4">
          <img
            class="w-6"
            src="@/assets/svg/calendar/calendar_black.svg"
            alt=""
          />
          <div>
            <p
              class="_c00 font-medium text-[16px]"
              v-for="i in formatCalendarDate(useEvent.store.eventInfo)"
            >
              {{ i[0] }} @ {{ useEvent.store.eventInfo.time }} - {{ i[1] }}
            </p>
            <p class="_ca1 text-sm">{{ useEvent.store.eventInfo.timezone }}</p>
          </div>
        </div>
        <div
          v-if="useEvent.store.eventInfo.location_value"
          class="flex items-center gap-4"
        >
          <img class="w-6" src="@/assets/svg/calendar/zoom.svg" alt="" />
          <a
            :href="useEvent.store.eventInfo.location_value"
            target="_blank"
            class="_c2a font-medium text-[16px] hover:underline cursor-pointer"
          >
            {{ useEvent.store.eventInfo.location_value }}</a
          >
        </div>
        <p class="text-sm">
          {{ useEvent.store.eventInfo.description }}
        </p>
        <el-dropdown
          class="w-full dropdown"
          placement="bottom-end"
          trigger="click"
        >
          <button
            class="!text-sm font-semibold b_cbc _c07 w-full r_8 uppercase full_flex gap-[10px]"
          >
            {{$t("calendar.addtocalendar")}}
            <img class="w-4" src="@/assets/svg/select_arrow.svg" alt="" />
          </button>

          <template #dropdown>
            <el-dropdown-menu
              class="community_dropdown min-w-[360px] dropdown_shadow"
            >
              <a
                :href="`https://calendar.google.com/calendar/u/0/r/eventedit?text=${useEvent.store.eventInfo.title}&dates=1707121058/1707121058&details=${useEvent.store.eventInfo.description}&ctz=${useEvent.store.eventInfo.timezone}&location=${useEvent.store.eventInfo.location_value}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                <el-dropdown-item>Google</el-dropdown-item>
              </a>
              <!-- <a href="http://" target="_blank" rel="noopener noreferrer">
                <el-dropdown-item>Apple</el-dropdown-item>
              </a>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <el-dropdown-item>Outlook</el-dropdown-item>
              </a>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <el-dropdown-item>Outlook.com</el-dropdown-item>
              </a>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <el-dropdown-item>Yahoo</el-dropdown-item>
              </a> -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-dialog>

    <!-- add event -->
    <el-dialog
      v-model="useEvent.store.add_event"
      align-center
      class="lg:min-w-[780px] min-w-[calc(100vw_-_40px)] bg-opacity-50 p-6 !rounded-lg"
    >
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <h1 class="text-2xl pb-2 font-semibold _c07">
          <span v-if="$t('nav.uz') == 'en' || $t('nav.uz') == 'ru'">
            <span v-if="useEvent.store.editEventModal"> {{ $t("edit") }}</span>
            <span v-else> {{ $t("add") }}</span>
          </span>
          {{ $t("calendar.event") }}
          <span class="lowercase" v-if="$t('nav.uz') != 'en' || $t('nav.uz') != 'ru'">
            <span v-if="useEvent.store.editEventModal"> {{ $t("edit") }}</span>
            <span v-else> {{ $t("add") }}</span>
          </span>
        </h1>
        <div>
          <FloatingInput
            v-model="useEvent.create.title"
            @input="handleInput('input')"
            :label="$t('title')"
            required
          />
          <p class="text-end mt-1 _ca1 text-sm">
            {{ useEvent.create.title?.length }}/50
          </p>
        </div>
        <div
          class="grid md:grid-cols-5 grid-cols-2 flex-wrap items-center gap-2"
        >
          <div class="flex items-center !min-w-full">
            <el-date-picker
              @change="checkIsActive"
              v-model="useEvent.create.date"
              type="date"
              class="!min-w-full !p-0 -mt-2"
              placeholder="Feb 23, 2024"
              format="MMM DD, YYYY"
            />
            <img
              class="-ml-8 z-10 mr-8"
              src="@/assets/svg/select_arrow.svg"
              alt=""
            />
          </div>
          <div class="w-full">
            <el-select v-model="useEvent.create.time" :placeholder="$t('calendar.time')">
              <el-option
                v-for="item in time_list"
                :key="item"
                :label="item"
                :value="item"
              >
                <div class="flex items-center gap-2">
                  {{ item }}
                  <img
                    v-if="useEvent.create.time == item"
                    src="@/assets/svg/checked.svg"
                    alt=""
                  />
                </div>
              </el-option>
            </el-select>
          </div>
          <div class="w-full md:col-span-1 col-span-2">
            <el-select
              @change="checkIsActive"
              v-model="useEvent.create.duration"
              :placeholder="$t('calendar.duration')"
            >
              <el-option
                v-for="item in 48"
                :key="item / 2"
                :label="item / 2 + (item / 2 == 1 ? ' hour' : ' hours')"
                :value="item / 2"
              >
                <div class="flex items-center gap-2">
                  {{ item / 2 }} {{ item / 2 == 1 ? "hour" : "hours" }}
                  <img
                    v-if="useEvent.create.duration == item / 2"
                    src="@/assets/svg/checked.svg"
                    alt=""
                  />
                </div>
              </el-option>
            </el-select>
          </div>
          <div class="w-full col-span-2 timezone">
            <el-select
              v-model="useEvent.create.timezone"
              filterable
              class="!w-full"
              placeholder="(GMT +05:00) Asia/Tashkent"
            >
              <el-option
                v-for="item in timeZones"
                :key="item"
                :label="item"
                :value="item"
              >
                <div class="flex items-center gap-2">
                  {{ item }}
                  <img
                    v-if="useEvent.create.timezone == item"
                    src="@/assets/svg/checked.svg"
                    alt=""
                  />
                </div>
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- <el-checkbox v-model="useEvent.store.recurring" label="Recurring event" />
        <div v-if="useEvent.store.recurring">
          <div class="flex items-center gap-5">
            <p>Repeat every</p>
            <el-select v-model="useEvent.create.repeat_number" filterable class="!w-20">
              <el-option v-for="item in repeat_data[useEvent.create.repeat]" :key="item" :label="item" :value="item">
                <div class="flex items-center gap-2">
                  {{ item }}
                  <img v-if="useEvent.create.timezone == item" src="@/assets/svg/checked.svg" alt="" />
                </div>
              </el-option>
            </el-select>
            <el-select v-model="useEvent.create.repeat" filterable class="!w-24">
              <el-option v-for="item in Object.keys(repeat_data)" :key="item" :label="item" :value="item">
                <div class="flex items-center gap-2 capitalize">
                  {{ item }}
                  <img v-if="useEvent.create.timezone == item" src="@/assets/svg/checked.svg" alt="" />
                </div>
              </el-option>
            </el-select>
          </div>
          <div class="mt-6" v-if="useEvent.create.repeat == 'month' ||
      useEvent.create.repeat == 'week'
      ">
            <p>Repeat on</p>
            <div class="flex items-center gap-0">
              <el-checkbox v-for="i in repeat_on" :label="i" />
            </div>
          </div>
          <div class="mt-6">
            <p>End</p>
            <div class="!space-y-6 mt-4">
              <label for="never" class="flex items-center gap-4">
                <input type="radio" name="end" id="never" />
                <p>Never</p>
              </label>
              <label for="on" class="flex items-center gap-4">
                <input type="radio" name="end" id="on" />
                <p class="flex">
                  <span class="block min-w-[60px]">On</span>
                  <el-date-picker @change="checkIsActive" v-model="useEvent.create.date" type="date"
                    class="!min-w-full !p-0 -mt-2" placeholder="Feb 23, 2024" format="MMM DD, YYYY" />
                </p>
              </label>
              <label for="after" class="flex items-center gap-4">
                <input type="radio" name="end" id="after" />
                <p class="flex items-center">
                  <span class="block min-w-[60px]">After</span>
                  <input type="number" class="w-20" />
                  <span class="block ml-2">occurrences</span>
                </p>
              </label>
            </div>
          </div>
        </div> -->
        <div class="flex md:flex-row flex-col md:items-center gap-4">
          <div>
            <label class="_ca1 block mb-2 text-xs" for="location"
              >Location</label
            >
            <el-dropdown
              placement="bottom-start"
              class="dropdown h-10 border border-[#E0E0E0] rounded-[4px] px-3 !w-full"
              trigger="click"
            >
              <div
                class="flex items-center justify-between w-full min-w-[132px]"
              >
                <div class="flex items-center !md:w-[132px] !w-full gap-2">
                  <img :src="useEvent.create.location.value" alt="" />
                  {{ useEvent.create.location.label }}
                </div>
                <img
                  class="-mt-0.5"
                  src="@/assets/svg/select_arrow.svg"
                  alt=""
                />
              </div>

              <template #dropdown>
                <el-dropdown-menu
                  class="community_dropdown min-w-[200px] !-ml-3 dropdown_shadow"
                >
                  <el-dropdown-item
                    @click="useEvent.create.location = item"
                    class="flex items-center !gap-2"
                    v-for="item in location_list"
                  >
                    <img :src="item.value" alt="" />
                    {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="w-full">
            <label class="_ca1 block mb-2 text-xs" for="location">{{
              useEvent.create.location.label != "Link"
                ? useEvent.create.location?.label + " link"
                : useEvent.create.location?.label
            }}</label>
            <input
              v-model="useEvent.create.location_value"
              type="text"
              class="!font-[400]"
              :placeholder="$t('calendar.enterurl')"
            />
          </div>
        </div>
        <div>
          <textarea
            @input="handleInput('textarea')"
            id="write_message"
            v-model="useEvent.create.description"
            class="h-[90px] text-sm w-full rounded-[4px]"
            :placeholder="$t('description')"
          ></textarea>
          <p class="text-end mt-2 _ca1 text-sm">
            {{ useEvent.create.description?.length }}/300
          </p>
        </div>
        <div class="sm:flex gap-4 sm:w-full w-[366px] max-w-full">
          <label
            v-if="!isLoading.store.croppedImage"
            for="add_photo_event"
            class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm sm:h-[188px] h-[164px] w-[366px] max-w-full"
          >
            <img src="@/assets/svg/add_photo.svg" alt="" />
            <p>{{ $t("about.coverphoto") }}</p>
            <p class="_ca1 text-xs font-medium">1460 x 752 px</p>
          </label>
          <label class="relative imagelabel" v-else for="add_photo_event">
            <button
              @click="deleteImage"
              type="button"
              class="absolute deleteimage !hidden top-2 right-2 rounded-full w-7 h-7 full_flex border p-2"
            >
              <img src="@/assets/svg/x.svg" alt="" />
            </button>
            <img
              class="sm:h-[188px] h-[164px] w-[366px] max-w-full overflow-hidden rounded-xl object-cover"
              :src="isLoading.store.croppedImage"
              alt=""
            />
          </label>
          <div class="py-5 space-y-5">
            <div>
              <label class="_ca1 text-xs" for="access"
                >{{ $t("calendar.access") }}</label
              >
              <el-select
                class="block w-full mt-2"
                v-model="useEvent.create.access"
                placeholder="Select"
              >
                <el-option
                  v-for="item in access_list"
                  :key="item.value"
                  :label="$t(`calendar.${item.label}`)"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                  <div class="flex items-center gap-2">
                    {{ $t(`calendar.${item.label}`) }}
                    <img
                      v-if="useEvent.create.access == item.value"
                      src="@/assets/svg/checked.svg"
                      alt=""
                    />
                  </div>
                </el-option>
              </el-select>
            </div>
            <div v-if="useEvent.create.access == 'level'">
              <label class="_ca1 text-xs" for="access"
                >{{$t("calendar.levelstart")}}</label
              >
              <el-select
                class="block w-full mt-2 el_select"
                v-model="useEvent.create.access_value"
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
                      v-if="useEvent.create.access_value == item"
                      src="@/assets/svg/checked.svg"
                      alt=""
                    />
                  </div>
                </el-option>
              </el-select>
            </div>
            <el-checkbox
              v-model="useEvent.create.remind"
              :label="$t('calendar.remind')"
            />
          </div>
          <input
            @change="handleAddedPhoto"
            id="add_photo_event"
            type="file"
            accept="image/*"
            class="w-0 h-0 overflow-hidden !p-0"
          />
        </div>
        <div
          class="flex items-center justify-between sm:pt-3 !sm:mt-8 !mt-5 text-sm font-semibold whitespace-nowrap"
        >
          <button
            v-loading="isLoading.isLoadingType('deleteEvent')"
            v-if="useEvent.store.editEventModal"
            type="button"
            @click="useEvent.delete_event"
            class="uppercase h-10 px-6 rounded-lg _ceb"
          >
            {{ $t("calendar.delete") }}
          </button>
          <div class="flex justify-end w-full gap-3">
            <button
              type="button"
              @click="useEvent.store.add_event = false"
              class="uppercase h-10 px-6 rounded-lg _ca1"
            >
              {{ $t("cancel") }}
            </button>
            <button
              :type="isLoading.isLoadingType('addEvents') ? 'button' : 'submit'"
              :class="store.is_active ? 'b_cbc _c07' : 'b_ce0 _ca1'"
              @click="reposrtToAdmins"
              class="uppercase h-10 px-6 rounded-lg"
              v-loading="isLoading.isLoadingType('addEvents')"
            >
              <span v-if="useEvent.store.editEventModal">
                {{ $t("save") }}</span
              >
              <span v-else> {{ $t("add") }}</span>
            </button>
          </div>
        </div>
      </form>
    </el-dialog>

    <!-- cropper image -->
    <el-dialog
      v-model="isLoading.store.cropModal"
      v-if="isLoading.store.cropModal"
      width="780"
      align-center
      class="bg-opacity-50 p-6 !w-[400px] !rounded-lg"
    >
      <cropper-image />
      <p class="_c07 text-center mt-4">
        Or,
        <label class="_c2a" for="add_photo_event"
          >upload a different photo</label
        >
      </p>
    </el-dialog>

    <el-drawer
      v-model="store.event_drawer"
      direction="btt"
      class="!w-full !rounded-t-[16px] event_drawer !min-h-fit overflow-hidden"
    >
      <div
        class="flex items-center justify-between sticky -top-[21px] bg-white z-20 pt-5 -mt-[21px] pb-5"
      >
        <h1 class="text-2xl font-semibold">Events</h1>
        <img
          class="w-5 h-5 cursor-pointer"
          @click="store.event_drawer = false"
          src="@/assets/svg/close_drawer.svg"
          alt=""
        />
      </div>
      <div class="space-y-4 pt-1">
        <ul
          v-for="(e, index) in store.info_drawer"
          @click="openEventData(e)"
          class="flex items-center cursor-pointer gap-5 border_ce0 r_12 py-3 px-4"
        >
          <li v-for="i in formatDrawerDate(e.date)">
            <p class="font-medium text-sm">
              {{ i[0] }}
            </p>
            <p class="font-semibolf text-2xl">{{ i[1] }}</p>
          </li>
          <li class="h-[52px] w-[3px] b_c2a rounded-full"></li>
          <li>
            <p class="font-semibolf">{{ e.title }}</p>
            <p class="text-sm _ca1" v-for="i in formatCalendarDate(e)">
              {{ e.time }} - {{ i[1] }}
            </p>
          </li>
        </ul>
      </div>
    </el-drawer>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import { useEventStore, useLoadingStore, useGroupStore } from "@/store";
import moment from "moment-timezone";
import { Calendar } from "calendar";
import zoom from "@/assets/svg/calendar/zoom.svg";
import meet from "@/assets/svg/calendar/meet.svg";
import address from "@/assets/svg/calendar/address.svg";
import link from "@/assets/svg/calendar/link.svg";
import Pagination_card from "~/components/Pagination_card.vue";
import { role_ac } from "@/composables";

const useEvent = useEventStore();
const isLoading = useLoadingStore();
const useGroup = useGroupStore();
const router = useRouter();
const { start, finish } = useLoadingIndicator();
isLoading.store.page_name = "calendar";

useSeoMeta({
  title: computed(() => `Calendar · ${useGroup.store.group_by_username.name}`),
  ogTitle: computed(
    () => `Calendar · ${useGroup.store.group_by_username.name}`
  ),
  description: computed(
    () => `Calendar · ${useGroup.store.group_by_username.description}`
  ),
  ogDescription: computed(
    () => `Calendar · ${useGroup.store.group_by_username.description}`
  ),
  ogImage: computed(() => `${useGroup.store.group_by_username.image}`),
  twitterCard: computed(() => `${useGroup.store.group_by_username.icon}`),
});

const cal = new Calendar(1);
const weeks = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const timeZones = moment.tz.names().map((name) => {
  const offset = moment.tz(name).format("Z");
  return `(GMT${offset}) ${name}`;
});

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const offset = moment().tz(timeZone).format("Z");
const location = moment.tz(timeZone).zoneAbbr();
useEvent.create.timezone = `(GMT ${offset}) ${timeZone}`;

const store = reactive({
  calendar: [],
  year: "",
  month: "",
  eventId: [],
  table: false,
  is_active: false,
  today: [],
  eventInfo: "",
  event_drawer: false,
  info_drawer: [],
  innerWidth: 0,
});

const access_list = [
  {
    label: "all",
    value: "all",
  },
  {
    label: "level",
    value: "level",
  },
  {
    label: "course",
    value: "course",
  },
];

const location_list = [
  {
    label: "Zoom",
    value: zoom,
  },
  {
    label: "Meet",
    value: meet,
  },
  {
    label: "Address",
    value: address,
  },
  {
    label: "Link",
    value: link,
  },
];

const time_list = [
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
  "5:30",
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "00:00",
  "00:30",
];

const repeat_data = {
  day: 15,
  week: 12,
  month: 3,
  year: 3,
};

const repeat_on = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const repeat_month = ["Monthly on day 10", "Monthly on the second Wednesday"];

const duration_list = [
  ["0.5 hours", 0.5],
  ["1 hour", 1],
  ["1.5 hours", 1.5],
  ["2 hours", 2],
  ["2.5 hours", 2.5],
];

useEvent.create.location = location_list[0];
useEvent.create.date = new Date();

function openEventData(data) {
  router.push(`?eid=${data.id}`);
  useEvent.store.eventInfo = data;
  store.event_drawer = false;
  useEvent.store.eventModal = true;
}

function handleCalendarData(data) {
  if (store.innerWidth <= 639) {
    store.info_drawer = data;
    if (data.length) {
      store.event_drawer = true;
    }
  }
}

function formatDrawerDate(date) {
  date = new Date(+date);
  const day = date.getDate();
  const month = date.toLocaleString("en", { month: "short" });
  return [[month, day]];
}

function formatCalendarDate(data, is_short) {
  let formatDate,
    dateString,
    time,
    duration,
    date,
    options,
    formattedDate,
    day,
    suffix,
    lastTime;
  try {
    dateString = data.date;
    time = data.time;
    time = time.slice(0, -2);
    duration = data.duration;
    date = new Date(dateString);
    options = {
      weekday: is_short ? "short" : "long",
      month: is_short ? "short" : "long",
      day: "numeric",
    };
    formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

    // Adding suffix to day
    day = date.getDate();
    suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    lastTime = addTime(time, duration);
    formatDate = formattedDate.replace(/\d{1,2}$/, (match) => match + suffix);
  } catch (_) {}
  return [[formatDate, lastTime]];
}

function checkDates(date) {
  const newDate = new Date(date);
  if (newDate.getMonth() == useEvent.store.month) {
    return true;
  }
  return false;
}

function editEvent(id) {
  for (let i in useEvent.create) {
    if (i == "date") {
      useEvent.create[i] = new Date(useEvent.store.eventInfo[i]);
    } else if (i == "duration") {
      useEvent.create[i] = +useEvent.store.eventInfo[i];
    } else if (i == "location") {
      // const locations = [zoom, meet, address, link];
      for (let locate of location_list) {
        if (useEvent.store.eventInfo[i] == locate.label) {
          useEvent.create[i] = locate;
          break;
        }
      }
    } else if (i == "image") {
      isLoading.store.croppedImage = useEvent.store.eventInfo.image;
    } else {
      useEvent.create[i] = useEvent.store.eventInfo[i];
    }
  }
  checkIsActive();
  useEvent.store.eventId = id;
  useEvent.store.eventModal = false;
  useEvent.store.add_event = true;
  useEvent.store.editEventModal = true;
}

function addTime(baseTime, hoursToAdd) {
  let hours, minutes;
  const [baseHours, baseMinutes] = baseTime.split(":").map(Number);
  const date = new Date();
  try {
    date.setHours(baseHours);
    date.setMinutes(baseMinutes);

    date.setHours(date.getHours() + Math.floor(hoursToAdd));
    date.setMinutes(date.getMinutes() + (hoursToAdd % 1) * 60);

    hours = date.getHours().toString().padStart(2, "0");
    minutes = date.getMinutes().toString().padStart(2, "0");
  } catch (_) {}
  return `${hours}:${minutes}`;
}

function FormatDate() {
  try {
    const date = new Date(store.year, useEvent.store.month);
    const options = { month: "long", year: "numeric" };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  } catch (error) {}
}

function getToday(type) {
  const offsetMinutes = new Date().getTimezoneOffset();
  const data = new Date(new Date().getTime() - offsetMinutes * 60 * 1000);
  const date = new Date().getDate();
  store.year = data.getFullYear();
  useEvent.store.month = data.getMonth();
  store.today = [useEvent.store.month, date];
  if (type == "today") {
    getCalendar(store.year, useEvent.store.month);
  }
}

getToday();

start();
await useAsyncData(
  "calendar",
  async () => {
    await getCalendar(store.year, useEvent.store.month);
    finish();
  },
  { server: false }
);

function incMonth() {
  if (useEvent.store.month == 11) {
    useEvent.store.month = -1;
  }
  useEvent.store.month += 1;
  getCalendar(store.year, useEvent.store.month);
}

function handleInput(type) {
  if (type == "input") {
    checkIsActive();
    useEvent.create.title = useEvent.create.title?.slice(0, 50);
  } else if (type == "after") {
    useEvent.create.repeat_end = +String(useEvent.create.repeat_end)?.slice(
      0,
      2
    );
  } else {
    useEvent.create.description = useEvent.create.description?.slice(0, 300);
  }
}

function handleAddedPhoto(e) {
  isLoading.store.cropModal = false;
  const file = e.target.files[0];
  isLoading.store.previewImage = URL.createObjectURL(file);
  document.getElementById("add_photo_event").value = "";
  setTimeout(() => {
    isLoading.store.cropModal = true;
  }, 100);
}

function deleteImage() {
  useEvent.create.image = "";
  isLoading.store.croppedImage = "";
}

function decMonth() {
  if (useEvent.store.month == 0) {
    useEvent.store.month = 12;
  }
  useEvent.store.month -= 1;
  getCalendar(store.year, useEvent.store.month);
}

async function getCalendar(year, month) {
  useEvent.store.calendar = [];
  store.startAndEndDate = [];
  let t = -1;
  useEvent.store.calendar = cal.monthDates(
    year,
    month,
    function (d) {
      t++;
      store.startAndEndDate.push(d);
      return [d.getMonth(), (" " + d.getDate()).slice(-2), t];
    },
    function (w) {
      return w;
    }
  );

  useEvent.store.start_date = new Date(
    store.year,
    ...useEvent.store.calendar[0][0]
  ).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  useEvent.store.end_date = new Date(
    store.year,
    ...useEvent.store.calendar[useEvent.store.calendar.length - 1][6]
  ).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return useEvent.get_event();
}

function checkIsActive() {
  if (
    useEvent.create.date &&
    useEvent.create.title &&
    useEvent.create.time &&
    useEvent.create.duration
  ) {
    store.is_active = true;
  } else {
    store.is_active = false;
  }
}

function handleSubmit() {
  if (store.is_active) {
    useEvent.add_event();
  }
}

watch(
  () => isLoading.store.croppedImage,
  () => {
    if (isLoading.store.croppedImage) {
      useEvent.create.image = isLoading.store.croppedFile;
      isLoading.store.previewImage = "";
    }
  }
);

watch(
  () => useEvent.store.add_event,
  () => {
    if (!useEvent.store.add_event) {
      useEvent.store.editEventModal = false;
    }
  }
);

watch(
  () => store.table,
  () => {
    if (!store.table) {
      router.push("?");
    }
  }
);

watch(
  () => useEvent.store.eventModal,
  () => {
    if (!useEvent.store.eventModal) {
      router.push("?");
    }
  }
);

watch(
  () => useEvent.store.editEventModal,
  () => {
    if (!useEvent.store.editEventModal) {
      useEvent.clearData();
    }
  }
);

watch(
  () => useEvent.store.add_event,
  () => {
    checkIsActive();
    if (!useEvent.store.add_event) {
      useEvent.clearData();
    }
  }
);

watch(
  () => store.table,
  () => {
    if (store.table) {
      useEvent.setPagination();
    }
  }
);

watch(
  () => useEvent.create.access,
  () => {
    if (useEvent.create.access == "level") {
      useEvent.create.access_value = 1;
    }
  }
);

watch(
  () => isLoading.store.pagination.current_page,
  () => {
    if (store.table) {
      isLoading.store.pagination.from =
        (isLoading.store.pagination.current_page - 1) * 4 + 1;
      if (
        isLoading.store.pagination.total >=
        isLoading.store.pagination.current_page * 4
      ) {
        isLoading.store.pagination.to =
          isLoading.store.pagination.current_page * 4;
      } else {
        isLoading.store.pagination.to = isLoading.store.pagination.total;
      }
    }
  }
);

onBeforeMount(() => {
  store.innerWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    store.innerWidth = window.innerWidth;
  });
  window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowLeft") {
      decMonth();
    } else if (e.key == "ArrowRight") {
      incMonth();
    }
  });
});
</script>

<style lang="scss" scoped></style>
