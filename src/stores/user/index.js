import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {

    const username = ref('')

    function setUsername(newUsername) {
        username.value = newUsername
    }

    function clear() {
        username.value = ''
    }

    return {username, setUsername, clear}
})
