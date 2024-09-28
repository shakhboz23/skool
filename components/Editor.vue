<template>
  <div class="editor my-6 md:h-[242px] h-[234px]">
    <Editor
      v-model="useClassroom.module.video_content"
      class="editorw h-[275px]"
    >
      <template v-slot:toolbar>
        <div class="ql-formats !h-[40px] -mb-4">
          <div
            class="overflow-hidden"
            :style="`max-width: ${store.editor_w}px`"
          >
            <div class="!w-[400px] overflow-hidden overflow-x-auto">
              <button
                v-tooltip.bottom="'header 1'"
                class="h1 ql-header"
                :value="'1'"
              ></button>
              <button
                v-tooltip.bottom="'header 2'"
                class="h2 ql-header"
                :value="'2'"
              ></button>
              <button
                v-tooltip.bottom="'header 3'"
                class="ql-header"
                :value="'3'"
              >
                <img src="@/assets/svg/editor/h3.svg" alt="" />
              </button>
              <button
                v-tooltip.bottom="'header 4'"
                class="ql-header"
                :value="'4'"
              >
                <img src="@/assets/svg/editor/h4.svg" alt="" />
              </button>
              <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
              <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
              <button
                v-tooltip.bottom="'Strikethrough'"
                class="ql-strike"
              ></button>
              <!-- <button v-tooltip.bottom="'Underline'" class="ql-underline"></button> -->
              <button v-tooltip.bottom="'Code'" class="ql-code"></button>
              <button
                v-tooltip.bottom="'Ordered List'"
                id="ql-ol"
                class="ql-list"
                :value="'ordered'"
              >
                OL
              </button>
              <button
                v-tooltip.bottom="'Unordered List'"
                id="ql-ul"
                class="ql-list"
                :value="'bullet'"
              >
                UL
              </button>
              <button v-tooltip.bottom="'Blockquote'" class="ql-blockquote">
                Blockquote
              </button>
              <button v-tooltip.bottom="'Code Block'" class="ql-code-block">
                Code Block
              </button>
              <button v-tooltip.bottom="'Upload Image'" class="ql-image">
                Upload Image
              </button>
              <button v-tooltip.bottom="'Insert Link'" class="ql-link">
                Link
              </button>
              <!-- <button v-tooltip.bottom="'Insert Horizontal Rule'" class="ql-divider">Horizontal Rule</button> -->
            </div>
          </div>
        </div>
      </template>
    </Editor>
  </div>
</template>

<script setup>
import { useClassroomStore } from "@/store";
import Editor from "primevue/editor";
const useClassroom = useClassroomStore();
const store = reactive({
  editor_w: 0,
});

onMounted(() => {
  const ql = window.innerWidth;
  if (ql > 768) {
    store.editor_w = ql - 490;
  } else {
    store.editor_w = ql - 120;
  }
  
  window.addEventListener("resize", () => {
    const ql = window.innerWidth;
    if (ql > 768) {
      store.editor_w = ql - 490;
    } else {
      store.editor_w = ql - 120;
    }
  });
});
</script>

<style>
.editor * {
  overflow-x: auto !important;
  white-space: nowrap !important;
  min-width: fit-content !important;
}
</style>
