<!--
 * @Author: Noah_hd
 * @Date: 2020-10-21 15:11:15
 * @LastEditors: Noah_hd
 * @LastEditTime: 2020-10-22 16:19:22
 * @Description: 
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}

</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
