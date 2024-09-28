import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useChatStore = defineStore("chat", () => {
  const isLoading = useLoadingStore();
  isLoading.checkCurrentUrl();
  let chat = {};
  const store = reactive({
    socket: "",
    messages: [],
    users: [],
    chat_user_data: [],
    chat_messages: [],
    chatTime: "",
    chatTimeList: [],
    currentChatId: "",
    scrollToBottom: false,
  });

  const message = reactive({
    text: "",
    user_id: "",
    token: "token",
  });

  function formatChatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const day = date.getDate();
    let suffix = "";
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    } else {
      suffix = "th";
    }
    return formattedDate.replace(/\d{1,2}/, `$&${suffix}`);
  }

  function checkChatTime() {
    for (let i of store.chat_messages) {
      const nowDate = new Date(i.created_at);
      const chatTime =
        nowDate.getDate() +
        ":" +
        nowDate.getMonth() +
        ":" +
        nowDate.getFullYear();
      if (chatTime == store.chatTime) {
        store.chatTime =
          nowDate.getDate() +
          ":" +
          nowDate.getMonth() +
          ":" +
          nowDate.getFullYear();
        store.chatTimeList.push(false);
      } else {
        store.chatTime =
          nowDate.getDate() +
          ":" +
          nowDate.getMonth() +
          ":" +
          nowDate.getFullYear();
        const formatedDate = formatChatDate(i.created_at);
        store.chatTimeList.push(formatedDate);
      }
    }
  }

  function sendMessage() {
    isLoading.addLoading("sendMessage");
    const token = localStorage.getItem("token");
    message.user_id = store.chat_user_data.id;
    const data = Object.assign({}, message);
    message.text = "";
    axios
      .post(isLoading.store.baseUrl + `send-message`, data, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang
        },
      })
      .then((res) => {
        isLoading.removeLoading("sendMessage");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("sendMessage");
      });
  }

  function getChatMessages() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    isLoading.addLoading("getChatMessage");
    const token = localStorage.getItem("token");
    let data = [];
    axios
      .get(
        isLoading.store.baseUrl +
          `get-chat-messages/${store.chat_user_data?.id}/10?page=${isLoading.store.pagination.current_page}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        data = [];
        store.currentChatId = res.data?.data[0]?.chat_id;
        if (isLoading.store.pagination.current_page == 1) {
          store.scrollToBottom = true;
          store.chat_messages = res.data?.data?.reverse();
          subscribeChannel(store.currentChatId);
        } else {
          data = [...res.data?.data];
        }
        isLoading.store.pagination = res.data?.meta;
        checkChatTime();
        isLoading.removeLoading("getChatMessage");
        const firstChildId =
          document.getElementById("chatContainerDiv").firstElementChild.id;
        if (isLoading.store.pagination.current_page != 1) {
          //   document.getElementById("chatContainerDiv").innerHTML = "";
          for (let i = 0; i < data.length; i++) {
            const div = document.createElement("div");
            div.id = data[i].id;
            div.innerHTML = `
            <article
            id="chat_messages${data[i].id}"
            class="space-y-5 pb-6"
          >
          ${
            store.chatTimeList[i]
              ? `<p class="mb-5 text-center _ca1">${store.chatTimeList[i]}</p>`
              : ``
          }
            ${
              data[i].sender?.id != isLoading.user.id
                ? `
                <div class="mx-5 flex gap-4">
                  <img
                    title="${data[i].sender?.name} ${data[i].sender?.surname}"
                    class="h-8 w-8 min-w-[32px] object-cover cursor-pointer rounded-full"
                    src="${data[i]?.sender?.image}"
                    alt=""
                  />
                  <div class="b_cf2 r_8 p-3">
                    <div class="flex items-center justify-between gap-3 mb-3">
                      <h1 class="_c07 font-semibold truncate max-w-[70%]">
                        ${data[i].sender?.name} ${data[i].sender?.surname}
                      </h1>
                      <p class="_ca1">
                        ${formateDate(data[i]?.created_at, "time")}
                      </p>
                    </div>
                    <pre class="whitespace-pre-line leading-4">
                      ${data[i]?.text}
                    </pre>
                  </div>
                </div>
                `
                : `
                <div class="mx-5 flex justify-end gap-4">
                  <div class="b_cf0f r_8 p-3">
                    <div class="flex items-center justify-between mb-3 gap-4">
                      <h1 class="_c07 font-semibold truncate max-w-[70%]">
                        ${data[i].sender?.name} ${data[i].sender?.surname}
                      </h1>
                      <p class="_c59">
                        ${formateDate(data[i]?.created_at, "time")}
                      </p>
                    </div>
                    <pre class="whitespace-pre-line leading-4">
                      ${data[i]?.text}
                    </pre>
                  </div>
                  <img
                    title="${data[i].sender?.name} ${data[i].sender?.surname}"
                    class="h-8 w-8 min-w-[32px] object-cover cursor-pointer rounded-full"
                    src="${data[i]?.sender?.image}"
                    alt=""
                  />
                </div>
                `
            }
          </article>
            `;
            document.getElementById("chatContainerDiv").prepend(div);
            document.getElementById(firstChildId).scrollIntoView();
            document
              .getElementById(firstChildId)
              .scrollIntoView({ behavior: "smooth" });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getChatMessage");
      });
  }

  function getChatUsers() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    isLoading.addLoading("sendMessage");
    const token = localStorage.getItem("token");
    axios
      .get(isLoading.store.baseUrl + `get-chat-users`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        store.users = res.data?.chat_user;
        isLoading.removeLoading("sendMessage");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("sendMessage");
      });
  }

  function subscribeChannel(chat_id) {
    window.Echo.channel("chat_" + chat_id).listen("MessageSent", (e) => {
      store.scrollToBottom = true;
      store.chat_messages.push(e.message);
    });
  }

  function formateDate(date, type) {
    try {
      const nowDate = new Date(date);
      if (type == "time") {
        const res = nowDate
          .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          ?.toLowerCase();
        return res;
      }
    } catch (_) {}
  }

  return {
    store,
    message,
    sendMessage,
    subscribeChannel,
    getChatMessages,
    getChatUsers,
    formateDate,
  };
});
