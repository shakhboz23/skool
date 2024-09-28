<template>
    <nav class="md:block hidden">
        <div class="pinned_groups space-y-4 mt-[104px] overflow-hidden overflow-y-auto max-h-[calc(100vh_-_110px)]">
            <div class="flex gap-2 cursor-pointer" v-for="i in useGroup.store.mygroups" v-show="i.pinned == 1"
                @click="$router.push(`/${i.username}`)">
                <p :class="$router.currentRoute.value.params.community == i.username ? 'b_c2a' : ''"
                    class="h-10 w-1 rounded-full"></p>
                <div class="flex items-center justify-between h-10">
                    <div class="full_flex items-start gap-4">
                        <img class="!w-10 !h-10 min-w-[40px] object-cover r_8 !overflow-hidden" v-if="i.icon"
                            :src="i.icon" alt="" />
                        <div v-else class="full_flex uppercase w-10 h-10 min-w-[40px] r_8"
                            :style="`background: ${i.color}`">
                            {{ i.initials }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useGroupStore } from "@/store";
const useGroup = useGroupStore();
</script>

<style lang="scss" scoped></style>
