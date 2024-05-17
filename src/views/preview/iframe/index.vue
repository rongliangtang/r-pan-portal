<template>
    <div>
        <pan-simple-header/>
        <div class="iframe-content">
            <iframe class="iframe" :src="showPath" frameborder="0"/>
        </div>
    </div>
</template>

<script setup>

import PanSimpleHeader from '@/components/simple-header/index.vue'
import panUtil from '@/utils/common'
import {useRoute} from 'vue-router'
import {onMounted, ref} from 'vue'

const showPath = ref('')
const route = useRoute()

const init = () => {
    let fileId = route.params.fileId
    showPath.value = panUtil.getPreviewUrl(fileId)
}

onMounted(() => {
    init()
})

</script>

<style scoped>

.iframe-content {
    width: 100%;
    margin-top: 62px;
    display: block;
    text-align: center;
}

.iframe {
    width: 100%;
    height: 1200px;
}

</style>
