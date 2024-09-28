<template>
  <section class="space-y-8 bg-white rounded-lg p-6 text-center">
    <router-link class="flex justify-center" to="/">
      <img src="/logo.svg" alt="" />
    </router-link>
    <h1 class="_c07 text-2xl font-semibold">{{ $t("login.login") }}</h1>
    <form @submit.prevent="useAuth.authLogin" class="space-y-5">
      <input
        v-model="useAuth.login.email"
        autofocus
        type="email"
        :placeholder="$t('login.email')"
        required
      />
      <!-- <input
        v-model="useAuth.login.password"
        type="password"
        :placeholder="$t('login.password')"
        required
      /> -->
      <div class="relative">
        <input
          v-model="useAuth.login.password"
          :type="useAuth.store.type"
          :placeholder="$t('login.password')"
          class="!pr-12"
          required
        />
        <div>
          <img
            v-if="useAuth.store.type == 'password'"
            @click="useAuth.changeType"
            class="absolute cursor-pointer right-4 top-0 bottom-0 my-auto"
            src="@/assets/svg/icon/hidden.svg"
            alt=""
          />
          <img
            v-else
            @click="useAuth.changeType"
            class="absolute cursor-pointer right-4 top-0 bottom-0 my-auto"
            src="@/assets/svg/icon/show.svg"
            alt=""
          />
        </div>
      </div>
      <p
        class="_c2a text-start font-medium cursor-pointer hover:underline"
        @click="forgotPass"
      >
        {{ $t("login.forgot") }}
      </p>
      <button
        :type="isLoading.isLoadingType('logging') ? 'button' : 'submit'"
        v-loading="isLoading.isLoadingType('logging')"
        class="font-semibold w-full rounded-[4px]"
        :class="
          useAuth.login.email && useAuth.login.password
            ? '_c07 b_cbc'
            : 'b_ce0 _ca1'
        "
      >
        {{ $t("nav.login") }}
      </button>
      <!-- store.errorMessage -->
      <p class="text-start text-red-600 font-medium">
        {{ useAuth.store.errorMessage }}
      </p>
    </form>
    <div class="space-y-5">
      <p class="text-sm">
        {{ $t("login.dont_acc") }}
        <button
          type="button"
          @click="register"
          class="_c2a font-medium hover:underline"
        >
          {{ $t("login.signup") }}
        </button>
      </p>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore, useLoadingStore } from "@/store";

const router = useRouter();
const useAuth = useAuthStore();
const isLoading = useLoadingStore();

function register() {
  if (router.currentRoute.value.name == "login") {
    router.push("/signup");
  } else {
    useAuth.modal.login = false;
    useAuth.modal.register = true;
  }
  useAuth.store.errorMessage = "";
}

function forgotPass() {
  if (router.currentRoute.value.name == "login") {
    router.push("/signup");
  } else {
    useAuth.modal.login = false;
    useAuth.modal.forgot_modal = true;
  }
  useAuth.store.errorMessage = "";
}

watch(
  () => useAuth.modal.login,
  () => {
    if (!useAuth.modal.login) {
      useAuth.login.password = "";
      useAuth.login.email = "";
    }
  }
);

onBeforeUnmount(() => {
  useAuth.store.type = 'password';
})
</script>

<style lang="scss" scoped></style>
