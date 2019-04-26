var noDataInterval = {};
;(function ($) {

    $.fn.echart = function (options, myChart) {

        // add by lugp 2017-11-03 start
        clearInterval(noDataInterval[myChart.id]);
        // add by lugp 2017-11-03 end

        /**
         * echart图表缺省配置项
         * @type {{theme: string, total: boolean, data: Array, tooltip: {trigger: string}, legend: {data: Array}, xAxis: {data: Array}, yAxis: {type: string}, series: Array, seriesType: {type: string}}}
         */
        var defaultOptions = {
            theme: "macarons",        //图表主题
            total: true,            //包含统计行
            data: [],               //图表数据来源集合(包含表头数据和表内容数据)
            type: true,             //图例和x轴的值的来源（默认为true：数据的第一行为x轴的值，第一列为图例；false则相反）

            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: []
            },
            xAxis: {
                data: []
            },
            yAxis: {
                type: 'value'
            },
            toolbox: {

                show: true,
                right:'3%',
                top: '10%',

                feature: {

                    saveAsImage: {

                        show:true,

                        backgroundColor:'transparent',

                        title :'保存图片',

                        excludeComponents :['toolbox'],

                        pixelRatio: 2

                    }

                }

            },
            series: [],

            /*seriesType: {
             type: "bar",
             barWidth: 30,
             label: {
             normal: {
             show: true,
             position: 'top'
             }
             }
             }*/

            seriesType: {
                type: "line"
                // markPoint: {
                //     data : [
                //         {type : 'max', name: '最大值'},
                //         {type : 'min', name: '最小值'}
                //     ]
                // },
                // markLine:  {
                //     data : [
                //         {type : 'average', name: '平均值'}
                //     ]
                // }
            }

        };

        var option = $.extend({}, defaultOptions, options);

        // add by lugp 2017-11-03 start
        if (option.data.length <= 0 && !decideDataOption(option)) {
            myChart.clear();
            //ehcarts图表无数据时的展现
            var noDataOption = {
                title: {
                    text: '暂无数据',
                    textStyle: {
                        fontWeight: 'bold',
                        fontSize: 36,
                        color: '#333'
                    },
                    left: 'middle',
                    top: 'middle'
                },
                legend: {
                    show: false,
                    data:['sin']
                },
                xAxis : [
                    {
                        show: false,
                        type : 'value',
                    }
                ],
                yAxis : [
                    {
                        show: false,
                        type : 'value',
                    }
                ],
                series : [
                    {
                        name:'sin',
                        type:'scatter',
                        large: true,
                        symbolSize: 20,
                        data: (function () {
                            var d = [];
                            var len = 100;
                            var x = 0;
                            while (len--) {
                                x = (Math.random() * 10).toFixed(3) - 0;
                                d.push([
                                    x,
                                    Math.random() * 10
                                ]);
                            }
                            return d;
                        })(),
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(25, 100, 150, 0.5)',
                                shadowOffsetY: 5,
                                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                    offset: 0,
                                    color: 'rgb(129, 227, 238)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(25, 183, 207)'
                                }])
                            }
                        }
                    }
                ]
            };

            myChart.setOption(noDataOption);

            noDataInterval[myChart.id] = setInterval(function (){

                var d = [];
                var len = 100;
                var x = 0;
                while (len--) {
                    x = (Math.random() * 10).toFixed(3) - 0;
                    d.push([
                        x,
                        Math.random() * 10
                    ]);
                }

                noDataOption.series[0].data = d;

                myChart.setOption(noDataOption);
            }, 2100);

            return this;
        }
        // add by lugp 2017-11-03 end

        //如果legend和xAxis都设置了值，直接显示图表
        if (option.legend.data && option.legend.data.length > 0 && option.xAxis.data && option.xAxis.data.length > 0) {
            // var myChart = echarts.init(this.get(0), option.theme);
            myChart.clear();
            myChart.setOption(option);

            return this;
        }

        //未传递data属性值，直接结束
        if (!option.data || option.data.length == 0) {
            return;
        }

        //根据data属性动态计算图表需要的数据
        if (option.type) {
            //数据的第一行为x轴的值，第一列为图例
            computeRowEchartData(option);
        } else {
            //数据的第一行为图例，第一列为x轴的值
            computeColEchartData(option);
        }

        // add by lugp 2017-11-03 start
        if (!decideDataOption(option)) {
            myChart.clear();
            //ehcarts图表无数据时的展现
            var noDataOption = {
                title: {
                    text: '暂无数据',
                    textStyle: {
                        fontWeight: 'bold',
                        fontSize: 36,
                        color: '#333'
                    },
                    left: 'middle',
                    top: 'middle'
                },
                legend: {
                    show: false,
                    data:['sin']
                },
                xAxis : [
                    {
                        show: false,
                        type : 'value',
                    }
                ],
                yAxis : [
                    {
                        show: false,
                        type : 'value',
                    }
                ],
                series : [
                    {
                        name:'sin',
                        type:'scatter',
                        large: true,
                        symbolSize: 20,
                        data: (function () {
                            var d = [];
                            var len = 100;
                            var x = 0;
                            while (len--) {
                                x = (Math.random() * 10).toFixed(3) - 0;
                                d.push([
                                    x,
                                    Math.random() * 10
                                ]);
                            }
                            return d;
                        })(),
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(25, 100, 150, 0.5)',
                                shadowOffsetY: 5,
                                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                    offset: 0,
                                    color: 'rgb(129, 227, 238)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(25, 183, 207)'
                                }])
                            }
                        }
                    }
                ]
            };

            myChart.setOption(noDataOption);

            noDataInterval[myChart.id] = setInterval(function (){

                var d = [];
                var len = 100;
                var x = 0;
                while (len--) {
                    x = (Math.random() * 10).toFixed(3) - 0;
                    d.push([
                        x,
                        Math.random() * 10
                    ]);
                }

                noDataOption.series[0].data = d;

                myChart.setOption(noDataOption);
            }, 2100);

            return this;
        }
        // add by lugp 2017-11-03 end

        if (!option.legend.data || option.legend.data.length == 0) {
            return;
        }

        if (!option.xAxis.data || option.xAxis.data.length == 0) {
            return;
        }

        //显示图表
        // var myChart = echarts.init(this.get(0), option.theme);
        myChart.setOption(option);

        return this;
    };

    //数据的第一行为图例，第一列为x轴的值
    var computeColEchartData = function (option) {
        //图表的显示数据
        var series = [];
        //图表的图例数据
        var legend;
        //图表的x轴数据
        var xAxisData = [];
        ;

        var data = option.data;


        //获得表头行
        var legendData = data[0];
        //去除第一个数据
        legend = legendData.slice(1, legendData.length);

        //如果存在统计行，去除统计行数据
        var rows = data.slice(1, data.length);
        if (option.total) {
            rows = rows.slice(0, rows.length - 1);
        }

        //创建二维数组
        var rowsData = [legend.length];
        for (var i = 0; i < legend.length; i++) {
            rowsData[i] = [rows.length];
        }

        //转换数据格式，获得x轴的值
        $.each(rows, function (ind, val) {

            xAxisData.push(val[0]);

            val = val.slice(1, val.length);
            $.each(val, function (index, value) {
                rowsData[index][ind] = value;
            })
        })

        //生成series数据
        $.each(rowsData, function (index, value) {

            var serieData = value;

            var serie = $.extend({}, option.seriesType);

            serie.name = legend[index];
            serie.data = serieData;

            series.push(serie);

        });

        option.legend.data = legend;
        option.xAxis.data = xAxisData;
        option.series = series;
    };

    //数据的第一行为x轴的值，第一列为图例
    var computeRowEchartData = function (option) {
        //图表的显示数据
        var series = [];
        //图表的图例数据
        var legendData = [];
        //图表的x轴数据
        var xAxis;

        var data = option.data;

        //获得表头行
        var xAxisData = data[0];
        //去除第一个数据
        xAxis = xAxisData.slice(1, xAxisData.length);

        //如果存在统计行，去除统计行数据
        var rows = data.slice(1, data.length);
        if (option.total) {
            rows = rows.slice(0, rows.length - 1);
        }

        $.each(rows, function (index, value) {
            var serieData = value;
            var serie = $.extend({}, option.seriesType);

            serie.name = serieData[0];
            serie.data = serieData.slice(1, serieData.length);

            legendData.push(serie.name);
            series.push(serie);

        });

        option.legend.data = legendData;
        option.xAxis.data = xAxis;
        option.series = series;
    };


    $.fn.echartPie = function (options, myChart) {

        // add by lugp 2017-11-03 start
        clearInterval(noDataInterval[myChart.id]);
        // add by lugp 2017-11-03 end

        /**
         * 饼图缺省选项
         * @type {{theme: string, data: Array, tooltip: {trigger: string}, tooltip: {trigger: string}, legend: {data: Array}, series: {type: string}}}
         */
        var defaultOptions = {
            theme: "macarons",
            total: true,            //包含统计行
            data: [],
            title: {
                text: '',
                x: 'center',
                padding: 40
            },

            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                right: 'right',
                data: []
            },
            toolbox: {

                show: true,
                right:'3%',
                top: '10%',

                feature: {

                    saveAsImage: {

                        show:true,

                        backgroundColor:'transparent',

                        title :'保存图片',

                        excludeComponents :['toolbox'],

                        pixelRatio: 2

                    }

                }

            },
            series: [{
                name: '',
                type: 'pie',
                selectedMode: 'single',
                radius: '55%',
                center: ['50%', '60%'],
                data: [],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        var option = $.extend({}, defaultOptions, options);

        // add by lugp 2017-11-03 start
        if (option.data.length <= 0 && !decideDataOption(option)) {
            myChart.clear();
            //ehcarts图表无数据时的展现
            var noDataOption = {
                title: {
                    text: '暂无数据',
                    textStyle: {
                        fontWeight: 'bold',
                        fontSize: 36,
                        color: '#333'
                    },
                    left: 'middle',
                    top: 'middle'
                },
                legend: {
                    show: false,
                    data:['sin']
                },
                xAxis : [
                    {
                        show: false,
                        type : 'value',
                    }
                ],
                yAxis : [
                    {
                        show: false,
                        type : 'value',
                    }
                ],
                series : [
                    {
                        name:'sin',
                        type:'scatter',
                        large: true,
                        symbolSize: 20,
                        data: (function () {
                            var d = [];
                            var len = 100;
                            var x = 0;
                            while (len--) {
                                x = (Math.random() * 10).toFixed(3) - 0;
                                d.push([
                                    x,
                                    Math.random() * 10
                                ]);
                            }
                            return d;
                        })(),
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(25, 100, 150, 0.5)',
                                shadowOffsetY: 5,
                                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                    offset: 0,
                                    color: 'rgb(129, 227, 238)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(25, 183, 207)'
                                }])
                            }
                        }
                    }
                ]
            };

            myChart.setOption(noDataOption);

            noDataInterval[myChart.id] = setInterval(function (){

                var d = [];
                var len = 100;
                var x = 0;
                while (len--) {
                    x = (Math.random() * 10).toFixed(3) - 0;
                    d.push([
                        x,
                        Math.random() * 10
                    ]);
                }

                noDataOption.series[0].data = d;

                myChart.setOption(noDataOption);
            }, 2100);

            return this;
        }
        // add by lugp 2017-11-03 end

        //如果legend和xAxis都设置了值，直接显示图表
        if (option.legend.data && option.legend.data.length > 0) {
            /*var myChart = echarts.init(this.get(0), option.theme);*/
            myChart.clear();
            myChart.setOption(option);

            return this;
        }

        //未传递data属性值，直接结束
        if (!option.data || option.data.length == 0) {
            return;
        }

        //根据data属性动态计算图表需要的数据
        computeEchartPieData(option);

        // add by lugp 2017-11-03 start
        if (!decideDataOption(option)) {
            myChart.clear();
            //ehcarts图表无数据时的展现
            var noDataOption = {
                title: {
                    text: '暂无数据',
                    textStyle: {
                        fontWeight: 'bold',
                        fontSize: 36,
                        color: '#333'
                    },
                    left: 'middle',
                    top: 'middle'
                },
                legend: {
                    show: false,
                    data:['sin']
                },
                xAxis : [
                    {
                        show: false,
                        type : 'value',
                    }
                ],
                yAxis : [
                    {
                        show: false,
                        type : 'value',
                    }
                ],
                series : [
                    {
                        name:'sin',
                        type:'scatter',
                        large: true,
                        symbolSize: 20,
                        data: (function () {
                            var d = [];
                            var len = 100;
                            var x = 0;
                            while (len--) {
                                x = (Math.random() * 10).toFixed(3) - 0;
                                d.push([
                                    x,
                                    Math.random() * 10
                                ]);
                            }
                            return d;
                        })(),
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(25, 100, 150, 0.5)',
                                shadowOffsetY: 5,
                                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                    offset: 0,
                                    color: 'rgb(129, 227, 238)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(25, 183, 207)'
                                }])
                            }
                        }
                    }
                ]
            };

            myChart.setOption(noDataOption);

            noDataInterval[myChart.id] = setInterval(function (){

                var d = [];
                var len = 100;
                var x = 0;
                while (len--) {
                    x = (Math.random() * 10).toFixed(3) - 0;
                    d.push([
                        x,
                        Math.random() * 10
                    ]);
                }

                noDataOption.series[0].data = d;

                myChart.setOption(noDataOption);
            }, 2100);

            return this;
        }
        // add by lugp 2017-11-03 end

        if (!option.legend.data || option.legend.data.length == 0) {
            return;
        }

        //显示图表
        /*var myChart = echarts.init(this.get(0), option.theme);*/
        myChart.setOption(option);

        return this;
    };

    var computeEchartPieData = function (option) {
        //图表的显示数据
        var series = [];
        //图表的图例数据
        var legendData = [];

        var data = option.data;

        //定义存放饼图图列数据
        legendData = data[0].slice(1, data[0].length);
        //定义存放饼图数据
        series = [];
        //饼图的数据
        //定义变量，存放饼图的数据
        var seriesData;
        if (option.total) {
            seriesData = data[1].slice(data[1].length - data[0].length + 1, data[1].length);
        } else {
            //表格体数据集
            var dataRows = data.slice(1);

            var result = [];

            for (var i = 0; i < dataRows.length; i++) {
                var item = dataRows[i];

                for (var key in item) {
                    if (!result[key]) {
                        result[key] = item[key];
                    } else {
                        result[key] += item[key];
                    }
                }
            }
            seriesData = result.slice(1, result.length);

        }

        //定义存放饼图数据中的每一条数据
        var pieData;
        //循环数据，组成饼图数据
        $.each(seriesData, function (index, val) {
            pieData = {};
            pieData.name = legendData[index];
            pieData.value = val;
            series.push(pieData);
        });

        option.legend.data = legendData;
        option.series[0].data = series;
    };

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

    /**
     * （精准）加、减、乘、除
     * @param arg2
     * @returns {number}
     */
    Number.prototype.plus = function (arg2) {
        var arg1 = this, r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    };
    Number.prototype.subtract = function (arg2) {
        var arg1 = this, r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
    };
    Number.prototype.multiply = function (arg2) {
        var arg1 = this, m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        } catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    };
    Number.prototype.divide = function (arg2) {
        var arg1 = this, t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        } catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length;
        } catch (e) {
        }
        with (Math) {
            r1 = Number(arg1.toString().replace(".", ""));
            r2 = Number(arg2.toString().replace(".", ""));
            return (r1 / r2).multiply(pow(10, t2 - t1));
        }
    };
    /**
     * 解决toFixed在chrome中五舍六入的问题
     * @param arg2
     * @returns {number}
     */
    Number.prototype.toFixed2 = function (arg2) {
        var arg1 = this, m, a, v;
        m = Math.pow(10, arg2);
        return parseInt(arg1.multiply(m) + 0.5, 10) / m;
    };

    /**
     * 根据位数自动补零
     * @param arg2
     * @returns {string|*}
     */
    Number.prototype.toFixed3 = function (arg2) {
        var arg1 = this, a, v;

        v = String(arg1.toFixed2(arg2));
        a = v.split('.');
        if (a.length === 1) {
            v += '.00';
        } else if (a.length === 2) {
            for (var i = 0; i < arg2 - a[1].length; i++) {
                v += '0';
            }
        }
        return v;
    };
})(jQuery);

//判断是否是数组
function isArray(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}

// 判断echart是否有数据
function decideDataOption(option) {
    //判断是否有图例数据
    if (option.hasOwnProperty("legend")) {
        if (option.legend.hasOwnProperty("data") && option.legend.data.length === 0) {
            return false;
        }
    }
    //判断是否有轴线数据
    if (option.hasOwnProperty("xAxis")) {
        var bollen = isArray(option.xAxis);
        if (bollen) {
            for (var i = 0; i < option.xAxis.length; i++) {
                if (option.xAxis[i].hasOwnProperty("data") && option.xAxis[i].data.length === 0) {
                    return false;
                }
            }
        } else {
            if (option.xAxis.hasOwnProperty("data") && option.xAxis.data.length === 0) {
                return false;
            }
        }
    }
    if (option.hasOwnProperty("yAxis")) {
        var bollen = isArray(option.yAxis);
        if (bollen) {
            for (var i = 0; i < option.yAxis.length; i++) {
                if (option.yAxis[i].hasOwnProperty("data") && option.yAxis[i].data.length === 0) {
                    return false;
                }
            }
        } else {
            if (option.yAxis.hasOwnProperty("data") && option.yAxis.data.length === 0) {
                return false;
            }
        }
    }
    if (option.hasOwnProperty("radiusAxis")) {
        var bollen = isArray(option.radiusAxis);
        if (bollen) {
            for (var i = 0; i < option.radiusAxis.length; i++) {
                if (option.radiusAxis[i].hasOwnProperty("data") && option.radiusAxis[i].data.length === 0) {
                    return false;
                }
            }
        } else {
            if (option.radiusAxis.hasOwnProperty("data") && option.radiusAxis.data.length === 0) {
                return false;
            }
        }
    }
    if (option.hasOwnProperty("radar")) {
        var bollen = isArray(option.radar);
        if (bollen) {
            for (var i = 0; i < option.radar.length; i++) {
                if (option.radar[i].hasOwnProperty("data") && option.radar[i].indicator.length === 0) {
                    return false;
                }
            }
        } else {
            if (option.radar.hasOwnProperty("data") && option.radar.indicator.length === 0) {
                return false;
            }
        }
    }
    //判断是否有图表数据
    if (option.hasOwnProperty("series")) {
        var bollen = isArray(option.series);
        if (bollen) {
            var num = 0;
            for (var i = 0; i < option.series.length; i++) {
                if (option.series[i].hasOwnProperty("data") && option.series[i].data.length === 0) {
                    num++;
                }
            }
            if (num === option.series.length) {
                return false;
            }
        } else {
            if (option.series.hasOwnProperty("data") && option.series.data.length === 0) {
                return false;
            }
        }
    }
    return true;
}