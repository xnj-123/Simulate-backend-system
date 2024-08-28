<template>
    <div class="location">
        <div class="locationList">
            <span class="news">热门景区排行</span>
            <p class="elc"></p>
            <div class="charts" ref="charts"></div>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
let charts = ref()
onMounted(() => {
    const category = [
        { name: '县纪委', value: 123 },
        { name: '组织部', value: 108 },
        { name: '县委办', value: 103 },
        { name: '县人大', value: 93 },
        { name: '县政协', value: 83 },
        { name: '宣传部', value: 73 },
        { name: '统战部', value: 63 },
        { name: '政法委', value: 53 },
        { name: '信访局', value: 43 },
        { name: '人武部', value: 33 }
    ]; // 类别
    const total = 200; // 数据总数
    const a = ['20%', '40%', '60%', '80%', '100%'];
    var datas: any = [];
    category.forEach((value) => {
        datas.push(value.value);
    });
    const ydata = category.map((v) => v.name);

    let myecharts = echarts.init(charts.value);

    myecharts.setOption({
        grid: {
            left: '8%',
            top: '3%', // 设置条形图的边距
            right: '15%',
            bottom: '3%',
        },
        xAxis: {
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)',
                    type: 'dashed',
                },
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false,
                color: '#ABBFE3',
            },
            axisTick: {
                show: false,
            },
        },
        yAxis: [
            {
                type: 'category',
                inverse: true,
                data: ydata,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        verticalAlign: 'bottom',
                        color: '#299CD4',
                        fontSize: 14,
                        fontFamily: 'Microsoft YaHei',
                        align: 'left',
                        padding: [0, 0, 9, 10],
                    },
                    formatter: (name: any, index: any) => {
                        const _index = index + 1;
                        if (index == 0) {
                            return `${_index} ${name}`;
                        }
                        return `${_index} ${name}`
                    },
                },
                offset: 0,
            },
        ],
        series: [
            {
                // 内
                type: 'bar',
                barWidth: 14,
                barCateGoryGap: 20,
                legendHoverLink: false,
                silent: true,
                itemStyle: {
                    normal: {
                        barBorderRadius: 10,
                        color: function (params: any) {
                            var color;
                            if (params.dataIndex == 0) {
                                color = {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [
                                        {
                                            offset: 0,

                                            color: '#CF3537', // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: '#CF3537', // 100% 处的颜色
                                        },
                                    ],
                                };
                            } else if (params.dataIndex == 1) {
                                color = {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [
                                        {
                                            offset: 0,

                                            color: '#FFAF04', // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: '#FFAF04', // 100% 处的颜色
                                        },
                                    ],
                                };
                            } else if (params.dataIndex == 2) {
                                color = {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [
                                        {
                                            offset: 0,

                                            color: '#FFF600', // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: '#FFF600', // 100% 处的颜色
                                        },
                                    ],
                                };

                            }
                            else {
                                color = {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: '#299CD4', // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: '#299CD4', // 100% 处的颜色
                                        },
                                    ],
                                };
                            }
                            return color;
                        },
                    },
                },
                label: {
                    normal: {
                        show: false,
                        position: '[0, 0, 15, 10]',
                        formatter: '{b}',
                        textStyle: {
                            color: '#fff',
                            fontSize: 14,
                        },
                    },
                },
                data: category,
                z: 2,
                animationEasing: 'elasticOut',
            },
            {
                // 外边框
                type: 'pictorialBar',
                symbol: 'rect',
                symbolBoundingData: total,
                itemStyle: {
                    barBorderRadius: 10,
                    normal: {
                        color: 'none',
                    },
                },
                label: {
                    normal: {
                        padding: [0, 10, 0, 14],
                        formatter: (params: any) => {
                            var text = '{d| ' + params.data + '}{f|   ' + (params.data / total) * 100 + '%}';
                            return text;
                        },
                        rich: {
                            a: {
                                color: '#D5E9FF',
                            },
                            b: {
                                color: '#D5E9FF',
                            },
                            c: {
                                color: '#D5E9FF',
                            },
                            d: {
                                color: '#D5E9FF',
                            },
                            f: {
                                color: '##D5E9FF',
                            },
                        },
                        position: 'right',
                        distance: 1, // 向右偏移位置
                        show: true,
                    },
                },
                data: datas,
                z: 0,
                animationEasing: 'elasticOut',
            },
            {
                name: '外框',
                type: 'bar',
                barCateGoryGap: 20,
                barGap: '-100%', // 设置外框粗细
                data: [
                    total,
                    total,
                    total,
                    total,
                    total,
                    total,
                    total,
                    total,
                    total,
                    total,
                ],
                barWidth: 14,
                itemStyle: {
                    normal: {
                        color: '#1A3E82', // 填充色
                        barBorderColor: '#1A3E82', // 边框色
                        barBorderWidth: 0.1, // 边框宽度
                        barBorderRadius: 10, //圆角半径
                        label: {
                            // 标签显示位置
                            show: false,
                            position: 'top', // insideTop 或者横向的 insideLeft
                        },
                    },
                },
                z: 0,
            },
        ],
    })

})
</script>

<style scoped lang='scss'>
.location {
    padding: 15px 30px;

    .locationList {
        background: url(../../images/dataScreen-main-rc.png) no-repeat;
        height: 100%;
        background-size: cover;

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

        .charts {
            margin-top: 50px;
            height: 350px;
        }

    }


}
</style>