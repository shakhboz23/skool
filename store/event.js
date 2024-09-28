import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";
import { useApiRequest } from "@/composables";

export const useEventStore = defineStore("event", () => {
  const apiRequest = useApiRequest();
  const isLoading = useLoadingStore();
  isLoading.checkCurrentUrl();
  const router = useRouter();
  let lang = {};
  const store = reactive({
    events: [],
    fistevent: {},
    start_date: "",
    end_date: "",
    add_event: false,
    recurring: false,
    cropperPreview: "",
    eventModal: false,
    editEventModal: false,
    eventId: "",
    calendar: "",
    data_events: [],
    table_events: [],
    month: "",
    eventInfo: "",
  });

  const create = reactive({
    title: "",
    date: "",
    time: "",
    duration: "",
    timezone: "",
    location: "",
    location_value: "",
    description: "",
    image: "",
    access: "all",
    access_value: "",
    // repeat: "",
    // repeat_number: "",
    // repeat_on: {
    //   Mon: false,
    //   Tue: false,
    //   Wed: false,
    //   Thu: false,
    //   Fri: false,
    //   Sat: false,
    //   Sun: false,
    // },
    // repeat_end: "",
    // remind: false,
  });

  function clearData() {
    for (let i in create) {
      create[i] = "";
    }
    create.access = "all";
    create.date = new Date();
    create.timezone = "(GMT+05:00) Asia/Tashkent";
    isLoading.store.croppedImage = "";
    isLoading.store.croppedFile = "";
  }

  async function get_event() {
    lang = { "Accept-Language": localStorage.getItem("lang") || "uz" };

    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getEvents");
    const start_date = new Date(store.start_date).getTime();
    const end_date = new Date(store.end_date).getTime();
    store.data_events = [];
    store.table_events = [];
    let t;
    const data = await apiRequest.get(
      `get-event/${group_username}/${start_date}/${end_date}`
    );
    isLoading.removeLoading("getEvents");
    if (data.status == 200) {
      const eid_id = router.currentRoute.value.query.eid;
      store.table_events = [];
      let is_true;
      let dates;
      store.events = data.data;
      for (let month of store.calendar) {
        for (let date of month) {
          is_true = false;
          t = 0;
          for (let event of store.events) {
            const newDate = new Date(event.date);
            if (newDate.getMonth() == date[0] && newDate.getDate() == date[1]) {
              for (let dates of event.data) {
                if (eid_id) {
                  if (dates.id == eid_id) {
                    store.eventInfo = dates;
                    store.eventModal = true;
                  }
                }
                if (t == 0) {
                  store.data_events.push([dates]);
                } else {
                  store.data_events[store.data_events.length - 1].push(dates);
                }
                t++;
              }
              is_true = true;
            }
            if (
              newDate.getMonth() == store.month &&
              newDate.getDate() == date[1]
            ) {
              store.table_events = [];

              for (let dates of event.data) {
                store.table_events.push(dates);
              }
            }
          }
          if (!is_true) {
            store.data_events.push([]);
          }
        }
      }
      // store.table_events = store.table_events.splice(
      //   store.table_events.length / 2
      // );
      setPagination();
    } else {
      if (data.response?.data?.message == "Events not found") {
        store.events = [];
      }
    }
  }

  function firstevent() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getEvent");
    axios
      .get(isLoading.store.baseUrl + `show-event/${group_username}`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        store.fistevent = res.data;
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getEvent");
      });
  }

  function add_event() {
    router.push(`?`);
    if (store.editEventModal) {
      return edit_event();
    }
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("addEvents");
    create.date = new Date(new Date(create.date)?.setHours(0, 0, 0))?.getTime();
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      if (i == "location") {
        formData.append("location", create.location.label || "");
      } else {
        if (i == "repeat_number") {
          if (create.repeat_number) {
            formData.append(i, create[i] || "");
          }
        } else {
          formData.append(i, create[i] || "");
        }
      }
    }

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    axios
      .post(isLoading.store.baseUrl + `add-event/${group_username}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        store.add_event = false;
        isLoading.removeLoading("addEvents");
        get_event();
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("addEvents");
      });
  }

  function edit_event() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("addEvents");
    create.date = new Date(create.date)?.setHours(0, 0, 0);
    create.date = new Date(create.date)?.getTime();
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      if (i == "location") {
        formData.append("location", create.location.label || "");
      } else {
        if (i == "repeat_number") {
          if (create.repeat_number) {
            formData.append(i, create[i] || "");
          }
        } else if (create[i]) {
          formData.append(i, create[i] || "");
        }
      }
    }
    if (!create.image) {
      formData.delete("image");
      formData.append("deleted", "deleted");
    } else if (isLoading.isURL(create.image)) {
      formData.delete("image");
    }

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    axios
      .post(
        isLoading.store.baseUrl + `update-event/${store.eventId}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            ...lang,
          },
        }
      )
      .then((res) => {
        store.add_event = false;
        isLoading.removeLoading("addEvents");
        get_event();
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("addEvents");
      });
  }

  function delete_event() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("deleteEvent");
    axios
      .delete(isLoading.store.baseUrl + `delete-event/${store.eventId}`, {
        headers: {
          Authorization: "Bearer " + token,
          ...lang,
        },
      })
      .then((res) => {
        store.add_event = false;
        isLoading.removeLoading("deleteEvent");
        get_event();
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("deleteEvent");
      });
  }

  function setPagination() {
    isLoading.store.pagination_type = 4;
    isLoading.store.pagination.per_page = 4;
    isLoading.store.pagination.current_page = 1;
    isLoading.store.pagination.from =
      (isLoading.store.pagination.current_page - 1) * 4 + 1;
    isLoading.store.pagination.to =
      store.table_events?.length > 4
        ? isLoading.store.pagination.current_page * 4
        : store.table_events?.length;
    isLoading.store.pagination.total = store.table_events?.length;
    isLoading.store.pagination.last_page = Math.ceil(
      isLoading.store.pagination.total / 4
    );
  }

  return {
    store,
    create,
    get_event,
    add_event,
    edit_event,
    delete_event,
    setPagination,
    firstevent,
    clearData,
  };
});
