<template>
    <div class="pan-main-search-content">
        <el-autocomplete
            class="pan-main-search"
            v-model="searchKey"
            placeholder="请输入内容"
            @keyup.enter.native="doSearch"
            :fetch-suggestions="querySearchHistory"
            @select="handleSelect"
            clearable
        >
            <template #suffix>
                <el-icon class="el-input__icon">
                    <Search/>
                </el-icon>
            </template>
        </el-autocomplete>
    </div>
</template>

<script setup>

import userService from '@/api/user'
import fileService from '@/api/file'
import {ref} from 'vue'
import {ElMessage} from 'element-plus'
import {useFileStore} from '@/stores/file'
import {useBreadcrumbStore} from '@/stores/breadcrumb'
import {useNavbarStore} from '@/stores/navbar'
import {storeToRefs} from 'pinia'

const fileStore = useFileStore()
const breadcrumbStore = useBreadcrumbStore()
const navbarStore = useNavbarStore()

const {defaultParentId, defaultParentFilename} = storeToRefs(fileStore)

const searchKey = ref('')

const querySearchHistory = (queryString, cb) => {
    userService.searchHistories(res => {
        cb(res.data)
    }, res => {
        ElMessage.error(res.message)
    })
}

const doSearch = () => {
    // 设置FileTypes
    fileStore.setFileTypes('-1')
    // 设置搜索模式
    fileStore.setSearchFlag(true)
    // 跳转到Files页面
    navbarStore.change('Files')
    // 缓存搜索关键字
    fileStore.setSearchKey(searchKey.value)
    fileService.search({
        keyword: searchKey.value,
        fileTypes: '-1'
    }, res => {
        breadcrumbStore.clear()
        breadcrumbStore.addItem({
            id: defaultParentId.value,
            name: defaultParentFilename.value
        })
        breadcrumbStore.addItem({
            id: '-1',
            name: '搜索：' + searchKey.value
        })
        fileStore.setFileList(res.data)
    }, res => {
        ElMessage.error(res.message)
    })
}

const handleSelect = (item) => {
    searchKey.value = item.value
    doSearch()
}

</script>

<style>

.pan-main-search-content {
    position: absolute;
    right: 35px;
    height: 60px;
    padding: 20px 0 0 13px;
}

.pan-main-search-content .pan-main-search {
    width: 250px;
}

.pan-main-search-content .pan-main-search .el-input {
    border-radius: 30px !important;
}

</style>