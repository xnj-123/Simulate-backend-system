<template>
    <div class="tour_container">
        <div class="tourist">
            <div class="title">
                <p class="news">实时游客统计</p>
                <p class="elc"></p>
            </div>
            <p class="order">可预约总量999999人</p>
            <div class="tourData">
                <span v-for="(item, index) in people" :key="index">{{ item }}</span>
            </div>
            <div class="charts" ref="charts">123</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill'

let people = ref('215908人');
let charts = ref();
let value = ref<number>(0.5)

const getWaterBall = (water:any)=>{
    let mycharts = echarts.init(water);
    mycharts.setOption({
        title: [
            {
                text: `{a|${value.value * 100}%}`,
                subtext: "预销量",
                top: "center",
                left: "center",
                subtextStyle: {
                    color: "#fff",
                    fontSize: 23,
                    fontWeight: 600,
                    fontFamily: "PingFangSC-Regular",
                    top: "center"
                },
                itemGap: -10, //主副标题间距
                textStyle: {
                    fontWeight: "normal",
                    rich: {
                        a: {
                            padding: [30, 0, 70, 0],
                            fontWeight: "normal",
                            fontSize: 36,
                            color: "#fff",
                            fontFamily: "DINAlternate-Bold",
                            textShadow: [5, 5, 10, "#7ff06fff"]
                        },
                    }
                }
            }],
        angleAxis: {
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            min: 0,
            max: 100,
            boundaryGap: ["1000", "100"]
        },
        radiusAxis: {
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            data: ['a', 'b', 'c'],
            z: 10
        },
        polar: {
            radius: '100%'
        },
        series: [
            {
            type: 'bar',
            data: [, , value.value * 100], //修改数据
            coordinateSystem: 'polar',
            barMaxWidth: 20,
            z: 2,
            name: '',
            color: '#1779ee',
            barGap: '-100%',
        },
        {
            type: "bar",

            data: [, , 100],
            coordinateSystem: 'polar',
            barMaxWidth: 20,
            z: -2,
            name: '',

            color: '#f0f0f0',
            barGap: '-100%',

        },
        {
            type: 'liquidFill',
            radius: '70%',
            center: ['50%', '50%'],
            color: [
                {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 1,
                        color: 'rgba(2, 159, 200, 1)'
                    }, {
                        offset: 0.5,
                        color: 'rgba(0, 186, 211, .5)'
                    }, {
                        offset: 0,
                        color: 'rgba(0, 230, 220, 1)'
                    }],
                },],
            data: [value, value.value - 0.1, value.value - 0.15], // data个数代表波浪数
            backgroundStyle: {
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0)',
                color: 'rgba(255, 255, 255, 0)',
            },
            outline: {
                show: false,
            },
            label: {
                show: false,
            },
        },],
        tooltip: {
            show: false
        },

    })
}

onMounted(() => {
    getWaterBall(charts.value);
})
</script>

<style scoped lang='scss'>
.tour_container {
    width: 100%;
    height: 100%;
    padding: 15px 30px;

    .tourist {
        background: url(../../images/dataScreen-main-rt.png) no-repeat;
        background-size: cover;
        height: 100%;
        width: 100%;

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

        .order {
            margin-right: 15px;
            float: right;
            color: white;
        }

        .tourData {
            clear: both;
            background-color: center;
            display: flex;
            justify-content: center;
            margin-top: 40px;

            span {
                background: url(../../images/total.png);
                width: 60px;
                height: 60px;
                text-align: center;
                line-height: 60px;
                color: #58BEDA;
                font-size: 30px;
                font-weight: 600;
            }
        }

        .charts {
            height: 240px;
            margin-top: 15px;
        }
    }
}
</style>