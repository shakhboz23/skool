import { defineStore } from "pinia";
import {
  useLoadingStore,
  useGroupStore,
  usePostStore,
  useAuthStore,
} from "@/store";
import axios from "axios";
import { useApiRequest } from "@/composables";

export const useMemberStore = defineStore("members", () => {
  const apiRequest = useApiRequest();
  const isLoading = useLoadingStore();
  const useAuth = useAuthStore();
  const usePost = usePostStore();
  const useGroup = useGroupStore();
  isLoading.checkCurrentUrl();
  isLoading.store.page_name = "members";
  const router = useRouter();
  let lang = {};

  const store = reactive({
    members: [],
    member_requests: [],
    billingHistory: {},
    levels: [],
    inviteModal: false,
    levelId: "",
    editGamification: false,
    generalSettings: {},
    user_id: "",
    status: "",
    request_types: "",
    member_data: {},
    member_type: "",
    banchurned: {
      status: false,
      data: [],
      type: "ban",
    },
    activities: "",
    activities30: "",
    add_price: false,
    is_paid: false,
    price: "",
    group_prices: [],
    updatePayment: "payment",
    errors: [],
  });

  const billingUpdate = reactive({
    company_name: "",
    inn: "",
    account_number: "",
    mfo: "",
  });

  const general = reactive({
    icon: {
      file: "",
      url: "",
    },
    image: {
      file: "",
      url: "",
    },
    name: "",
    excerpt: "",
    initials: "",
    color: "#000000",
    group_type: "private",
  });

  const level = reactive({
    name: "",
    custom_name: "",
    completed: "",
  });

  function getPrices() {
    const token = localStorage.getItem("token");
    const group_username = router.currentRoute.value.params.community;
    isLoading.addLoading("getPrices");
    axios
      .get(isLoading.store.baseUrl + `subscription/${group_username}`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        store.group_prices = res.data;
        isLoading.removeLoading("getPrices");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getPrices");
      });
  }

  function addPrice() {
    const token = localStorage.getItem("token");
    const group_username = router.currentRoute.value.params.community;
    isLoading.addLoading("addPrice");
    axios
      .post(
        isLoading.store.baseUrl + `subscription/${group_username}`,
        { price: store.price },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.add_price = false;
        getPrices();
        isLoading.removeLoading("addPrice");
      })
      .catch((err) => {
        console.log(err);
        store.errors = err.response.data.errors[0];
        isLoading.removeLoading("addPrice");
      });
  }

  function makeCurrent(id, is_active) {
    if (is_active) return;
    const token = localStorage.getItem("token");
    const group_username = router.currentRoute.value.params.community;
    isLoading.addLoading("makeCurrent");
    axios
      .put(
        isLoading.store.baseUrl + `subscription/${group_username}/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        getPrices();
        isLoading.removeLoading("makeCurrent");
      })
      .catch((err) => {
        console.log(err);
        store.errors = err.response.data.errors[0];
        isLoading.removeLoading("makeCurrent");
      });
  }

  function deletePrice(id, is_active) {
    if (!is_active) return;
    const token = localStorage.getItem("token");
    const group_username = router.currentRoute.value.params.community;
    isLoading.addLoading("deletePrice");
    axios
      .delete(isLoading.store.baseUrl + `subscription/${group_username}/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        getPrices();
        console.log(res);
        isLoading.removeLoading("deletePrice");
      })
      .catch((err) => {
        console.log(err);
        store.errors = err.response.data.errors[0];
        isLoading.removeLoading("deletePrice");
      });
  }

  async function getMembers() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("groupMembes");
    let url = "";
    if (router.currentRoute.value.query?.type) {
      url = `?t=${router.currentRoute.value.query?.type}`;
    }
    const data = await apiRequest.get(
      `get-group-members/${group_username}${url}?page=${isLoading.store.pagination.current_page}`
    );
    isLoading.removeLoading("groupMembes");
    if (data.status == 200) {
      store.members = data.data;
      for (let i in isLoading.store.pagination) {
        isLoading.store.pagination[i] = data.data.meta[i];
      }
    } else {
    }
  }

  function editLevel() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("editLevels");
    axios
      .put(
        isLoading.store.baseUrl + `level/${store.levelId}`,
        { name: level.custom_name },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.editGamification = false;
        getLevels();
        isLoading.removeLoading("editLevels");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("editLevels");
      });
  }

  async function getActivity() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getActivity");
    const data = await apiRequest.get(`get-leaderboard/${username}`);
    isLoading.removeLoading("getActivity");
    if (data.status == 200) {
      store.activities = data.data[0];
    }
  }

  async function getActivity30() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getActivity");
    const data = await apiRequest.get(`get-leaderboard-30-day/${username}`);
    isLoading.removeLoading("getActivity");
    if (data.status == 200) {
      store.activities30 = data.data;
    }
  }

  async function getLevels() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getLevels");
    const data = await apiRequest.get(`level/${group_username}`);
    isLoading.removeLoading("getLevels");
    if (data.status == 200) {
      store.levels = data.data;
    }
  }

  // general settings
  function setGeneralSettings(data) {
    for (let i in general) {
      if (i != "icon" && i != "image") {
        general[i] = data[i];
      }
    }
    general.icon.url = data.icon;
    general.image.url = data.image;
    if (!data.image) {
      usePost.store.setupgroup.is_image = false;
    } else {
      usePost.store.setupgroup.is_image = true;
    }
  }

  function gereralSettings() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const token = localStorage.getItem("token");
    isLoading.addLoading("updateSettings");
    const username = router.currentRoute.value.params.community;
    const formData = new FormData();
    for (let i in general) {
      if (i != "image" && i != "icon") {
        formData.append(i, general[i] || "");
      }
    }
    formData.append(
      "icon",
      general.icon.file ? general.icon.file : general.icon.url ?? ''
    );
    formData.append(
      "image",
      general.image.file ? general.image.file : general.image.url ?? ''
    );
    general.icon.file = "";
    general.image.file = "";
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    axios
      .post(isLoading.store.baseUrl + `update-group/${username}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        useGroup.getMyGroups();
        setGeneralSettings(res.data);
        useGroup.store.group_by_username = res.data;
        isLoading.showMessage("Updated successfully");
        isLoading.removeLoading("updateSettings");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("updateSettings");
      });
  }

  function joinToGroup() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("joinGroup");
    const username = router.currentRoute.value.params.community;

    axios
      .post(
        isLoading.store.baseUrl + `join-group`,
        {
          username,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        if (res.data?.message == "User Join Group Pending") {
          useGroup.store.group_by_username.status = "pending";
          useGroup.modal.pending = true;
        } else {
          useGroup.store.group_by_username.status = null;
        }
        isLoading.removeLoading("joinGroup");
      })
      .catch((err) => {
        if (err.response?.status == 401) {
          isLoading.store.isLogin = false;
          useAuth.modal.login = true;
        }
        console.log(err);
        isLoading.removeLoading("joinGroup");
      });
  }

  async function getMemberRequests() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("groupMembesRequest");
    let url = "";
    if (store.request_types) {
      url = `?t=${store.request_types}`;
    }
    const data = await apiRequest.get(
      `get-member-pending/${group_username}${url}`
    );
    isLoading.removeLoading("groupMembesRequest");
    if (data.status == 200) {
      store.member_requests = data.data;
    }
  }

  function setMemberJoinType() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("groupMembesRequest");
    axios
      .put(
        isLoading.store.baseUrl + `join-group-type/${group_username}`,
        {
          status: store.status,
          user_id: store.user_id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.member_requests = res.data;
        store.banchurned.status = false;
        isLoading.store.inviteModal = false;
        isLoading.removeLoading("groupMembesRequest");
        getMemberRequests();
        getMembers();
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("groupMembesRequest");
      });
  }

  function updateUserRole(type) {
    const token = localStorage.getItem("token");
    isLoading.addLoading("updateRole");
    const username = router.currentRoute.value.params.community;
    axios
      .put(
        isLoading.store.baseUrl + `update-member-type/${username}`,
        {
          type,
          user_id: store.member_data.user.id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.member_type = type;
        store.editGamification = false;
        getLevels();
        isLoading.removeLoading("updateRole");
        getMembers();
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("updateRole");
      });
  }

  // members modal

  // get billings
  function getBilling() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("getBilling");
    axios
      .get(isLoading.store.baseUrl + `user-company/show`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        console.log(res);
        for (let i in res.data) {
          billingUpdate[i] = res.data[i];
        }
        isLoading.removeLoading("getBilling");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getBilling");
      });
  }

  // get billings history
  function getBillingHistory() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("getBillingHistory");
    const username = router.currentRoute.value.params.community;
    axios
      .get(isLoading.store.baseUrl + `billing/${username}`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        console.log(res);
        store.billingHistory = res.data;
        isLoading.removeLoading("getBillingHistory");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getBillingHistory");
      });
  }

  // update billing information
  function updateBilling() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("updateBilling");
    const formData = new URLSearchParams();
    for (let i in billingUpdate) {
      formData.append(i, billingUpdate[i]);
    }
    axios
      .put(isLoading.store.baseUrl + `user-company/update`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        store.updatePayment = "payment";
        isLoading.removeLoading("updateBilling");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("updateBilling");
      });
  }

  return {
    store,
    level,
    general,
    getMembers,
    getLevels,
    editLevel,
    billingUpdate,
    setGeneralSettings,
    gereralSettings,
    joinToGroup,
    getMemberRequests,
    setMemberJoinType,
    updateUserRole,
    getActivity,
    getActivity30,
    getPrices,
    addPrice,
    makeCurrent,
    deletePrice,
    updateBilling,
    getBilling,
    getBillingHistory,
  };
});
