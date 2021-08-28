import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     setTimeout(() => {
  //       document.body.scrollTop = document.documentElement.scrollTop = savedPosition.y || 0
  //     }, 300)
  //     // return savedPosition  // 游览器返回记住位置
  //   } else {
  //     document.body.scrollTop = document.documentElement.scrollTop = 0 // 滚动到顶
  //     // return { x: 0, y: 0 } // 滚动到顶
  //   }
  // },
  routes: [
    {
      name: 'home',
      path: '/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/home/Index'))
        }, 'home')
      }
    },

    {
      name: 'category',
      path: '/category/:id',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/category/Index'))
        }, 'category')
      }
    },

    {
      name: 'detail',
      path: '/detail/:id',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/detail/Index'))
        }, 'detail')
      }
    },
    
    // 个人中心
    {
      name: 'my',
      path: '/my',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/Index'))
        }, 'my')
      }
    },


    {
      name: 'aboutus',
      path: '/aboutus',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/other/Aboutus'))
        }, 'aboutus')
      }
    },

    {
      name: 'address',
      path: '/address',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/other/Address'))
        }, 'address')
      }
    },
    {
      name: 'case',
      path: '/case',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/other/Case'))
        }, 'case')
      }
    },
    {
      name: 'caseDetail',
      path: '/caseDetail/:id',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/other/CaseDetail'))
        }, 'caseDetail')
      }
    },
    {
      name: 'fav',
      path: '/fav',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/other/Fav'))
        }, 'fav')
      }
    },
    
    
    // {
    //   name: '404',
    //   path: '/404',
    //   component: function (resolve) {
    //     require.ensure([], function () {
    //       resolve(require('pages/404.vue'))
    //     }, '404')
    //   }
    // },

    {
      path: '*',
      redirect: '/index'
    },

  ]
});

