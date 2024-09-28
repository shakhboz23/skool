import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", () => {
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const demoBaseUrl = runtime.public.demoBaseURL;
  const router = useRouter();

  const store = reactive({
    loadingTypes: [],
    baseUrl: baseUrl,
    page: 1,
    isLogin: false,
    notPayedModal: false,
    email: "",
    page_name: "",
    pagination_type: 15,
    pagination: {
      current_page: router.currentRoute.value.query.page
        ? router.currentRoute.value.query.page
        : 1,
      total: null,
      last_page: 1,
      per_page: 10,
      from: "",
      to: "",
    },
    pagination_two: {
      current_page: router.currentRoute.value.query.page
        ? router.currentRoute.value.query.page
        : 1,
      total: null,
      last_page: 1,
      from: "",
      to: "",
    },
    previewImage: "",
    croppedImage: "",
    croppedFile: "",
    cropModal: false,
    chatModal: false,
    chatDialog: false,
    slideStep: 0,
    front_url: "",
    is_inline: false,
    settings: [],
    history: {},
  });

  const user = reactive({
    id: "",
    name: "",
    surname: "",
    username: "",
    bio: "",
    location: "",
    image: null,
    email: "",
    myers_briggs: "",
    socials: {
      website: null,
      instagram: null,
      twitter: null,
      youtube: null,
      linkedin: null,
      facebook: null,
    },
    creator: [],
    member: [],
  });

  const modal = reactive({
    add_link: false,
    link: "",
  });

  const membersModal = {
    create: false,
    edit: false,
    delete: false,
    change_category: false,
    modalType: "",
  };

  function openDrawer(step) {
    store.slideStep = 0;
    store.inviteModal = true;
    setTimeout(() => {
      store.slideStep = step;
      const slide = document.querySelector(".mainSlider");
      slide.style.transform = `translateY(-${store.slideStep * 100}%)`;
    }, 500);
  }

  const user_update_checker = reactive({
    id: "",
    level: "",
    level_name: "",
    percent: "",
    points: "",
    name: "",
    surname: "",
    username: "",
    bio: "",
    location: "",
    image: null,
    myers_briggs: "",
    socials: {
      website: null,
      instagram: null,
      twitter: null,
      youtube: null,
      linkedin: null,
      facebook: null,
    },
    creator: [],
    member: [],
  });

  function addLoading(type) {
    if (!store.loadingTypes?.includes(type)) {
      store.loadingTypes.push(type);
    }
  }

  function removeLoading(type) {
    if (store.loadingTypes?.includes(type)) {
      store.loadingTypes = store.loadingTypes?.filter(
        (loading) => loading !== type
      );
    }
  }

  function getCurrentSetting(name) {
    for (let i of store.settings) {
      if (i.name == name) {
        return i.value;
      }
    }
  }

  function isLoadingType(type) {
    return store.loadingTypes?.includes(type);
  }

  function priceFormatter(price) {
    price = String(price);
    let unformattedValue = price.replace(/\s/g, "");
    return unformattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function isURL(str) {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  }

  function changeQuery(type, query) {
    if (store.page_name == "group" && type != "page") {
      router.currentRoute.value.query.page = 1;
    }

    const currentQueries = { ...router.currentRoute.value.query };
    currentQueries[type] = query;
    let url = "?";
    let t = 0;
    for (let i in currentQueries) {
      if (currentQueries[i]) {
        if (t) {
          url += "&";
        }
        url += `${i}=${currentQueries[i]}`;
        t++;
      }
    }
    router.push(url);
  }

  const showMessage = (message) => {
    ElNotification({
      title: "",
      message: h("i", { style: "color: #070707" }, message),
      position: "bottom-left",
    });
    // ElMessage({
    //   message,
    //   type,
    //   duration: 100000,
    // })
  };

  function formatDripDays(date) {
    let today = new Date().getTime();
    const day = new Date(date).getTime();
    today = day - today;
    if (Math.ceil(today / 86400000) > 0) {
      return Math.floor(today / 86400000);
    }
    return "Off";
  }

  function convertMilliseconds(ms) {
    let day = new Date(ms).getTime();
    const currentDate = new Date().getTime();
    day = day - currentDate;
    const seconds = Math.floor(day / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days`;
    } else if (hours > 0) {
      return `${hours} hours`;
    } else if (minutes > 0) {
      return `${minutes} minutes`;
    } else {
      return `${seconds} seconds`;
    }
  }

  function copyLink(copyText, text) {
    navigator.clipboard.writeText(copyText);
    showMessage(text);
  }

  function checkCurrentUrl() {
    store.front_url =
      typeof window !== "undefined"
        ? window?.location.protocol + "//" + window?.location?.host
        : "";
    if (
      store.front_url.includes("localhost") ||
      store.front_url.includes("demo")
    ) {
      store.baseUrl = demoBaseUrl;
    } else {
      store.baseUrl = baseUrl;
    }
  }

  function formatExpiry(date) {
    try{
      return date.slice(2) + '/' + date.slice(2,4) 
    }catch(_) {}
  }

  return {
    user,
    store,
    modal,
    membersModal,
    user_update_checker,
    addLoading,
    removeLoading,
    isLoadingType,
    priceFormatter,
    changeQuery,
    isURL,
    showMessage,
    formatDripDays,
    convertMilliseconds,
    openDrawer,
    copyLink,
    getCurrentSetting,
    checkCurrentUrl,
    formatExpiry,
  };
});
