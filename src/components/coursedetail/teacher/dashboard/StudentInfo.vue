
<template>
  <div id="main" style="width:1130px;height:660px;"></div>
</template>
<script>
import * as echarts from 'echarts';
export default{
  data() {
    return {
      // ageYdata: ['31-40', '24-30', '18-23', '<18'],
      // sexYdata: [
      //   { value: 48, name: '男' },
      //   { value: 35, name: '女' },
      // ],
    }
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      var myChart = echarts.init(document.getElementById('main'));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '学生信息',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: "30px"
        },

        series: [
          {
            name: '性别',
            type: 'pie',
            selectedMode: 'single',
            radius: ['0%', '20%'],
            label: {
              position: 'inner',
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 48, name: '男' },
              { value: 35, name: '女' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: '年龄',
            type: 'pie',
            selectedMode: 'single',
            radius: ['30%', '55%'],
            label: {
              position: 'inner',
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 20, name: '18-23' },
              { value: 19, name: '24-30' },
              { value: 6, name: '>30' }  //初始时为选中状态
            ]
          },
          {
            name: '生源',
            type: 'pie',
            selectedMode: 'single',
            radius: ['68%', '85%'],
            data: [
              { value: 800, name: '江西' },
              { value: 400, name: '河南' },
              { value: 500, name: '河北' },
              { value: 200, name: '安徽' },
              { value: 300, name: '天津' },
              { value: 450, name: '山西' },
              { value: 270, name: '北京' },
              { value: 500, name: '山东' },
              { value: 200, name: '广东' },
              { value: 200, name: '广西' },
              { value: 400, name: '湖南' },
              { value: 200, name: '湖北' },
              { value: 500, name: '陕西' },
              { value: 360, name: '甘肃' },
              { value: 570, name: '四川' },
            ]
          }

        ]
      };

      myChart.setOption(option);

    },
  }
}
</script>

<style scoped>

</style>
