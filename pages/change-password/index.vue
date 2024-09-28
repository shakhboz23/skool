<template>
    <main
      class="flex items-center justify-center overflow-hidden overflow-y-auto min-h-screen max-h-screen"
    >
      <NuxtLoadingIndicator height="4" color="#2a85ff" />
      <section
        class="space-y-8 bg-white rounded-lg p-6 text-center max-w-[450px]"
      >
        <router-link class="flex justify-center" to="/">
          <img src="/logo.svg" alt="" />
        </router-link>
        <h1 class="_c07 text-2xl font-semibold">
          {{ $t("login.create_pass") }}
        </h1>
        <form
          class="space-y-5 text-start"
          @submit.prevent="useAuth.authChangePassword"
        >
          <FloatingInput
            id="password"
            type="password"
            v-model="useAuth.changepassword.password"
            @input="authChangePassword"
            :label="$t('login.newpass')"
            required
          />
  
          <p
            v-if="
              useAuth.store.passwordError?.length &&
              useAuth.store.passwordError[0] == 0
            "
            class="_ceb !mt-1 !-mb-3 text-xs"
          >
            {{ useAuth.store.passwordError[1] }}
          </p>
          <FloatingInput
            id="password_confirmation"
            type="password"
            v-model="useAuth.changepassword.password_confirmation"
            @input="authChangePassword"
            :label="$t('login.repeatpass')"
            required
          />
          <p
            v-if="
              useAuth.store.passwordError?.length &&
              useAuth.store.passwordError[0] == 1
            "
            class="_ceb !mt-1 !-mb-3 text-xs"
          >
            {{ useAuth.store.passwordError[1] }}
          </p>
          <p class="text-start text-red-600 font-medium">
            {{ useAuth.store.errorMessage }}
          </p>
          <button
            v-loading="isLoading.isLoadingType('changePass')"
            @click="register"
            class="font-semibold w-full rounded-[4px]"
            :class="useAuth.store.is_matched ? 'b_cbc _c07' : 'b_ce0 _ca1'"
          >
            {{ $t("save") }}
          </button>
        </form>
      </section>
  
      <Verification v-if="useAuth.modal.verification" />
    </main>
  </template>
  
  <script setup>
  definePageMeta({
    layout: false,
  });
  import { useAuthStore, useLoadingStore } from "@/store";
  import { useI18n } from "vue-i18n";
  const router = useRouter();
  const useAuth = useAuthStore();
  const isLoading = useLoadingStore();
  const { t } = useI18n();
  
  function register() {
    localStorage.setItem("token", "token");
  }
  
  function login() {
    if (router.currentRoute.value.name == "signup") {
      router.push("/login");
    } else {
      useAuth.modal.login = true;
      useAuth.modal.register = false;
    }
  }
  
  function authChangePassword() {
    if (useAuth.changepassword.password.length < 6) {
      return (useAuth.store.passwordError = [
        0,
        t("passerrors.pass"),a
      ]);
    } else if (useAuth.changepassword.password_confirmation.length < 6) {
      return (useAuth.store.passwordError = [
        1,
        t("passerrors.conpass"),
      ]);
    } else if (
      useAuth.changepassword.password_confirmation !=
      useAuth.changepassword.password
    ) {
      return (useAuth.store.passwordError = [1, t("passerrors.notmatch")]);
    }
    useAuth.store.passwordError = [];
    useAuth.store.is_matched = true;
  }
  </script>
  
  <style lang="scss" scoped></style>
  