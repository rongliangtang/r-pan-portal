<template>
    <div class="pan-main-operating-content">
        <div class="pan-main-button-content">
            <upload-button v-if="uploadButtonFlag" size="default" round-flag/>
            <create-folder-button v-if="createFolderButtonFlag" size="default" round-flag/>
            <download-button v-if="downloadButtonFlag" size="default" round-flag/>
            <delete-button v-if="deleteButtonFlag" size="default" round-flag/>
            <rename-button v-if="renameButtonFlag" size="default" round-flag/>
            <share-button v-if="shareButtonFlag" size="default" round-flag/>
            <copy-button v-if="copyButtonFlag" size="default" round-flag/>
            <transfer-button v-if="transferButtonFlag" size="default" round-flag/>
        </div>

    </div>
</template>

<script setup>

const props = defineProps({
    buttonArray: Array
})

import UploadButton from '@/components/buttons/upload-button/index.vue'
import CreateFolderButton from '@/components/buttons/create-folder-button/index.vue'
import DownloadButton from '@/components/buttons/download-button/index.vue'
import DeleteButton from '@/components/buttons/delete-button/index.vue'
import RenameButton from '@/components/buttons/rename-button/index.vue'
import ShareButton from '@/components/buttons/share-button/index.vue'
import CopyButton from '@/components/buttons/copy-button/index.vue'
import TransferButton from '@/components/buttons/transfer-button/index.vue'

import {onMounted, ref} from 'vue'

const uploadButtonFlag = ref(false)
const createFolderButtonFlag = ref(false)
const downloadButtonFlag = ref(false)
const deleteButtonFlag = ref(false)
const renameButtonFlag = ref(false)
const shareButtonFlag = ref(false)
const copyButtonFlag = ref(false)
const transferButtonFlag = ref(false)

const initButton = () => {
    if (props.buttonArray && props.buttonArray.length > 0) {
        props.buttonArray.forEach(item => {
            switch (item) {
                case 'upload':
                    uploadButtonFlag.value = true
                    break
                case 'createFolder':
                    createFolderButtonFlag.value = true
                    break
                case 'download':
                    downloadButtonFlag.value = true
                    break
                case 'delete':
                    deleteButtonFlag.value = true
                    break
                case 'rename':
                    renameButtonFlag.value = true
                    break
                case 'share':
                    shareButtonFlag.value = true
                    break
                case 'copy':
                    copyButtonFlag.value = true
                    break
                case 'transfer':
                    transferButtonFlag.value = true
                    break
                default:
                    break
            }
        })
    }
}

onMounted(() => {
    initButton()
})

</script>

<style>

.pan-main-operating-content {
    width: 100%;
    padding: 20px 0 0 13px;
    height: 60px;
}

.pan-main-operating-content .pan-main-button-content {
    display: inline-block;
}

</style>