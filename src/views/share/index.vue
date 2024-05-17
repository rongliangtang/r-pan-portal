<template>
    <div v-loading="pageLoading" element-loading-text="加载中..." class="pan-share-content">
        <div class="pan-share-header-content">
            <div class="pan-share-header-content-wrapper">
                <div class="pan-share-header-title-font-content">
                    <span class="pan-share-header-title-font" @click="goHome">R Pan</span>
                </div>
                <div v-if="loginFlag" class="pan-share-header-user-info-content">
                    <el-link :underline=false type="success" class="pan-share-username">
                        欢迎您,{{ username }}
                    </el-link>
                    <el-link :underline=false type="success" class="pan-share-exit-button" @click="exit">
                        退出
                    </el-link>
                </div>
                <div v-if="!loginFlag" class="pan-share-header-button-content">
                    <el-link :underline=false type="primary" class="pan-share-login-button" @click="login">
                        登录
                    </el-link>
                    <el-link :underline=false type="primary" class="pan-share-register-button" href="/register"
                             target="_blank">
                        注册
                    </el-link>
                </div>
            </div>
        </div>
        <div class="pan-share-list-content">
            <div class="pan-share-list-wrapper">
                <el-card shadow="always" class="pan-share-list-card">
                    <div v-if="!shareCancelFlag" slot="header" class="pan-share-list-card-header">
                        <div class="pan-share-list-card-header-share-info-content">
                            <span class="pan-share-list-card-header-share-info">{{ shareCodeHeader }}</span>
                            <div class="pan-share-list-card-header-time">
                                <span class="pan-share-list-card-header-create-date">
                                    <i class="fa fa-clock-o"/>分享时间：{{ shareDate }}
                                </span>
                                <span class="pan-share-list-card-header-expire-date">
                                     <i class="fa fa-clock-o"/>失效时间：{{ shareExpireDate }}</span>
                            </div>
                        </div>
                        <div class="pan-share-list-card-button-group">
                            <el-button type="success" size="default" round @click="saveFiles(undefined)">保存到我的R盘
                                <el-icon
                                    class="el-icon--right">
                                    <DocumentCopy/>
                                </el-icon>
                            </el-button>
                            <el-button type="info" size="default" round @click="downloadFile">下载
                                <el-icon
                                    class="el-icon--right">
                                    <Download/>
                                </el-icon>
                            </el-button>
                        </div>
                        <el-divider/>
                    </div>
                    <div v-if="shareCancelFlag" class="pan-share-list-card-error-message">
                        <span>Sorry,您来晚啦~ 该分享已到期或已失效~</span>
                    </div>
                    <div v-if="!shareCancelFlag" class="pan-share-list-card-operate-content">
                        <div class="pan-share-list-card-operate-bread-crumb">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item v-for="(item, index) in breadCrumbs" :key="index">
                                    <a class="breadcrumb-item-a" @click="goToThis(item.id)" href="#">{{ item.name }}</a>
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </div>
                    <div v-if="!shareCancelFlag" class="pan-share-list">
                        <el-table
                            ref="fileTableRef"
                            :data="tableData"
                            :height="tableHeight"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                            @cell-mouse-enter="showOperation"
                            @cell-mouse-leave="hiddenOperation"
                        >
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                                label="文件名"
                                prop="filename"
                                sortable
                                show-overflow-tooltip
                                min-width="750">
                                <template #default="scope">
                                    <div @click="clickFilename(scope.row)" class="file-name-content">
                                        <i :class="getFileFontElement(scope.row.fileType)"
                                           style="margin-right: 15px; font-size: 20px; cursor: pointer;"/>
                                        <span style="cursor:pointer;">{{ scope.row.filename }}</span>
                                    </div>
                                    <div class="file-operation-content">
                                        <el-tooltip class="item" effect="light" content="保存到我的R盘" placement="top">
                                            <el-button type="success" icon="DocumentCopy" size="small" circle
                                                       @click="saveFiles(scope.row)"/>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="light" content="下载" placement="top">
                                            <el-button type="info" icon="Download" size="small" circle
                                                       @click="doDownload(scope.row)"/>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="fileSizeDesc"
                                sortable
                                label="大小"
                                min-width="120"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="updateTime"
                                sortable
                                align="center"
                                label="修改日期"
                                min-width="240">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </div>
        </div>
        <el-dialog
            title="欢迎登录"
            v-model="loginDialogVisible"
            @opened="focusLoginInput"
            @closed="resetLoginForm"
            width="30%"
            append-to-body
            :modal-append-to-body="false"
            center>
            <div>
                <el-form label-width="100px" :rules="loginRules" ref="loginFormRef"
                         :model="loginForm"
                         status-icon
                         @submit.native.prevent>
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text"
                                  ref="usernameEl"
                                  @keyup.enter.native="doLogin"
                                  v-model="loginForm.username" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password"
                                  show-password
                                  @keyup.enter.native="doLogin"
                                  v-model="loginForm.password" autocomplete="off"/>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="loginDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="doLogin" :loading="loading">确 定</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            v-model="shareCodeDialogVisible"
            @opened="focusShareCodeInput"
            @closed="resetShareCodeForm"
            width="30%"
            fullscreen
            append-to-body
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <div class="pan-share-code-content">
                <div class="pan-share-code-wrapper">
                    <el-card :header="shareCodeHeader" shadow="always" class="pan-share-code-card">
                        <el-form
                            class="pan-share-code-form"
                            inline
                            :rules="shareCodeFormRules"
                            ref="shareCodeFormRef"
                            :model="shareCodeForm"
                            @submit.native.prevent>
                            <el-form-item label="提取码" prop="shareCode">
                                <el-input type="text"
                                          ref="shareCodeEl"
                                          @keyup.enter.native="doCheckShareCode"
                                          v-model="shareCodeForm.shareCode" autocomplete="off"/>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" :loading="loading" @click="doCheckShareCode">确 定</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="保存到我的R盘"
            v-model="treeDialogVisible"
            @open="loadTreeData"
            @closed="resetTreeData"
            width="30%"
            append-to-body
            :modal-append-to-body="false"
            center>
            <div class="tree-content">
                <el-tree
                    :data="treeData"
                    class="tree"
                    empty-text="暂无文件夹数据"
                    default-expand-all
                    highlight-current
                    check-on-click-node
                    :expand-on-click-node="false"
                    ref="treeRef">
                    <template #default="{ node, data }">
                        <span class="custom-tree-node">
                            <el-icon :size="20" style="margin-right: 15px; cursor: pointer;"><Folder/></el-icon>
                            <span>{{ node.label }}</span>
                        </span>
                    </template>
                </el-tree>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="treeDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="doChoseTreeNodeCallBack" :loading="loading">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>

import panUtil from '@/utils/common'
import userService from '@/api/user'
import fileService from '@/api/file'
import {clearShareToken, clearToken, getShareToken, getToken, setShareToken, setToken} from '@/utils/cookie'
import shareService from '@/api/share'
import {onMounted, reactive, ref} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {useRoute} from 'vue-router'

const route = useRoute()
const loginFormRef = ref(null)
const treeRef = ref(null)
const shareCodeFormRef = ref(null)
const fileTableRef = ref(null)
const usernameEl = ref(null)
const shareCodeEl = ref(null)

const focusLoginInput = () => {
    usernameEl.value.focus()
}

const resetLoginForm = () => {
    loginFormRef.value.resetFields()
}

const focusShareCodeInput = () => {
    shareCodeEl.value.focus()
}

const resetShareCodeForm = () => {
    shareCodeFormRef.value.resetFields()
}

const checkUsername = (rule, value, callback) => {
        if (!panUtil.checkUsername(value)) {
            callback('请输入6-16位只包含数字和字母的用户名')
            return
        }
        callback()
    },
    checkPassword = (rule, value, callback) => {
        if (!panUtil.checkPassword(value)) {
            callback('请输入8-16位的密码')
            return
        }
        callback()
    }

const loginRules = reactive({
    username: [
        {validator: checkUsername, trigger: 'blur'}
    ],
    password: [
        {validator: checkPassword, trigger: 'blur'}
    ]
})

const shareCodeFormRules = reactive({
    shareCode: [
        {required: true, message: '请输入提取码', trigger: 'blur'}
    ]
})

const loginForm = reactive({
    username: '',
    password: ''
})

const loading = ref(false)
const username = ref('')
const loginDialogVisible = ref(false)
const loginFlag = ref(false)
const shareCodeDialogVisible = ref(false)
const shareCodeForm = reactive({
    shareCode: ''
})

const shareCodeHeader = ref('')
const shareCancelFlag = ref(false)
const tableData = ref([])
const tableHeight = ref(window.innerHeight - 300)
const multipleSelection = ref([])
const pageLoading = ref(true)
const shareDate = ref('')
const shareExpireDate = ref('')
const breadCrumbs = ref([{
    id: '-1',
    name: '全部文件'
}])
const treeData = ref([])
const treeDialogVisible = ref(false)
const item = ref(undefined)

const refreshShareInfo = (data) => {
    let username = data.shareUserInfoVO.username,
        shareName = data.shareName
    shareCodeHeader.value = username + '的分享：' + shareName
    shareDate.value = data.createTime
    if (data.shareDay === 0) {
        shareExpireDate.value = '永久有效'
    } else {
        shareExpireDate.value = data.shareEndTime
    }
    tableData.value = data.rpanUserFileVOList
}

const getShareId = () => {
    return route.params.shareId
}

const openShareExpirePage = () => {
    shareCancelFlag.value = true
}

const openShareCodePage = () => {
    shareService.getSimpleShareDetail({
        shareId: getShareId()
    }, res => {
        if (res.code === 0) {
            shareCodeDialogVisible.value = true
            shareCodeHeader.value = res.data.shareUserInfoVO.username + '的分享：' + res.data.shareName
        } else {
            shareCodeDialogVisible.value = false
            openShareExpirePage()
        }
    })
}

const loadShareInfo = () => {
    shareService.getShareDetail(res => {
        if (res.code === 0) {
            refreshShareInfo(res.data)
        } else if (res.code === 4) {
            openShareCodePage()
        } else {
            openShareExpirePage()
        }
    })
}

const loadUserInfo = () => {
    userService.infoWithoutPageJump(res => {
        if (res.code === 0) {
            username.value = res.data.username
            loginFlag.value = true
        } else {
            username.value = ''
            loginFlag.value = false
        }
    })
}

const login = () => {
    loginDialogVisible.value = true
}

const exit = () => {
    ElMessageBox.confirm('确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        userService.exit(() => {
            clearToken()
            loginFlag.value = false
            username.value = ''
        }, res => {
            ElMessage.error(res.message)
        })
    })
}


const doLogin = async () => {
    await loginFormRef.value.validate((valid, fields) => {
        if (valid) {
            loading.value = true
            userService.login({
                username: loginForm.username,
                password: loginForm.password
            }, res => {
                loading.value = false
                setToken(res.data)
                loginDialogVisible.value = false
                loadUserInfo()
            }, res => {
                loading.value = false
                ElMessage.error(res.message)
            })
        }
    })
}

const goHome = () => {
    window.location.href = '/'
}

const doCheckShareCode = async () => {
    await shareCodeFormRef.value.validate((valid) => {
        if (valid) {
            loading.value = true
            shareService.checkShareCode({
                shareId: getShareId(),
                shareCode: shareCodeForm.shareCode
            }, res => {
                if (res.code === 0) {
                    loading.value = false
                    setShareToken(res.data)
                    shareCodeDialogVisible.value = false
                    loadShareInfo()
                } else {
                    loading.value = false
                    ElMessage.error(res.message)
                }
            })
        }
    })
}

const handleSelectionChange = (newMultipleSelection) => {
    multipleSelection.value = newMultipleSelection
}

const showOperation = (row, column, cell, event) => {
    panUtil.showOperation(cell)
}

const hiddenOperation = (row, column, cell, event) => {
    panUtil.hiddenOperation(cell)
}

const clickFilename = (row) => {
    if (row.folderFlag === 1) {
        goInFolder(row)
    }
}

const goInFolder = (row) => {
    breadCrumbs.value.push({
        id: row.fileId,
        name: row.filename
    })
    reloadTableData(row.fileId)
}

const reloadTableData = (parentId) => {
    shareService.getShareFiles({
        parentId: parentId
    }, res => {
        if (res.code === 0) {
            tableData.value = res.data
        } else {
            window.location.reload()
        }
    })
}

const goToThis = (id) => {
    if (id === '-1') {
        breadCrumbs.value = [{
            id: '-1',
            name: '全部文件'
        }]
        loadShareInfo()
    } else {
        let newBreadCrumbs = new Array()
        breadCrumbs.value.some(item => {
            newBreadCrumbs.push(item)
            if (item.id === id) {
                return true
            }
        })
        breadCrumbs.value = newBreadCrumbs
        reloadTableData(id)
    }
}

const downloadFile = () => {
    if (!multipleSelection.value || multipleSelection.value.length === 0) {
        ElMessage.error('请选择要下载的文件')
        return
    }
    for (let i = 0, iLength = multipleSelection.value.length; i < iLength; i++) {
        if (multipleSelection.value[i].folderFlag === 1) {
            ElMessage.error('文件夹暂不支持下载')
            return
        }
    }
    doDownLoads(multipleSelection.value)
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
    }, 500);
}

const doDownload = (item) => {
    if (item.folderFlag === 1) {
        ElMessage.error('文件夹暂不支持下载')
        return
    }
    userService.infoWithoutPageJump(res => {
        if (res.code === 0) {
            shareService.getSimpleShareDetail({
                shareId: getShareId()
            }, res => {
                if (res.code === 0) {
                    let url = panUtil.getUrlPrefix() + '/share/file/download?fileId=' + panUtil.handleId(item.fileId) + '&shareToken=' + getShareToken() + '&authorization=' + getToken(),
                        filename = item.filename,
                        link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', filename)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                } else {
                    window.location.reload()
                }
            })
        } else {
            loadUserInfo()
            login()
        }
    })
}

const resetTreeData = () => {
    treeData.value = new Array()
    item.value = undefined
}

const loadTreeData = () => {
    fileService.getFolderTree(res => {
        treeData.value = res.data
    }, res => {
        ElMessage.error(res.message)
    })
}

const doChoseTreeNodeCallBack = () => {
    loading.value = true
    let checkNode = treeRef.value.getCurrentNode()
    if (!checkNode) {
        ElMessage.error('请选择文件夹')
        loading.value = false
        return
    }
    doSaveFiles(checkNode.id)
}

const saveFiles = (newItem) => {
    if (newItem) {
        item.value = newItem
    } else if (!multipleSelection.value || multipleSelection.value.length === 0) {
        ElMessage.error('请选择要保存的文件')
        return
    }
    userService.infoWithoutPageJump(res => {
        if (res.code === 0) {
            treeDialogVisible.value = true
        } else {
            login()
        }
    })
}

const doSaveFiles = (targetParentId) => {
    let fileIds = ''
    if (item.value) {
        fileIds = item.value.fileId
    } else {
        let fileIdArr = new Array()
        multipleSelection.value.forEach(item => {
            fileIdArr.push(item.fileId)
        })
        fileIds = fileIdArr.join(panUtil.COMMON_SEPARATOR)
    }
    shareService.saveShareFiles({
        fileIds: fileIds,
        targetParentId: targetParentId
    }, res => {
        if (res.code === 0) {
            ElMessage.success('保存成功')
            treeDialogVisible.value = false
        } else if (res.code === 10) {
            treeDialogVisible.value = false
            loadUserInfo()
            login()
        } else {
            ElMessage.error(res.message)
        }
        loading.value = false
    })
}

const getFileFontElement = (type) => {
    return panUtil.getFileFontElement(type)
}

onMounted(() => {
    clearShareToken()
    loadShareInfo()
    loadUserInfo()
    pageLoading.value = false
})

</script>

<style>

.pan-share-content {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    min-width: 1103px;
    background: #f7f7f7;
    transition: background 1s ease;
    font: 12px/1.5 "Microsoft YaHei", arial, SimSun, "宋体";
    width: 100%;
    height: 100%;
}

.pan-share-content .pan-share-header-content {
    top: 0;
    left: 0;
    width: 100%;
    z-index: 41;
    position: fixed;
}

.pan-share-content .pan-share-header-content .pan-share-header-content-wrapper {
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

.pan-share-content .pan-share-header-content .pan-share-header-content-wrapper .pan-share-header-title-font-content {
    display: inline-block;
    position: absolute;
    left: 40px;
}

.pan-share-content .pan-share-header-content .pan-share-header-content-wrapper .pan-share-header-title-font-content .pan-share-header-title-font {
    font-size: 40px;
    font-weight: bolder;
    cursor: pointer;
    color: #F56C6C;
}

.pan-share-content .pan-share-header-content .pan-share-header-content-wrapper .pan-share-header-user-info-content {
    display: inline-block;
    position: absolute;
    right: 100px;
}

.pan-share-content .pan-share-header-content .pan-share-header-content-wrapper .pan-share-header-user-info-content .pan-share-username {
    margin-right: 20px;
}

.pan-share-content .pan-share-header-content .pan-share-header-content-wrapper .pan-share-header-button-content {
    display: inline-block;
    position: absolute;
    right: 100px;
}

.pan-share-content .pan-share-header-content .pan-share-header-content-wrapper .pan-share-header-button-content .pan-share-login-button {
    margin-right: 20px;
}

.pan-share-code-content {
    width: 100%;
    height: 300px;
}

.pan-share-code-content .pan-share-code-wrapper {
    height: 300px;
    width: 450px;
    margin: 0 auto;
    position: relative;
    top: 50%;
}

.pan-share-code-content .pan-share-code-wrapper .pan-share-code-card {
    width: 100%;
    height: 100%;
    border-radius: 30px;
}

.pan-share-code-content .pan-share-code-wrapper .pan-share-code-card .pan-share-code-form {
    position: absolute;
    top: 40%;
}

.pan-share-content .pan-share-list-content {
    width: 100%;
    margin-top: 82px;
}

.pan-share-content .pan-share-list-content .pan-share-list-wrapper {
    width: 80%;
    margin: 0 auto;
}

.pan-share-content .pan-share-list-content .pan-share-list-wrapper .pan-share-list-card {
    width: 100%;
    border-radius: 30px;
}

.pan-share-content .pan-share-list-content .pan-share-list-wrapper .pan-share-list-card .pan-share-list-card-header {
    padding: 10px 20px 0 0;
}

.pan-share-content .pan-share-list-content .pan-share-list-wrapper .pan-share-list-card .pan-share-list-card-header .pan-share-list-card-button-group {
    display: inline-block;
    float: right;
    margin-right: 20px;
}

.pan-share-content .pan-share-list-content .pan-share-list-wrapper .pan-share-list-card .pan-share-list-card-header .pan-share-list-card-header-share-info-content {
    display: inline-block;
}

.pan-share-content .pan-share-list-content .pan-share-list-wrapper .pan-share-list-card .pan-share-list-card-header .pan-share-list-card-header-share-info-content .pan-share-list-card-header-share-info {
    color: #67C23A;
    font-size: 18px;
    margin-right: 10px;
}

.pan-share-content .pan-share-list-content .pan-share-list-wrapper .pan-share-list-card .pan-share-list-card-header .pan-share-list-card-header-share-info-content .pan-share-list-card-header-time {
    margin-top: 10px;
}

.pan-share-content .pan-share-list-content .pan-share-list-wrapper .pan-share-list-card .pan-share-list-card-header .pan-share-list-card-header-share-info-content .pan-share-list-card-header-time .pan-share-list-card-header-create-date {
    color: #909399;
    margin-right: 15px;
}

.pan-share-content .pan-share-list-content .pan-share-list-wrapper .pan-share-list-card .pan-share-list-card-header .pan-share-list-card-header-share-info-content .pan-share-list-card-header-time .pan-share-list-card-header-expire-date {
    color: #F56C6C;
}

.pan-share-content .pan-share-list-content .pan-share-list-wrapper .pan-share-list-card .pan-share-list-card-error-message {
    width: 100%;
    height: 300px;
    padding-top: 50px;
    text-align: center;
    color: #F56C6C;
    font-size: 30px;
}

.pan-share-content .pan-share-list-content .pan-share-list-wrapper .pan-share-list-card .pan-share-list-card-operate-content {
    height: 30px;
    line-height: 30px;
    padding: 0 30px 0 0;
}

span {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.breadcrumb-item-a {
    cursor: pointer !important;
    color: #409EFF !important;
}

.tree-content {
    height: 400px;
}

.tree-content .tree {
    height: 100%;
    overflow: auto;
}

.file-operation-content {
    display: none;
    position: absolute;
    right: 100px;
    top: 8px;
}

</style>