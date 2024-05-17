<template>
    <div>
        <div class="button-search-content">
            <file-button-group :button-array="buttonArray"/>
            <search/>
        </div>
        <bread-crumb/>
        <file-table/>
    </div>
</template>

<script setup>

import FileButtonGroup from '@/components/file-button-group/index.vue'
import Search from '@/components/search/index.vue'
import BreadCrumb from '@/components/breadcrumb/index.vue'
import FileTable from '@/components/file-table/index.vue'
import {onMounted, ref} from 'vue'
import {useFileStore} from '@/stores/file'
import {useBreadcrumbStore} from '@/stores/breadcrumb'
import {storeToRefs} from 'pinia'

const fileStore = useFileStore()
const breadcrumbStore = useBreadcrumbStore()

const {searchFlag, defaultParentId, defaultParentFilename} = storeToRefs(fileStore)

const buttonArray = ref(['upload', 'createFolder', 'download', 'delete', 'rename', 'share', 'copy', 'transfer'])

onMounted(() => {
    if (!searchFlag.value) {
        let firstItem = {
            id: defaultParentId.value,
            name: defaultParentFilename.value
        }
        breadcrumbStore.clear()
        breadcrumbStore.addItem(firstItem)
        fileStore.refreshParentId()
        fileStore.setFileTypes('-1')
        fileStore.loadFileList()
    }
})
</script>

<style scoped>

.button-search-content {
    display: flex;
    width: 100%;
}

</style>