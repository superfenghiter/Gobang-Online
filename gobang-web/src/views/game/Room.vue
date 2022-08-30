<template>
    <el-row>
        <el-col :span="5">
            <PlayerTable :roomId="roomId"/>
            <Dialog :roomId="roomId"/>
        </el-col>
        <el-col :span="14">
            <ChessBoard :roomId="roomId"/>
        </el-col>
        <el-col :span="5">
            <MatchDetails :roomId="roomId"/>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">

import PlayerTable from "@/components/PlayerTable.vue"
import Dialog from "@/components/Dialog.vue"
import MatchDetails from "@/components/MatchDetails.vue"
import ChessBoard from "@/components/ChessBoard.vue"

defineProps<{ roomId: string }>()

</script>

<style scoped>

</style>