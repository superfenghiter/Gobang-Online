<template>
    <el-form>
        <el-form-item :label="$t('settings.language')">
            <el-select v-model="lang" @change="onLang">
                <el-option v-for="item in langOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import i18n from "@/locals";

let { locale } = i18n.global;

const lang = ref('en')
const langOptions = [{
    value: 'en',
    label: 'English'
}, {
    value: 'zh',
    label: '中文'
}]
const onLang = () => {
    locale = lang.value === 'zh' ? 'zh' : 'en'
    localStorage.setItem('lang', lang.value)
}
</script>

<style scoped>

</style>