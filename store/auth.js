import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";
import { useApiRequest } from "@/composables";

export const useAuthStore = defineStore("auth", () => {
  const apiRequest = useApiRequest();
  const isLoading = useLoadingStore();
  isLoading.checkCurrentUrl();
  const router = useRouter();
  let lang = {};
  const store = reactive({
    errorMessage: "",
    userData: [],
    userImage: "",
    bio: "",
    is_matched: false,
    type: "password",
  });

  const modal = reactive({
    login: false,
    register: false,
    verification: false,
    forgot_modal: false,
    complete: false,
  });

  const changepassword = reactive({
    token: "",
    password: "",
    password_confirmation: "",
  });

  const login = reactive({
    email: "",
    password: "",
  });

  const verification = reactive({
    email: "",
    verify_code: "",
  });

  const complete = reactive({
    image: "",
    bio: "",
  });

  const register = reactive({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirm_password: "",
    user_bio: "dsds",
    address: "jksdj",
  });

  function changeType() {
    if (store.type == "password") {
      store.type = "text";
    } else {
      store.type = "password";
    }
  }

  function authLogin() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    isLoading.addLoading("logging");
    axios
      .post(isLoading.store.baseUrl + "login", login, {
        headers: {
          ...lang,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("token", res.data?.authorization?.token);
          isLoading.store.email = res.data?.email;
          login.email = "";
          login.password = "";
          isLoading.store.isLogin = true;
          modal.login = false;
          store.errorMessage = "";
          if (router.currentRoute.value.name == "login") {
            router.push("/");
          } else {
            window.location.reload();
          }
        } else {
          store.errorMessage = res.data.message;
        }
        isLoading.removeLoading("logging");
        isLoading.addLoading("getUser");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          store.errorMessage = err.response.data.message;
        } else {
          store.errorMessage = err.response.data.errors[0];
        }
        isLoading.removeLoading("logging");
      });
  }

  function authRegister() {
    const currentLang = localStorage.getItem("lang") || "uz"
    lang = { "Accept-Language": currentLang };
    const errorLang  = {
      uz: "Parol mos kelmadi",
      en: "The password did not match",
      ru: "Пароль не совпал"
    }
    if (register.confirm_password != register.password) {
      store.errorMessage = errorLang[currentLang];
      return;
    }
    isLoading.addLoading("register");
    axios
      .post(isLoading.store.baseUrl + "register", register, {
        headers: {
          ...lang,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          modal.register = false;
          modal.verification = true;
          verification.email = register.email;
          store.errorMessage = "";
        } else {
          store.errorMessage = res.data.message;
        }
        isLoading.removeLoading("register");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          store.errorMessage = err.response.data.message;
        } else {
          store.errorMessage = err.response.data.errors[0];
        }
        isLoading.removeLoading("register");
      });
  }

  function authVerify() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    isLoading.addLoading("activate");
    axios
      .post(isLoading.store.baseUrl + "activate-user", verification, {
        headers: {
          ...lang,
        },
      })
      .then((res) => {
        modal.verification = false;
        if (res.status == 200) {
          modal.complete = true;
          modal.register = false;
          modal.verification = false;
          localStorage.setItem("token", res.data?.authorization?.token);
          verification.email = register.email;
          store.errorMessage = "";
          router.push("/");
        } else {
          store.errorMessage = res.data.message;
        }
        isLoading.removeLoading("activate");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          store.errorMessage = err.response.data.message;
        } else {
          store.errorMessage = err.response.data.errors[0];
        }
        isLoading.removeLoading("activate");
      });
  }

  function authComplete() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    isLoading.addLoading("complete");
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (let i in complete) {
      formData.append(i, complete[i] || "");
    }
    axios
      .post(isLoading.store.baseUrl + "update-user/photo-bio", formData, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        modal.complete = false;
        getUser();
        isLoading.removeLoading("complete");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data?.errors?.length) {
          isLoading.showMessage(err.response.data?.errors[0]);
        } else {
          isLoading.showMessage(err.response.data.message);
        }
        isLoading.removeLoading("complete");
      });
  }

  function authResend() {
    authForgotPass();
    // isLoading.addLoading("resend");
    // axios
    //   .post(isLoading.store.baseUrl + "resend", {})
    //   .then((res) => {
    //     isLoading.removeLoading("resend");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     isLoading.removeLoading("resend");
    //   });
  }

  function authForgotPass() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    isLoading.addLoading("resend");
    const formData = new FormData();
    formData.append("email", verification.email || "");
    axios
      .post(isLoading.store.baseUrl + "revoke-password", formData, {
        headers: {
          ...lang,
        },
      })
      .then((res) => {
        modal.forgot_modal = false;
        modal.sended = true;
        verification.email = "";
        store.errorMessage = "";
        isLoading.removeLoading("resend");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          store.errorMessage = err.response.data.message;
        } else {
          store.errorMessage = err.response.data.errors[0];
        }
        isLoading.removeLoading("resend");
      });
  }

  function authChangePassword() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    changepassword.token = router.currentRoute.value.query.token;
    if (!store.is_matched) {
      return;
    }
    isLoading.removeLoading("changePass");
    axios
      .post(isLoading.store.baseUrl + "reset-password", changepassword, {
        headers: {
          ...lang,
        },
      })
      .then((res) => {
        isLoading.showMessage("Your password updated successfully!");
        router.push("/login");
        isLoading.removeLoading("changePass");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          store.errorMessage = err.response.data.message;
        } else {
          store.errorMessage = err.response.data.errors[0];
        }
        isLoading.showMessage(store.errorMessage);
        isLoading.removeLoading("changePass");
      });
  }

  function getUser() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const token = localStorage.getItem("token");
    isLoading.addLoading("getUser");
    axios
      .get(isLoading.store.baseUrl + "setting/profile", {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        if (!res.data.image || !res.data.bio) {
          modal.complete = true;
        }
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
        isLoading.removeLoading("getUser");
        if (!isLoading.user.image || !isLoading.user.bio) {
          modal.complete = true;
        } else {
          modal.complete = false;
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status == 401) {
          isLoading.store.isLogin = false;
          localStorage.removeItem("token");
        }
        isLoading.removeLoading("getUser");
      });
  }

  async function getUserWithGroup() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    isLoading.addLoading("getUser");
    const username = router.currentRoute.value.params.community;
    const data = await apiRequest.get(`user/${username}`);
    isLoading.removeLoading("getUser");
    for (const [key, value] of Object.entries(data.data)) {
      if (key === "socials") {
        for (const socialKey in value) {
          isLoading.user_update_checker.socials[socialKey] = value[socialKey];
          isLoading.user.socials[socialKey] = value[socialKey];
        }
      } else {
        isLoading.user[key] = value;
        isLoading.user_update_checker[key] = value;
        store.is_update = false;
      }
    }
  }

  return {
    store,
    modal,
    login,
    complete,
    changepassword,
    register,
    verification,
    changeType,
    authLogin,
    authRegister,
    authVerify,
    getUser,
    authResend,
    authForgotPass,
    authComplete,
    getUserWithGroup,
    authChangePassword,
  };
});
