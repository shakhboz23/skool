import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useLinkStore = defineStore("link", () => {
  const isLoading = useLoadingStore();
  isLoading.checkCurrentUrl();
  const router = useRouter();
  let lang = {};

  const store = reactive({
    links: [],
    link_id: "",
  });

  const modal = reactive({
    create: false,
    edit: false,
    delete: false,
  });

  const create = reactive({
    label: "",
    url: "",
    is_public: "public",
    username: "",
  });

  function clearData() {
    for (let i in create) {
      create[i] = "";
    }
    create.is_public = "public";
  }

  function createLink() {
    if (modal.edit) {
      return updateLink();
    }
    const token = localStorage.getItem("token");
    isLoading.addLoading("createMedia");
    const formData = new FormData();
    create.username = router.currentRoute.value.params.community;
    for (let i in create) {
      formData.append(i, create[i] || "");
    }
    formData.delete("is_public");
    formData.append("is_public", create.is_public == "public" ? 1 : 0);

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    axios
      .post(isLoading.store.baseUrl + `add-link`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        clearData();
        getLinks();
        modal.create = false;
        isLoading.removeLoading("createMedia");
      })
      .catch((err) => {
        console.log(err);
        isLoading.showMessage(err.response.data.message);
        isLoading.removeLoading("createMedia");
      });
  }

  function updateLink() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("createMedia");
    const formData = new URLSearchParams();
    create.username = router.currentRoute.value.params.community;
    for (let i in create) {
      formData.append(i, create[i] || "");
    }
    formData.delete("is_public");
    formData.append("is_public", create.is_public == "public" ? 1 : 0);

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    axios
      .put(isLoading.store.baseUrl + `update-link/${store.link_id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        clearData();
        getLinks();
        modal.create = false;
        modal.edit = false;
        isLoading.removeLoading("createMedia");
      })
      .catch((err) => {
        console.log(err);
        isLoading.showMessage(err.response.data.message.errors[0]);
        isLoading.removeLoading("createMedia");
      });
  }

  function getLinks() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const token = localStorage.getItem("token");
    isLoading.addLoading("groupLinks");
    const username = router.currentRoute.value.params.community;
    axios
      .get(isLoading.store.baseUrl + `get-links/${username}`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        store.links = res.data;
        isLoading.removeLoading("groupLinks");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("groupLinks");
      });
  }

  function deleteLink() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("deleteLink");
    axios
      .delete(isLoading.store.baseUrl + `delete-link/${store.link_id}`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        getLinks();
        isLoading.membersModal.delete = false;
        isLoading.removeLoading("deleteLink");
      })
      .catch((err) => {
        console.log(err);
        isLoading.showMessage(err.response.data.errors[0]);
        isLoading.removeLoading("deleteLink");
      });
  }

  function updatePosition(index, type) {
    let ids = [];
    if (index >= store.links.length - 1 && type == "down") {
      return;
    } else if (index == 0 && type == "up") {
      return;
    }
    isLoading.addLoading("groupLinks");
    const token = localStorage.getItem("token");
    if (type === "down") {
      [store.links[index], store.links[index + 1]] = [
        store.links[index + 1],
        store.links[index],
      ];
    } else {
      [store.links[index - 1], store.links[index]] = [
        store.links[index],
        store.links[index - 1],
      ];
    }

    for (let i of store.links) {
      ids.push(i.id);
    }
    axios
      .post(
        isLoading.store.baseUrl + `link-position`,
        {
          ids,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        create.category_id = null;
        isLoading.removeLoading("groupLinks");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("groupLinks");
      });
  }

  return {
    store,
    modal,
    create,
    getLinks,
    createLink,
    updateLink,
    deleteLink,
    updatePosition,
  };
});
