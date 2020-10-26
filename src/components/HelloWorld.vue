<!--
 * @Author: Noah_hd
 * @Date: 2020-10-21 15:11:15
 * @LastEditors: Noah_hd
 * @LastEditTime: 2020-10-26 11:27:04
 * @Description: 
-->
<template>
  <div class="app">
    <el-button
      type="text"
      @click="YaxisVisible = true"
    >打开上下滑动分屏</el-button>

    <el-dialog
      title="外层 Dialog"
      :visible.sync="YaxisVisible"
    >
      <div class="top">this is top box
        <div class="controlBtn">
        </div>
      </div>
      <div class="footer">this is footer box</div>
    </el-dialog>
    <el-button
      type="text"
      @click="XaxisVisible = true"
    >打开左右滑动分屏</el-button>
    <el-dialog
      title="外层 Dialog"
      :visible.sync="XaxisVisible"
    >
      <div class="XaxisBox">
        <div class="leftBox">
          this is left box
          <div class="xAxisControl">

          </div>
        </div>
        <div class="rightBox">
          this is right box
        </div>
      </div>
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
      YaxisVisible: false,
      XaxisVisible: false,
      leftBoxWidth: 0,
      rightBoxWidth: 0

    }
  },
  watch: {
    YaxisVisible (nowVal, oldVal) {
      // console.log(now, old)
      if (nowVal) {
        this.btnDrag()
      }
    },
    XaxisVisible (nowVal, oldVal) {
      if (nowVal) {
        this.xAxisDrag()
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
            if (t < 0) {
              t = 0;
            } else if (t > this.topBoxHeight + this.bottomBoxHeight) {
              t = this.topBoxHeight + this.bottomBoxHeight;
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


    },
    xAxisDrag (e) {
      this.$nextTick(() => {
        this.leftBoxWidth = document.getElementsByClassName('leftBox')[0].offsetWidth
        this.rightBoxWidth = document.getElementsByClassName('rightBox')[0].offsetWidth
        const xAxisControl = document.getElementsByClassName('xAxisControl')[0]
        xAxisControl.onmousedown = (e) => {
          var disX = e.clientX - xAxisControl.offsetLeft //clientX,Y鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标）
          var disY = e.clientY - xAxisControl.offsetTop
          document.onmousemove = (e) => {
            var l = e.clientX - disX
            var t = e.clientY - disY
            if (l < 0) {
              l = 0;
            } else if (l > this.leftBoxWidth + this.rightBoxWidth) {
              l = this.leftBoxWidth + this.rightBoxWidth;
              // console.log(1111111)
            }
            xAxisControl.style.left = l + 'px'
            document.getElementsByClassName('leftBox')[0].style.width = l + 'px'
            document.getElementsByClassName('rightBox')[0].style.width = this.rightBoxWidth + this.leftBoxWidth - l + 'px'
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
  cursor: ns-resize;
}
.XaxisBox {
  display: flex;
  flex-direction: row;
}
.leftBox {
  width: 30vw;
  background-color: burlywood;
  height: 50vh;
  position: relative;
}
.rightBox {
  width: 20vw;
  background-color: rgb(192, 146, 146);
  height: 50vh;
}
.xAxisControl {
  background-color: #ccc;
  width: 30px;
  height: 20px;
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 100%;
  transform: translate(-100%, -50%);
  cursor: ew-resize;
}
</style>
