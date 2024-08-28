<template>
    <div class="mapContent">
        <div class="maptitle">
            <div class="title">
                <p>平台高峰预警信息(2条)</p>
            </div>
        </div>
        <div class="map" ref="map"></div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import ChinaMap from './china.json';

echarts.registerMap('China', (ChinaMap as any));
let map = ref();
onMounted(() => {
    let myecharts = echarts.init(map.value);
    myecharts.setOption({
        geo: {
            map: 'China',
            roam: true,
            zoom: 1.5,
            top: 140,
            label: {
                show: true,
                color: 'white',
                fontSize: '12px',
                fontWeight: 600,
            },
            emphasis: {
                label: {
                    color: 'black'
                },
                itemStyle: {
                    areaColor: 'skyblue'
                }
            },
            itemStyle: {
                areaColor: {
                    type: 'lineaer',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0, color: '#032553' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#003E87' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
                borderColor:'#21639B',
                
            }
        },
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        series: [
            {
                type: 'lines',//航线的系列
                polyline:true,
                data: [
                    {
                        coords: [
                            [116.405285, 39.904989],  // 起点
                            [119.306239, 26.075302],   // 终点
                            [114.298572,30.584355]  
                        ],
                        // 统一的样式设置
                        lineStyle: {
                            color: 'orange',
                            width: 5
                        }
                    },
                    {
                        coords: [
                            [116.405285, 39.904989],  // 起点
                            [114.298572,30.584355]   // 终点

                        ],
                        // 统一的样式设置
                        lineStyle: {
                            color: 'yellow',
                            width: 5
                        }
                    }
                ],
                lineStyle:{
                    type:'dashed'
                },
                //开启动画特效
                effect: {
                    show: true,
                    symbol: 'arrow',
                    color: 'black',
                    symbolSize: 10
                }
            }
        ]
    })
})

</script>

<style scoped lang='scss'>
.mapContent {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .maptitle {
        width: 622px;
        height: 44px;
        background: url(../../images/dataScreen-header-warn-bg.png) no-repeat;
        background-size: 100% 100%;
        margin-top: 36px;
        text-align: center;
        line-height: 44px;
        color: white;
    }

    .map {
        width: 100%;
        height: 700px;
    }
}
</style>