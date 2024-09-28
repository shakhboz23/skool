<template>
  <main>
    <nav class="flex items-center justify-between z-20 relative bg-white border-b border-[#E0E0E0] h-[80px] px-5"
      :class="store.is_open ? 'sm:flex hidden' : ''">
      <div v-if="!useMembers.store.manageUserRole" class="full_flex gap-4">
        <!-- <div class="w-10 h-10 b_c2a r_8 full_flex" v-if="true">
          <p class="font-semibold text-white">DM</p>
        </div> -->
        <!-- <img v-else src="@/assets/image/picture.png" alt="" /> -->
        <div class="flex items-center justify-between h-10">
          <div class="full_flex items-start gap-4">
            <img class="!w-10 !h-10 min-w-[40px] object-cover r_8 !overflow-hidden"
              v-if="useGroup.store.group_by_username.icon" :src="useGroup.store.group_by_username.icon" alt="" />
            <div v-else class="full_flex uppercase w-10 h-10 min-w-[40px] r_8"
              :style="`background: ${useGroup.store.group_by_username.color}`">
              {{ useGroup.store.group_by_username.initials }}
            </div>
          </div>
        </div>
        <div>
          <h1>{{ useGroup.store.group_by_username.name }}</h1>
          <p v-if="role_ac.includes(useGroup.store.group_by_username.type)">
            Group settings
          </p>
          <p v-else>Membership settings</p>
        </div>
      </div>
      <div v-else class="full_flex gap-4">
        <img class="h-10 w-10 rounded-full object-cover" :src="useMembers.store.member_data.user.image" alt="" />
        <div>
          <h1>
            {{ useMembers.store.member_data.user.name }}
            {{ useMembers.store.member_data.user.surname }}
          </h1>
          <p>Membership settings</p>
        </div>
      </div>
      <img @click="isLoading.store.inviteModal = false" class="cursor-pointer" src="@/assets/svg/x.svg" alt="" />
    </nav>
    <nav @click="store.is_open = false"
      class="sm:hidden flex items-center justify-between cursor-pointer z-20 relative bg-white border-b border-[#E0E0E0] h-[60px] px-5"
      :class="store.is_open ? '' : 'sm:block hidden'">
      <div class="full_flex gap-4 font-semibold _c07">
        <img src="@/assets/svg/icon/back_route.svg" alt="" />
        <p>{{ store.is_open_name }}</p>
      </div>
    </nav>
    <div class="flex">
      <aside :class="store.is_open
        ? 'sm:translate-x-0 translate-x-[-100%] max-w-0'
        : 'sm:min-w-[280px] min-w-full'
        "
        class="sm:min-w-[280px] h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto pb-5 border-r border-[#E0E0E0] duration-300 whitespace-nowrap">
        <ul v-if="!useMembers.store.manageUserRole &&
        role_ac.includes(useGroup.store.group_by_username.type)
        " class="_c07 text-sm">
          <li @click="openData(index, i)" :class="isLoading.store.slideStep == index ? '_c2a font-medium bg-[#F0F5FA]' : ''
        " class="flex gap-4 items-center cursor-pointer" v-for="(i, index) in members_sidebar">
            <p :class="isLoading.store.slideStep == index ? 'b_c2a' : ''" class="w-1 h-[44px]"></p>
            <p>{{ $t(`membersmodal.${i}`) }}</p>
          </li>
        </ul>
        <ul v-else-if="useMembers.store.manageUserRole" class="_c07 text-sm">
          <li @click="openData(0, 'Members')" :class="isLoading.store.slideStep == 0 ? '_c2a font-medium bg-[#F0F5FA]' : ''
        " class="flex gap-4 items-center cursor-pointer font-medium">
            <p :class="isLoading.store.slideStep == 0 ? 'b_c2a' : ''" class="w-1 h-[44px]"></p>
            <p>Members</p>
          </li>
          <li
            v-if="useGroup.store.group_by_username.type == 'Admin' || useGroup.store.group_by_username.type == 'Creator'"
            @click="openData(1, 'Courses')" :class="isLoading.store.slideStep == 1 ? '_c2a font-medium bg-[#F0F5FA]' : ''
        " class="flex gap-4 items-center cursor-pointer font-medium">
            <p :class="isLoading.store.slideStep == 1 ? 'b_c2a' : ''" class="w-1 h-[44px]"></p>
            <p>Courses</p>
          </li>
        </ul>
        <ul v-else class="_c07 text-sm">
          <li @click="openData(index, i)" :class="isLoading.store.slideStep == index ? '_c2a font-medium bg-[#F0F5FA]' : ''
        " class="flex gap-4 items-center cursor-pointer" v-for="(i, index) in membership_settings">
            <p :class="isLoading.store.slideStep == index ? 'b_c2a' : ''" class="w-1 h-[44px]"></p>
            <p>{{ i }}</p>
          </li>
        </ul>
      </aside>
      <div class="w-full h-[calc(100vh_-120px)] overflow-hidden" :class="store.is_open ? '' : 'sm:block hidden'">
        <div v-if="!useMembers.store.manageUserRole &&
        role_ac.includes(useGroup.store.group_by_username.type)
        " class="mainSlider h-[calc(100vh_-120px)] duration-700">
          <section class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="_c00 font-semibold text-xl">🎉 {{ $t("membersmodal.happy") }} Monday, {{
        isLoading.user_update_checker.name }}</h1>
            <p class="md:my-10 my-6 font-medium">{{ $t("membersmodal.Subscriptions") }}</p>
            <div class="md:flex grid grid-cols-2 gap-8">
              <div class="full_flex flex-col space-y-3 h-20 border_cbc r_8 md:min-w-[150px]">
                <h3 class="_ca1 text-xs font-medium">{{ $t("membersmodal.paid") }}</h3>
                <p class="font-semibold text-xl">523</p>
              </div>
              <div class="full_flex flex-col space-y-3 h-20 border_cbc r_8 md:min-w-[150px]">
                <h3 class="_ca1 text-xs font-medium">MRR</h3>
                <p class="font-semibold text-xl">
                  <span class="_ca1">$</span>18,9K
                </p>
              </div>
            </div>
          </section>
          <section v-loading="isLoading.isLoadingType('getPayouts')"
            class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="_c00 font-semibold text-xl md:mb-10 mb-6">{{ $t("membersmodal.Payouts") }}</h1>
            <div class="flex md:gap-8 gap-5">
              <div class="full_flex flex-col space-y-3 h-20 px-4 border_cbc r_8 md:min-w-[150px] min-w-[132px]">
                <h3 class="_ca1 text-xs font-medium">Balance</h3>
                <p class="font-semibold text-xl">
                  <span class="_ca1">{{ useGroupSet.store.payouts }}</span> UZS
                </p>
              </div>
              <div class="flex justify-center flex-col space-y-2">
                <h2 class="font-semibold leading-4">
                  Next payout will be $0 in 2 days
                </h2>
                <div class="flex gap-1 leading-4 lowercase">
                  $0 {{ $t("membersmodal.payouts.pending") }}<img src="@/assets/svg/members/pending.svg" alt="" />
                </div>
              </div>
            </div>
            <h2 class="font-semibold mt-7">{{ $t("membersmodal.payouts.paymenth") }}</h2>
            <hr class="w-full my-4" />
            <p>{{ $t("membersmodal.payouts.nopay") }}</p>
          </section>
          <section
            class="md:text-[16px] text-sm h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto _c07 md:p-5 p-3 w-full">
            <h1 class="text-xl font-semibold _c00">{{ $t("membersmodal.invite.share") }}</h1>
            <p class="my-5">
              {{ $t("membersmodal.invite.shareinfo") }}
            </p>
            <div class="flex gap-3">
              <p class="flex items-center w-full truncate h-10 rounded-[4px] px-3 border_ce0 _c2a font-medium text-sm">
                <span class="truncate">{{ store.invite_link }}</span>
              </p>
              <button @click="isLoading.copyLink(store.invite_link, $t('messages.copied'))"
                class="b_cbc px-6 uppercase font-semibold r_8">
                {{ $t("membersmodal.invite.copy") }}
              </button>
            </div>
            <p class="md:mt-10 mt-6 mb-5">
              {{ $t("membersmodal.invite.shareinfo2") }}
            </p>
            <div class="flex gap-3">
              <input type="email" placeholder="Email adress" />
              <button class="b_cbc px-6 uppercase font-semibold r_8">
                {{ $t("membersmodal.invite.send") }}
              </button>
            </div>
            <p class="mt-3 md:mb-10 mb-6">
              {{ $t("membersmodal.invite.shareinfo3") }}
              <span class="_c2a lowercase">(5/6 {{ $t("members.courses") }}).</span>
            </p>

            <!-- <div class="space-y-6">
              <div class="flex md:flex-row flex-col gap-3 md:items-center items-start justify-between">
                <div class="flex items-center md:gap-3 gap-4">
                  <p class="full_flex h-10 w-10 min-w-[40px] r_8 b_cd9">
                    <img src="@/assets/svg/members/csv.svg" alt="" />
                  </p>
                  <div class="space-y-1">
                    <h2 class="text-[16px] font-semibold">Import .CSV file</h2>
                    <p class="text-xs">
                      {{ $t("membersmodal.invite.importinfo") }}
                    </p>
                  </div>
                </div>
                <button class="uppercase border_cbc px-3 r_8 _c2a md:ml-0 ml-[56px]">
                  {{ $t("membersmodal.invite.import") }}
                </button>
              </div> -->
            <!-- <div class="flex md:flex-row flex-col md:gap-3 gap-3 md:items-center items-start justify-between">
                <div class="flex items-center gap-4">
                  <p class="full_flex h-10 w-10 min-w-[40px] r_8 b_cd9">
                    <img src="@/assets/svg/members/zapier.svg" alt="" />
                  </p>
                  <div class="space-y-1">
                    <h2 class="text-[16px] font-semibold">
                      Zapier integration
                    </h2>
                    <p class="text-xs">
                      {{ $t("membersmodal.invite.integrateinfo") }}
                    </p>
                  </div>
                </div>
                <button class="uppercase border_cbc px-3 r_8 _c2a md:ml-0 ml-[56px]">
                  {{ $t("membersmodal.invite.integrate") }}
                </button>
              </div> -->
            <!-- </div>
             -->
          </section>
          <section class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <div class="flex flex-wrap md:gap-10 gap-4 md:mb-0 mb-2">
              <div class="flex gap-5" @click="general.filetype = 'icon'">
                <div class="relative imagelabel" v-if="useMembers.general.icon.url">
                  <button @click="() => { useMembers.general.icon.url = ''; useMembers.general.icon.file = '' }"
                    type="button"
                    class="absolute deleteimage z-10 bg-white !hidden top-2 right-2 rounded-full w-7 h-7 full_flex border p-2">
                    <img src="@/assets/svg/x.svg" alt="" />
                  </button>
                  <img v-if="useMembers.general.icon.url" :src="useMembers.general.icon.url" alt=""
                    class="h-[60px] w-[60px] b_cf2 r_8 object-cover" />
                </div>
                <label for="upload_icon" v-else class="h-[60px] w-[60px] b_cf2 r_8"></label>
                <div class="space-y-1">
                  <p class="font-semibold">Icon</p>
                  <p class="text-xs">{{ $t("membersmodal.general.recommended") }}:</p>
                  <p class="text-xs pb-2">128x128</p>
                  <label class="border_cbc px-3 _c2a r_8 uppercase h-10 block full_flex" for="upload_icon">
                    {{ $t("course.change") }}
                  </label>
                </div>
                <input @change="(e) => handleGeneralFile(e, 'icon')" type="file" id="upload_icon" accept="image/*"
                  class="h-0 w-0 overflow-hidden block !p-0" />
              </div>
              <div @click="general.filetype = 'cover'" class="flex gap-5">
                <div class="relative imagelabel" v-if="useMembers.general.image.url">
                  <button @click="() => { useMembers.general.image.url = ''; useMembers.general.image.file = '' }"
                    type="button"
                    class="absolute deleteimage z-10 bg-white !hidden top-2 right-2 rounded-full w-7 h-7 full_flex border p-2">
                    <img src="@/assets/svg/x.svg" alt="" />
                  </button>
                  <img :src="useMembers.general.image.url" alt=""
                    class="md:h-[144px] h-[105px] md:w-[271px] w-[195px] b_cf2 r_8 object-cover" />
                </div>
                <label for="upload_cover" v-else
                  class="md:h-[144px] h-[105px] md:w-[271px] w-[195px] b_cf2 r_8"></label>
                <div class="space-y-1">
                  <p class="font-semibold">{{ $t("course.cover") }}</p>
                  <p class="text-xs">{{ $t("membersmodal.general.recommended") }}:</p>
                  <p class="text-xs pb-2">1084x576</p>
                  <label class="border_cbc px-3 _c2a r_8 uppercase h-10 block full_flex" for="upload_cover">
                    {{ $t("course.change") }}
                  </label>
                  <input @change="(e) => handleGeneralFile(e, 'cover')" type="file" id="upload_cover"
                    class="h-0 w-0 overflow-hidden block !p-0" accept="image/*" />
                </div>
              </div>
            </div>
            <div class="space-y-5">
              <div class="space-y-2">
                <label for="name" class="_ca1 text-xs">{{ $t("membersmodal.general.groupname") }}</label>
                <div>
                  <input id="name" v-model="useMembers.general.name" @input="handleInput('input')" type="text"
                    :placeholder="$t('membersmodal.general.recommended')" required />
                  <p class="text-end mt-1 _ca1">
                    {{ useMembers.general.name?.length }}/50
                  </p>
                </div>
              </div>
              <div class="space-y-2 !mt-2">
                <label for="url" class="_ca1 text-xs">{{ $t("membersmodal.general.url") }}</label>
                <div>
                  <input class="_ca1" disabled id="url" v-model="useMembers.general.url" type="url" placeholder="Url"
                    required />
                  <p class="mt-1 _ca1 text-xs">
                    {{ $t("membersmodal.general.urlinfo") }}
                  </p>
                </div>
              </div>
              <el-input v-model="useMembers.general.excerpt" autosize type="textarea"
                :placeholder="$t('membersmodal.general.groupdesc')" />
              <div class="grid md:grid-cols-2 md:gap-20 gap-4">
                <div class="space-y-2">
                  <label for="initials" class="_ca1 text-xs">{{ $t("membersmodal.general.initials") }}</label>
                  <div>
                    <input @input="handleInput('initials')" type="text" class="_ca1" id="initials"
                      v-model="useMembers.general.initials" placeholder="initials" required />
                  </div>
                </div>
                <div class="flex gap-3 items-end">
                  <p class="h-10 min-w-[40px] r_8" :style="`background: ${useMembers.general.color}`"></p>
                  <div class="space-y-2 w-full">
                    <label for="initials" class="_ca1 text-xs">{{ $t("membersmodal.general.color") }}</label>
                    <div>
                      <el-select class="block w-full" v-model="useMembers.general.color" placeholder="Select">
                        <ul class="color_list grid grid-cols-5 gap-2 max-auto !h-[108px] !p-3 !pt-2">
                          <el-option :key="i" :label="''" :value="i" v-for="i in colors_list"
                            @click="useMembers.general.color = i" class="h-10 w-[40px] max-w-[40px] bg-[#009e5d] r_8"
                            :style="`background: ${i}`"></el-option>
                        </ul>
                        <p class="mt-2 mb- ml-5">Or create your color</p>
                        <p class="ml-5 full_flex pb-3 r_8 w-[216px] overflow-hidden">
                          <input v-model="useMembers.general.color" class="r_8 !w-[320px] !h-10 overflow-hidden"
                            :style="`background: ${useMembers.general.color}`" type="color" />
                        </p>
                      </el-select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-5">
                <label @click="useMembers.general.group_type = 'private'" class="space-y-3 r_8 p-5 cursor-pointer"
                  :class="useMembers.general.group_type == 'private'
        ? 'border_cbc b_cf0f'
        : 'border_ce0'
        ">
                  <div class="flex items-center gap-3">
                    <input @focus="useMembers.general.group_type = 'private'" v-model="useMembers.general.group_type"
                      :checked="useMembers.general.group_type == 'private'
        ? true
        : false
        " id="private" class="rounded-full" type="radio" name="type" />
                    <div class="full_flex gap-1 capitalize">
                      <img src="@/assets/svg/members/private.svg" alt="" />
                      {{ $t("nav.private") }}
                    </div>
                  </div>
                  <p>
                    {{ $t("membersmodal.general.privateinfo") }}
                  </p>
                </label>
                <label @click="useMembers.general.group_type = 'public'" class="space-y-3 r_8 p-5 cursor-pointer"
                  :class="useMembers.general.group_type == 'private'
        ? 'border_ce0'
        : 'border_cbc b_cf0f'
        ">
                  <div class="flex items-center gap-3">
                    <input v-model="useMembers.general.group_type" :checked="useMembers.general.group_type == 'public' ? true : false
        " id="public" class="rounded-full" @focus="useMembers.general.group_type = 'public'" type="radio"
                      name="type" />
                    <div class="full_flex gap-1 capitalize">
                      <img src="@/assets/svg/members/public.svg" alt="" />
                      {{ $t("nav.public") }}
                    </div>
                  </div>
                  <p>
                    {{ $t("membersmodal.general.publicinfo") }}
                  </p>
                </label>
              </div>
            </div>
            <button v-loading="isLoading.isLoadingType('updateSettings')" @click="useMembers.gereralSettings"
              class="px-6 r_8 md:mt-6 mt-4" :class="useMembers.general.name ? '_ca7 b_cbc' : '_ca1 b_ce0'">
              {{ $t("membersmodal.general.updatesettings") }}
            </button>
          </section>
          <section v-loading="isLoading.isLoadingType('getPrices')"
            class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="_c00 font-semibold text-xl">{{ $t("membersmodal.Subscriptions") }}</h1>
            <p class="md:mt-5 mt-4 md:mb-8 mb-4 font-medium">
              {{ $t("membersmodal.subinfo") }}
            </p>
            <div v-for="i in useMembers.store.group_prices"
              class="flex md:items-center justify-between whitespace-nowrap border_cbc r_8 mb-4 py-2 px-3 gap-3">
              <div class="flex flex-wrap items-center md:gap-10 gap-4">
                <div class="full_flex gap-1 h-9">
                  <img src="@/assets/svg/free.svg" alt="" />
                  <p class="font-medium capitalize">{{ i.price == 0 ? $t("nav.free") : i.price + ' UZS/' +
        $t("payment.month") }}</p>
                </div>
                <p class="_c2a lowercase">{{ i.members }} {{ $t("members.member") }}</p>
                <button v-if="i.is_current" class="px-6 h-9 text-white b_c6f r_8 font-semibold">
                  {{ $t("membersmodal.currentprice") }}
                </button>
              </div>
              <el-dropdown placement="bottom-end" class="dropdown">
                <button class="full_flex w-9 h-9">
                  <img src="@/assets/svg/three_dot_blue.svg" alt="" />
                </button>
                <template #dropdown>
                  <el-dropdown-menu class="community_dropdown min-w-[200px] dropdown_shadow">
                    <el-dropdown-item v-loading="isLoading.isLoadingType('makeCurrent')"
                      @click="useMembers.makeCurrent(i.id, i.is_current)"><span
                        :class="i.is_current ? '_ca1' : '_c07'">Make current</span></el-dropdown-item>
                    <el-dropdown-item v-loading="isLoading.isLoadingType('deletePrice')"
                      @click="useMembers.deletePrice(i.id, i.is_deleted)">
                      <span :class="i.is_deleted
        ? '_c07'
        : '_ca1'
        ">Delete price</span></el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <!-- <button class="h-9">
                <img class="rotate-90 min-w-[24px]" src="@/assets/svg/three_dot.svg" alt="" />
              </button> -->
            </div>
            <button @click="openAddPrice" class="px-6 uppercase r_8 mt-2 font-semibold"
              :class="useMembers.store.is_paid ? 'b_ce0' : 'b_cbc'">
              {{ $t("membersmodal.addprice") }}
            </button>
            <div v-if="useMembers.store.is_paid" class="space-y-2 p-2 bg-[#e0e0e071] rounded-lg md:mt-8 mt-4">
              <h1>{{ $t('payment.archivedgroup') }}</h1>
              <p>{{ $t("payment.addpriceinfo") }}</p>
              <button @click="usePayment.store.reactive = true" class="px-6 b_cbc uppercase r_8 font-semibold">
                {{ $t("continue") }}
              </button>
            </div>
          </section>
          <section v-if="!usePost.modal.create"
            class="h-[calc(100vh_-120px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <div class="flex items-center justify-between">
              <h1 class="font-semibold text-xl">{{ $t("membersmodal.Categories") }}</h1>
              <button @click="usePost.modal.create = true" class="uppercase font-semibold text-sm b_cbc _c07 px-6 r_8">
                {{ $t("membersmodal.category.addcategory") }}
              </button>
            </div>
            <div v-for="(i, index) in usePost.store.categories" v-loading="isLoading.isLoadingType('getPostCategories')"
              class="flex items-center justify-between md:mt-9 mt-4">
              <div class="space-y-2">
                <p class="font-semibold">{{ i.name }} ({{ i.post_count }})</p>
                <p class="text-xs">{{ i.description }}</p>
              </div>
              <div class="flex gap-3">
                <button @click="editPostCategory(i)" class="full_flex gap-1 border border_cbc r_8 _c2a px-3 h-9">
                  <img src="@/assets/svg/edit.svg" alt="" />
                  <p>{{ $t("edit") }}</p>
                </button>
                <div class="border_cbc r_8 w-9 h-9">
                  <el-dropdown placement="bottom-end" class="dropdown">
                    <button class="full_flex w-9 h-9">
                      <img src="@/assets/svg/three_dot_blue.svg" alt="" />
                    </button>
                    <template #dropdown>
                      <el-dropdown-menu class="community_dropdown min-w-[200px] dropdown_shadow">
                        <el-dropdown-item @click="usePost.updatePositionCategory(index, 'up')"><span
                            :class="index == 0 ? '_ca1' : ''">{{ $t("moveup") }}</span></el-dropdown-item>
                        <el-dropdown-item @click="usePost.updatePositionCategory(index, 'down')">
                          <span :class="index == usePost.store.categories.length - 1
        ? '_ca1'
        : ''
        ">{{ $t("movedown") }}</span></el-dropdown-item>
                        <el-dropdown-item @click="deleteFunc('post', i)"><span :class="usePost.store.categories.length == 1 ? '_ca1' : ''
        ">{{ $t("delete") }}</span></el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </section>
          <section v-else
            class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <form @submit.prevent="handleAddPostCategory" class="space-y-6">
              <h1 class="md:text-2xl text-lg pb-2 font-semibold _c07 space-x-1">
                <span v-if="$t('nav.uz') == 'en' || $t('nav.uz') == 'ru'">
                  <span v-if="usePost.modal.edit">{{ $t("edit") }}</span><span v-else>{{ $t("add") }}</span>
                </span>
                <span class="lowercase">{{ $t("membersmodal.category.category") }}</span>
                <span class="lowercase" v-if="$t('nav.uz') != 'en' || $t('nav.uz') != 'ru'">
                  <span v-if="usePost.modal.edit">{{ $t("edit") }}</span><span v-else>{{ $t("add") }}</span>
                </span>
              </h1>
              <div>
                <FloatingInput @input="handleInput('input')" id="old_password" type="text"
                  v-model="usePost.create_category.name" :label="$t('name')" required />
                <p class="text-end mt-2 _ca1 md:text-sm text-xs">
                  {{ usePost.create_category.name?.length }}/30
                </p>
              </div>
              <div>
                <textarea @input="handleInput('textarea')" id="write_message"
                  v-model="usePost.create_category.description" class="h-[90px] text-sm w-full rounded-[4px]"
                  :placeholder="$t('description')"></textarea>
                <p class="text-end mt-2 _ca1 md:text-sm text-xs">
                  {{ usePost.create_category.description?.length }}/150
                </p>
              </div>
              <div>
                <label class="_ca1 text-xs" for="access">{{ $t("membersmodal.category.permissions") }}</label>
                <el-select class="block w-full mt-2" v-model="usePost.create_category.permission" placeholder="Select">
                  <el-option v-for="item in post_category_access" :key="item.value"
                    :label="$t(`membersmodal.category.${item.label}`)" :value="item.value" :disabled="item.disabled">
                    <div class="flex items-center gap-2">
                      {{ $t(`membersmodal.category.${item.label}`) }}
                      <img v-if="usePost.create_category.permission == item.value" src="@/assets/svg/checked.svg"
                        alt="" />
                    </div>
                  </el-option>
                </el-select>
              </div>
              <div v-if="!usePost.store.edit_course" class="flex gap-3 text-sm font-semibold">
                <button :class="usePost.create_category.name ? 'b_cbc _c07' : 'b_ce0 _ca1'
        " @click="reposrtToAdmins" class="uppercase h-10 px-6 rounded-lg"
                  v-loading="isLoading.isLoadingType('createPostCategory')">
                  <span v-if="!usePost.modal.edit">{{ $t("add") }}</span><span v-else>{{ $t("save") }}</span>
                </button>
                <button type="button" @click="usePost.clearData" class="uppercase h-10 px-6 rounded-lg _ca1">
                  {{ $t("cancel") }}
                </button>
              </div>
            </form>
          </section>
          <!-- <section class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
          </section> -->
          <section class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="font-semibold md:text-xl text-[16px] leading-6 lg:px-[120px] md:px-[60px] text-center">
              In the past 30 days, your group stayed at 1 membersand 1 members
              (100%) were active.
            </h1>
            <div class="space-y-9 md:mt-10 mt-6">
              <div class="space-y-[30px]">
                <h1 class="font-semibold">{{ $t("membersmodal.metrics.total") }}</h1>
                <LineChart />
              </div>
              <div class="space-y-[30px]">
                <div class="flex items-center justify-between">
                  <h1 class="font-semibold">{{ $t("membersmodal.metrics.active") }}</h1>
                  <el-dropdown placement="bottom-end" class="dropdown">
                    <div class="full_flex gap-1 _c2a text-xs font-semibold">
                      <p class="text-xs">Monthly active</p>
                      <img src="@/assets/svg/chat/select_arrow.svg" alt="" />
                    </div>
                    <template #dropdown>
                      <el-dropdown-menu class="community_dropdown min-w-[200px] dropdown_shadow">
                        <el-dropdown-item>First</el-dropdown-item>
                        <el-dropdown-item>Last</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
                <div>developing ...</div>
              </div>
              <div class="space-y-[30px]">
                <h1 class="font-semibold">{{ $t("membersmodal.metrics.daily") }}</h1>
                <div>developing ...</div>
              </div>
            </div>
          </section>
          <section v-if="!useMembers.store.editGamification"
            class="h-[calc(100vh_-120px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="font-semibold text-xl">{{ $t("membersmodal.Gamification") }}</h1>
            <p class="md:mt-5 mt-4 md:mb-7 mb-6 md:text-[16px] text-sm">
              {{ $t("membersmodal.gamification.info") }}
            </p>
            <div class="space-y-7">
              <div v-for="(i, index) in useMembers.store.levels" v-if="!isLoading.isLoadingType('getLevels')"
                class="flex items-center justify-between mt-9">
                <div class="space-y-1">
                  <p class="font-semibold">
                    {{ $t("leaderboard.level") }} {{ index + 1 }} {{ i.level ? `- ${i.level}` : '' }}
                  </p>
                  <div class="text-xs whitespace-pre-line">
                    <span>{{ i.members }}% {{ $t("leaderboard.members") }} - </span>
                    <span v-if="i.courses?.length">
                      <a target="_blank" :href="getLink(course)" class="_c2a font-bold hover:underline"
                        v-for="(course, index) in i.courses">"{{ course.title }}"
                        <span v-if="index < i.courses?.length - 1" class="_c07">,</span></a> {{
        $t("membersmodal.gamification.unlocks") }}
                    </span>
                    <p v-else>{{ $t("membersmodal.gamification.nounlock") }}</p>
                  </div>
                </div>
                <button @click="editLevel(i, index)"
                  class="full_flex min-w-fit gap-1 border border_cbc r_8 _c2a px-3 h-9">
                  <img src="@/assets/svg/edit.svg" alt="" />
                  <p>{{ $t("edit") }}</p>
                </button>
              </div>
            </div>
          </section>
          <section v-else
            class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="text-xl font-semibold">{{ $t("membersmodal.gamification.edit") }}</h1>
            <form @submit.prevent="useMembers.editLevel">
              <label for="name" class="_ca1 mb-2 block md:mt-7 mt-4">{{ $t("name") }}</label>
              <div class="flex items-center px-3 whitespace-nowrap border_ce0 h-10 rounded-[4px]">
                <p class="_ca1">{{ useMembers.level.name }}</p>
                <p class="h-5 ml-2 w-0 !border-r-0 border_ce0"></p>
                <input v-model="useMembers.level.custom_name" class="!px-2 h-9 !border-0" type="text" required />
              </div>
              <p class="_ca1 text-end mt-1 mb-4">7/20</p>
              <div class="md:mt-6">
                <button v-loading="isLoading.isLoadingType('editLevels')"
                  class="_c07 font-semibold b_cbc px-6 r_8 uppercase">
                  {{ $t("save") }}
                </button>
                <button type="button" @click="useMembers.store.editGamification = false"
                  class="_ca1 font-semibold px-6 r_8 uppercase">
                  {{ $t("cancel") }}
                </button>
              </div>
              <p class="font-semibold md:mt-8 mt-4 mb-4">
                {{ $t("membersmodal.gamification.nounlockinfo") }}
              </p>
              <p class="_c07">
                {{ $t("membersmodal.gamification.unlockinfo") }}
              </p>
            </form>
          </section>
          <section class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="font-semibold text-xl">{{ $t("membersmodal.Discovery") }}</h1>
            <p class="md:mt-5 mt-4">
              {{ $t("membersmodal.discovery.info") }}
            </p>
            <div class="flex flex-wrap gap-5 md:my-5 my-4">
              <button class="md:w-auto w-full md:text-center text-start space-x-3 border_cbc px-6 _c2a r_8 text-[16px]">
                <span class="_ca1 font-medium">{{ $t("membersmodal.discovery.info1[0]") }}</span><span
                  class="_ceb font-semibold uppercase">{{ $t("membersmodal.discovery.no") }}</span>
              </button>
              <button class="md:w-auto w-full md:text-center text-start space-x-3 border_cbc px-6 _c2a r_8 text-[16px]">
                <span class="_ca1 font-medium">{{ $t("membersmodal.discovery.rank") }}</span><span
                  class="_ceb font-semibold uppercase">{{ $t("membersmodal.discovery.none") }}</span>
              </button>
              <button class="md:w-auto w-full md:text-center text-start space-x-3 border_cbc px-6 _c2a r_8 text-[16px]">
                <span class="_ca1 font-medium">{{ $t("membersmodal.category.category") }}</span><span
                  class="_ceb font-semibold uppercase">{{ $t("membersmodal.discovery.none") }}</span>
              </button>
            </div>
            <div class="leading-4 space-y-4">
              <p>
                <span class="font-[700]">{{ $t("membersmodal.discovery.info1[0]") }}</span> — {{
        $t("membersmodal.discovery.info1[1]") }}
              </p>
              <p>
                <span class="font-[700]">{{ $t("membersmodal.discovery.info2[0]") }}</span> — {{
        $t("membersmodal.discovery.info2[1]") }}
              </p>
              <p>{{ $t("membersmodal.discovery.support") }}</p>
            </div>
          </section>
          <section v-if="!useLink.modal.create"
            class="h-[calc(100vh_-120px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <div>
              <div class="flex items-center justify-between">
                <h1 class="font-semibold text-xl">{{ $t("membersmodal.Links") }}</h1>
                <button @click="useLink.modal.create = true"
                  class="md:block hidden uppercase font-semibold text-sm px-6 r_8" :class="useLink.store.links.length != 3
        ? '_c07 b_cbc'
        : '_ca1 b_ce0 pointer-events-none'
        ">
                  {{ $t("membersmodal.links.addlink") }}
                </button>
              </div>
              <p class="mt-5">
                {{ $t("membersmodal.links.info") }}
              </p>
              <button @click="useLink.modal.create = true"
                class="md:hidden block mt-4 uppercase font-semibold text-sm px-6 r_8" :class="useLink.store.links.length != 3
        ? '_c07 b_cbc'
        : '_ca1 b_ce0 pointer-events-none'
        ">
                {{ $t("membersmodal.links.addlink") }}
              </button>
            </div>
            <div v-for="(i, index) in useLink.store.links" v-loading="isLoading.isLoadingType('getPostCategories')"
              class="flex items-center justify-between md:mt-9 mt-4">
              <div class="space-y-2 max-w-[70%]">
                <p class="font-semibold truncate">
                  {{ i.label }} ({{ i.is_public ? "Public" : "Private" }})
                </p>
                <p class="text-xs truncate">{{ i.url }}</p>
              </div>
              <div class="flex gap-3">
                <button @click="editLink(i)" class="full_flex gap-1 border min-w-fit border_cbc r_8 _c2a px-3 h-9">
                  <img src="@/assets/svg/edit.svg" alt="" />
                  <p>{{ $t("edit") }}</p>
                </button>
                <div class="border_cbc r_8 w-9 h-9">
                  <el-dropdown placement="bottom-end" class="dropdown">
                    <button class="full_flex w-9 h-9">
                      <img src="@/assets/svg/three_dot_blue.svg" alt="" />
                    </button>
                    <template #dropdown>
                      <el-dropdown-menu class="community_dropdown min-w-[200px] dropdown_shadow">
                        <el-dropdown-item @click="useLink.updatePosition(index, 'up')"><span
                            :class="index == 0 ? '_ca1' : ''">{{ $t("moveup") }}</span></el-dropdown-item>
                        <el-dropdown-item @click="useLink.updatePosition(index, 'down')">
                          <span :class="index == useLink.store.links.length - 1
        ? '_ca1'
        : ''
        ">{{ $t("movedown") }}</span></el-dropdown-item>
                        <el-dropdown-item @click="deleteFunc('link', i)"><span>{{ $t("delete")
                            }}</span></el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </section>
          <section v-else
            class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="text-xl font-semibold">{{ $t("membersmodal.links.addlink") }}</h1>
            <form @submit.prevent="useLink.createLink" class="md:space-y-5 space-y-4">
              <div>
                <label for="name" class="_ca1 mb-2 block md:mt-7 mt-4">{{ $t("membersmodal.links.label") }}</label>
                <input v-model="useLink.create.label" class="" type="text" required />
                <p class="_ca1 text-end mt-1">0/34</p>
              </div>
              <div>
                <input v-model="useLink.create.url" type="url" :placeholder="$t('membersmodal.general.url')" required />
              </div>
              <div>
                <label for="name" class="_ca1 mb-2 block">{{ $t("nav.privacy") }}</label>
                <el-select class="block w-full mt-2" v-model="useLink.create.is_public" placeholder="Select">
                  <el-option v-for="item in access_list" :key="item.value"
                    :label="$t(`membersmodal.links.${item.label}`)" :value="item.value" :disabled="item.disabled">
                    <div class="flex items-center gap-2">
                      {{ $t(`membersmodal.links.${item.label}`) }}
                      <img v-if="useMembers.general.fjdkfjdf == item.value" src="@/assets/svg/checked.svg" alt="" />
                    </div>
                  </el-option>
                </el-select>
              </div>
              <div>
                <button :class="useLink.create.label && useLink.create.url
        ? '_c07 b_cbc'
        : '_ca1 b_ce0'
        " class="font-semibold px-6 r_8 md:mt-6 uppercase">
                  {{ $t("save") }}
                </button>
                <button @click="() => {
        useLink.modal.create = false;
        useLink.modal.edit = false;
      }
        " class="_ca1 font-semibold px-6 r_8 uppercase">
                  {{ $t("cancel") }}
                </button>
              </div>
            </form>
          </section>
          <section v-loading="isLoading.isLoadingType('getBilling')" v-if="useMembers.store.updatePayment == 'payment'"
            class="h-[calc(100vh_-120px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="font-semibold text-xl">{{ $t("membersmodal.billing.billing") }}</h1>
            <p class="font-semibold mt-4">
              {{ $t("settings.paymentmethod") }}: {{ useMembers.store.billingHistory?.card_name }}
              {{ useMembers.store.billingHistory?.card_number?.slice(-8) }}
            </p>
            <p class="font-semibold">
              {{ $t("membersmodal.member.nextpay") }}:
              <strong>{{ formatFullDate(useMembers.store.billingHistory?.expiry_date) }}</strong>,
              {{ useMembers.store.billingHistory?.price }}
              UZS/<span class="uppercase">{{ $t("payment.month") }}</span>
            </p>
            <div v-if="useGroup.store.group_by_username.is_paid == 'pending' &&
        role_ac.includes(useGroup.store.group_by_username.type)" class="text-[16px] space-y-6">
              <h1>Your group has been archived.</h1>
              <ul class="list-disc ml-8">
                <li>Nobody can discover it, join, like, post, comment, or chat</li>
                <li class="_ceb">Your payouts are paused</li>
                <li class="_ceb">Your custom URL will be available for others to claim</li>
              </ul>
              <p>Reactivate your group to restore full functionality.</p>
              <button @click="usePayment.store.reactive = true" class="px-6 b_cbc _c07 r_8 md:text-center text-start">
                {{ $t("payment.reactive") }}
              </button>
            </div>
            <div v-else
              class="flex md:flex-row flex-col max-w-fit md:gap-[60px] gap-4 md:mt-7 mt-4 md:mb-10 mb-4 whitespace-nowrap">
              <button @click="useMembers.store.updatePayment = 'update'" class="border_cbc px-6 _c2a r_8 uppercase">
                {{ $t("membersmodal.billing.update") }}
              </button>
              <button @click="useMembers.store.updatePayment = 'manage'"
                class="md:px-3 _c2a r_8 md:text-center text-start">
                <!-- {{ $t("membersmodal.billing.invoice") }} -->
                Manage subscription
              </button>
            </div>
            <!-- <h1 class="font-semibold _C00 mb-2">Referrals</h1>
            <p class="md:mb-7 mb-4">
              If somebody creates a group from your group, we’ll automatically
              pay you 40% every month. This way Learnify becomes an income stream,
              not a cost. Earnings will go to this admin:
            </p>
            <div class="flex items-center gap-4">
              <img class="h-10 w-10 rounded-full object-cover" src="@/assets/image/user.svg" alt="" />
              <p class="text-[16px] font-semibold">{{ isLoading.user_update_checker.name }}
                {{ isLoading.user_update_checker.surname }}</p>
              <p class="_c2a">(Change)</p>
            </div>
            <h1 class="font-semibold _C00 mb-2 md:mt-7 mt-4">
              {{ isLoading.user_update_checker.name }}'s referral link
            </h1>
            <div class="flex gap-3">
              <input type="text" value="https://www.learnify.com/digital-marketer-3698/about" />
              <button class="b_cbc px-6 uppercase font-semibold r_8">
                copy
              </button>
            </div>
            <button class="border_cbc mt-5 px-6 _c2a r_8 uppercase">
              SEE YOUR REFERRALS
            </button> -->
          </section>
          <section v-else-if="useMembers.store.updatePayment == 'update'"
            class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="font-semibold text-xl">Update payment info</h1>
            <form v-if="usePayment.store.join_step == 1" @submit.prevent="usePayment.updatePaymentCard1">
              <label for="name" class="_ca1 mb-2 block mt-5">{{ $t('payment.cardnumber') }}</label>
              <div class="flex items-center justify-between max-w-fit">
                <input @input="usePayment.getCardType" v-model="usePayment.card.cardNumber"
                  class="w-[300px] placeholder-[#A1A1A1]" type="text" name="credit-number"
                  placeholder="0000 0000 0000 0000" required>
                <div class="flex items-center gap-2 -ml-[50px] pr-3">
                  <img v-if="usePayment.store.cardType.type == 'visa'" src="@/assets/svg/billing/electron.svg" alt="">
                  <img v-else-if="usePayment.store.cardType.type == 'maestro'" src="@/assets/svg/billing/maestro.svg"
                    alt="">
                  <img v-else-if="usePayment.store.cardType.type == 'mastercard'"
                    src="@/assets/svg/billing/mastercard.svg" alt="">
                  <img v-else-if="usePayment.store.cardType.type == 'uzcard'" src="@/assets/svg/billing/uzcard.svg"
                    alt="">
                  <img v-else-if="usePayment.store.cardType.type == 'humo'" src="@/assets/svg/billing/humo.svg" alt="">
                </div>
              </div>
              <div class="flex gap-5 mt-4">
                <div>
                  <label for="expdate" class="_ca1 mb-2 block">{{ $t('payment.expdate') }}</label>
                  <input @input="usePayment.prettyCardExpiryDate" v-model="usePayment.card.expiryDate" id="expdate"
                    class="w-[100px] placeholder-[#A1A1A1]" type="text" name="credit-expires" placeholder="MM/YY"
                    required>
                </div>
                <div v-if="usePayment.store.cardType.type == 'visa' || usePayment.store.cardType.type == 'mastercard'">
                  <label for="cvv" class="_ca1 mb-2 block">CVV</label>
                  <input id="cvv" @input="usePayment.prettyCardCvc" v-model="usePayment.card.cvc"
                    class="w-[100px] placeholder-[#A1A1A1]" type="number" name="credit-cvc" placeholder="123" required>
                </div>
              </div>
              <p class="text-[#e74c3c] mt-2">{{ usePayment.store.payment_error }}</p>
              <div class="mt-4">
                <button :class="usePayment.card.cardNumber && usePayment.card.expiryDate ? 'b_cbc _c07' : 'b_ce0 _ca1'"
                  v-loading="isLoading.isLoadingType('updatePaymentCard')" class="font-semibold px-6 r_8 uppercase">
                  {{ $t("edit") }}
                </button>
                <button type="button" @click="useMembers.store.updatePayment = 'payment'"
                  class="_ca1 font-semibold px-6 r_8 uppercase">
                  {{ $t("cancel") }}
                </button>
              </div>
            </form>
            <form v-else-if="usePayment.store.join_step == 2" @submit.prevent="usePayment.updatePaymentCard2">
              <p class="mt-4"> {{ $t('payment.sendto') }} {{ usePayment.store.payment_phone }}</p>
              <div class="grid grid-cols-2 gap-5 mt-2">
                <div>
                  <label for="name" class="_ca1 mb-2 block"> {{ $t('payment.code') }}</label>
                  <input v-model="usePayment.store.code" class="w-full placeholder-[#A1A1A1]" type="text"
                    name="credit-expires" placeholder="000000" required>
                </div>
              </div>
              <p class="text-[#e74c3c] mt-2">{{ usePayment.store.payment_error }}</p>
              <div class="flex justify-end mt-4">
                <button type="button" @click="useSettings.store.addCartModal = false"
                  class="_ca1 font-semibold px-6 r_8 uppercase"> {{ $t('cancel') }}</button>
                <button v-loading="isLoading.isLoadingType('updatePaymentCard')"
                  :class="usePayment.store.code ? 'b_cbc _c07' : '_ca1 b_ce0'"
                  class=" font-semibold px-6 r_8 uppercase">
                  {{ $t('payment.add') }}</button>
              </div>
            </form>
          </section>
          <section v-else-if="useMembers.store.updatePayment == 'manage'"
            class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="font-semibold text-xl">Manage subscription</h1>
            <div>
              <p class="font-semibold mt-4">
                {{ $t("settings.paymentmethod") }}: {{ useMembers.store.billingHistory?.card_name }}
                {{ useMembers.store.billingHistory?.card_number?.slice(-8) }}
              </p>
              <p class="font-semibold">
                {{ $t("membersmodal.member.nextpay") }}:
                <strong>{{ formatFullDate(useMembers.store.billingHistory?.expiry_date) }}</strong>,
                {{ useMembers.store.billingHistory?.price }}
                UZS/<span class="uppercase">{{ $t("payment.month") }}</span>
              </p>
              <div class="flex flex-col gap- max-w-fit items-start">
                <button @click="useMembers.store.updatePayment = 'update'" class="_c2a r_8 md:text-center text-start">
                  {{ $t("membersmodal.billing.update") }}
                </button>
                <button @click="useMembers.store.updatePayment = 'history'" class="_c2a r_8 md:text-center text-start">
                  View payment history
                </button>
                <button @click="useMembers.store.updatePayment = 'invoice'" class="_c2a r_8 md:text-center text-start">
                  Customize invoices
                </button>
                <button @click="useMembers.store.updatePayment = 'manage'" class="_c2a r_8 md:text-center text-start">
                  Cancel subscription
                </button>
              </div>
            </div>
          </section>
          <section v-else-if="useMembers.store.updatePayment == 'invoice'"
            class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="font-semibold text-xl">Manage subscription</h1>
            <div>
              <p class="font-medium mt-4">
                Custom fields added here will be reflected on all past and future invoices.
              </p>
              <form @submit.prevent="useMembers.updateBilling"
                class="flex flex-col gap- max-w-fit items-start space-y-4 mt-6">
                <FloatingInput id="company_name" class="w-full" type="text"
                  v-model="useMembers.billingUpdate.company_name" label="Firma nomi" required />
                <FloatingInput id="inn" class="w-full" type="number" v-model="useMembers.billingUpdate.inn" label="INN"
                  required />
                <FloatingInput id="account_number" class="w-full" type="number"
                  v-model="useMembers.billingUpdate.account_number" label="Hisob raqam" maxlength="5" pattern="\d{5}"
                  required />
                <FloatingInput id="mfo" class="w-full" type="number" v-model="useMembers.billingUpdate.mfo" label="MFO"
                  maxlength="5" pattern="\d{5}" required />
                <!-- <el-input v-model="store.user" @input="handleInput" class="w-full"
              :autosize="{ minRows: 2, maxRows: 20 }" type="textarea" :placeholder="Mfo" /> -->
                <div class="mt-4">
                  <button v-loading="isLoading.isLoadingType('updateBilling')"
                    :class="useMembers.billingUpdate.company_name && useMembers.billingUpdate.inn && useMembers.billingUpdate.account_number && useMembers.billingUpdate.mfo ? 'b_cbc _c07' : 'b_ce0 _ca1'"
                    class="font-semibold px-6 r_8 uppercase">
                    UPDATE
                  </button>
                  <button @click="() => { useMembers.store.updatePayment = 'payment'; useMembers.getBilling() }"
                    type="button" class="_ca1 font-semibold px-6 r_8 uppercase">
                    cancel
                  </button>
                </div>
              </form>
            </div>
          </section>
          <section v-else-if="useMembers.store.updatePayment == 'history'"
            v-loading="isLoading.isLoadingType('getBillingHistory')"
            class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="font-semibold text-xl mb-6">Payment history</h1>
            <div>
              <div class="space-y-6 r_8">
                <div v-if="!useMembers.store.billingHistory?.card_number"
                  class="full_flex flex-col gap-4 _c07 h-[180px] r_8">
                  <img src="@/assets/svg/settings/nocard.svg" alt="">
                  {{ $t("settings.methods.nodata") }}
                </div>
                <div v-else>
                  <strong>{{ useMembers.store.billingHistory?.card_name }} {{
        useMembers.store.billingHistory?.card_number?.slice(-8) }}</strong>
                  <div class="flex gap-4">
                    <p>Expires: {{ useMembers.store.billingHistory?.expiry_date }}</p>
                    {{ useMembers.store.billingHistory }}
                    <!-- <p class="_c2a">1 membership</p> -->
                  </div>
                  <!-- <li>
                                    <strong class="_c2a">{{formatFullDate(i.date, 'string')}}</strong>
                                    - {{i.price}} UZS <span v-if="$t('nav.uz') == 'en' || $t('nav.uz') == 'ru'">{{$t("settings.for")}}</span> {{i.group_name}} <span v-if="$t('nav.uz') == 'uz'">{{$t("settings.for")}}</span> {{$t("payment.membership")}}
                                </li> -->
                </div>
              </div>
            </div>
          </section>
        </div>
        <div v-if="useMembers.store.manageUserRole" class="mainSlider h-[calc(100vh_-120px)] duration-700">
          <section
            class="h-[calc(100vh_-120px)] overflow-hidden space-y-4 overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <div v-loading="isLoading.isLoadingType('updateRole')" class="text-[16px] flex gap-1">
              <span class="font-semibold">Role:</span>
              <div
                v-if="useMembers.store.member_data.is_banned == 0 && useMembers.store.member_data.status == 'churned'">
                Nonmember</div>
              <div v-else>
                {{ useMembers.store.member_type }}
                <el-dropdown placement="bottom-end" class="dropdown">
                  <button class="_c2a cursor-pointer hover:underline h-5">
                    (change)
                  </button>
                  <template #dropdown>
                    <el-dropdown-menu class="community_dropdown min-w-[200px] dropdown_shadow">
                      <el-dropdown-item @click="useMembers.updateUserRole('Member')">Member</el-dropdown-item>
                      <el-dropdown-item @click="useMembers.updateUserRole('Admin')">Admin</el-dropdown-item>
                      <el-dropdown-item @click="useMembers.updateUserRole('Moderator')">Moderator</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
            <div v-if="useMembers.store.member_type == 'Admin'" v-loading="isLoading.isLoadingType('updateRole')"
              class="text-[16px]">
              <span class="font-semibold">Billing access:</span>
              No
              <el-dropdown placement="bottom-end" class="dropdown">
                <button class="_c2a cursor-pointer hover:underline h-5">
                  (change)
                </button>
                <template #dropdown>
                  <el-dropdown-menu class="community_dropdown min-w-[200px] dropdown_shadow">
                    <el-dropdown-item @click="useMembers.updateUserRole('Yes')">Yes</el-dropdown-item>
                    <el-dropdown-item @click="useMembers.updateUserRole('No')">No</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div
              v-else-if="useMembers.store.member_type == 'Member' && (useMembers.store.member_data.is_banned != 1 && useMembers.store.member_data.status != 'churned')">
              <p v-if="useMembers.store.member_data.is_banned != 1" @click="() => {
        useMembers.store.banchurned.type = 'churned';
        useMembers.store.banchurned.status = true;
        useMembers.store.user_id = useMembers.store.member_data.user.id;
      }
        " class="md:mt-5 mt-4 hover:underline _ceb font-medium cursor-pointer">
                Remove from group
              </p>
              <p v-if="useMembers.store.member_data.is_banned != 1" @click="() => {
        useMembers.store.banchurned.type = 'ban';
        useMembers.store.banchurned.status = true;
      }
        " class="md:mt-5 mt-4 hover:underline _ceb font-medium cursor-pointer">
                Ban from group
              </p>
              <p v-else @click="() => {
        useMembers.store.banchurned.type = 'unban';
        useMembers.store.banchurned.status = true;
      }
        " class="md:mt-5 mt-4 hover:underline _ceb font-medium cursor-pointer">
                Unban from group
              </p>
            </div>
          </section>
          <section
            class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="md:text-2xl text-lg pb-2 font-semibold _c07">
              Has access to:
            </h1>
            <div>
              <p><strong>course</strong> <span class="_c2a">(0% progress)</span></p>
              <p class="_ca1 mt-1">Open: All members have access</p>
            </div>
            <div class="mt-4">
              <label class="_ca1 text-xs" for="access">Give access to:</label>
              <el-select class="block w-full mt-2" v-model="usePost.create_category.permission" placeholder="Select">
                <el-option v-for="item in post_category_access" :key="item.value" :label="item.label"
                  :value="item.value" :disabled="item.disabled">
                  <div class="flex items-center gap-2">
                    {{ item.label }}
                    <img v-if="usePost.create_category.permission == item.value" src="@/assets/svg/checked.svg"
                      alt="" />
                  </div>
                </el-option>
              </el-select>
            </div>
          </section>
        </div>
        <div v-else class="mainSlider h-[calc(100vh_-120px)] duration-700">
          <section v-if="useGroup.store.membershipStep == 'cancellation'"
            class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="_c00 font-semibold text-xl">{{ $t("membersmodal.member.cancel") }}</h1>
            <div class="my-6 space-y-2" v-if="!isLoading.store.history.isNotEmpty">
              <p>
                {{ $t("membersmodal.member.calcelinfo[0]") }}
              </p>
              <ul class="ml-4">
                <li>
                  • {{ $t("membersmodal.member.calcelinfo[1]") }}
                </li>
                <li>
                  • {{ $t("membersmodal.member.calcelinfo[2]") }}
                </li>
              </ul>
              <p class="mt-4">
                {{ $t("membersmodal.member.calcelinfo[3]") }}
              </p>
              <p class="ml-4">
                {{ $t("membersmodal.member.calcelinfo[4]") }}
              </p>
              <button @click="useGroup.store.membershipStep = 'membership'"
                class="uppercase font-semibold border_cbc px-3 r_8 _c2a md:ml-0 ml-[56px]">
                {{ $t("membersmodal.member.keepmembership") }}
              </button>
              <button v-loading="isLoading.isLoadingType('leaveGroup')" @click="useGroup.leaveGroup"
                class="block hover:!text-red-600 _c2a h-8 r_8 md:text-center text-start">
                {{ $t("membersmodal.member.finish") }}
              </button>
            </div>
          </section>
          <section v-else-if="useGroup.store.membershipStep == 'cancelled'"
            class="h-[calc(100vh_-120px)] animate-right overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="_c00 font-semibold text-xl">{{ $t("membersmodal.member.cancelled") }}</h1>
            <div class="my-6 space-y-2" v-if="!isLoading.store.history.isNotEmpty">
              <p>
                {{ $t("membersmodal.member.cancelledinfo[0]") }}
              </p>
              <ul class="ml-4">
                <li>
                  • {{ $t("membersmodal.member.cancelledinfo[1]") }}
                </li>
                <li>
                  • {{ $t("membersmodal.member.cancelledinfo[2]") }}
                </li>
              </ul>
              <button @click="$router.push('/')"
                class="uppercase font-semibold border_cbc px-3 r_8 _c2a md:ml-0 ml-[56px]">
                {{ $t("about.gotit") }}
              </button>
            </div>
          </section>
          <section v-else
            class="h-[calc(100vh_-120px)] animate-left overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="_c00 font-semibold text-xl capitalize">{{ $t("payment.membership") }}</h1>
            <div class="my-6 space-y-2" v-if="!isLoading.store.history.isNotEmpty">
              <p class="font-medium">
                {{ $t("membersmodal.member.youmember") }}: {{ useGroup.store.group_by_username.name }} -
                {{ $t("membersmodal.member.since") }}
                <strong>{{ formatFullDate(isLoading.store.history?.date_of_join) }}</strong>.
              </p>
              <p v-if="isLoading.store.history?.payment_type != 'free'" class="font-medium">
                {{ $t("membersmodal.member.nextpay") }}:
                <strong>{{ formatFullDate(isLoading.store.history?.expired_date) }}</strong>,
                {{ isLoading.store.history?.price }}
                UZS/{{ $t("payment.month") }}
              </p>
              <p v-if="isLoading.store.history?.payment_type != 'free'" class="font-medium">
                {{ $t("settings.paymentmethod") }}: {{ isLoading.store.history?.card_name }}
                {{ isLoading.store.history?.card_number?.slice(-8) }}
              </p>
              <!-- <button @click="openPaymentHistory('joined_groups')" class="block _c2a h-8 r_8 md:text-center text-start">
                Manage membership
              </button> -->
            </div>
            <div v-else class="full_flex flex-col gap-4 _c07 h-[180px] r_8">
              <img src="@/assets/svg/settings/nocard.svg" alt="">
              {{ $t("settings.history.nodata") }}
            </div>
            <button @click="useGroup.store.membershipStep = 'cancellation'"
              class="uppercase font-semibold border_cbc px-3 r_8 _c2a md:ml-0 ml-[56px]">
              {{ $t("membersmodal.member.leave") }}
            </button>
          </section>
          <!-- <section
            class="space-y-6 h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <div v-for="i in notifications_membership">
              <label class="flex gap-1 _c07 text-xs" for="follow_email2"><strong>{{ i.title[0] }}</strong
                  class="_ca1">{{
        i.title[1] }}</label>
              <el-select id="follow_email2" class="block w-full mt-2" placeholder="Select">
                <el-option v-for="item in i.select" :key="item" :label="item" :value="item">
                  <div class="flex items-center gap-2">
                    {{ item }}
                    <img v-if="usePost.create_category.permission == item" src="@/assets/svg/checked.svg" alt="" />
                  </div>
                </el-option>
              </el-select>
            </div>
          </section> -->
          <!-- <section class="h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto text-sm _c07 md:p-5 p-3 w-full">
            <h1 class="text-xl font-semibold">Chat</h1>
            <p>
              {{$t("membersmodal.member.choose")}}
            </p>
            <div class="space-y-10 mt-6">
              <div class="flex items-center justify-between h-10">
                <div class="full_flex gap-4">
                  <div class="flex items-center justify-between h-10">
                    <div class="full_flex items-start gap-4">
                      <img class="!w-10 !h-10 min-w-[40px] object-cover r_8 !overflow-hidden"
                        v-if="useGroup.store.group_by_username.icon" :src="useGroup.store.group_by_username.icon"
                        alt="" />
                      <div v-else class="full_flex uppercase w-10 h-10 min-w-[40px] r_8"
                        :style="`background: ${useGroup.store.group_by_username.color}`">
                        {{ useGroup.store.group_by_username.initials }}
                      </div>
                    </div>
                  </div>
                  <h1 class="font-semibold">{{ useGroup.store.group_by_username.name }}</h1>
                </div>
                <el-select id="follow_email" class="block max-w-20 mt-2" placeholder="Select">
                  <el-option v-for="item in group_notification" :key="item.value" :label="item.value"
                    :value="item.value" :disabled="item.disabled">
                    <div class="flex items-center gap-2">
                      {{ item.label }}
                      <img v-if="usePost.create_category.permission == item.value" src="@/assets/svg/checked.svg"
                        alt="" />
                    </div>
                  </el-option>
                </el-select>
              </div>
            </div>
          </section> -->
          <section
            class="md:text-[16px] text-sm h-[calc(100vh_-120px)] overflow-hidden overflow-y-auto _c07 md:p-5 p-3 w-full">
            <h1 class="text-xl font-semibold _c00">Invite</h1>
            <p class="my-5">
              Share a link to {{ useGroup.store.group_by_username.name }} with your friends.
            </p>
            <div class="flex gap-3">
              <p class="flex items-center w-full truncate h-10 rounded-[4px] px-3 border_ce0 _c2a font-medium text-sm">
                <span class="truncate">{{ store.invite_link }}
                </span>
              </p>
              <button @click="isLoading.copyLink(store.invite_link, $t('messages.copied'))"
                class="b_cbc px-6 uppercase font-semibold r_8">
                copy
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Delete -->
    <el-dialog v-model="isLoading.membersModal.delete" width="400" align-center
      class="!rounded-xl overflow-hidden px-6 py-7">
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">
          {{ store.deleteType.title }}
        </h1>
        <p class="text-lg">{{ store.deleteType.description }}</p>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button @click="isLoading.membersModal.delete = false" class="uppercase h-10 px-6 rounded-lg _ca1">
            cancel
          </button>
          <button v-if="isLoading.membersModal.modalType == 'post'" @click="usePost.deletePostCategory"
            v-loading="isLoading.isLoadingType('deletePostCategory')" class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            delete
          </button>
          <button v-else-if="isLoading.membersModal.modalType == 'link'" @click="useLink.deleteLink"
            v-loading="isLoading.isLoadingType('deleteLink')" class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            delete
          </button>
          <!-- <button
            v-else-if="isLoading.membersModal.modalType == 'changeVote'"
            @click="usePost.setUserVote"
            v-loading="isLoading.isLoadingType('setUserVote')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            confirm
          </button> -->
        </div>
      </div>
    </el-dialog>

    <!-- Ban or churned member from group -->
    <el-dialog v-model="useMembers.store.banchurned.status" width="400" align-center
      class="!rounded-xl overflow-hidden px-6 py-7">
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">
          <span v-if="useMembers.store.banchurned.type == 'churned'">Remove from group?</span><span v-else>
            <span v-if="useMembers.store.member_data">Ban from group?</span>
          </span>
        </h1>
        <p class="text-lg">
          <span v-if="useMembers.store.banchurned.type == 'churned'">
            Are you sure you want to remove
            <span class="font-semibold">{{ useMembers.store.member_data.user.name }}
              {{ useMembers.store.member_data.user.surname }}</span>
            from
            <span class="font-semibold">{{
        useGroup.store.group_by_username?.name
      }}</span>?
          </span>
          <span v-else>
            You're banning
            <span class="font-semibold">{{ useMembers.store.member_data.user.name }}
              {{ useMembers.store.member_data.user.surname }}</span>
            from
            <span class="font-semibold">{{
        useGroup.store.group_by_username?.name
      }}</span>. <br />
            Delete recent activity? <br />
            Delete
            <span class="font-semibold">{{ useMembers.store.member_data.user.name }}'s</span>
            recent posts and comments from their profile here before banning
            them. It's easier this way.
          </span>
        </p>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button @click="useMembers.store.banchurned.status = false" class="uppercase h-10 px-6 rounded-lg _ca1">
            cancel
          </button>
          <button v-if="useMembers.store.banchurned.type == 'churned'" @click="() => {
        useMembers.store.status = 'churned';
        useMembers.store.user_id = useMembers.store.member_data.user.id;
        useMembers.setMemberJoinType();
      }
        " v-loading="isLoading.isLoadingType('groupMembesRequest')" class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            remove
          </button>
          <button v-else-if="useMembers.store.banchurned.type == 'ban'" @click="() => {
        useMembers.store.status = 'banned';
        useMembers.store.user_id = useMembers.store.member_data.user.id;
        useMembers.setMemberJoinType();
      }" v-loading="isLoading.isLoadingType('groupMembesRequest')" class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            ban
          </button>
          <button v-else-if="useMembers.store.banchurned.type == 'unban'" @click="() => {
        useMembers.store.status = 'unbanned';
        useMembers.store.user_id = useMembers.store.member_data.user.id;
        useMembers.setMemberJoinType();
      }" v-loading="isLoading.isLoadingType('groupMembesRequest')" class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">
            unban
          </button>
          <!-- <button
            v-else-if="isLoading.membersModal.modalType == 'changeVote'"
            @click="usePost.setUserVote"
            v-loading="isLoading.isLoadingType('setUserVote')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            confirm
          </button> -->
        </div>
      </div>
    </el-dialog>

    <!-- Change category -->
    <el-dialog v-model="isLoading.membersModal.change_category" width="400" align-center
      class="!rounded-xl overflow-hidden px-6 py-7">
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">
          Recategorize {{ usePost.store.deleteCategoryData.post_count }} posts
        </h1>
        <p class="text-sm !mt-2">
          The category "{{ usePost.store.deleteCategoryData.name }}" contains
          {{ usePost.store.deleteCategoryData.post_count }} posts. You must
          recategorize all posts before deleting a category. You can
          recategorize the posts manually, or, you can bulk migrate them to
          another category.
        </p>
        <p class="text-sm _ceb !mt-2 font-semibold">
          Bulk migrate {{ usePost.store.deleteCategoryData.post_count }} posts
          from "{{ usePost.store.deleteCategoryData.name }}" to:
        </p>
        <el-select class="block w-full mt-2" v-model="usePost.create.category_id" @change="handleChangeCategory"
          placeholder="Select">
          <el-option v-for="item in usePost.store.categories" :key="item.name" :label="item.name" :value="item.id"
            v-show="item.id != usePost.store.category_id">
            <div class="flex items-center gap-2">
              {{ item.name }}
              <img v-if="usePost.store.category_id.name == item.name" src="@/assets/svg/checked.svg" alt="" />
            </div>
          </el-option>
        </el-select>
        <div class="flex gap-2">
          <input v-model="usePost.store.isCheckConfirm" id="confirm_change" type="checkbox" class="!w-3 !h-3 !p-2.5" />
          <label for="confirm_change" class="text-sm">
            I confirm that I want to bulk migrate
            {{ usePost.store.deleteCategoryData.post_count }} posts from “{{
        usePost.store.deleteCategoryData.name
      }}” to the above category, and then delete “{{
          usePost.store.deleteCategoryData.name
        }}”. I understand this action is permanent.
          </label>
        </div>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button @click="isLoading.membersModal.change_category = false" class="uppercase h-10 px-6 rounded-lg _ca1">
            cancel
          </button>
          <button @click="usePost.deletePostCategory" v-loading="isLoading.isLoadingType('deletePostCategory')"
            class="uppercase h-10 px-6 rounded-lg" :class="usePost.store.isCheckConfirm && usePost.create.category_id
        ? 'b_cbc _c07'
        : 'b_ce0 _ca1'
        ">
            PROCEED
          </button>
        </div>
      </div>
    </el-dialog>

    <!-- join to group -->
    <el-dialog v-model="useMembers.store.add_price" width="400" align-center class="bg-opacity-50 !rounded-lg">
      <h1 class="text-black text-semibold text-lg">
        {{ $t("membersmodal.addprice") }}
      </h1>
      <form @submit.prevent="useMembers.addPrice">
        <div class="mt-4">
          <div class="flex relative">
            <input v-model="useMembers.store.price" class="w-full !pr-[50px] placeholder-[#A1A1A1]" type="number"
              placeholder="000000" required />
            <p class="full_flex absolute right-4 uppercase h-[40px]">
              /{{ $t("payment.month") }}
            </p>
          </div>
        </div>
        <p v-if="useMembers.store.errors?.length" class="text-[#e74c3c] mt-2">{{ useMembers.store.errors }}</p>
        <div class="flex justify-end mt-4">
          <button type="button" @click="useMembers.store.add_price = false"
            class="_ca1 font-semibold px-6 r_8 uppercase">
            {{ $t('cancel') }}
          </button>
          <button :class="useMembers.store.price ? 'b_cbc _c07' : 'b_ce0 _ca1'"
            v-loading="isLoading.isLoadingType('addPrice')" class="font-semibold px-6 r_8 uppercase">
            {{ $t('add')}}
          </button>
        </div>
      </form>
    </el-dialog>
  </main>
</template>

<script setup>
import { role_ac, members_sidebar, membership_settings } from "@/composables";
import {
  useMemberStore,
  useLoadingStore,
  usePostStore,
  useLinkStore,
  useGroupStore,
  useSettingsStore,
  useGroupSettingsStore,
  usePaymentStore,
} from "@/store";
import Color from "color";
import { useFormatDate } from "@/composables";
const { formatDate, formatFullDate } = useFormatDate();
const useMembers = useMemberStore();
const useGroup = useGroupStore();
const useLink = useLinkStore();
const usePost = usePostStore();
const usePayment = usePaymentStore();
const useGroupSet = useGroupSettingsStore();
const useSettings = useSettingsStore();
const isLoading = useLoadingStore();
const router = useRouter();

useMembers.general.url = isLoading.store.front_url + '/' + router.currentRoute.value.params.community + '/about'
onBeforeMount(() => {
  usePost.get_categories();
  useLink.getLinks();
  useSettings.getPaymentHistory();
});

const colors_list = [
  "#009e5d",
  "#ff6900",
  "#0693e3",
  "#e4a511",
  "#df1a1a",
  "#bb6ee7",
  "#21b8a6",
  "#e9597f",
  "#767676",
  "#956228",
];

const store = reactive({
  slideStep: 0,
  membershipStep: "membership",
  editGamification: false,
  addLink: false,
  updatePayment: "payment",
  is_open: false,
  is_open_name: "",
  deleteType: "",
  invite_link: "",
});

const general = reactive({
  filetype: "",
});

const deletePostCategory = {
  title: "Delete category?",
  description: "Are you sure you want to delete this category?",
};

const deleteLink = {
  title: "Delete link?",
  description: "Are you sure you want to delete this link?",
};

const access_list = [
  {
    label: "private",
    value: "private",
  },
  {
    label: "public",
    value: "public",
  },
];

const post_category_access = [
  {
    label: "all",
    value: true,
  },
  {
    label: "only",
    value: false,
  },
];

const group_notification = [
  {
    label: "Chat on",
    value: "ON",
  },
  {
    label: "Chat off",
    value: "OFF",
  },
];

const notifications_membership = [
  {
    title: ["Digest email", "summary of popular posts"],
    select: ["Daily", "Weekly (default)", "Every 14-Days", "Monthly", "Never"],
  },
  {
    title: ["Notifications email", "summary of unread notifications"],
    select: [
      "5-mins",
      "Hourly (default)",
      "3-hours",
      "6-hours",
      "12-hours",
      "Daily",
      "Every 2nd day",
      "Weekly",
      "Never",
    ],
  },
  {
    title: ["Likes", "when somebody likes my posts or comments"],
    select: ["Notify me (default)", "Don't notify me"],
  },
  {
    title: ["Admin announcements", "get email broadcasts sent by admins"],
    select: ["Yes (default)", "No"],
  },
  {
    title: [
      "Event reminders",
      "notify me of calendar events the day before they happen",
    ],
    select: ["Yes (default)", "No"],
  },
];

store.invite_link = isLoading.store.front_url + '/' + router.currentRoute.value.params.community + '/about'

function openAddPrice() {
  if (['pending'].includes(useGroup.store.group_by_username.is_paid) &&
    role_ac.includes(useGroup.store.group_by_username.type)) {
    useMembers.store.is_paid = true;
  } else {
    useMembers.store.add_price = true;
  }
}

function handleGeneralFile(e, type) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  if (type == "icon") {
    useMembers.general.icon = {
      file,
      url,
    };
  } else if (type == "cover") {
    useMembers.general.image = {
      file,
      url,
    };
  }
}

function getLink(course) {
  const username = router.currentRoute.value.params.community;
  return `/${username}/classroom/${course.slug}`;
}

function expandShortHex(e) {
  const hex = e.target.value;
  const color = Color(hex);
}

function editLink(data) {
  useLink.store.link_id = data.id;
  for (let i in useLink.create) {
    useLink.create[i] = data[i];
  }
  useLink.modal.create = true;
  useLink.modal.edit = true;
}

function deleteFunc(type, data) {
  if (usePost.store.categories.length == 1) {
    return;
  }
  isLoading.membersModal.modalType = type;
  if (type == "post") {
    usePost.store.category_id = data.id;
    if (data.post_count == 0) {
      store.deleteType = deletePostCategory;
      isLoading.membersModal.delete = true;
    } else {
      usePost.store.deleteCategoryData = data;
      isLoading.membersModal.change_category = true;
    }
  } else if (type == "link") {
    useLink.store.link_id = data.id;
    store.deleteType = deleteLink;
    isLoading.membersModal.delete = true;
  }
}

function editLevel(data, index) {
  useMembers.store.levelId = data.id;
  useMembers.level.name = `Level ${index + 1}`;
  useMembers.level.custom_name = data.level;
  useMembers.store.editGamification = true;
}

function openData(index, name) {
  useMembers.store.is_paid = false;
  if (name == 'Payouts') {
    useGroupSet.getPayouts();
  } else if (name == 'Subscriptions') {
    useMembers.getPrices();
  } else if (name == 'Billing & referrals') {
    useMembers.getBilling();
    useMembers.getBillingHistory();
  } else if (name == '') {
    useSettings.getPaymentHistory();
  }
  useMembers.store.updatePayment = 'payment'
  isLoading.store.slideStep = index;
  store.is_open_name = name;
  store.is_open = true;
}

function handleAddPostCategory() {
  usePost.modal.create = false;
  usePost.createPostCategory();
}

function handleInput(type) {
  if (type == "input") {
    usePost.create_category.name = usePost.create_category.name?.slice(0, 30);
  } else if (type == "initials") {
    useMembers.general.initials = useMembers.general.initials?.slice(0, 2)?.toUpperCase();
  } else {
    usePost.create_category.description =
      usePost.create_category.description?.slice(0, 150);
  }
}

// post categories
function editPostCategory(data) {
  usePost.store.category_id = data.id;
  for (let i in usePost.create_category) {
    usePost.create_category[i] = data[i];
  }
  usePost.create_category.permission = data.permission ? true : false;
  usePost.modal.create = true;
  usePost.modal.edit = true;
}

watch(
  () => isLoading.store.slideStep,
  () => {
    try {
      if (isLoading.store.slideStep == 8) {
        useMembers.getLevels();
      }
      const slide = document.querySelector(".mainSlider");
      slide.style.transform = `translateY(-${isLoading.store.slideStep * 100}%)`;
    } catch (error) {
      console.log(error);
    }
  }
);

watch(() => useMembers.store.add_price, () => {
  if (!useMembers.store.add_price) {
    useMembers.store.errors = "";
    useMembers.store.price = "";
  }
})

watch(() => useMembers.store.updatePayment, () => {
  if (useMembers.store.updatePayment == 'history') {
    useMembers.getBillingHistory();
  }
})

watch(() => isLoading.store.inviteModal, () => {
  if (!isLoading.store.inviteModal) {
    isLoading.store.slideStep = 0;
    store.is_open_name = "";
    store.is_open = false;
    useMembers.getLevels();
  }
  if (useGroup.store.is_cancelled) {
    useGroup.store.is_cancelled = false;
    router.push('/');
  }
})

onBeforeUnmount(() => {
  usePayment.store.join_step = 1;
})

onBeforeMount(() => {
  useMembers.getLevels();
})
</script>

<style lang="scss" scoped></style>
