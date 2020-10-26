<!--
 * @Author: Noah_hd
 * @Date: 2020-10-21 15:11:15
 * @LastEditors: Noah_hd
 * @LastEditTime: 2020-10-26 18:27:04
 * @Description: 

 使用注意：
 1、在引用此组件时，包裹此组件的dom需要有高度
 2、总共有四个插槽可用，根据分屏方式两两配对，分别是 top footer 组合和left right组合
-->
<template>
  <div class="app">
    <div
      class="yaxisBox"
      v-if="splitType==='yAxis'"
    >
      <div
        class="top"
        :style="{
        width:firstBoxSize.width,
        height:firstBoxSize.height,
        backgroundColor:bgcolor.first
        }"
      >this is top box
        <slot name="top"></slot>
        <div class="controlBtn"></div>
      </div>
      <div
        class="footer"
        :style="{
        width:secondBoxSize.width,
        height:secondBoxSize.height,
         backgroundColor:bgcolor.second
        }"
      >this is footer box
        <slot name="footer"></slot>
      </div>
    </div>
    <div
      class="XaxisBox"
      v-if="splitType==='xAxis'"
    >
      <div class="leftBox">
        <slot name="left"></slot>
        this is left box
        <div class="xAxisControl"> </div>
      </div>
      <div class="rightBox">
        <slot name="right"></slot>
        this is right box
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      topBoxHeight: 0,
      bottomBoxHeight: 0,
      leftBoxWidth: 0,
      rightBoxWidth: 0

    }
  },
  props: {
    /**
     * @des :判断是上下还是左右分屏 xAxis：左右 yAxis:上下
     */
    splitType: {
      type: String,
      default () {
        return "xAxis"
      }
    },
    /**
     * @des ：第一象限的盒子宽高（top、left）
     */
    firstBoxSize: {
      type: Object,
      default () {
        return { width: '50%', height: '50%' }
      }
    },
    /**
    * @des ：第二象限的盒子宽高（right、bottom）
    */
    secondBoxSize: {
      type: Object,
      default () {
        return { width: '50%', height: '50%' }
      }
    },
    bgcolor: {
      type: Object,
      default () {
        return { first: '#fff', second: '#ccc' }
      }
    }
  },
  watch: {
  },
  mounted () {
    this.checkSplitType()
    console.log(this.firstBoxSize, this.secondBoxSize, "++++")
  },
  methods: {
    /**
     * @des :根据splitType判断是左右还是上下平移
     */
    checkSplitType () {
      if (this.splitType === 'xAxis') {
        this.xAxisDrag()
      } else if (this.splitType === 'yAxis') {
        this.btnDrag()
      }
    },
    btnDrag (e) {
      this.$nextTick(() => {
        this.topBoxHeight = document.getElementsByClassName('top')[0].offsetHeight
        this.bottomBoxHeight = document.getElementsByClassName('footer')[0].offsetHeight
        const controlBtn = document.getElementsByClassName('controlBtn')[0]
         controlBtn.onmouseover = () => {
          controlBtn.style.backgroundColor = "#646464"
        }
        controlBtn.onmouseleave = () => {
          controlBtn.style.backgroundColor = "#ccc"
        }
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
        xAxisControl.onmouseover = () => {
          xAxisControl.style.backgroundColor = "#646464"
        }
        xAxisControl.onmouseleave = () => {
          xAxisControl.style.backgroundColor = "#ccc"
        }
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
  width: 100%;
  height: 100%;
  background: #fff;
}
.top {
  background-color: rgb(108, 149, 108);
  border-bottom: 1px solid #ccc;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 12px;
}
.footer {
  background-color: rgb(49, 86, 126);
  /* background-color: rgb(59, 59, 131); */
}
/*  */
.controlBtn {
  background-color: #ccc;
  width: 50px;
  height: 8px;
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 99;
  border-radius: 10px;
  /* transform: translateX(-50%); */
  transform: translate(-50%, 2px);
  cursor: ns-resize;
}
.yaxisBox {
  position: relative;
  width: 100%;
  height: 100%;
}
.XaxisBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.leftBox {
  background-color: burlywood;
  position: relative;
  margin-right: 10px;
}
.rightBox {
  background-color: rgb(192, 146, 146);
}
.xAxisControl {
  background-color: #ccc;
  width: 8px;
  height: 50px;
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 100%;
  border-radius: 8px;
  transform: translate(1px, -50%);
  cursor: ew-resize;
}
</style>
