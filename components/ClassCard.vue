<template>
  <section>
    <div
      class="grid md:grid-cols-3 grid-cols-2 gap-6 justify-between my-8 mt-[18px]"
    >
      <LoadingDiv
        v-if="isLoading.isLoadingType('getClassrooms')"
        v-for="i in 10"
        class="w-full h-[400px] r_16"
      >
      </LoadingDiv>
      <div
        v-else
        v-for="(i, index) in useClassroom.store.classrooms"
        data-aos="zoom-in"
        class="w-full course_card relative bg-white routerlinks md:r_16 r_12 overflow-hidden"
      >
        <div
          v-if="role_ac.includes(useGroup.store.group_by_username.type)"
          :class="i.id == store.activeEdit ? 'edit_button_active' : ''"
          class="absolute right-4 top-4 bg-white w-6 h-6 r_8 z-10 p-1 _c07 edit_button cursor-pointer full_flex"
        >
          <el-dropdown placement="bottom-end" class="dropdown">
            <img
              @click="store.activeEdit = i.id"
              class="w-5 h-5 relative"
              src="@/assets/svg/three_dot.svg"
              alt=""
            />
            <template #dropdown>
              <el-dropdown-menu
                @click="store.activeEdit = ''"
                class="community_dropdown min-w-[200px] dropdown_shadow"
              >
                <el-dropdown-item @click="handleEditCourse(i)">{{
                  $t("course.edit")
                }}</el-dropdown-item>
                <el-dropdown-item
                  @click="useClassroom.update_course_position(i.id, 'up')"
                  :class="index == 0 ? 'opacity-50 pointer-events-none' : ''"
                  >{{ $t("move") }} ←</el-dropdown-item
                >
                <el-dropdown-item
                  @click="useClassroom.update_course_position(i.id, 'down')"
                  :class="
                    isLoading.store.pagination.total == index + 1
                      ? 'opacity-50 pointer-events-none'
                      : ''
                  "
                  >{{ $t("move") }} →</el-dropdown-item
                >
                <el-dropdown-item
                  @click="
                    () => {
                      useClassroom.store.delete = true;
                      useClassroom.store.username = i.slug;
                    }
                  "
                >
                  {{ $t("course.delete") }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div>
          <div>
            <img
              v-if="i.image"
              class="w-full card md:h-[180px] sm:h-[140px] h-[88px] object-cover"
              :src="i.image"
              alt=""
            />
            <p
              v-else
              class="w-full card md:h-[180px] sm:h-[140px] h-[120px] b_cbc"
            ></p>
          </div>
          <div
            v-if="access_list.includes(i.access)"
            class="absolute text-white gap-2 bg-black bg-opacity-30 top-0 full_flex flex-col w-full card md:h-[180px] sm:h-[140px] h-[88px] object-cover"
          >
            <img class="w-6 h-8" src="@/assets/svg/icon/lock.svg" alt="" />
            <p v-if="i.access == 'private'">Private Course</p>
            <p v-if="i.access == 'level_lock'">Unlock at Level {{ i.level }}</p>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center gap-4">
            <h1 class="font-semibold sm:text-xl text-sm line-clamp-1">
              {{ i.title }}
            </h1>
          </div>
          <p
            v-html="i.description"
            class="md:text-[16px] text-[10px] mt-4 md:mb-7 mb-4 h-12 line-clamp-2"
          ></p>
          <el-progress class="class_progress" :percentage="i.percentage" />
          <p class="sm:text-xs text-[10px] mt-2">
            {{ i.percentage }}% {{ $t("course.complete") }}
          </p>
        </div>
        <router-link
          :to="`/${$router.currentRoute.value.params.community}/classroom/${i.slug}`"
        >
          <button
            class="sm:text-[16px] text-sm full_flex w-full border-t class_btn duration-700 border-[#BCDEFF] sm:h-[50px] h-[31px] _c59 font-medium uppercase"
          >
            {{ $t("course.open") }}
          </button></router-link
        >
      </div>
      <div
        v-if="role_ac.includes(useGroup.store.group_by_username.type)"
        @click="useClassroom.store.add_course = true"
        class="relative border-2 border-dashed md:h-[409px] sm:h-[356px] h-[275px] border-[#BCDEFF] cursor-pointer text-[#59ACFF] full_flex flex-col gap-[10px] font-semibold overflow-hidden r_16"
      >
        <img src="@/assets/svg/add_course.svg" alt="" />
        <p class="md:text-[16px] text-[10px]">{{ $t("course.addnew") }}</p>
      </div>
    </div>
  </section>
  <input
    @change="handleAddedPhoto"
    id="add_photo"
    type="file"
    accept="image/*"
    class="w-0 h-0 overflow-hidden !p-0"
  />
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
      Or, <label class="_c2a" for="add_photo">upload a different photo</label>
    </p>
  </el-dialog>
</template>

<script setup>
import { useLoadingStore, useClassroomStore, useGroupStore } from "@/store";
import { role_ac } from "@/composables";
const useClassroom = useClassroomStore();
const useGroup = useGroupStore();
const isLoading = useLoadingStore();
const store = reactive({
  activeEdit: "",
});

const access_list = ["private", "level_lock"];

function handleAddedPhoto(e) {
  isLoading.store.cropModal = false;
  const file = e.target.files[0];
  isLoading.store.previewImage = URL.createObjectURL(file);
  document.getElementById("add_photo").value = "";
  setTimeout(() => {
    isLoading.store.cropModal = true;
  }, 100);
}

function deleteImage() {
  useClassroom.create.image = "";
  isLoading.store.croppedImage = "";
}

function handleEditCourse(data) {
  useClassroom.store.add_course = true;
  useClassroom.store.edit_course = true;
  for (let i in useClassroom.create) {
    useClassroom.create[i] = data[i];
  }
  useClassroom.create.published = data.published ? true : false;
  isLoading.store.croppedImage = useClassroom.create.image;
  isLoading.store.croppedFile = useClassroom.create.image;
}

watch(
  () => useClassroom.create.access,
  () => {
    if (useClassroom.create.access == "level_lock") {
      useClassroom.create.level = 1;
    } else {
      useClassroom.create.level = null;
    }
  }
);

watch(
  () => isLoading.store.croppedImage,
  () => {
    if (isLoading.store.croppedImage) {
      useClassroom.create.image = isLoading.store.croppedFile;
      isLoading.store.previewImage = "";
    }
  }
);

watch(
  () => useClassroom.store.add_course,
  () => {
    if (!useClassroom.store.add_course) {
      useClassroom.store.edit_course = false;
    }
  }
);
</script>

<style lang="scss" scoped>
.course_card {
  &:hover {
    .edit_button {
      display: flex !important;
    }
  }
}

.edit_button_active {
  display: flex !important;
}
</style>
