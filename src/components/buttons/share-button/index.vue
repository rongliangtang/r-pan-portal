<template>
    <div class="share-button-content">
        <el-button class="share-button" v-if="roundFlag" :size="size" round @click="shareFile">
            分享
            <el-icon class="el-icon--right">
                <Share/>
            </el-icon>
        </el-button>
        <el-button class="share-button" v-if="circleFlag" icon="Share" :size="size" circle @click="shareFile">
        </el-button>
        <el-dialog
            :title="shareTitle"
            v-model="shareDialogVisible"
            @opened="focusInput"
            @closed="resetForm"
            width="30%"
            append-to-body
            :modal-append-to-body="false"
            center>
            <div>
                <div v-if="step === 1">
                    <el-form label-width="100px" :rules="shareFileRules" ref="shareFormRef"
                             :model="shareFileForm"
                             status-icon
                             @submit.native.prevent>
                        <el-form-item label="分享名称" prop="shareName">
                            <el-input type="text"
                                      ref="shareNameEl"
                                      v-model="shareFileForm.shareName" clearable/>
                        </el-form-item>
                        <el-form-item label="分享类型">
                            <el-radio-group v-model="shareFileForm.shareType">
                                <el-radio disabled label="0">有提取码</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="分享有效期">
                            <el-select v-model="shareFileForm.shareDayType">
                                <el-option label="永久有效" value="0"></el-option>
                                <el-option label="7天有效" value="1"></el-option>
                                <el-option label="30天有效" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-if="step === 2">
                    <el-form label-width="100px"
                             status-icon
                             @submit.native.prevent>
                        <el-form-item label="分享链接" prop="shareUrl">
                            <el-link :underline=false type="primary"><span>{{ shareResultForm.shareUrl }}</span>
                            </el-link>
                        </el-form-item>
                        <el-form-item label="提取码">
                            <el-link :underline=false type="success"><span>{{ shareResultForm.shareCode }}</span>
                            </el-link>
                        </el-form-item>
                        <div class="share-result-button-content">
                            <el-button type="primary" class="share-result-copy-button" @click="copy">
                                点击复制
                                <el-icon class="el-icon--right">
                                    <DocumentCopy/>
                                </el-icon>
                            </el-button>
                        </div>
                    </el-form>
                </div>
            </div>
            <template #footer>
                <span v-if="step === 1" class="dialog-footer">
                    <el-button @click="shareDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="doShareFile" :loading="loading">确 定</el-button>
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

import {reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {useFileStore} from '@/stores/file'
import {storeToRefs} from 'pinia'
import shareService from '@/api/share'
import useClipboard from 'vue-clipboard3'
import panUtil from '@/utils/common'

const {toClipboard} = useClipboard()

const fileStore = useFileStore()
const {multipleSelection} = storeToRefs(fileStore)

const shareTitle = ref('')
const shareDialogVisible = ref(false)
const loading = ref(false)
const shareFormRef = ref(null)
const shareNameEl = ref(null)
const step = ref(1)

const shareFileForm = reactive({
    shareName: '',
    shareType: '0',
    shareDayType: '0'
})

const shareResultForm = reactive({
    shareUrl: '',
    shareCode: ''
})

const shareFileRules = reactive({
    shareName: [
        {required: true, message: '请输入分享名称', trigger: 'blur'}
    ]
})

const handleFilename = (filename) => {
    if (filename.length > 10) {
        filename = filename.substring(0, 11) + '...'
    }
    return filename
}

const shareFile = () => {
    if (!props.item && (!multipleSelection.value || multipleSelection.value.length === 0)) {
        ElMessage.error('请选择要分享的文件')
        return
    }
    if (props.item) {
        shareTitle.value = '分享文件（' + handleFilename(props.item.filename) + ')'
    } else {
        if (multipleSelection.value.length === 1) {
            shareTitle.value = '分享文件（' + handleFilename(multipleSelection.value[0].filename) + ')'
        } else {
            shareTitle.value = '分享文件（' + handleFilename(multipleSelection.value[0].filename) + '等)'
        }
    }
    shareDialogVisible.value = true
}

const doShareFile = async () => {

    await shareFormRef.value.validate((valid, fields) => {
        if (valid) {
            let shareFileIdArr = new Array()
            loading.value = true
            if (props.item) {
                shareFileIdArr.push(props.item.fileId)
            } else {
                multipleSelection.value.forEach(item => {
                    shareFileIdArr.push(item.fileId)
                })
            }
            shareService.createShare({
                shareName: shareFileForm.shareName,
                shareType: parseInt(shareFileForm.shareType),
                shareDayType: parseInt(shareFileForm.shareDayType),
                shareFileIds: shareFileIdArr.join(panUtil.COMMON_SEPARATOR)
            }, res => {
                loading.value = false
                shareTitle.value = '恭喜你！分享成功！'
                shareResultForm.shareUrl = res.data.shareUrl
                shareResultForm.shareCode = res.data.shareCode
                step.value = 2
            }, res => {
                loading.value = false
                ElMessage.error(res.message)
            })
        }
    })
}

const resetForm = () => {
    if (shareFormRef.value) {
        shareFormRef.value.resetFields()
    }
    step.value = 1
    shareTitle.value = ''
    shareResultForm.value = {
        shareUrl: '',
        shareCode: ''
    }
}

const focusInput = () => {
    shareNameEl.value.focus()
}

const copy = async () => {
    try {
        let shareMessage = '链接：' + shareResultForm.shareUrl + '\n提取码：' + shareResultForm.shareCode + '\n赶快分享给小伙伴吧！'
        await toClipboard(shareMessage)
        ElMessage.success('复制成功')
    } catch (e) {
        console.error(e)
        ElMessage.error('复制失败')
    }
}

</script>

<style>

.share-button-content {
    display: inline-block;
    margin-right: 10px;
}

.share-button-content .share-button {
    background-color: #F2F6FC;
}

.share-result-button-content {
    width: 100%;
    height: 10px;
    line-height: 30px;
    text-align: right;
    padding: 0 10px 20px 0;
}

</style>