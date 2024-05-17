<template>
    <div class="page-404-content">
        <el-result title="页面丢失" sub-title="啊欧，页面被火星人偷走啦~~~">
            <template #icon>
                <el-image class="img-content" src="/src/assets/imgs/404.png"/>
            </template>
            <template #extra>
                <el-button type="primary" @click="goHome">Back</el-button>
            </template>
        </el-result>
    </div>
</template>

<script setup>
import panUtil from '@/utils/common'

const goHome = () => {
    panUtil.goHome()
}
</script>

<style scoped>
.page-404-content .img-content {
    width: 40em;
}
</style>