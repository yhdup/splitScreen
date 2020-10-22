<!--
 * @Author: Noah_hd
 * @Date: 2020-10-21 15:11:15
 * @LastEditors: Noah_hd
 * @LastEditTime: 2020-10-22 16:19:36
 * @Description: 
-->
<template>
  <div class="app">
    <el-button
      type="text"
      @click="outerVisible = true"
    >点击打开外层 Dialog</el-button>
    <el-dialog
      title="外层 Dialog"
      :visible.sync="outerVisible"
    >
      <div class="top">this is top box
        <div
          class="controlBtn"
          draggable="true"
        >
        </div>
      </div>
      <div class="footer">this is footer box</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      controlFlag: false,
      topBoxHeight: 0,
      bottomBoxHeight: 0,
      outerVisible: false
    }
  },
  watch: {
    outerVisible (now, old) {
      // console.log(now, old)
      if (now) {
        this.btnDrag()
      }
    }
  },
  mounted () {
  },
  methods: {
    btnDrag (e) {
      this.$nextTick(() => {
        this.topBoxHeight = document.getElementsByClassName('top')[0].offsetHeight
        this.bottomBoxHeight = document.getElementsByClassName('footer')[0].offsetHeight
        const controlBtn = document.getElementsByClassName('controlBtn')[0]
        controlBtn.onmousedown = (e) => {
          var disX = e.clientX - controlBtn.offsetLeft //clientX,Y鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标）
          var disY = e.clientY - controlBtn.offsetTop
          document.onmousemove = (e) => {
            var l = e.clientX - disX
            var t = e.clientY - disY
            controlBtn
            if (l < 0) { //防止div跑出可视框
              l = 0;
            } else if (l > document.documentElement.clientWidth - controlBtn.offsetWidth) {
              l = document.documentElement.clientWidth - controlBtn.offsetWidth;
            }
            if (t < 0) {
              t = 0;
            } else if (t > document.documentElement.clientHeight - controlBtn.offsetHeight) {
              t = document.documentElement.clientHeight - controlBtn.offsetHeight;
            }
            controlBtn.style.top = t + 'px'
            document.getElementsByClassName('top')[0].style.height = t + 'px'
            document.getElementsByClassName('footer')[0].style.height = this.bottomBoxHeight + this.topBoxHeight - t + 'px'
          }
          document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null
          }
          return false
        }
      })


    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background: #ccc;
}
.top {
  height: 30vh;
  background-color: rgb(108, 149, 108);
  border-bottom: 1px solid #ccc;
  position: relative;
  box-sizing: border-box;
}
.footer {
  height: 40vh;
  background-color: rgb(49, 86, 126);
  /* background-color: rgb(59, 59, 131); */
}
.controlBox {
  width: 100%;
  height: 30px;
  background-color: transparent;
  position: absolute;
  bottom: 0;
}
.controlBtn {
  background-color: #ccc;
  width: 30px;
  height: 20px;
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 99;
  /* transform: translateX(-50%); */
  transform: translate(-50%, -100%);
  /* cursor: ns-resize; */
}
</style>
