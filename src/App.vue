<template>
    <div id="app">
        <router-view v-slot="{ Component, route }">
            <Transition name="fade">
                <component :is="Component" :key="route.path"/>
            </Transition>
        </router-view>
    </div>
</template>

<script setup>
import {RouterView} from 'vue-router'</script>

<style scoped>

</style>
