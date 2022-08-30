<template>
    <el-tabs v-model="activeTabKey">
        <el-tab-pane v-for="item in tabs" :key="item.roomId" :label="setTitle(item.title)" :name="item.roomId">
            <Hall v-if="item.type === 'hall'" :roomId="item.roomId"/>
            <Room v-else-if="item.type === 'room'" :roomId="item.roomId"/>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">

import Hall from "@/views/game/Hall.vue"
import Room from "@/views/game/Room.vue"
import { computed, watch } from "vue";
import { useStore } from '@/store';
import i18n from "@/locals";

const store = useStore();
const { t, locale } = i18n.global;

function setTitle(title: string) {
    if (locale === 'zh') {
        title = title.replace(/Room/g,"房间")
        title = title.replace(/Hall/g,"大厅")
    }
    return title
}

const tabs = computed(() => store.getters.tabs)
const activeTabKey = computed(() => store.getters.activeTabKey)

watch(activeTabKey, (newValue, oldValue) => {
    store.dispatch('changeTab', newValue)
})

</script>

<style scoped>

</style>