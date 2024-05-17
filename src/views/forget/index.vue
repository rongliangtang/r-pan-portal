<template>
    <div class="content">
        <div class="steps-content">
            <el-steps :active="currentStep" direction="vertical" finish-status="success"
                      :process-status="processStatus">
                <el-step title="校验用户名"></el-step>
                <el-step title="校验密保答案"></el-step>
                <el-step title="修改密码"></el-step>
            </el-steps>
        </div>
        <div class="form" v-if="currentStep === 1">
            <h2>R Pan 校验用户名</h2>
            <div class="forget-form-content">
                <div class="forget-form-item">
                    <label>
                        <span>用户名</span>
                        <input type="text" v-model="username" @keyup.enter="goStepTwo" ref="usernameEl"/>
                    </label>
                </div>
            </div>
            <el-button type="warning" class="submit" :loading="false" @click="goStepTwo" round>下一步</el-button>
            <div class="login-link-content">
                <el-link type="primary" @click="goLogin">去登陆</el-link>
            </div>
        </div>
        <div class="form" v-if="currentStep === 2">
            <h2>R Pan 校验密保答案</h2>
            <div class="forget-form-content">
                <div class="forget-form-item">
                    <label>
                        <span>您的密保问题为</span>
                        <div class="question-content">{{ question }}</div>
                    </label>
                    <label>
                        <span>您的密保答案为</span>
                        <input type="text" v-model="answer" @keyup.enter="goStepThree" ref="answerEl"/>
                    </label>
                </div>
            </div>
            <el-button type="warning" class="submit" :loading="loading" @click="goStepThree" round>下一步</el-button>
            <div class="login-link-content">
                <el-link type="primary" @click="goLogin">去登陆</el-link>
            </div>
        </div>
        <div class="form" v-if="currentStep === 3">
            <h2>R Pan 重置密码</h2>
            <div class="forget-form-content">
                <div class="forget-form-item">
                    <label>
                        <span>新密码</span>
                        <input type="password" v-model="newPassword" @keyup.enter="resetPassword" ref="newPasswordEl"/>
                    </label>
                    <label>
                        <span>确认密码</span>
                        <input type="password" v-model="reNewPassword" @keyup.enter="resetPassword"/>
                    </label>
                </div>
            </div>
            <el-button type="warning" class="submit" :loading="false" @click="resetPassword" round>提 交</el-button>
            <div class="login-link-content">
                <el-link type="primary" @click="goLogin">去登陆</el-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import {nextTick, onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import panUtil from '@/utils/common'
import {ElMessage} from 'element-plus'
import userService from '@/api/user'

const currentStep = ref(1)
const processStatus = ref('process')
const username = ref('')
const question = ref('')
const answer = ref('')
const newPassword = ref('')
const reNewPassword = ref('')
const loading = ref(false)
const token = ref('')
const router = useRouter()
const usernameEl = ref(null)
const answerEl = ref(null)
const newPasswordEl = ref(null)

onMounted(() => {
    usernameEl.value.focus()
})

const goStepOne = () => {
    loading.value = true
    currentStep.value = 1
    username.value = ''
    question.value = ''
    answer.value = ''
    newPassword.value = ''
    reNewPassword.value = ''
    token.value = ''
    processStatus.value = 'process'
    nextTick(function () {
        usernameEl.focus()
    })
    loading.value = false
}

const goStepTwo = () => {
    if (!username.value) {
        ElMessage.error('请输入要修改密码的用户名')
        return
    }
    loading.value = true
    userService.checkUsername({
        username: username.value
    }, res => {
        question.value = res.data
        currentStep.value = 2
        nextTick(function () {
            answerEl.value.focus()
            loading.value = false
        })
    }, res => {
        ElMessage.error(res.message)
        loading.value = false
    })
}

const goStepThree = () => {
    if (!answer.value) {
        ElMessage.error('请输入密保答案')
        return
    }
    loading.value = true
    userService.checkAnswer({
        username: username.value,
        question: question.value,
        answer: answer.value
    }, res => {
        token.value = res.data
        currentStep.value = 3
        nextTick(function () {
            newPasswordEl.value.focus()
            loading.value = false
        })
    }, res => {
        ElMessage.error(res.message)
        loading.value = false
    })
}

const goLogin = () => {
    router.push({name: 'Login'})
}

const checkPassword = () => {
    if (!panUtil.checkPassword(newPassword.value)) {
        ElMessage.error('请输入8-16位的密码')
        return false
    }
    if (!reNewPassword.value || newPassword.value !== reNewPassword.value) {
        ElMessage.error('两次密码输入不一致')
        return false
    }
    return true
}

const resetPassword = () => {
    if (!token.value) {
        ElMessage.error('由于您长时间未操作，将返回步骤一重新申请密码重置')
        goStepOne()
        return
    }
    if (checkPassword()) {
        loading.value = true
        userService.resetPassword({
            username: username.value,
            password: newPassword.value,
            token: token.value
        }, () => {
            loading.value = false
            processStatus.value = 'success'
            ElMessage.success('密码重置成功！即将跳转至登录页面')
            setTimeout(goLogin, 1000)
        }, res => {
            if (res.code === 2) {
                loading.value = false
                ElMessage.error('由于您长时间未操作，将返回步骤一重新申请密码重置')
                goStepOne()
            } else {
                loading.value = false
                ElMessage.error(res.message)
            }
        })
    }


}

</script>

<style scoped>

*, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

input {
    border: none;
    outline: none;
    background: none;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
}

.content {
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 900px;
    height: 550px;
    margin: -300px 0 0 -450px;
    background: #fff;
}

.form {
    position: relative;
    width: 640px;
    height: 100%;
    padding: 50px 30px 0;
}

button {
    display: block;
    margin: 0 auto;
    width: 260px;
    height: 36px;
    border-radius: 30px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
}

.img__text h2 {
    margin-bottom: 10px;
    font-weight: normal;
}

.img__text p {
    font-size: 14px;
    line-height: 1.5;
}

.img__btn span {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

h2 {
    width: 100%;
    font-size: 26px;
    text-align: center;
    font-weight: normal;
}

label {
    display: block;
    width: 260px;
    margin: 25px auto 0;
    text-align: center;
}

label span {
    font-size: 12px;
    color: #909399;
    text-transform: uppercase;
}

input {
    display: block;
    width: 100%;
    margin-top: 5px;
    padding-bottom: 5px;
    font-size: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    text-align: center;
}

.submit {
    margin-top: 40px !important;
}

.content {
    display: table;
}

.content .steps-content {
    padding: 20px 0 20px 10px;
    display: table-cell;
    vertical-align: middle;
}

.login-link-content {
    text-align: right;
}

.forget-form-content {
    width: 100%;
    height: 300px;
    display: table;
}

.forget-form-content .forget-form-item {
    display: table-cell;
    vertical-align: middle;
}

.forget-form-content .forget-form-item label {
    height: 90px;
}

.forget-form-content .forget-form-item .question-content {
    margin-top: 15px;
}
</style>