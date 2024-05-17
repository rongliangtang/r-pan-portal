import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
    const breadCrumbs = ref([])

    function clear() {
        breadCrumbs.value = new Array()
    }

    function addItem(item) {
        breadCrumbs.value.push(item)
    }

    function reset(newBreadCrumbs) {
        breadCrumbs.value = newBreadCrumbs
    }

    return {breadCrumbs, clear, addItem, reset}
})
