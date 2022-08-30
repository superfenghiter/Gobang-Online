<template>
    <div class="container">
        <div class="header">
            <span class="title">{{$t('dialog.dialog')}}</span>
        </div>
        <div class="scrollbar">
            <div class="line" v-for="(item, index) in dialog" :key="index">
                <span style="font-size: xx-small">{{item.time}}</span>
                <br>
                <span>{{ item.from }}: {{ item.content }}</span>
            </div>
        </div>
        <div>
            <el-input size="mini" v-model="input" class="input" @keyup.enter.native="onSend"/>
            <el-button size="mini" @click="onSend" class="send-button">{{$t('dialog.send')}}</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">

import {hallChat, roomChat} from "../websocket/send-api";
import { useStore } from "@/store";
import { computed, onMounted, ref, watch } from "vue";
import { GobangDTO } from "@/types/store"

const store = useStore();

const props = defineProps<{
    roomId: string
}>();

const input = ref('')
const dialog: GobangDTO[] = []

const dialogMsg = computed(() => {
    if (props.roomId === 'hall') {
        return store.getters.hallDialogMsg
    } else {
        return store.getters.roomChatDTO
    }
})

watch(dialogMsg, (newValue, oldValue) => {
    if (props.roomId !== 'hall' && newValue.rid !== props.roomId) {
        return
    }
    addDialogMsg(newValue)
})

onMounted(() => {
    if (props.roomId === 'hall') {
        let date = new Date()
        store.dispatch('setHallDialogMsg', {
            time: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + ' '
            + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
            from: '系统消息',
            content: 'Settings里设置语言'
        })
    }
})

function onSend() {
    if (input.value !== '') {
        if (props.roomId === 'hall') {
            hallChat(input)
        } else {
            roomChat(store.getters.player.name, input.value, props.roomId)
        }
        input.value = ''
    }
}

function addDialogMsg(msg: GobangDTO) {
    if (dialog.length >= 10) {
        dialog.splice(0, 1)
    }
    dialog.push(msg)
}

</script>

<style scoped>
    .container {
        margin-top: 3%;
    }
    .scrollbar {
        height: calc(30vh);
        min-height: 180px;
    }
    .header {
        border-bottom: 1px solid lightgrey;
        padding: 2% 0 2% 5%;
    }
    .title {
        padding-top: 100px;
    }
    .line {
        margin-top: 5px;
        margin-left: 3%;
        font-size: small;
    }
    .input {
        width: 80%;
    }
    .send-button {
        width: 20%;
    }
</style>