import { defineStore } from "pinia";
import { useLoadingStore, useAddVideoStore, useClassroomStore } from "@/store";
import axios from "axios";
import { useApiRequest } from "@/composables";

export const usePostStore = defineStore("post", () => {
  const apiRequest = useApiRequest();
  const isLoading = useLoadingStore();
  const addVideo = useAddVideoStore();
  const useClassroom = useClassroomStore();
  isLoading.checkCurrentUrl();
  const router = useRouter();
  let lang = {};

  const store = reactive({
    is_not_found: false,
    posts: [],
    postData: [],
    members_count: 0,
    setupgroup: {
      is_description: false,
      is_image: false,
      is_post: false,
      is_three_member: false,
    },
    categories: [],
    deleteCategoryData: "",
    isCheckConfirm: false,
    files_url: [],
    error: "",
    writingModal: false,
    filter: {
      category_id: null,
      filter: "none",
      sort: "recent",
    },
    likeModalData: {
      length: 0,
      users: [],
    },
    likeModalType: "Likes",
    category_id: null,
    post_id: "",
    card_info: false,
    polls: {},
    poll_id: "",
    modalType: "",
    changeVoteData: {
      title: "",
      description: "",
    },
    userIsVoted: false,
    isPollSaved: false,
    poll_deleted: [],
    isNewPoll: [],
    media_id: "",
    comment_id: [-1],
    writecomment_type: "",
    deleteReplyData: [],
    editComment: [-1],
  });

  const create_data = {
    title: "",
    description: "",
    category_id: "",
    files: [],
    video_link: [],
    polls: [],
  };

  const create_category_data = {
    name: "",
    description: "",
    permission: true,
    username: "",
  };

  const inline_comment_data = {
    comment: "",
    files: [],
  };

  const create = reactive(JSON.parse(JSON.stringify(create_data)));
  const create_category = reactive(
    JSON.parse(JSON.stringify(create_category_data))
  );
  const inline_comment = reactive(
    JSON.parse(JSON.stringify(inline_comment_data))
  );

  const modal = reactive({
    create: false,
    edit: false,
    delete: false,
  });

  function clearData() {
    for (let i in create_category) {
      create_category[i] = create_category_data[i];
    }
    for (let i in create) {
      create[i] = create_data[i];
    }
    for (let i in inline_comment) {
      inline_comment[i] = inline_comment_data[i];
    }
    store.polls = {};
    addVideo.store.files = [];
    useClassroom.module.video_content = "";
    modal.create = false;
    modal.edit = false;
  }

  async function get_posts() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };

    const group_username = router.currentRoute.value.params.community;
    let filter_url = "";
    const filter = {
      filter: store.filter.filter,
      sort: store.filter.sort,
      category_id: store.filter.category_id,
    };

    for (let i in filter) {
      if (i != "page" && filter[i]) {
        filter_url += `&${i}=${filter[i]}`;
      }
    }

    isLoading.addLoading("getPosts");
    const data = await apiRequest.get(
      `get-post/${group_username}?page=${isLoading.store.pagination.current_page}${filter_url}`
    );
    isLoading.removeLoading("getPosts");
    if (data.response?.status == 401 || data.response?.status == 403) {
      router.push(`/${group_username}/about`);
    }
    if (data.status == 200) {
      store.posts = data.data?.data;
      store.members_count = data.data?.members_count;
      for (let i in store.setupgroup) {
        store.setupgroup[i] = data.data[i];
      }
      for (let i in isLoading.store.pagination) {
        isLoading.store.pagination[i] = data.data?.meta[i];
      }
    }
  }

  function getPostById(type) {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const token = localStorage.getItem("token");
    isLoading.addLoading("getPostById");
    axios
      .get(isLoading.store.baseUrl + `post/${store.post_id}`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        store.postData = res.data;
        store.userIsVoted = false;
        if (type != 'open') {
          useClassroom.module.video_content = res.data.description;
        }
        store.poll_deleted = [];
        for (let i of store.postData.polls) {
          store.isNewPoll.push(true);
          for (let user of i.users) {
            if (user.username == isLoading.user.username) {
              store.userIsVoted = true;
              break;
            }
          }
        }
        isLoading.removeLoading("getPostById");
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("getPostById");
      });
  }

  function createPostCategory() {
    const group_username = router.currentRoute.value.params.community;
    create_category.username = group_username;
    if (modal.edit) {
      return updatePostCategory();
    }
    const token = localStorage.getItem("token");
    isLoading.addLoading("createPostCategory");

    axios
      .post(isLoading.store.baseUrl + `post/categories`, create_category, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        get_categories();
        clearData();
        isLoading.removeLoading("createPostCategory");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("createPostCategory");
      });
  }

  function updatePostCategory() {
    const group_username = router.currentRoute.value.params.community;
    create_category.username = group_username;
    const token = localStorage.getItem("token");
    isLoading.addLoading("createPostCategory");

    axios
      .put(isLoading.store.baseUrl + `post/categories/${store.category_id}`, create_category, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        get_categories();
        clearData();
        create.category_id = null;
        isLoading.removeLoading("createPostCategory");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("createPostCategory");
      });
  }

  async function get_categories() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getPostCategories");
    const data = await apiRequest.get(
      `group/${group_username}/post/categories`
    );
    isLoading.removeLoading("getPostCategories");
    if (data.status == 200) {
      store.categories = data.data;
    }
  }

  function get_likes() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const token = localStorage.getItem("token");
    isLoading.addLoading("getLikes");
    if (isLoading.store.pagination_two.current_page == 1) {
      store.likeModalData = {
        length: 0,
        users: [],
      };
    }
    axios
      .get(
        isLoading.store.baseUrl +
          `get-user/${store.post_id}?page=${isLoading.store.pagination_two.current_page}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.likeModalData.length =
          store.likeModalData.length + res.data.data.length;
        store.likeModalData.users.push(...res.data.data);
        for (let i in isLoading.store.pagination_two) {
          isLoading.store.pagination_two[i] = res.data?.meta[i];
        }
        isLoading.removeLoading("getLikes");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getLikes");
      });
  }

  function get_votes() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };
    const token = localStorage.getItem("token");
    isLoading.addLoading("getLikes");
    if (isLoading.store.pagination_two.current_page == 1) {
      store.likeModalData = {
        length: 0,
        users: [],
      };
    }
    axios
      .get(
        isLoading.store.baseUrl +
          `get-user-poll/${store.poll_id}?page=${isLoading.store.pagination_two.current_page}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.likeModalData.length =
          store.likeModalData.length + res.data.data.length;
        store.likeModalData.users.push(...res.data.data);
        for (let i in isLoading.store.pagination_two) {
          isLoading.store.pagination_two[i] = res.data?.meta[i];
        }
        isLoading.removeLoading("getLikes");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getLikes");
      });
  }

  function write_post() {
    create.category_id = store.category_id?.id;
    create.polls = [];
    for (let i in store.polls) {
      create.polls.push(store.polls[i]);
    }
    isLoading.addLoading("writePost");
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    if (!create.category_id) {
      isLoading.removeLoading("writePost");
      store.error = "You must select a category";
      return;
    }
    store.error = "";
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      formData.append(i, create[i] || "");
    }
    let t = 1;
    const types = [];
    for (let i of addVideo.store.files) {
      formData.append(`file${t}`, i.file);
      types.push(i.type);
      t++;
    }
    formData.append("file_number", t - 1);
    formData.append("polls", JSON.stringify(create.polls));
    formData.append("types", JSON.stringify(types));
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    axios
      .post(isLoading.store.baseUrl + `add-post/${group_username}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        clearData();
        store.postData = [];
        store.postData = res.data;
        store.post_id = res.data.id;
        store.card_info = true;
        isLoading.removeLoading("writePost");
        store.writingModal = false;
        store.category_id = "";
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("writePost");
      });
  }

  function write_comment() {
    if (store.writecomment_type == "inline") {
      if (!inline_comment.comment) {
        return;
      }
    } else if (!useClassroom.module.video_content) {
      return;
    }
    isLoading.addLoading("writeComment");
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      formData.append(i, create[i] || "");
    }
    let t = 1;
    const types = [];
    if (store.writecomment_type == "inline") {
      for (let i of inline_comment.files) {
        formData.append(`file${t}`, i.file);
        types.push(i.type);
        t++;
      }
      formData.append("file_number", t - 1);
    } else {
      for (let i of addVideo.store.files) {
        formData.append(`file${t}`, i.file);
        types.push(i.type);
        t++;
      }
      formData.append("file_number", t - 1);
    }

    formData.append("post_id", store.post_id);
    if (store.writecomment_type == "inline") {
      formData.append("comment", inline_comment.comment || "");
      formData.append("comment_id", store.comment_id[0]);
    } else {
      formData.append("comment", useClassroom.module.video_content || "");
    }
    formData.append("types", JSON.stringify(types));
    if (store.comment_id[3] != isLoading.user.id) {
    }
    if (store.comment_id[3] && store.comment_id[3] == undefined) {
      formData.append("reply_user_id", store.comment_id[3]);
    }
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    axios
      .post(isLoading.store.baseUrl + `add-post-comment`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        clearData();
        store.postData = res.data;
        store.card_info = true;
        isLoading.removeLoading("writeComment");
        store.writingModal = false;
        store.category_id = "";
        store.comment_id = [-1];
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("writeComment");
      });
  }

  function update_comment() {
    isLoading.addLoading("writeComment");
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      formData.append(i, create[i] || "");
    }
    let t = 1;
    const types = [];
    const is_uploaded = [];
    if (store.writecomment_type == "inline") {
      for (let i of inline_comment.files) {
        formData.append(`file${t}`, i.file);
        types.push(i.type);
        is_uploaded.push(i.is_new == true ? true : false);
        t++;
      }
      formData.append("file_number", t - 1);
    } else {
      for (let i of addVideo.store.files) {
        formData.append(`file${t}`, i.file);
        is_uploaded.push(i.is_new == true ? true : false);
        types.push(i.type);
        t++;
      }
      formData.append("file_number", t - 1);
    }
    formData.append("is_uploaded", JSON.stringify(is_uploaded));

    formData.append("post_id", store.post_id);
    if (store.writecomment_type == "inline") {
      formData.append("comment", inline_comment.comment || "");
      formData.append("comment_id", store.comment_id[0]);
    } else {
      formData.append("comment", useClassroom.module.video_content || "");
    }
    formData.append("types", JSON.stringify(types));
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    axios
      .post(isLoading.store.baseUrl + `edit-post-comment/${store.editComment[0]}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        clearData();
        store.editComment = [-1];
        store.postData = res.data;
        store.card_info = true;
        isLoading.removeLoading("writeComment");
        store.writingModal = false;
        store.category_id = "";
        store.comment_id = [-1];
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("writeComment");
      });
  }

  function update_post() {
    isLoading.addLoading("writePost");
    let l = create.polls.length;
    const polls = [];
    const poll_edited = [];
    const poll_ids = [];
    store.postData.polls;
    for (let i = 0; i < l; i++) {
      if (store.isNewPoll[i] == "edited" && store.postData.polls[i]?.id) {
        poll_edited.push({
          id: store.postData.polls[i].id,
          option: create.polls[i],
        });
      } else if (store.isNewPoll[i] != true) {
        polls.push(create.polls[i]);
      }
    }

    create.polls = polls;
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      formData.append(i, create[i] || "");
    }
    let t = 1;
    const types = [];
    const is_uploaded = [];
    for (let i of addVideo.store.files) {
      formData.append(`file${t}`, i.file);
      types.push(i.type);
      is_uploaded.push(i.is_new == true ? true : false);
      t++;
    }
    formData.delete("polls");
    formData.append("poll_edited", JSON.stringify(poll_edited));
    // formData.append("poll_ids", JSON.stringify(poll_ids));
    formData.append("poll_deleted", JSON.stringify(store.poll_deleted));
    formData.append("polls", JSON.stringify(create.polls));
    formData.append("file_number", t - 1);
    formData.append("types", JSON.stringify(types));
    formData.append("is_uploaded", JSON.stringify(is_uploaded));
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    axios
      .post(
        isLoading.store.baseUrl + `edit-post/${group_username}/${store.post_id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.postData = res.data;
        modal.edit = false;
        modal.change_category = false;
        store.card_info = true;
        isLoading.removeLoading("writePost");
        store.writingModal = false;
        store.category_id = "";
        store.poll_deleted = [];
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("writePost");
      });
  }

  function setUserVote() {
    isLoading.addLoading("setUserVote");
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");

    axios
      .post(
        isLoading.store.baseUrl + `poll`,
        {
          poll_id: store.poll_id,
          post_id: store.post_id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.postData = res.data;
        store.userIsVoted = false;
        for (let i of store.postData.polls) {
          for (let user of i.users) {
            if (user.username == isLoading.user.username) {
              store.userIsVoted = true;
              break;
            }
          }
        }
        modal.delete = false;
        get_posts();
        isLoading.removeLoading("setUserVote");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("setUserVote");
      });
  }

  function pinToFeed() {
    isLoading.addLoading("setUserVote");
    const token = localStorage.getItem("token");
    axios
      .post(
        isLoading.store.baseUrl + `post-pinned/${store.post_id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.postData.group_pinned = !store.postData.group_pinned;
        get_posts();
        isLoading.removeLoading("setUserVote");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("setUserVote");
      });
  }

  function setLike(post_id, type, index) {
    if (isLoading.isLoadingType("setLike")) {
      return;
    }
    isLoading.addLoading("setLike");
    const token = localStorage.getItem("token");
    axios
      .post(
        isLoading.store.baseUrl + `like`,
        {
          comment_id: type == "comment" ? post_id : null,
          post_id: type == "comment" ? null : post_id,
          type: type == "comment" ? "comment" : "post",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        if (type == "comment") {
          if (index == 1) {
            for (
              let comment = 0;
              comment < store.postData.comments?.length;
              comment++
            ) {
              if (store.postData.comments[comment].id == post_id) {
                if (store.postData.comments[comment].is_liked) {
                  store.postData.comments[comment].like_count -= 1;
                } else {
                  store.postData.comments[comment].like_count += 1;
                }
                store.postData.comments[comment].is_liked =
                  !store.postData.comments[comment].is_liked;
              }
            }
          } else if (index == 2) {
            for (
              let comment = 0;
              comment < store.postData.comments?.length;
              comment++
            ) {
              for (
                let reply = 0;
                reply < store.postData.comments[comment].replies?.length;
                reply++
              ) {
                if (
                  store.postData.comments[comment].replies[reply].id == post_id
                ) {
                  if (
                    store.postData.comments[comment].replies[reply].is_liked
                  ) {
                    store.postData.comments[comment].replies[
                      reply
                    ].like_count -= 1;
                  } else {
                    store.postData.comments[comment].replies[
                      reply
                    ].like_count += 1;
                  }
                  store.postData.comments[comment].replies[reply].is_liked =
                    !store.postData.comments[comment].replies[reply].is_liked;
                }
              }
            }
          }
        } else {
          for (let i = 0; i < store.posts?.length; i++) {
            if (store.posts[i].id == post_id) {
              if (store.posts[i].is_liked) {
                store.posts[i].like_count -= 1;
              } else {
                store.posts[i].like_count += 1;
              }
              store.posts[i].is_liked = !store.posts[i].is_liked;
            }
          }
          if (store.postData.is_liked) {
            store.postData.like_count -= 1;
          } else {
            store.postData.like_count += 1;
          }
          store.postData.is_liked = !store.postData.is_liked;
        }
        isLoading.removeLoading("setLike");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("setLike");
      });
  }

  function deletePost() {
    isLoading.addLoading("deletePost");
    const token = localStorage.getItem("token");

    axios
      .delete(isLoading.store.baseUrl + `post/${store.post_id}`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        modal.delete = false;
        store.card_info = false;
        isLoading.removeLoading("deletePost");
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("deletePost");
      });
  }

  function deleteComment() {
    isLoading.addLoading("deleteComment");
    const token = localStorage.getItem("token");
    axios
      .delete(isLoading.store.baseUrl + `delete-post-comment/${store.comment_id}`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        modal.delete = false;
        const l = store.postData.comments?.length;
        for (let i = 0; i < l; i++) {
          if (store.deleteReplyData.length) {
            if (store.postData.comments[i]?.id == store.deleteReplyData[1]) {
              for (
                let reply = 0;
                reply < store.postData.comments[i]?.replies?.length;
                reply++
              ) {
                if (
                  store.postData.comments[i].replies[reply]?.id ==
                  store.deleteReplyData[0]
                ) {
                  store.postData.comments[i].replies.splice(reply, 1);
                  break;
                }
              }
            }
          } else {
            if (store.postData.comments[i]?.id == store.comment_id) {
              store.postData.comments.splice(i, 1);
              break;
            }
          }
        }
        isLoading.removeLoading("deleteComment");
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("deleteComment");
      });
  }

  function removePoll() {
    if (!store.isPollSaved) {
      modal.delete = false;
      store.polls = {};
    }
    isLoading.addLoading("removePoll");
    const token = localStorage.getItem("token");

    axios
      .delete(isLoading.store.baseUrl + `poll/${store.post_id}`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        modal.delete = false;
        isLoading.removeLoading("removePoll");
        store.polls = {};
        create.polls = {};
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("removePoll");
      });
  }

  function deleteMediaFile(index) {
    isLoading.addLoading("deleteMedia");
    const token = localStorage.getItem("token");

    axios
      .delete(isLoading.store.baseUrl + `media-file/${store.media_id}`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        if (isLoading.store.is_inline) {
          inline_comment.files.splice(index, 1);
          isLoading.store.is_inline = false;
        } else {
          addVideo.store.files.splice(index, 1);
        }
        modal.delete = false;
        isLoading.removeLoading("deleteMedia");
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("deleteMedia");
      });
  }

  function deletePostCategory() {
    if (
      store.deleteCategoryData.post_count > 0 &&
      !store.isCheckConfirm &&
      !create.category_id
    ) {
      return;
    }
    isLoading.addLoading("deletePostCategory");
    const token = localStorage.getItem("token");

    axios
      .post(
        isLoading.store.baseUrl + `post/categories/${store.category_id}`,
        {
          new_category_id: create.category_id,
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
        isLoading.membersModal.delete = false;
        isLoading.membersModal.change_category = false;
        isLoading.removeLoading("deletePostCategory");
        get_categories();
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("deletePostCategory");
      });
  }

  function updatePositionCategory(index, type) {
    let ids = [];
    if (index >= store.categories.length - 1 && type == "down") {
      return;
    } else if (index == 0 && type == "up") {
      return;
    }
    isLoading.addLoading("getPostCategories");
    const token = localStorage.getItem("token");
    if (type === "down") {
      [store.categories[index], store.categories[index + 1]] = [
        store.categories[index + 1],
        store.categories[index],
      ];
    } else {
      [store.categories[index - 1], store.categories[index]] = [
        store.categories[index],
        store.categories[index - 1],
      ];
    }

    for (let i of store.categories) {
      ids.push(i.id);
    }
    axios
      .post(
        isLoading.store.baseUrl + `post-categories/position`,
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
        isLoading.removeLoading("getPostCategories");
        // get_categories();
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getPostCategories");
      });
  }

  return {
    store,
    modal,
    create,
    clearData,
    inline_comment,
    update_comment,
    get_posts,
    getPostById,
    create_category,
    write_post,
    get_categories,
    createPostCategory,
    deletePost,
    removePoll,
    deleteMediaFile,
    setUserVote,
    write_comment,
    setLike,
    get_likes,
    get_votes,
    pinToFeed,
    deleteComment,
    deletePostCategory,
    updatePositionCategory,
  };
});
