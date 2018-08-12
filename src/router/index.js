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
        {path: '', name: 'cover', component: resolve => require(['../components/post-list.vue'], resolve)}
      ]
    },
    {path: '/login', component: resolve => require(['../components/login.vue'], resolve)},
    {
      path: '/master',
      component: master,
      children: [
        {path: '', redirect: '/master/statistic'},
        {path: 'statistic', name: 'statistic', component: resolve => require(['../components/master/statistic.vue'], resolve)},
        {path: 'post', redirect: '/master/post/list'},
        {path: 'post/list', name: 'post-list', component: resolve => require(['../components/master/post-list.vue'], resolve)},
        {path: 'post/add', name: 'post-add', component: resolve => require(['../components/master/post-add.vue'], resolve)},
        {path: 'post/preview/:postId', name: 'post-preview', component: resolve => require(['../components/master/post-preview.vue'], resolve)},
        {path: 'post/edit/:postId', name: 'post-edit', component: resolve => require(['../components/master/post-add.vue'], resolve)}
      ]
    },
    {
      path: '/*',
      name: 'Error404',
      component: resolve => require(['../components/Error404.vue'], resolve)
    }
  ]
})
