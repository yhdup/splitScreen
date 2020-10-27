<!--
 * @Author: Noah_hd
 * @Date: 2020-10-21 15:11:15
 * @LastEditors: Noah_hd
 * @LastEditTime: 2020-10-27 10:43:36
 * @Description: 

 使用注意：
 1、在引用此组件时，包裹此组件的dom需要有宽高
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
      class="xAxisDrag"
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
      dragSwitch: '',//拖拽控制器
      firstQuadrantSize: 0,//第一象限盒子的宽度或者高度
      secondQuadrantSize: 0,//第二象限盒子的宽度或者高度

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
    /**
     * @des :背景颜色，分别为两个盒子的背景颜色
     */
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
    this.dragControl()
    console.log(this.firstBoxSize, this.secondBoxSize, "++++")
  },
  methods: {
    /**
     * @des ：拖拽事件
     * 
     */
    dragControl (e) {
      this.$nextTick(() => {
        console.log(this.splitType, "******")
        //根据拖拽类型，来给第一象限和第二象限的盒子size赋值和给控制器赋值
        switch (this.splitType) {
          case 'xAxis':
            this.firstQuadrantSize = document.getElementsByClassName('leftBox')[0].offsetWidth
            this.secondQuadrantSize = document.getElementsByClassName('rightBox')[0].offsetWidth
            this.dragSwitch = document.getElementsByClassName('xAxisControl')[0]
            break
          case 'yAxis':
            this.firstQuadrantSize = document.getElementsByClassName('top')[0].offsetHeight
            this.secondQuadrantSize = document.getElementsByClassName('footer')[0].offsetHeight
            this.dragSwitch = document.getElementsByClassName('controlBtn')[0]
            break
        }
        // 控制器移入移出效果
        this.dragSwitch.onmouseover = () => {
          this.dragSwitch.style.backgroundColor = "#646464"
        }
        this.dragSwitch.onmouseleave = () => {
          this.dragSwitch.style.backgroundColor = "#ccc"
        }
        //控制器鼠标事件模拟drag
        this.dragSwitch.onmousedown = (e) => {
          var disX = e.clientX - this.dragSwitch.offsetLeft //clientX,Y鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标）
          var disY = e.clientY - this.dragSwitch.offsetTop
          document.onmousemove = (e) => {
            var l = e.clientX - disX
            var t = e.clientY - disY

            //根据 拖拽类型来分别处理x轴和y轴拖拽  主要是区分给宽度或高度
            if (this.splitType === 'xAxis') {
              if (l < 0) {
                l = 0;
              } else if (l > this.firstQuadrantSize + this.secondQuadrantSize) {
                l = this.firstQuadrantSize + this.secondQuadrantSize;
              }
              document.getElementsByClassName('leftBox')[0].style.width = l + 'px'
              document.getElementsByClassName('rightBox')[0].style.width = this.secondQuadrantSize + this.firstQuadrantSize - l + 'px'
            } else if (this.splitType === 'yAxis') {
              if (t < 0) {
                t = 0;
              } else if (t > this.firstQuadrantSize + this.secondQuadrantSize) {
                t = this.firstQuadrantSize + this.secondQuadrantSize;
              }
              document.getElementsByClassName('top')[0].style.height = t + 'px'
              document.getElementsByClassName('footer')[0].style.height = this.secondQuadrantSize + this.firstQuadrantSize - t + 'px'
            }
          }
          // 鼠标抬起
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
.xAxisDrag {
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
