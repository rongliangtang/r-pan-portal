import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {defineStore} from 'pinia'

export const useNavbarStore = defineStore('navbar', () => {
    const router = useRouter()

    const active = ref('Files')

    function change(newActive) {
        active.value = newActive
        router.push({name: newActive})
    }

    function clear() {
        active.value = 'Files'
    }

    return {active, change, clear}
})
