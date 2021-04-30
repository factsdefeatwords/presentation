import { createRouter,createWebHistory  } from 'vue-router'

const router = createRouter({
  history:createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/component/index.vue'),
      children: [
        {
          path: '1',
          component: () => import('../views/component/1/index.vue')
        },
        {
          path: '2',
          component: () => import('../views/component/2/index.vue'),
          children: [
            {
              path: '1',
              component: () => import('../views/component/2/1/index.vue')
            },
          ]
        },
      ]
    }
  ]
})

export default router

