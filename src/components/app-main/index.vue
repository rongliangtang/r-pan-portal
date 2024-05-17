<template>
    <div class="pan-main-content-wrapper">
        <div class="pan-main-content">
            <router-view v-slot="{ Component, route }">
                <Transition name="fade">
                    <component :is="Component" :key="route.path"/>
                </Transition>
            </router-view>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.pan-main-content-wrapper .pan-main-content {
    top: 62px;
    left: 194px;
    bottom: 0;
    right: 0;
    z-index: 1;
    background: #fff;
    position: absolute;
}
</style>