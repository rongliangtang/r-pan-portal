import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import fileService from '@/api/file'
import {ElMessage} from 'element-plus'
import panUtil from '@/utils/common'

export const useFileStore = defineStore('file', () => {

    const parentId = ref('')
    const defaultParentId = ref('')
    const defaultParentFilename = ref('')
    const fileList = ref([])
    const multipleSelection = ref([])
    const fileTypes = ref('-1')
    const searchFlag = ref(false)
    const searchKey = ref('')
    const tableLoading = ref(true)

    const paramParentId = computed(() => parentId.value === '-1' ? defaultParentId.value : parentId.value)

    function setParentId(newParentId) {
        parentId.value = newParentId
    }

    function refreshParentId() {
        parentId.value = defaultParentId.value
    }

    function setDefaultParentId(newDefaultParentId) {
        defaultParentId.value = newDefaultParentId
    }

    function setDefaultParentFilename(newDefaultParentFilename) {
        defaultParentFilename.value = newDefaultParentFilename
    }

    function setFileList(newFileList) {
        fileList.value = newFileList
    }

    function setMultipleSelection(newMultipleSelection) {
        multipleSelection.value = newMultipleSelection
    }

    function setFileTypes(newFileTypes) {
        fileTypes.value = newFileTypes
    }

    function setSearchFlag(newSearchFlag) {
        if (!newSearchFlag) {
            searchKey.value = ''
        }
        searchFlag.value = newSearchFlag
    }

    function setSearchKey(newSearchKey) {
        searchKey.value = newSearchKey
    }

    function setTableLoading(newTableLoading) {
        tableLoading.value = newTableLoading
    }

    function clear(state) {
        parentId.value = ''
        defaultParentId.value = ''
        defaultParentFilename.value = ''
        fileList.value = new Array()
        multipleSelection.value = new Array()
        fileTypes.value = '-1'
        searchFlag.value = false
        searchKey.value = ''
        tableLoading.value = true
    }

    function loadFileList() {
        setTableLoading(true)
        if (searchFlag.value) {
            fileService.search({
                keyword: searchKey.value,
                fileTypes: '-1'
            }, res => {
                setFileList(res.data)
                setTableLoading(false)
            }, res => {
                setTableLoading(false)
                ElMessage.error(res.message)
            })
        } else {
            fileService.list({
                parentId: parentId.value,
                fileTypes: fileTypes.value
            }, res => {
                setTableLoading(false)
                setFileList(res.data)
            }, res => {
                setTableLoading(false)
                ElMessage.error(res.message)
            })
        }
    }

    return {
        parentId,
        defaultParentId,
        defaultParentFilename,
        fileList,
        multipleSelection,
        fileTypes,
        searchFlag,
        searchKey,
        tableLoading,
        paramParentId,
        setParentId,
        refreshParentId,
        setDefaultParentId,
        setDefaultParentFilename,
        setFileList,
        setMultipleSelection,
        setFileTypes,
        setSearchFlag,
        setSearchKey,
        setTableLoading,
        clear,
        loadFileList
    }
})
