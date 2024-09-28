<template>
  <div>
    <NuxtLoadingIndicator height="4" color="#2a85ff" />
    <main
      v-if="!isLoading.store.isLogin"
      class="flex items-center justify-center overflow-hidden overflow-y-auto min-h-screen max-h-screen"
    >
      <Register class="max-w-sm" />
    </main>
    <div v-else class="min-h-screen overflow-y-auto !max-h-[100vh]">
      <main class="full_flex gap-10 min-h-screen p-5">
        <!-- <section class="md:block hidden w-[500px]">
          <router-link to="/">
            <img src="/logo.svg" alt="" />
          </router-link>
          <p class="text-lg font-semibold my-8">
            Everything you need to build community and make money online.
          </p>
          <ul class="space-y-6">
            <li class="flex gap-1">
              <span class="w-6 full_flex">📈</span> Highly engaged
            </li>
            <li class="flex gap-1">
              <span class="w-6 full_flex">💖</span> Simple to setup
            </li>
            <li class="flex gap-1">
              <span class="w-6 full_flex">🙂</span> Fun to use
            </li>
            <li class="flex gap-1">
              <span class="w-6 full_flex">💰</span> Charge for membership
            </li>
            <li class="flex gap-1">
              <span class="w-6 full_flex">📱</span> iOS + Android apps
            </li>
            <li class="flex gap-1">
              <span class="w-6 full_flex">🌎</span> Millions of users daily
            </li>
          </ul>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:help@learnify.com"
            class="_ca1 text-sm mt-9 block hover:underline"
            >help@learnify.com</a
          >
        </section> -->
        <section class="w-[500px] bg-white p-8 rounded-xl">
          <p class="text-lg font-semibold text-center">
            {{ $t("payment.create_community") }}
          </p>
          <p class="text-center mt-4 mb-9">
            {{ $t("payment.free14") }}
            {{ isLoading.getCurrentSetting("group_price") }} UZS/{{
              $t("payment.month")
            }}. {{ $t("payment.canceltime") }}. <br />
            {{ $t("payment.unlimited") }}
          </p>
          <form @submit.prevent="usePayment.createGroup">
            <label for="name" class="_ca1 mb-2 block">{{
              $t("membersmodal.general.groupname")
            }}</label>
            <input
              id="group_name"
              type="text"
              @input="handleInput"
              v-model="useGroup.community.name"
              :placeholder="$t('membersmodal.general.groupname')"
            />
            <p class="flex justify-between text-end mt-2 _ca1 text-xs">
              <span>{{ $t("payment.youchange") }}</span>
              <span>{{ useGroup.community.name?.length }} / 30</span>
            </p>
            <div>
              <label for="name" class="_ca1 mb-2 block mt-5">{{
                $t("payment.cardnumber")
              }}</label>
              <div class="flex items-center justify-between">
                <input
                  @input="usePayment.getCardType"
                  v-model="usePayment.card.cardNumber"
                  class="placeholder-[#A1A1A1] w-full"
                  type="text"
                  name="credit-number"
                  placeholder="0000 0000 0000 0000"
                  required
                />
                <div class="flex items-center gap-2 -ml-[108px] pr-3">
                  <img
                    v-if="usePayment.store.cardType.type == 'visa'"
                    src="@/assets/svg/billing/electron.svg"
                    alt=""
                  />
                  <img
                    v-else-if="usePayment.store.cardType.type == 'maestro'"
                    src="@/assets/svg/billing/maestro.svg"
                    alt=""
                  />
                  <img
                    v-else-if="usePayment.store.cardType.type == 'mastercard'"
                    src="@/assets/svg/billing/mastercard.svg"
                    alt=""
                  />
                  <img
                    v-else-if="usePayment.store.cardType.type == 'uzcard'"
                    src="@/assets/svg/billing/uzcard.svg"
                    alt=""
                  />
                  <img
                    v-else-if="usePayment.store.cardType.type == 'humo'"
                    src="@/assets/svg/billing/humo.svg"
                    alt=""
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-5 mt-4">
                <div>
                  <label for="name" class="_ca1 mb-2 block">{{
                    $t("payment.expdate")
                  }}</label>
                  <input
                    @input="usePayment.prettyCardExpiryDate"
                    v-model="usePayment.card.expiryDate"
                    class="w-full placeholder-[#A1A1A1]"
                    type="text"
                    name="credit-expires"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div
                  v-if="
                    usePayment.store.cardType.type == 'visa' ||
                    usePayment.store.cardType.type == 'mastercard'
                  "
                >
                  <label for="name" class="_ca1 mb-2 block">CVV</label>
                  <input
                    @input="usePayment.prettyCardCvc"
                    v-model="usePayment.card.cvc"
                    class="w-full placeholder-[#A1A1A1]"
                    type="number"
                    name="credit-cvc"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
            <p class="text-[#e74c3c] mt-2">
              {{ usePayment.store.payment_error }}
            </p>
            <p class="text-xs mt-7 mb-6">
              {{ $t("payment.info[0]") }}
              {{ isLoading.getCurrentSetting("group_price") }}
              {{ $t("payment.info[1]") }}
              <a href="#" target="_blank" class="underline">terms</a>.
            </p>
            <button
              class="w-full font-semibold uppercase px-6 rounded-[6px]"
              v-loading="isLoading.isLoadingType('createCommunity')"
              :class="
                useGroup.community.name &&
                usePayment.card.cardNumber &&
                usePayment.card.expiryDate
                  ? 'b_cbc _c07'
                  : 'b_ce0 _ca1'
              "
            >
              {{ $t("payment.startfree") }}
            </button>
          </form>
        </section>
      </main>
    </div>

    <!-- join to group -->
    <el-dialog
      v-model="usePayment.store.verifysms"
      width="400"
      align-center
      class="bg-opacity-50 !rounded-lg"
    >
      <form @submit.prevent="usePayment.verifySmsCode('create-group')">
        <p class="mt-4">
          {{ $t("payment.sendto") }} {{ usePayment.store.payment_phone }}
        </p>
        <div class="grid grid-cols-2 gap-5 mt-2">
          <div>
            <label for="name" class="_ca1 mb-2 block">Code</label>
            <input
              v-model="usePayment.store.code"
              class="w-full placeholder-[#A1A1A1]"
              type="text"
              name="credit-expires"
              placeholder="000000"
              required
            />
          </div>
        </div>
        <p class="text-[#e74c3c] mt-2">{{ usePayment.store.payment_error }}</p>
        <div class="flex justify-end mt-4">
          <button
            type="button"
            @click="usePayment.store.verifysms = false"
            class="_ca1 font-semibold px-6 r_8 uppercase"
          >
            {{ $t("cancel") }}
          </button>
          <button
            v-loading="isLoading.isLoadingType('paymentConfirm')"
            :class="usePayment.store.code ? 'b_cbc _c07' : 'b_ce0 _ca1'"
            class="_ca1 font-semibold b_ce0 px-6 r_8 uppercase"
          >
            {{ $t("login.verify") }}
          </button>
        </div>
      </form>
    </el-dialog>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});
import { useGroupStore, usePaymentStore, useLoadingStore } from "@/store";
const isLoading = useLoadingStore();
const usePayment = usePaymentStore();
const useGroup = useGroupStore();

function handleInput() {
  useGroup.community.name = useGroup.community.name?.slice(0, 30);
}

onBeforeUnmount(() => {
  usePayment.clearCard();
});

watch(
  () => usePayment.store.verifysms,
  () => {
    if (!usePayment.store.verifysms) {
      usePayment.clearCard();
    }
  }
);
</script>

<style lang="scss" scoped></style>
