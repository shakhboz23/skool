<template>
  <main
    class="full_flex overflow-y-auto"
    :class="
      $router.currentRoute.value.name == 'reset-password' ? 'min-h-screen' : ''
    "
  >
    <!-- Forgot -->
    <section
      v-if="!useAuth.modal.sended"
      align-center
      class="bg-opacity-50 !rounded-lg max-w-[400px]"
    >
      <router-link class="flex justify-center" to="/">
        <img src="/logo.svg" alt="" />
      </router-link>
      <section class="space-y-8 bg-white rounded-lg p-6 text-center _c07">
        <h1 class="_c07 text-2xl font-semibold">
          {{ $t("login.forgotpass") }}
        </h1>
        <p class="!mt-4">
          {{ $t("login.forgotinfo") }}
        </p>
        <form @submit.prevent="useAuth.authForgotPass" class="space-y-5">
          <input
            v-model="useAuth.verification.email"
            autofocus
            type="email"
            :placeholder="$t('login.email')"
            required
          />
          <p
            v-if="useAuth.store.errorMessage"
            class="text-start text-red-600 font-medium"
          >
            {{ useAuth.store.errorMessage }}
          </p>
          <button
            :type="isLoading.isLoadingType('activate') ? 'button' : 'submit'"
            v-loading="isLoading.isLoadingType('resend')"
            class="font-semibold w-full rounded-[4px]"
            :class="useAuth.verification.email ? 'b_cbc _c07' : 'b_ce0 _ca1'"
          >
            {{ $t("login.emailme") }}
          </button>
        </form>
      </section>
    </section>

    <!-- Forgot -->
    <section
      v-if="useAuth.modal.sended"
      width="400"
      align-center
      class="bg-opacity-50 !rounded-lg max-w-[400px]"
    >
      <router-link class="flex justify-center" to="/">
        <img src="/logo.svg" alt="" />
      </router-link>
      <section class="space-y-8 bg-white rounded-lg p-6 text-center _c07">
        <h1 class="_c07 text-2xl font-semibold">{{$t("login.checkemail")}}</h1>
        <p class="!mt-4">
          {{$t("login.wesentreset")}}
        </p>
        <button
          @click="login"
          v-loading="isLoading.isLoadingType('activate')"
          class="b_cbc _c07 font-semibold w-full rounded-[4px]"
        >
        {{$t("login.backtologin")}}
        </button>
      </section>
    </section>
  </main>
</template>

<script setup>
import { useAuthStore, useLoadingStore } from "~/store";
const useAuth = useAuthStore();
const isLoading = useLoadingStore();
useAuth.modal.forgot_modal = true;
const router = useRouter();
function login() {
  if (router.currentRoute.value.name == "reset-password") {
    router.push("/login");
  } else {
    useAuth.modal.sended = false;
    useAuth.modal.login = true;
  }
}
</script>

<style lang="scss" scoped></style>
