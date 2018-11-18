import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/v2/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children: [
        {path: '', name: 'post-list', component: resolve => require(['../components/v2/post-list.vue'], resolve)},
        {path: '/:id', name: 'post-detail', component: resolve => require(['../components/v2/post-detail.vue'], resolve)}
      ]
    },
    {
      path: '/*',
      name: 'Error404',
      component: resolve => require(['../components/Error404.vue'], resolve)
    }
  ]
})
