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
        {path: '', name: 'index', component: resolve => require(['../components/article-list.vue'], resolve)}
      ]
    },
    {path: '/login', component: resolve => require(['../components/login.vue'], resolve)},
    {
      path: '/master',
      component: master,
      children: [
        {path: '', redirect: '/master/statistic'},
        {path: 'statistic', name: 'statistic', component: resolve => require(['../components/master/statistic.vue'], resolve)},
        {path: 'article', redirect: '/master/article/list'},
        {path: 'article/list', name: 'article-list', component: resolve => require(['../components/master/article-list.vue'], resolve)},
        {path: 'article/add', name: 'article-add', component: resolve => require(['../components/master/article-add.vue'], resolve)},
        {path: 'article/preview/:articleId', name: 'article-preview', component: resolve => require(['../components/master/article-preview.vue'], resolve)},
        {path: 'article/edit/:articleId', name: 'article-edit', component: resolve => require(['../components/master/article-add.vue'], resolve)}
      ]
    },
    {
      path: '/*',
      name: 'Error404',
      component: resolve => require(['../components/Error404.vue'], resolve)
    }
  ]
})
