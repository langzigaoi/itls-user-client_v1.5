<template>
  <div>
    <el-button :type="task" size="mini" @click="clickt">作业成绩分析</el-button>
    <el-button :type="WrongQuestion" size="mini" @click="clickq">错题分析</el-button>
    <div id="main" style="width: 100%; height: 500px"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      title: '',
      task: '',
      WrongQuestion: '',
      series: '', //echarts数据对象
      xData: [
        '不及格',
        '60-69',
        '70-79',
        '80-89',
        '>=90',
      ], //X轴坐标数据
      yData: ['0','5','10','15','20','25','30','35','40'],
      danwei: '', //y显示的刻度和单位
    }
  },
  mounted() {
    this.clickt()
    this.draw()
  },
  methods: {
    clickt() {
      ;(this.task = 'primary'), (this.WrongQuestion = '')
      // this.title = '作业成绩分析'
      ;(this.series = [
        {
          name: '第一次作业',
          type: 'bar',
          data:['44','67','88','92','83','75','63','97','90'],
          barGap: "0%", // 两个柱子之间的距离相对于柱条宽度的百分比;
          barCategoryGap: "40%" // 每侧空余的距离相对于柱条宽度的百分比
        },
        {
          name: '第二次作业',
          type: 'bar',
          data: ['71','56','45','89','91','97','42','65','81'],
          barGap: "0%",
          barCategoryGap: "40%"
        },
        {
          name: '第三次作业',
          type: 'bar',
          data: ['95','57','67','88','91','99','50','60','49'],
          barGap: "0%",
          barCategoryGap: "40%"
        },
        {
          name: '第四次作业',
          type: 'bar',
          data: '78',
          barGap: "0%",
          barCategoryGap: "40%"
        },
      ]),
          (this.danwei = { formatter: '{value}' })
      this.draw()
    },
    clickq() {
      ;(this.task = ''), (this.WrongQuestion = 'primary')
      // this.title = '错题分析'
      this.series = [
        {
          name: '张三',
          type: 'line',
          data: '74',
        },
        {
          name: '李四',
          type: 'line',
          data: '64',
        },
      ]
      // this.danwei = { formatter: '{value}' }
      this.draw()
      console.log(this.series)
    },
    draw() {
      var chartDom = document.getElementById('main')
      var myChart = echarts.init(chartDom)
      myChart.clear()
      myChart.setOption(this.option())
      // echarts表格自适应!!
      setTimeout(function () {
        window.onresize = function () {
          myChart.resize();
        };
      }, 200);
    },
    option() {
      var option = {
        title: {
          text: this.title,
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        legend: {
          left: 'left',
        },
        xAxis: {
          type: 'category',
          name: '分数',
          splitLine: { show: false },
          data: this.xData,

        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        yAxis: {
          type: 'value',
          name: '人数',
          minorSplitLine: {show: true },
          data:this.yData,
          axisLabel: this.danwei,
        },
        series: this.series,
      }
      return option
    },
  },
}
</script>

<style lang="scss" scoped></style>
