import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import { useApiRequest } from "@/composables";

export const useCategoryStore = defineStore("category", () => {
  const apiRequest = useApiRequest();
  const isLoading = useLoadingStore();
  isLoading.checkCurrentUrl();

  const store = reactive({
    categories: [],
  });

  async function getCategories() {
    isLoading.addLoading("groupCategories");
    const data = await apiRequest.get("get-group-categories");
    isLoading.removeLoading("groupCategories");
    if (data.status == 200) {
      store.categories = data.data;
    }
  }

  return { store, getCategories };
});
