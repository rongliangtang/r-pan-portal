<template>
    <div>
        <pan-simple-header/>
        <div class="code-text-content">
            <pre class="layui-code code-text">
                {{ codeContent }}
            </pre>
        </div>
    </div>
</template>

<script setup>

import PanSimpleHeader from '@/components/simple-header/index.vue'
import axios from 'axios'
import panUtil from '@/utils/common'
import {useRoute} from 'vue-router'
import {onMounted, ref} from 'vue'

const codeContent = ref('')

const route = useRoute()

const renderCode = (fileId, filename) => {
    axios.get(panUtil.getPreviewUrl(fileId)).then(res => {
        if (res.status === 200) {
            codeContent.value = res.data
            layui.use('code', function () {
                layui.code({
                    elem: '.layui-code.code-text',
                    title: filename,
                    encode: false,
                    about: false
                })
            })
        } else {
            codeContent.value = '获取资源失败'
        }
    }).catch(err => {
        codeContent.value = '获取资源失败'
    })
}

const init = () => {
    let fileId = route.params.fileId,
        filename = route.query.filename
    renderCode(fileId, filename)
}

onMounted(() => {
    init()
})

</script>

<style scoped>

.code-text-content {
    width: 100%;
    margin-top: 62px;
    display: block;
    text-align: center;
}

.layui-code.code-text {
    width: 60%;
    display: inline-block;
    text-align: left;
    overflow: auto;
}

</style>
