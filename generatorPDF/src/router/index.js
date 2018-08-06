import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: resolve => require(['@/components/Index'], resolve),
    name: '主页',
    meta: {
      background: 'gray',
      isShowBar: true,
      keepAlive: true
    }
  }

]
// let loading = ''
const router = new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  linkActiveClass: 'active',
  routes
})
// let menuList = sessionStorage.getItem('menuList')
router.beforeEach(async (to, from, next) => {
  // await this.$role.validateNoAudit('searchItem')

  // if (to.meta.code) {
  //   let pages = Cain.getParam('noRulePages')
  //   if (!Cain.isBlank(pages)) {
  //     pages = pages.split(',')
  //     for (let item of pages) {
  //       if (item === to.meta.code) {
  //         router.push('/login')
  //         return false
  //       }
  //     }
  //   }
  // }
  next()
})
router.afterEach((to, from) => {
  document.title = to.name
})

export default router
