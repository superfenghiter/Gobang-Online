<template>
    <div class="shadow-container">
        <el-container>
            <el-header>
                <el-menu router mode="horizontal" :default-active="$route.path">
                    <template v-for="item in router.options.routes[2].children" :key="item.path">
                        <el-menu-item :index="item.path">
                            <span slot="title">{{$t('layout.' + String(item.name))}}</span>
                        </el-menu-item>
                    </template>
                    <span class="brand-name">{{$t('layout.title')}}</span>
                </el-menu>
            </el-header>
            <el-main>
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<style scoped>
    .shadow-container {
        height: calc(97vh);
        min-height: 600px;
        min-width: 1200px;
    }
    .brand-name {
        position: absolute;
        font-size: x-large;
        font-style: italic;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        -webkit-transform: translate(0, -50%);
        -moz-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
    }
</style>