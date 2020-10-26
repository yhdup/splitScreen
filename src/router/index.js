/*
 * @Author: Noah_hd
 * @Date: 2020-10-22 16:13:13
 * @LastEditors: Noah_hd
 * @LastEditTime: 2020-10-26 15:59:31
 * @Description: 
 */
import Vue from 'vue'
import Router from 'vue-router'
import splitScreen from '@/components/splitScreenPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'splitScreen',
      component: splitScreen
    }
  ]
})
