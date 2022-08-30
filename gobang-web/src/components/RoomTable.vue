<template>
    <div class="container">
        <div class="header">
            <span class="title">{{$t('roomTable.chessRoomList')}}</span>
            <el-button size="mini" @click="onCreateRoom" style="float: right; margin-right: 10px">{{$t('roomTable.createRoom')}}</el-button>
            <el-button size="mini" @click="onRefresh" style="float: right; margin-right: 10px">{{$t('roomTable.refresh')}}</el-button>
        </div>

        <el-dialog v-model="dialogVisible" :title="dialogTitle">
            <el-form>
                <el-form-item :label="$t('roomTable.dialog.color')" label-width="25%">
                    <el-select v-model="dialogColor" placeholder="Please select a zone">
                        <el-option :label="$t('color.black')" :value="0" />
                        <el-option :label="$t('color.white')" :value="1" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="onDialogConfirm">{{$t('pop.confirm')}}</el-button>
                    <el-button @click="dialogVisible = false">{{$t('pop.cancel')}}</el-button>
                </span>
            </template>
        </el-dialog>

        <el-table :data="rooms" class="scrollbar" :show-header="false">
            <el-table-column label="room">
                <template #default="props">
                    <div style="display: inline-block">
                        <div :class="getChessClass(props.row.host)"></div>
                        <div style="float: left">{{props.row.host.name}} vs {{props.row.challenger.name}}</div>
                        <div :class="getChessClass(props.row.challenger)"></div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #default="scope">
                    <el-button size="mini" @click="onChallenge(scope.row)" v-if="challengeShow(scope.row)">{{$t('roomTable.challenge')}}</el-button>
                    <el-button size="mini" @click="onSpectate(scope.row)">{{$t('roomTable.spectate')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
    
import { createRoom, enterRoom, getRooms, setPlayerStatus } from "@/websocket/send-api";
import color from "@/constants/color";
import { Player, Room } from "@/types/store";
import { useStore } from "@/store";
import { computed, onMounted, ref } from "vue";
import i18n from "@/locals";

const { t } = i18n.global;
const store = useStore();

const dialogVisible = ref(false)
const dialogColor = ref(color.black)

const dialogTitle = computed(() => t('roomTable.dialog.title'))

const rooms = computed(() => store.getters.rooms)

function onDialogConfirm() {
    createRoom(dialogColor.value)
    dialogVisible.value = false
}

function onCreateRoom() {
    dialogVisible.value = true
}

function onChallenge(room: Room) {
    enterRoom(room.id, "challenger")
}

function onSpectate(room: Room) {
    enterRoom(room.id, "spectator")
    if (store.getters.player.status === "leisure") {
        setPlayerStatus("spectating")
    }
}

function onRefresh() {
    getRooms()
}

function getChessClass(player:　Player) {
    if (player.id !== '' && player.color === color.black) {
        return 'black'
    }
    else if (player.id !== '' && player.color === color.white) {
        return 'white'
    }
    return ''
}

function challengeShow(room: Room) {
    return room.challenger.id === ''
}

onMounted(() => {
    getRooms()
})

</script>

<style scoped>
    .container {
        margin-left: 2%;
        margin-right: 2%;
    }
    .scrollbar {
        height: calc(70vh);
        min-height: 415px;
    }
    .header {
        border-bottom: 1px solid lightgrey;
        padding: 2% 0 2% 5%;
    }
    .title {
        padding-top: 100px;
    }
</style>