<template>
    <div class="container">
        <div class="header">
            <span class="title">{{$t('profile.profile')}}</span>
        </div>
        <div class="scrollbar">
            <el-avatar :size="50" :src="circleUrl"></el-avatar>
            <el-form :model="player">
<!--                <el-form-item :label="$t('profile.id')">{{player.id}}</el-form-item>-->
                <el-form-item :label="$t('profile.name')">{{player.name}}</el-form-item>
                <el-form-item :label="$t('profile.status')">{{$t('status.' + player.status)}}</el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';
import { useStore } from '@/store';

const store = useStore();
const player = computed(() => store.getters.player)
const circleUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";

</script>

<style scoped>
    .scrollbar {
        height: calc(30vh);
        min-height: 180px;
        margin-left: 10%;
        margin-top: 5%;
    }
    .header {
        border-bottom: 1px solid lightgrey;
        padding: 2% 0 2% 5%;
    }
    .title {
        padding-top: 100px;
    }
    .el-form-item {
        margin: 0 0 0 0;
    }
</style>