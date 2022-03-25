<template lang="">
  <div align="center">
    <br>
    <div id="myChart1" :style="{width: '800px', height: '300px'}"></div>
    <div id="myChart2" :style="{width: '800px', height: '300px'}"></div>
  </div>
</template>
<script>
  import * as echarts from 'echarts';

  export default {
    data() {
      return {
        grade: [],
        time: []
      }
    },
    mounted() {
      this.getExperimentGrade();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart1.setOption({
          title: { text: '分数统计分析' },
          tooltip: {},
          legend: {
            data: ['分数']
          },
          xAxis: {
            name: "实验序号",
            data: ["1", "2", "3", "4", "5", "6"]
          },
          yAxis: {
            name: "分数",
          },
          series: [{
            name: '分数',
            type: 'line',
            // data: [80, 70, 85, 88, 86, 82],
            data: this.grade,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            },
          }],
        });
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
        myChart2.setOption({
          title: { text: '时间统计分析' },
          series: [
            {
              name: '时间统计分析',
              type: 'pie',
              radius: '55%',
              roseType: 'angle',
              // data: [
              //   { value: 235, name: '第一次实验' },
              //   { value: 274, name: '第二次实验' },
              //   { value: 310, name: '第三次实验' },
              //   { value: 335, name: '第四次实验' },
              //   { value: 400, name: '第五次实验' },
              //   { value: 321, name: '第六次实验' },
              // ]
              data: this.time
            }
          ]
        })
      },
      getExperimentGrade() {
        this.$api.dashboard.dashboard.getExperimentGrade().then(res => {
          this.grade = res.data;
          this.getExperimentTime();
        })
      },
      getExperimentTime() {
        this.$api.dashboard.dashboard.getExperimentTime().then(res => {
          this.time = res.data;
          this.drawLine();
        })
      },
    }
  }
</script>
<style lang="">

</style>