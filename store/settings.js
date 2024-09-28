import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";
import { useI18n } from "vue-i18n";

export const useSettingsStore = defineStore("settings", () => {
  const { t } = useI18n();
  const router = useRouter();
  const isLoading = useLoadingStore();
  isLoading.checkCurrentUrl();
  let lang = {};
  const store = reactive({
    timezone: "",
    follow_email: false,
    earn_email: true,
    addCartModal: false,
    editNameModal: false,
    is_update: false,
    is_changepass: false,
    passwordError: [],
    paymentMethod: [],
  });

  const changepassword = reactive({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  function getSettings() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    isLoading.addLoading("getUserData");
    const token = localStorage.getItem("token");
    axios
      .get(isLoading.store.baseUrl + `settings`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        isLoading.store.settings = res.data;
        isLoading.removeLoading("getUserData");
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.status == 401 &&
          router.currentRoute.value.name != "/"
        ) {
          router.push("/");
        }
        isLoading.removeLoading("getUserData");
      });
  }

  function getPaymentHistory() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    isLoading.addLoading("getPaymentHistory");
    const token = localStorage.getItem("token");
    const group_username = router.currentRoute.value.params.community;

    axios
      .get(isLoading.store.baseUrl + `${group_username}/setting`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        isLoading.store.history = res.data;
        isLoading.removeLoading("getPaymentHistory");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getPaymentHistory");
      });
  }

  function getPaymentMethod() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    isLoading.addLoading("getUserData");
    const token = localStorage.getItem("token");
    axios
      .get(isLoading.store.baseUrl + `settings/payment-method`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        store.paymentMethod = res.data;
        isLoading.removeLoading("getUserData");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getUserData");
      });
  }

  function getFullData() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    isLoading.addLoading("getUserData");
    const token = localStorage.getItem("token");
    axios
      .get(isLoading.store.baseUrl + `setting-profile`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        for (const [key, value] of Object.entries(res.data)) {
          if (key === "socials") {
            for (const socialKey in value) {
              isLoading.user_update_checker.socials[socialKey] =
                value[socialKey];
              isLoading.user.socials[socialKey] = value[socialKey];
            }
          } else {
            isLoading.user[key] = value;
            isLoading.user_update_checker[key] = value;
            store.is_update = false;
          }
        }
        isLoading.removeLoading("getUserData");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getUserData");
      });
  }

  function changePassword() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    if (changepassword.old_password?.length < 8) {
      return (store.passwordError = [
        0,
        "Parol 8 belgidan iborat bo'lishi kerak",
      ]);
    } else if (changepassword.password?.length < 8) {
      return (store.passwordError = [
        1,
        "Parol 8 belgidan iborat bo'lishi kerak",
      ]);
    } else if (changepassword.password_confirmation?.length < 8) {
      return (store.passwordError = [
        2,
        "Parol 8 belgidan iborat bo'lishi kerak",
      ]);
    }
    isLoading.addLoading("updateUserPassword");
    const token = localStorage.getItem("token");
    axios
      .post(isLoading.store.baseUrl + `change-password`, changepassword, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        if (res.data.code == 200) {
          store.passwordError = "";
          for (let i in changepassword) {
            changepassword[i] = "";
          }
        } else {
          store.passwordError = [0, res.data.message];
        }
        isLoading.removeLoading("updateUserPassword");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 400) {
          store.passwordError = [0, err.response.data.errors[0]];
        }
        isLoading.removeLoading("updateUserPassword");
      });
  }

  function updateUserData(type) {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    isLoading.addLoading("updateUserData");
    const token = localStorage.getItem("token");
    let data;
    const formData = new FormData();
    if (type == "timezone") {
      data = {
        ...isLoading.user,
        address: isLoading.user_update_checker.location,
      };
      for (let i of Object.keys(data)) {
        formData.append(i, data[i] || "");
      }
    } else {
      data = {
        bio: isLoading.user_update_checker.bio,
        address: isLoading.user_update_checker.location,
        myers_briggs: isLoading.user_update_checker.myers_briggs,
        image: isLoading.user_update_checker.image,
        ...isLoading.user_update_checker.socials,
      };
      for (let i of Object.keys(data)) {
        formData.append(i, data[i] || "");
      }
    }
    axios
      .post(isLoading.store.baseUrl + `setting-account`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        store.editNameModal = false;
        for (const [key, value] of Object.entries(res.data)) {
          if (key === "socials") {
            for (const socialKey in value) {
              isLoading.user_update_checker.socials[socialKey] =
                value[socialKey];
              isLoading.user.socials[socialKey] = value[socialKey];
            }
          } else {
            isLoading.user[key] = value;
            isLoading.user_update_checker[key] = value;
            store.is_update = false;
          }
        }
        isLoading.showMessage(t.messages?.updated);
        isLoading.removeLoading("updateUserData");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.errors?.length) {
          isLoading.showMessage(err.response.data.errors[0]);
        } else {
          isLoading.showMessage(err.response.data.message);
        }
        isLoading.removeLoading("updateUserData");
      });
  }

  function updateUserImage(type) {
    isLoading.addLoading("updateUserData");
    const token = localStorage.getItem("token");
    let data;
    const formData = new FormData();
    formData.append("image", isLoading.user_update_checker.image);
    axios
      .post(isLoading.store.baseUrl + `setting-photo`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        store.editNameModal = false;
        for (const [key, value] of Object.entries(res.data)) {
          if (key === "socials") {
            for (const socialKey in value) {
              isLoading.user_update_checker.socials[socialKey] =
                value[socialKey];
              isLoading.user.socials[socialKey] = value[socialKey];
            }
          } else {
            isLoading.user[key] = value;
            isLoading.user_update_checker[key] = value;
            store.is_update = false;
          }
        }
        isLoading.removeLoading("updateUserData");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("updateUserData");
      });
  }

  function updateUserName(type) {
    isLoading.addLoading("updateUserData");
    const token = localStorage.getItem("token");
    let data;
    const formData = new URLSearchParams();
    formData.append("name", isLoading.user_update_checker.name || "");
    formData.append("surname", isLoading.user_update_checker.surname || "");
    axios
      .put(isLoading.store.baseUrl + `setting-name`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        store.editNameModal = false;
        for (const [key, value] of Object.entries(res.data)) {
          if (key === "socials") {
            for (const socialKey in value) {
              isLoading.user_update_checker.socials[socialKey] =
                value[socialKey];
              isLoading.user.socials[socialKey] = value[socialKey];
            }
          } else {
            isLoading.user[key] = value;
            isLoading.user_update_checker[key] = value;
            store.is_update = false;
          }
        }
        isLoading.removeLoading("updateUserData");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("updateUserData");
      });
  }

  return {
    store,
    changepassword,
    getFullData,
    updateUserData,
    updateUserImage,
    changePassword,
    updateUserName,
    getSettings,
    getPaymentHistory,
    getPaymentMethod,
  };
});
