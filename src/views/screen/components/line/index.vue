<template>
    <div class="line">
        <div class="title">
            <span class="news">未来30天游客量趋势图</span>
            <p class="elc"></p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

let charts = ref();

onMounted(() => {
    let xLabel = ['3.26', '3.27', '3.28', '3.29', '3.30', '3.31']
    let goToSchool = ["40", "60", "22", "85", "50", "40"]


    let mycharts = echarts.init(charts.value);
    mycharts.setOption({
        tooltip: {
            trigger: "axis",
            backgroundColor: "#202630",
            borderColor: "#202630",
            textStyle: {
                color: "#fff",
                fontSize: 12,
            },
            axisPointer: {
                type: "line",
                lineStyle: {
                    type: "solid",
                },
            },
            formatter: function (params:any) {
                return params[0].name + ':<br/>' + params[0].value + '万';
            },
        },

        grid: {
            top: '15%',
            left: '10%',
            right: '10%',
            bottom: '15%',
            // containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                    color: '#233653'
                },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
                textStyle: {
                    color: '#91aac4',
                    padding: 16,
                    fontSize: 14
                },
                formatter: function (data:any) {
                    return data
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#192a44'
                },
            },
            axisTick: {
                show: false,
            },
            data: xLabel
        }],
        yAxis: [{
            name: '',
            nameTextStyle: {
                color: "#91aac4",
                fontSize: 16,
                padding: 10
            },
            min: 0,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(33, 57, 93,.9)',
                },
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#233653"
                }

            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#91aac4',
                    padding: 16
                },
                formatter: function (value:any) {
                    if (value === 0) {
                        return value
                    }
                    return value + '万'
                }
            },
            axisTick: {
                show: false,
            },
        }],
        series: [{
            name: '上学',
            type: 'line',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 8,
            smooth: true,
            lineStyle: {
                normal: {
                    width: 2,
                    color: "rgba(25,163,223,1)", // 线条颜色
                },
                borderColor: 'rgba(0,0,0,.4)',
            },
            itemStyle: {
                color: "#b7f9ff",
                borderColor: "#2185da",
                borderWidth: 3,
                shadowColor: 'rgba(22, 137, 229)',
                shadowBlur: 14

            },
            tooltip: {
                show: true
            },
            areaStyle: { //区域填充样式
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(25,163,223,.3)"
                    },
                    {
                        offset: 1,
                        color: "rgba(25,163,223, 0)"
                    }
                    ], false),
                    shadowColor: 'rgba(25,163,223, 0.5)', 
                    shadowBlur: 20 
                }
            },
            data: goToSchool
        }]
    })
})

</script>

<style scoped lang='scss'>
.line {
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    padding:20px;
    .title {
        .news {
            font-size: 18px;
            color: white;
        }

        .elc {
            margin-top: 5px;
            width: 68px;
            height: 7px;
            background: url(../../images/dataScreen-title.png) no-repeat;
            background-size: cover;
        }
    }
    .charts{
        height:180px;
    }
}
</style>