import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import { useApiRequest } from "@/composables";

export const useGroupSettingsStore = defineStore("group_settings", () => {
  const apiRequest = useApiRequest();
  const isLoading = useLoadingStore();
  isLoading.checkCurrentUrl();

  const router = useRouter();
  
  const store = reactive({
    payouts: "",
  });

  async function getPayouts() {
    const group_username = router.currentRoute.value.params.community;

    isLoading.addLoading("getPayouts");
    const data = await apiRequest.get(`${group_username}/payout`);
    isLoading.removeLoading("getPayouts");
    if (data.status == 200) {
      store.payouts = data.data?.payouts;
    }
  }

  return {
    store,
    getPayouts,
  };
});
