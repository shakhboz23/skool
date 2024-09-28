<template>
    <el-dialog
      v-model="useAuth.modal.verification"
      width="400"
      align-center
      class="bg-opacity-50 !rounded-lg"
    >
      <section class="space-y-8 bg-white rounded-lg p-6 text-center _c07">
        <h1 class="_c07 text-2xl font-semibold">{{$t("login.wesentcode")}}</h1>
        <p class="!mt-4">
          {{$t("login.enteritverify")}} {{ useAuth.verification.email }}
        </p>
        <form @submit.prevent="useAuth.authVerify" class="space-y-5">
          <input
            v-model="useAuth.verification.verify_code"
            autofocus
            type="number"
            placeholder="Verification code"
            :placeholder="$t('login.verificationcode')"
            required
          />
          <button
            :type="isLoading.isLoadingType('activate') ? 'button' : 'submit'"
            v-loading="isLoading.isLoadingType('activate')"
            class="font-semibold w-full rounded-[4px]"
            :class="
              useAuth.verification.verify_code ? 'b_cbc _c07' : 'b_ce0 _ca1'
            "
          >
          {{$t("login.verify")}}
          </button>
          <!-- store.errorMessage -->
          <p class="text-start text-red-600 font-medium">
            {{ useAuth.store.errorMessage }}
          </p>
        </form>
        <div class="space-y-5">
          <p class="text-xs">
            {{$t("login.didntemail")}}

            <button
              type="button"
              @click="useAuth.authResend"
              class="_c2a font-medium hover:underline"
            >
            {{$t("login.resend")}}
            </button>
            {{$t("nav.or")}}
            <button
              type="button"
              @click="
                () => {
                  useAuth.modal.verification = false;
                  useAuth.modal.register = true;
                }
              "
              class="_c2a font-medium hover:underline"
            >
            {{$t("login.differentemail")}}
            </button>
          </p>
        </div>
      </section>
    </el-dialog>
</template>

<script setup>
import { useAuthStore, useLoadingStore } from "@/store";

const useAuth = useAuthStore();
const isLoading = useLoadingStore();
</script>

<style lang="scss" scoped>

</style>