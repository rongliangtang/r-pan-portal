import {createRouter, createWebHistory} from 'vue-router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import {getToken} from '@/utils/cookie'
import userService from '@/api/user'
import {useUserStore} from '@/stores/user'
import {useFileStore} from '@/stores/file'
import {ElMessage} from 'element-plus'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Index',
            component: () => import('@/layout/index.vue'),
            children: [
                {
                    path: '/docs',
                    name: 'Docs',
                    component: () => import('@/views/list-page/doc/index.vue')
                },
                {
                    path: '/files',
                    name: 'Files',
                    component: () => import('@/views/list-page/file/index.vue')
                },
                {
                    path: '/imgs',
                    name: 'Imgs',
                    component: () => import('@/views/list-page/img/index.vue')
                },
                {
                    path: '/musics',
                    name: 'Musics',
                    component: () => import('@/views/list-page/music/index.vue')
                },
                {
                    path: '/recycles',
                    name: 'Recycles',
                    component: () => import('@/views/list-page/recycle/index.vue')
                },
                {
                    path: '/shares',
                    name: 'Shares',
                    component: () => import('@/views/list-page/share/index.vue')
                },
                {
                    path: '/videos',
                    name: 'Videos',
                    component: () => import('@/views/list-page/video/index.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login/index.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/register/index.vue')
        },
        {
            path: '/forget',
            name: 'Forget',
            component: () => import('@/views/forget/index.vue')
        },
        {
            path: '/share/:shareId',
            name: 'Share',
            component: () => import('@/views/share/index.vue')
        },
        {
            path: '/preview/code/:fileId',
            name: 'PreviewCode',
            component: () => import('@/views/preview/code/index.vue')
        },
        {
            path: '/preview/office/:fileId',
            name: 'PreviewOffice',
            component: () => import('@/views/preview/office/index.vue')
        },
        {
            path: '/preview/iframe/:fileId',
            name: 'PreviewIframe',
            component: () => import('@/views/preview/iframe/index.vue')
        },
        {
            path: '/preview/music/:parentId/:fileId',
            name: 'PreviewMusic',
            component: () => import('@/views/preview/music/index.vue')
        },
        {
            path: '/preview/video/:parentId/:fileId',
            name: 'PreviewVideo',
            component: () => import('@/views/preview/video/index.vue')
        },
        {
            path: '/500',
            name: 'Error500',
            component: () => import('@/views/error/500/index.vue')
        },
        {
            path: '/404',
            name: 'Error404',
            component: () => import('@/views/error/404/index.vue')
        },
        {path: '/:pathMatch(.*)*', redirect: '/404', hidden: true}
    ]
})

const toIndexPageList = ['Login', 'Register', 'Forget'],
    whiteList = ['Login', 'Register', 'Forget', 'Share', 'Error404', 'Error500']

router.beforeEach((to, from, next) => {
    NProgress.start()
    const hasToken = getToken()
    const userStore = useUserStore()
    const fileStore = useFileStore()
    if (hasToken) {
        if (toIndexPageList.indexOf(to.name) !== -1) {
            next({name: 'Index'})
        } else {
            let redirect = from.query.redirect
            if (!redirect || to.path === redirect) {
                // 防止有token直接跳转首页的情况下没有初始化用户信息的情况
                if (!userStore.username) {
                    userService.info(res => {
                        fileStore.setParentId(res.data.rootFileId)
                        fileStore.setDefaultParentId(res.data.rootFileId)
                        fileStore.setDefaultParentFilename(res.data.rootFilename)
                        userStore.setUsername(res.data.username)
                        next()
                    }, res => {
                        ElMessage.error(res.message)
                    })
                } else {
                    next()
                }
            } else {
                next({
                    path: redirect
                })
            }
        }
    } else {
        if (whiteList.indexOf(to.name) !== -1) {
            next()
        } else {
            next({
                name: 'Login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }
    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
