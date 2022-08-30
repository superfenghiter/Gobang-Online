import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        component: () => import('@/views/Login.vue')
    }, {
        path: '/',
        component: () => import('@/views/Layout.vue'),
        children: [{
            path: '/game',
            name: 'game',
            component: () => import('@/views/Game.vue')
        }, {
            path: '/settings',
            name: 'settings',
            component: () => import('@/views/Settings.vue')
        }, {
            path: '/about',
            name: 'about' ,
            component: () => import('@/views/About.vue')
        }]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router