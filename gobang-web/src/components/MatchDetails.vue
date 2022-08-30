<template>
    <div class="container">
        <div class="header">
            <span class="title">{{$t('matchDetails.matchDetails')}}</span>
        </div>
        <div class="scrollbar">
            <div class="role">
                {{host.name}}
                <el-button style="margin-left: 10%" size="medium" v-if="readyBtnShow(host)" @click="onReady">{{$t('matchDetails.ready')}}</el-button>
                <span style="margin-left: 10%" v-else-if="host.ready===false">{{$t('matchDetails.unready')}}</span>
                <span style="margin-left: 10%" v-else-if="host.ready===true">{{$t('matchDetails.already')}}</span>
            </div>
            <el-form>
                <el-form-item :label="$t('color.color')">
                    <div :class="getChessClass(host.color)"/>
                </el-form-item>
                <el-form-item label="role">{{$t('role.host')}}</el-form-item>
            </el-form>
            <el-divider/>
            <div class="role">
                {{challenger.name}}
                <el-button style="margin-left: 10%" size="medium" v-if="readyBtnShow(challenger)" @click="onReady">{{$t('matchDetails.ready')}}</el-button>
                <span style="margin-left: 10%" v-else-if="challenger.ready===false">{{$t('matchDetails.unready')}}</span>
                <span style="margin-left: 10%" v-else-if="challenger.ready===true">{{$t('matchDetails.already')}}</span>
            </div>
            <el-form>
                <el-form-item :label="$t('color.color')">
                    <div :class="getChessClass(challenger.color)"/>
                </el-form-item>
                <el-form-item label="role">{{$t('role.challenger')}}</el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">

import color from "@/constants/color";
import {setPlayerStatus, setReady} from "../websocket/send-api";
import { useStore } from "@/store";
import { Player } from "@/types/store";
import { computed, watch } from "vue";

const store = useStore();

const props = defineProps<{
    roomId: string
}>();

var host: Player;
var challenger: Player;

const matchDetails = computed(() => store.getters.matchDetails);
const playerStatus = computed(() => store.getters.player.status);
const started = computed(() => host.ready == challenger.ready);

watch(matchDetails, (newValue, oldValue) => {
    if (newValue.roomId === props.roomId) {
        host = newValue.host
        challenger = newValue.challenger
    }
})

watch(playerStatus, (newValue, oldValue) => {
    if (newValue !== "chessing" && started && isPlayer()) {
        setPlayerStatus("chessing")
    } else if (newValue === "leisure" && !isPlayer()) {
        setPlayerStatus("spectating")
    }
})

watch(started, (newValue, oldValue) => {
    if (isPlayer()) {
        if (newValue) {
            setPlayerStatus("chessing")
        } else {
            setPlayerStatus("leisure")
        }
    }
})

function getChessClass(playerColor: number) {
    if (playerColor === color.black) {
        return 'black'
    } else if (playerColor === color.white) {
        return 'white'
    }
    return ''
}

function readyBtnShow(playerDetails: {id: string, ready: boolean}) {
    return playerDetails.id === store.getters.player.id && playerDetails.ready === false
}

function onReady() {
    setReady(props.roomId, true)
}

function isPlayer() {
    let id = store.getters.player.id
    return id === host.id || id === challenger.id
}

</script>

<style scoped>
    .header {
        border-bottom: 1px solid lightgrey;
        padding: 2% 0 2% 5%;
    }
    .title {
        padding-top: 100px;
    }
    .scrollbar {
        height: 73vh;
        min-height: 420px;
    }
    .el-form-item {
        margin-left: 10%;
        margin-bottom: 0px;
    }
    .black {
        margin: 13px 0 0 5px;
    }
    .white {
        margin: 13px 0 0 5px;
    }
    .role {
        margin: 5% 0 5% 10%;
        font-size: large;
    }
</style>