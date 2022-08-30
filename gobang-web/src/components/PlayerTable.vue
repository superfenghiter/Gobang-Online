<template>
    <div class="container">
        <div class="header">
            <span class="title">{{title}}</span>
        </div>
        <div class="scrollbar">
            <el-table :data="players" :show-header="false" size="mini">
                <el-table-column prop="name"/>
                <el-table-column align="right">
                    <template #default="scope">
                        {{$t('status.' + scope.row.status)}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">

import { getPlayers } from "@/websocket/send-api";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "@/store";
import i18n from "@/locals";
import { Player, PlayerTable } from '@/types/store'

const store = useStore();
const { t } = i18n.global;

let players = ref<Player[]>([]);
const props = defineProps<{
    roomId: string
}>();

const playerTable = computed<PlayerTable>(() => {
    return store.getters.playerTable;
});

const title = computed(() => {
    if (props.roomId === 'hall') {
        return t('playerTable.playerList')
    } else {
        return t('playerTable.spectatorList')
    }
});

watch(playerTable, (newValue, oldValue) => {
    if (newValue.roomId === props.roomId) {
        players.value = newValue.players
    }
});

onMounted(() => {
    getPlayers();
});

</script>

<style scoped>
    .scrollbar {
        height: calc(33vh);
        min-height: 180px;
    }
    .header {
        border-bottom: 1px solid lightgrey;
        padding: 2% 0 2% 5%;
    }
    .title {
        padding-top: 100px;
    }
</style>