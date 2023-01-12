<template>

  <div>
    <!--    <el-button @click="rerender" >重新渲染</el-button>-->
    <div id="myChart" style=" width:1100px; height:570px;"></div>
  </div>

</template>

<script>
export default {
  name: 'Echarts',
  props: {
    datas: {
      type: Array,
      default: null,
    },
    links: {
      type: Array,
      default: null,
    },
    categories: {
      type: Array,
      default: null,
    },


  },
  data() {
    return {
      myChart: "",
      types: ['熟练', '掌握', '理解', '了解'],
    }

  },


  mounted() {
    this.$nextTick(function () {
      this.montheahcrt()
    });
  },


  methods: {
    // 重新渲染数据,供父组件查询数据后调用
    rerender(){
      console.log("调用成功")
      this.montheahcrt()
    },
    montheahcrt() {
      this.myChart = this.$echarts.init(document.getElementById('myChart'))

      for (var i = 0; i < this.types.length; i++) {
        this.categories[i] = {
          name: this.types[i]
        }
      }

      let option = {

        animationDurationUpdate: 1500,//数据更新动画的时长。
        animationEasingUpdate: 'quinticInOut',//数据更新动画的缓动效果。
        color: ['#008000', '#cc6633', '#c00', '#ccc'],
        title: {
          text: '掌握情况：', // 正标题
          bottom: '20px', // 上下位置
          left: '20px', // 左右位置
          textStyle: { // 图例文字的样式
            fontSize: 16,
            fontWeight: 550,
            color: '#666'
          }
        },
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        legend: [{
          // selectedMode: 'single',
          // 图例位置
          bottom: '20px',
          left: '100px',
          textStyle: { // 图例文字的样式
            fontSize: 16,
            fontWeight: 550,
            color: '#666'
          },
          icon: 'circle', //  'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
          itemGap: 36, // 图例之间的间距
          data: this.categories.map(function (a) {
            return a.name
          })
        }],

        series: [{
          type: 'graph', // 类型:关系图
          layout: 'force', // 图的布局，类型为力导图
          focusNodeAdjacency: true, // 当鼠标移动到节点上，突出显示节点以及节点的边和邻接节点
          draggable: true, // 指示节点是否可以拖动
          symbolSize: 44, // 调整节点的大小
          roam: 'scale', // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          // edgeSymbol: ['circle', 'arrow'], // 边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
          edgeSymbolSize: [2, 10], // 边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
          edgeLabel: {
            normal: {
              show: false,
              formatter: function (x) {
                return x.data.name
              },
              textStyle: {
                fontSize: 11,
                color: '#666666'
              }
            }
          },
          force: { //力引导图基本配置
            layoutAnimation: true,
            // xAxisIndex : 0, //x轴坐标 有多种坐标系轴坐标选项
            // yAxisIndex : 0, //y轴坐标
            gravity: 0.06, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
            edgeLength: 36, //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
            repulsion: 300 //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。

          },
          lineStyle: {
            normal: {
              width: 2,
              // color: '#4b565b',
              color: 'target', // 决定边的颜色是与起点相同还是与终点相同
              curveness: 0.1,
              type: 'solid' // 'dotted'点型虚线 'solid'实线 'dashed'线性虚线
            }
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{b}',
            textStyle: {
              fontSize: 11,
              fontWeight: 560,
              color: '#666'
            }
          },
          // 数据
          data: this.datas,
          links: this.links,
          categories: this.categories
        }],

      }


      this.myChart.setOption(option, true);
      // 让图表跟随屏幕自动的去适应
      window.addEventListener('resize', () => {
        this.myChart.resize();
      })

    },


  },


}
</script>

<style scoped>

#myChart{
  width:1100px;
  height:570px;
  background: rgba(242, 242, 242, 1);
}

</style>
