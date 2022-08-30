<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  
import { onMounted } from "vue";
import { initWebSocket } from "./websocket/websocket";
import { initStore } from "@/store"

initStore();

onMounted(() => {
  initWebSocket();
})

</script>

<style>

</style>
