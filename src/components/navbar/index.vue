<template>
    <div class="pan-nav-content-wrapper">
        <div class="pan-nav-content">
            <ul class="pan-nav-file">
                <li class="pan-nav-file-all">
                    <a @click="change('Files')" :class="{'checked': active === 'Files'}" href="javascript:void(0);">
                        <span class="text">
                            <el-icon class="icon" :size="16" :color="active === 'Files' ? '#09AAFF' : ''"><Files/></el-icon>
                            <span>全部文件</span>
                        </span>
                    </a>
                </li>
                <li class="pan-nav-file-pic">
                    <a @click="change('Imgs')" :class="{'checked': active === 'Imgs'}" href="javascript:void(0);">
                        <span class="text">
                            <span class="icon"/>
                            <span>图片</span>
                        </span>
                    </a>
                </li>
                <li class="pan-nav-file-doc">
                    <a @click="change('Docs')" :class="{'checked': active === 'Docs'}" href="javascript:void(0);">
                        <span class="text">
                            <span class="icon"/>
                            <span>文档</span>
                        </span>
                    </a>
                </li>
                <li class="pan-nav-file-video">
                    <a @click="change('Videos')" :class="{'checked': active === 'Videos'}"
                       href="javascript:void(0);">
                        <span class="text">
                            <span class="icon"/>
                            <span>视频</span>
                        </span>
                    </a>
                </li>
                <li class="pan-nav-file-music">
                    <a @click="change('Musics')" :class="{'checked': active === 'Musics'}"
                       href="javascript:void(0);">
                        <span class="text">
                            <span class="icon"/>
                            <span>音乐</span>
                        </span>
                    </a>
                </li>
            </ul>
            <ul class="pan-nav-share">
                <li class="pan-nav-share-li">
                    <a @click="change('Shares')" :class="{'checked': active === 'Shares'}"
                       href="javascript:void(0);">
                        <span class="text">
                            <el-icon class="icon" :size="16" :color="active === 'Shares' ? '#09AAFF' : ''"><Share/></el-icon>
                            <span>我的分享</span>
                        </span>
                    </a>
                </li>
            </ul>
            <ul class="pan-nav-recycle">
                <li class="pan-nav-recycle-li">
                    <a @click="change('Recycles')" :class="{'checked': active === 'Recycles'}"
                       href="javascript:void(0);">
                        <span class="text">
                            <el-icon class="icon" :size="16" :color="active === 'Recycles' ? '#09AAFF' : ''"><Delete/></el-icon>
                            <span>回收站</span>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useNavbarStore} from '@/stores/navbar'
import {useRoute} from 'vue-router'
import {onMounted} from 'vue'

const store = useNavbarStore()
const route = useRoute()

const {active} = storeToRefs(store)
const {change} = store

onMounted(() => {
    let name = route.name
    if (name === 'Index') {
        change('Files')
    } else {
        change(name)
    }
})

</script>

<style scoped>
.checked {
    background: rgba(0, 0, 0, .05);
}

.checked span {
    color: #09AAFF;
}

ul {
    list-style: none;
    padding-inline-start: 0px;
    display: block;
}

li {
    display: list-item;
    text-align: -webkit-match-parent;
    list-style: none;
}

.pan-content .pan-nav-content-wrapper {
    background-color: #fff;
}

.pan-content .pan-nav-content-wrapper .pan-nav-content {
    width: 194px;
    height: 100%;
    top: 62px;
    left: 0;
    bottom: 0;
    z-index: 9;
    position: absolute;
}

.pan-content .pan-nav-content-wrapper .pan-nav-content ul a {
    height: 38px;
    line-height: 38px;
    display: block;
    position: relative;
    padding: 0 0 0 15px;
    font-size: 14px;
    text-decoration: none;
    zoom: 1;
}

.pan-content .pan-nav-content-wrapper .pan-nav-content ul .icon {
    font-size: 16px;
    position: absolute;
    top: 11px;
    left: 10px;
    cursor: pointer;
}

.pan-content .pan-nav-content-wrapper .pan-nav-content ul .text {
    color: black;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    height: 38px;
    line-height: 38px;
    position: relative;
    display: block;
    width: 115px;
    padding-left: 38px;
}

</style>