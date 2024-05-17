<template>
    <div class="pan-main-breadcrumb-content">
        <el-breadcrumb style="display: inline-block;">
            <el-breadcrumb-item>
                <a class="breadcrumb-item-a" @click="goBack" href="#">返回</a>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider direction="vertical" style="vertical-align: top !important;"/>
        <el-breadcrumb separator-icon="ArrowRight" style="display: inline-block;">
            <el-breadcrumb-item v-for="(item, index) in breadCrumbs" :key="index">
                <a class="breadcrumb-item-a" @click="goToThis(item.id)" href="#">{{ item.name }}</a>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup>
import {useBreadcrumbStore} from '@/stores/breadcrumb'
import {useFileStore} from '@/stores/file'
import {storeToRefs} from 'pinia'

const breadcrumbStore = useBreadcrumbStore()
const fileStore = useFileStore()

const {breadCrumbs} = storeToRefs(breadcrumbStore)

const goBack = () => {
    fileStore.setSearchFlag(false)
    if (breadCrumbs.value.length > 1) {
        let resolveBreadCrumbs = [...breadCrumbs.value]
        resolveBreadCrumbs.pop()
        let newId = resolveBreadCrumbs.pop().id
        goToThis(newId)
    }
}

const goToThis = (id) => {
    if (id !== '-1') {
        let newBreadCrumbs = new Array()
        breadCrumbs.value.some(item => {
            newBreadCrumbs.push(item)
            if (item.id == id) {
                return true
            }
        })
        breadcrumbStore.reset(newBreadCrumbs)
        fileStore.setParentId(id)
        fileStore.setSearchFlag(false)
        fileStore.loadFileList()
    }
}

</script>

<style scoped>
.pan-main-breadcrumb-content {
    width: 100%;
    padding: 10px 0 0 25px;
}

.breadcrumb-item-a {
    cursor: pointer !important;
    color: #409EFF !important;
}
</style>