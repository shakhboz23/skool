<template>
  <div>
    <div
      class="flex items-center justify-between sticky z-20 top-0 bg-white pt-4 pb-5 px-4"
    >
      <h1 class="font-semibold">Chat</h1>
      <el-dropdown :hide-on-click="false" placement="bottom-end" class="dropdown" trigger="click">
        <div class="full_flex gap-1 _c2a text-xs font-semibold">
          <p class="text-xs">All</p>
          <img src="@/assets/svg/chat/select_arrow.svg" alt="" />
        </div>
        <template #dropdown>
          <el-dropdown-menu
            class="community_dropdown min-w-[200px] dropdown_shadow"
          >
            <el-dropdown-item @click="handleChatType('all')"
              >All</el-dropdown-item
            >
            <el-dropdown-item @click="handleChatType('unread')"
              >Unread</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="flex pb-5 px-4">
      <img class="-mr-10 z-10 ml-5" src="@/assets/svg/chat/search.svg" alt="" />
      <input
        v-model="store.search"
        @input="handleSearch"
        class="placeholder-[#9CCDFE] !pl-[60px] b_cf0f r_8 !border-none"
        type="text"
        placeholder="Search all reports"
      />
    </div>
    <div v-if="useChat.store.users?.length">
      <el-dropdown-item
        @click="openChatModal(i)"
        :id="`tooltip${index}`"
        class="chat_item"
        v-for="(i, index) in store.search ? store.result : useChat.store.users"
      >
        <img
          class="h-10 w-10 rounded-full object-cover"
          :src="i.image"
          :title="i.user_id?.name + ' ' + i.surname"
        />
        <div class="space-y-1 max-w-[390px]">
          <h1 class="font-semibold">
            {{ i.name }} {{ i.surname }}
            <span class="_c59 font-[400] text-xs">19d ago</span>
          </h1>
          <p class="truncate max-w-[390px]">
            💪 I want to work on building my self-confidence. Have you ever
            struggled with this? How did you develop a stronger sense of
            self-worth? 💪💖
          </p>
        </div>
        <el-tooltip content="Mark unread" placement="top">
          <div
            class="unread_tooltip cursor-pointer"
            @mouseover="handleMouseOver(index)"
            @mouseleave="handleMouseLeave(index)"
          >
            <p
              class="h-[10px] z-10 w-[10px] m-[6px] rounded-full b_c2a unreadbtn"
            ></p>
          </div>
        </el-tooltip>
      </el-dropdown-item>
    </div>
    <el-dropdown-item
      v-else
      id="nochatyet"
      class="flex items-center justify-center"
    >
      No chat yet
    </el-dropdown-item>
  </div>
</template>

<script setup>
import { useLoadingStore, useChatStore } from "@/store";

const useChat = useChatStore();
const isLoading = useLoadingStore();

const store = reactive({
  is_mount: false,
  isOpen: false,
  chatTime: "",
  chatTimeList: [],
  chatUserId: "",
  search: "",
  result: [],
});

function handleMouseOver(index) {
  const chat_item = document.querySelector(`#tooltip${index}`);
  chat_item?.classList.remove("el-dropdown-menu__item");
  chat_item?.classList.add("el-dropdown-menu__item2");
}

function handleMouseLeave(index) {
  const chat_item = document.querySelector(`#tooltip${index}`);
  chat_item?.classList.remove("el-dropdown-menu__item2");
  chat_item?.classList.add("el-dropdown-menu__item");
}

function handleChatType(type) {
  const dropdown = document.querySelector(".chat_dropdown img");
  dropdown.click();
}

function openChatModal(data) {
  isLoading.store.pagination.current_page = 1;
  useChat.store.chat_user_data = data;
  isLoading.store.chatModal = true;
  useChat.getChatMessages();
}

function handleSearch() {
  store.result = [];
  let s = store.search.trim().toLowerCase();
  let full_name = "";
  for (let i of useChat.store.users) {
    full_name = i.name + " " + i.surname;
    if (full_name.toLowerCase().indexOf(s) != -1) {
      store.result.push(i);
    }
  }
}

onBeforeMount(() => {
  store.is_mount = true;
  useChat.getChatUsers();
  // window.Echo.channel("chat_" + 1).listen(
  //   "MessageSent",
  //   (e) => {
  //     if (
  //       e.message.sender_type === "user" &&
  //       e.message.chat_id === 1
  //     ) {
  //       let index = this.managers.findIndex(
  //         (manager) => manager.chat_id === chat_id
  //       );
  //       if (index !== -1) {
  //         if (!this.counter[index]) {
  //           this.counter[index] = 0;
  //         }
  //         this.counter[index]++;
  //         this.notificationSound.play();
  //       };
  //     };
  //   },
  // );
});

// function chatScrollListener() {
//   const chatContainer = document.getElementById("chatContainer");
//   if (chatContainer.scrollTop < 100) {
//     if (!isLoading.isLoadingType("getChatMessage")) {
//       if (
//         isLoading.store.pagination.current_page <
//         isLoading.store.pagination.last_page
//       ) {
//         isLoading.store.pagination.current_page += 1;
//         useChat.getChatMessages();
//       }
//     }
//   }
// }

watch(
  () => useChat.store.chat_messages?.length,
  () => {
    if (useChat.store.scrollToBottom) {
      setTimeout(() => {
        const chatContainer = document.getElementById("chatContainer");
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 200);
      useChat.store.scrollToBottom = false;
    }
  }
);

watch(
  () => isLoading.store.chatModal,
  () => {
    if (!isLoading.store.chatModal) {
      window.Echo.leave("chat_" + useChat.store.currentChatId);
    } else {
      setTimeout(() => {
        const targetElement = document.getElementById("chat_loading");
        const chatContainer = document.getElementById("chatContainer");
        const chatH = chatContainer.scrollHeight;
        chatContainer.scrollTop = chatH;
        if (targetElement) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Element ekranda ko'rinayotgan bo'lsa
                if (!isLoading.isLoadingType("getChatMessage")) {
                  if (
                    isLoading.store.pagination.current_page <
                    isLoading.store.pagination.last_page
                  ) {
                    isLoading.store.pagination.current_page += 1;
                    useChat.getChatMessages();
                  }
                }
              }
            });
          });

          observer.observe(targetElement);
        } else {}
      }, 200);
    }
  }
);
</script>

<style lang="scss" scoped></style>
