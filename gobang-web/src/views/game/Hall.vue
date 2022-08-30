<template>
    <el-row>
        <el-col :span="5">
            <PlayerTable roomId="hall"/>
            <Dialog roomId="hall"/>
        </el-col>
        <el-col :span="14">
            <RoomTable/>
        </el-col>
        <el-col :span="5">
            <PlayerDetails/>
            <Advertisement/>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">

import PlayerTable from "@/components/PlayerTable.vue"
import Dialog from "@/components/Dialog.vue";
import PlayerDetails from "@/components/Profile.vue";
import Advertisement from "@/components/Advertisement.vue";
import RoomTable from "@/components/RoomTable.vue";

</script>

<style scoped>
</style>