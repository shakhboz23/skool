import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useProfileStore = defineStore("profile", () => {
  const isLoading = useLoadingStore();
  isLoading.checkCurrentUrl();
  const router = useRouter();
  const store = reactive({
    profile: [],
  });
  let lang = {};
  // function get_profile() {
  //   const token = localStorage.getItem("token");
  //   isLoading.addLoading("getProfile");
  //   axios
  //     .get(isLoading.store.baseUrl + `profile`, {
  //       headers: {
  //           Authorization: "Bearer " + token,
  //       }
  //     })
  //     .then((res) => {
  //       store.profile = res.data?.message?.reverse();
  //       isLoading.removeLoading("getProfile");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       isLoading.removeLoading("getProfile");
  //     });
  // }

  function get_profile() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const token = localStorage.getItem("token");
    let url = '';
    const group = router.currentRoute.value.query.g;
    if (group) {
      url = `?group=${group}`;
    }
    isLoading.addLoading("getProfile");
    const username = router.currentRoute.value.params.id
    axios
      .get(isLoading.store.baseUrl + `username/${username}${url}`, {
        headers: {
            Authorization: "Bearer " + token,
            ...lang,
        }
      })
      .then((res) => {
        store.profile = res.data;
        isLoading.removeLoading("getProfile");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 401 && router.currentRoute.value.name != '/') {
          router.push("/");
        }
        isLoading.removeLoading("getProfile");
      });
  }

  return { store, get_profile };
});
