<template>
    <div class="container">
        <el-image :src="url" fit="fill"/>
    </div>
</template>

<script setup lang="ts">

const url = new URL('../assets/images/ad2.jpg', import.meta.url).href

</script>

<style scoped>
    .container {
        margin-top: 3%;
        height: calc(40vh);
        min-height: 180px;
    }
</style>