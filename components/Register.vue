<template>
  <section class="space-y-8 bg-white rounded-lg p-6 text-center max-w-[450px]">
    <router-link class="flex justify-center" to="/">
      <img src="/logo.svg" alt="" />
    </router-link>
    <h1 class="_c07 text-2xl font-semibold">
      {{ $t("login.create_acc") }}
    </h1>
    <form class="space-y-5" @submit.prevent="useAuth.authRegister">
      <input
        v-model="useAuth.register.name"
        type="text"
        :placeholder="$t('login.name')"
        required
      />
      <input
        v-model="useAuth.register.surname"
        type="text"
        :placeholder="$t('login.surname')"
        required
      />
      <input
        v-model="useAuth.register.email"
        type="email"
        :placeholder="$t('login.email')"
        required
      />
      <div class="relative">
        <input
          v-model="useAuth.register.password"
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
      <div class="relative">
        <input
          v-model="useAuth.register.confirm_password"
          :type="useAuth.store.type"
          :placeholder="$t('login.password')"
          class="!pr-12 _c07"
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
      <p class="text-start text-red-600 font-medium">
        {{ useAuth.store.errorMessage }}
      </p>
      <button
        v-loading="isLoading.isLoadingType('register')"
        @click="register"
        :class="
          useAuth.register.name &&
          useAuth.register.surname &&
          useAuth.register.email &&
          useAuth.register.password &&
          useAuth.register.confirm_password
            ? '_c07 b_cbc'
            : 'b_ce0 _ca1'
        "
        class="b_ce0 _ca1 font-semibold w-full rounded-[4px]"
      >
        {{ $t("login.sign_up") }}
      </button>
    </form>
    <div class="space-y-5">
      <p v-html="$t('login.registerinfo')" class="_c07 text-xs"></p>
      <p class="text-sm">
        {{ $t("login.have_acc") }}
        <button @click="login" class="_c2a font-medium">
          {{ $t("login.log_in") }}
        </button>
      </p>
    </div>
  </section>

  <Verification v-if="useAuth.modal.verification" />
</template>

<script setup>
import { useAuthStore, useLoadingStore } from "@/store";

const router = useRouter();
const useAuth = useAuthStore();
const isLoading = useLoadingStore();

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
  useAuth.store.errorMessage = "";
}

onBeforeUnmount(() => {
  useAuth.store.type = 'password';
})

watch(
  () => useAuth.modal.register,
  () => {
    if (!useAuth.modal.register) {
      useAuth.register.password = "";
      useAuth.register.email = "";
      useAuth.register.name = "";
      useAuth.register.surname = "";
    }
  }
);
</script>

<style lang="scss" scoped></style>
