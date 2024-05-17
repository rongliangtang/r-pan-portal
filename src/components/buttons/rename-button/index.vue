<template>
    <div class="rename-button-content">
        <el-button v-if="roundFlag" type="warning" :size="size" round @click="renameFile">
            重命名
            <el-icon class="el-icon--right">
                <EditPen/>
            </el-icon>
        </el-button>
        <el-button v-if="circleFlag" icon="EditPen" type="warning" :size="size" circle @click="renameFile"></el-button>
        <el-dialog
            title="文件重命名"
            v-model="renameDialogVisible"
            width="30%"
            @opened="focusInput"
            @closed="resetForm"
            :append-to-body=true
            :modal-append-to-body=false
            :center=true>
            <div>
                <el-form label-width="100px" :rules="renameRules" ref="renameFormRef"
                         :model="renameForm"
                         status-icon
                         @submit.native.prevent>
                    <el-form-item label="文件名称" prop="filename">
                        <el-input type="text"
                                  ref="filenameEl"
                                  @keyup.enter.native="doRenameFile"
                                  v-model="renameForm.filename" autocomplete="off"/>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="renameDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="doRenameFile" :loading="loading">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
const props = defineProps({
    roundFlag: Boolean,
    circleFlag: Boolean,
    size: String,
    item: Object
})

import fileService from '@/api/file'
import {reactive, ref} from 'vue'
import {useFileStore} from '@/stores/file'
import {storeToRefs} from 'pinia'
import {ElMessage} from 'element-plus'
import panUtil from '@/utils/common'

const renameDialogVisible = ref(false)
const loading = ref(false)
const renameFormRef = ref(null)
const filenameEl = ref(null)

const fileStore = useFileStore()
const {multipleSelection} = storeToRefs(fileStore)

const renameForm = reactive({
    fileId: '',
    filename: ''
})

const resetForm = () => {
    renameFormRef.value.resetFields()
}

const focusInput = () => {
    filenameEl.value.focus()
}

const renameRules = reactive({
    filename: [
        {required: true, message: '请输入新文件名称', trigger: 'blur'}
    ]
})

const renameFile = () => {
    if (props.item) {
        renameForm.fileId = props.item.fileId
        renameForm.filename = props.item.filename
        renameDialogVisible.value = true
        return
    }
    if (!multipleSelection.value || multipleSelection.value.length == 0) {
        ElMessage.error('请选择要重命名的文件')
        return
    }
    if (multipleSelection.value.length > 1) {
        ElMessage.error('请选择一个文件进行重命名')
        return
    }
    let item = multipleSelection.value[0]
    renameForm.fileId = item.fileId
    renameForm.filename = item.filename
    renameDialogVisible.value = true
}

const doRenameFile = async () => {
    await renameFormRef.value.validate((valid, fields) => {
        if (valid) {
            loading.value = true
            fileService.update({
                fileId: renameForm.fileId,
                newFilename: renameForm.filename
            }, res => {
                loading.value = false
                renameDialogVisible.value = false
                ElMessage.success('重命名成功')
                fileStore.loadFileList()
            }, res => {
                ElMessage.error(res.message)
                loading.value = false
            })
        }
    })
}

</script>

<style>
.rename-button-content {
    display: inline-block;
    margin-right: 10px;
}
</style>