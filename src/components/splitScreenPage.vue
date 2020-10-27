<!--
 * @Author: Noah_hd
 * @Date: 2020-10-26 15:58:18
 * @LastEditors: Noah_hd
 * @LastEditTime: 2020-10-27 09:51:59
 * @Description: 
-->
<!--  -->
<template>
  <div class='appBox'>

    <h2>这是分屏页面</h2>
    <splitScreen
      :splitType="'xAxis'"
      :firstBoxSize="firstBoxSize"
      :secondBoxSize="secondBoxSize"
      :bgcolor="bgcolor"
    >
      <template v-slot:top>
        toptoptoptoptoptoptop
      </template>
      <template v-slot:footer>
        footerfooterfooterfooter
      </template>
      <template v-slot:left>
        leftleftleftleftleft
      </template>
      <template v-slot:right>
        rightrightrightright
      </template>
    </splitScreen>
    <div class="box"></div>

  </div>
</template>

<script>
import splitScreen from '@/components/splitScreen'
export default {
  components: { splitScreen },
  data () {
    return {
      firstBoxSize: { width: '80%', height: '20%' },
      secondBoxSize: { width: '80%', height: '70%' },
      bgcolor: { first: 'rgb(49, 86, 126)', second: 'rgb(108, 149, 108)' }
    };
  },
  computed: {},
  watch: {},
  methods: {

  },
  created () {

  },
  mounted () {

  },
}
</script>
<style lang='' scoped>
.appBox {
  width: 70vw;
  height: 80vh;
  background-color: rgb(199, 139, 139);
}
.box {
  /* width: 300px;
  height: 300px;
  background-color: red; */
}
</style>