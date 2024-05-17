<template>
    <div class="pan-header-content">
        <div class="pan-header-content-wrapper">
            <div class="pan-title-font-content">
                <span class="pan-title-font" @click="goHome">R Pan</span>
            </div>
            <div class="pan-upload-task-list-content">
                <pan-task-list/>
            </div>
            <div class="pan-user-info-content">
                <pan-user-info/>
            </div>
        </div>
    </div>
</template>

<script setup>

import PanUserInfo from '@/components/user-info/index.vue'
import PanTaskList from '@/components/task-list/index.vue'

const goHome = () => {
    window.location.href = '/'
}

</script>

<style scoped>

.pan-header-content {
    top: 0;
    left: 0;
    width: 100%;
    z-index: 41;
    position: fixed;
}

.pan-header-content .pan-header-content-wrapper {
    height: 62px;
    line-height: 62px;
    position: relative;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .05);
    -webkit-transition: background 1s ease;
    -moz-transition: background 1s ease;
    -o-transition: background 1s ease;
    transition: background 1s ease;
}

.pan-header-content .pan-header-content-wrapper .pan-title-font-content {
    display: inline-block;
    position: absolute;
    left: 40px;
}

.pan-header-content-wrapper .pan-title-font-content .pan-title-font {
    font-size: 40px;
    font-weight: bolder;
    cursor: pointer;
    color: #F56C6C;
}

.pan-header-content-wrapper .pan-user-info-content {
    display: inline-block;
    position: absolute;
    right: 60px;
    top: 20px;
}

.pan-header-content-wrapper .pan-upload-task-list-content {
    display: inline-block;
    position: absolute;
    right: 230px;
    cursor: pointer;
}
</style>