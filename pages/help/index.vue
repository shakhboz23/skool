<template>
  <header
    class="pb-[40px] mx-auto xl:px-[200px] lg:px-[100px] md:px-[100px] sm:px-[50px] px-5 max-w-[1536px]"
  >
    <nav class="flex items-center justify-between py-10 mb-10">
      <router-link to="/">
        <img src="/logo.svg" alt="" />
      </router-link>
      <ul class="flex gap-6 routerlinks">
        <li>
          <router-link to="/community" class="text-black">
            Community
          </router-link>
        </li> 
        <li>Support</li>
      </ul>
    </nav>
    <main>
      <section class="w-[60%] mx-auto text-center">
        <h1 class="text-[36px] font-semibold">How can we help?</h1>
        <form class="mt-6 flex gap-4" id="searchBar" autocomplete="off">
          <input
            type="text"
            placeholder="Search the knowledge base"
            class="h-[50px] bg-[#e0e0e0]"
            value=""
          />
          <button
            type="button"
            class="r_8 px-10 py-2 min-w-[120px] _c07 b_cbc h-[50px]"
          >
            <span>Search</span>
          </button>
        </form>

        <div
          class="mt-[42px] full_flex gap-4 bg-[#e0e0e0] p-2 rounded-full mx-auto max-w-fit"
        >
          <div
            @click="store.role_type = 'member'"
            :class="store.role_type == 'admin' ? '' : '_c07 b_cbc'"
            class="duration-700 cursor-pointer rounded-full py-2 px-16"
          >
            Member
          </div>
          <div
            @click="store.role_type = 'admin'"
            :class="store.role_type == 'admin' ? '_c07 b_cbc' : ''"
            class="duration-700 cursor-pointer rounded-full py-2 px-16"
          >
            Admin
          </div>
        </div>
      </section>
      <section class="mt-16">
        <ul
          class="grid grid-cols-3 gap-4 text-center"
          v-if="store.role_type == 'member'"
        >
          <li v-for="i in member" class="bg-white p-5 r_8 space-y-1 border">
            <h1 class="text-xl font-semibold">{{ i[0] }}</h1>
            <p>{{ i[1] }}</p>
            <p class="_c2a">{{ i[2] }}</p>
          </li>
        </ul>
        <ul class="grid grid-cols-3 gap-4 text-center" v-else>
          <li v-for="i in admin" class="bg-white p-5 r_8 space-y-1 border">
            <h1 class="text-xl font-semibold">{{ i[0] }}</h1>
            <p>{{ i[1] }}</p>
            <p class="_c2a">{{ i[2] }}</p>
          </li>
        </ul>
      </section>
    </main>
  </header>
</template>

<script setup>
definePageMeta({
  layout: false,
});
const store = reactive({
  role_type: "member",
});

const member = [
  ["Accounts", "Profile, name, password, etc.", "6 articles"],
  ["Payments", "Manage, update, cancel, refund", "5 articles"],
  ["Support", "How to contact a group admin", "1 article"],
  ["How Learnify Works", "How to use all the features", "3 articles"],
  ["Learnify Guidelines", "Policies to keep Learnify fair and fun", "4 articles"],
  ["Finding Communities", "Discovering your interests and people", "1 article"],
];

const admin = [
  ["Group basics", "Name, artwork, URL, public/private", "5 articles"],
  ["Learnify payments", "Charge for membership, payouts, fees", "10 articles"],
  ["Group subscription", "Updating, canceling, invoices", "5 articles"],
  ["Members", "Invite, remove, manage access, ban", "3 articles"],
  ["Admins", "Admins, mods, billing managers", "3 articles"],
  ["Community", "Setting up your community", "5 articles"],
  ["Classroom", "Classroom & courses", "9 articles"],
  ["Calendar", "Calendars and events", "3 articles"],
  ["Leaderboards", "Gamification, levels, and points", "1 article"],
  ["Discovery", "Categories, ranking, algorithm", "3 articles"],
  ["Plugins", "Membership Questions, Auto DM, & Zapier", "8 articles"],
  ["Affiliate", "Affiliate & referrals", "2 articles"],
];
</script>

<style lang="scss" scoped></style>
