import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import master from '@/components/master/master.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children: [
        {path: '', name: 'post-list', component: resolve => require(['../components/post-list.vue'], resolve)}
      ]
    },
    // {path: '/login', component: resolve => require(['../components/login.vue'], resolve)},
    {
      path: '/master',
      component: master,
      children: [
        {path: '', redirect: {name: 'post-all'}},
        {path: 'post/all', name: 'post-all', component: resolve => require(['../components/master/post-all.vue'], resolve)},
        {path: 'post/add', name: 'post-add', component: resolve => require(['../components/master/post-add.vue'], resolve)},
        {path: 'post/add/:id', name: 'post-edit', component: resolve => require(['../components/master/post-add.vue'], resolve)}
      ]
    },
    {
      path: '/*',
      name: 'Error404',
      component: resolve => require(['../components/Error404.vue'], resolve)
    }
  ]
})
