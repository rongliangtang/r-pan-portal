<template>
    <div class="download-button-content">
        <el-button v-if="roundFlag" type="info" :size="size" round @click="downloadFile" :loading="loading">
            下载
            <el-icon class="el-icon--right">
                <Download/>
            </el-icon>
        </el-button>
        <el-button v-if="circleFlag" icon="Download" type="info" :size="size" circle @click="downloadFile"
                   :loading="loading"></el-button>
    </div>
</template>

<script setup>
const props = defineProps({
    roundFlag: Boolean,
    circleFlag: Boolean,
    size: String,
    item: Object
})

import {ref} from 'vue'
import {ElMessage} from 'element-plus'
import {useFileStore} from '@/stores/file'
import {storeToRefs} from 'pinia'
import panUtil from '@/utils/common'
import {getToken} from '@/utils/cookie'

const fileStore = useFileStore()
const {multipleSelection} = storeToRefs(fileStore)

const loading = ref(false)

const doDownload = (item) => {
    let url = panUtil.getUrlPrefix() + '/file/download?fileId=' + panUtil.handleId(item.fileId) + '&authorization=' + getToken(),
        filename = item.filename,
        link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const doDownLoads = (items, i) => {
    if (!i) {
        i = 0
    }
    if (items.length === i) {
        return
    }
    setTimeout(function () {
        doDownload(items[i]);
        i++
        doDownLoads(items, i)
    }, 500)
}

const downloadFile = () => {
    if (!props.item && (!multipleSelection.value || multipleSelection.value.length === 0)) {
        ElMessage.error('请选择要下载的文件')
        return
    }
    if (!props.item) {
        for (let i = 0, iLength = multipleSelection.value.length; i < iLength; i++) {
            if (multipleSelection.value[i].folderFlag === 1) {
                ElMessage.error('文件夹暂不支持下载')
                return
            }
        }
        doDownLoads(multipleSelection.value)
    }
    if (props.item) {
        if (props.item.folderFlag === 1) {
            ElMessage.error('文件夹暂不支持下载')
            return
        }
        doDownload(props.item)
    }
}

</script>

<style>

.download-button-content {
    display: inline-block;
    margin-right: 10px;
}

</style>