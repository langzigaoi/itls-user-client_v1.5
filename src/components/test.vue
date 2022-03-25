<template>
    <div>
        测试
        <div class="echart" id="curveEcharts"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    mounted(){
        // 基于准备好的dom，初始化ECharts实例
        var myChart = this.$echarts.init(document.getElementById('curveEcharts'));
       // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'Graph 简单示例'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph', //图表类型
                    layout: 'none',
                    symbolSize: 50,
                    roam: true,
                    label: {
                        show: true
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 20
                    },
                     //本系列的数据
                    data: [{
                        name: '节点1',
                        x: 300,
                        y: 300
                    }, {
                        name: '节点2',
                        x: 800,
                        y: 300
                    }, {
                        name: '节点3',
                        x: 550,
                        y: 100
                    }, {
                        name: '节点4',
                        x: 550,
                        y: 500
                    }],
                    // links: [],
                    links: [{
                        source: 0,
                        target: 1,
                        symbolSize: [5, 20],
                        label: {
                            show: true
                        },
                        lineStyle: {
                            width: 5,
                            curveness: 0.2
                        }
                    }, {
                        source: '节点2',
                        target: '节点1',
                        label: {
                            show: true
                        },
                        lineStyle: {
                            curveness: 0.2
                        }
                    }, {
                        source: '节点1',
                        target: '节点3'
                    }, {
                        source: '节点2',
                        target: '节点3'
                    }, {
                        source: '节点2',
                        target: '节点4'
                    }, {
                        source: '节点1',
                        target: '节点4'
                    }],
                    lineStyle: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        // 处理点击事件并且跳转到相应的百度搜索页面
        myChart.on('click', function (params) {
            console.log(params)
            //window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
            console.log(params)
        });
    }

}
</script>
<style scope>
.echart {
    width:600px;
    height:300px
}
</style>