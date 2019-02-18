import React, { Component } from "react"
import ReactEcharts from "@/components/Chart"
import echarts from "echarts"

import { getLineChartOfStudent } from "@/services"

export default class LineChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      am: [],
      pm: [],
      axis: [],
      stu_id: props.id
    }
  }

  componentDidMount() {
    const { stu_id } = this.state
    getLineChartOfStudent({ stu_id }).then(res => {
      let {
        data: { am, pm, axis }
      } = res
      am = am.map(v => {
        return v.replace(":", "").slice(0, 4)
      })
      pm = pm.map(v => {
        return v.replace(":", "").slice(0, 4)
      })
      this.setState({ am, pm, axis })
    })
  }

  onChartReady = chart => {
    chart.hideLoading()
  }

  getOption = () => {
    return {
      title: {
        text: "学生考勤记录",
        textStyle: {
          fontSize: 40
        }
      },
      tooltip: {
        trigger: "axis",
        textStyle: {
          fontSize: 40
        },
        formatter: function(params) {
          var colorSpan = color =>
            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
            color +
            '"></span>'
          let rez = ""
          params.map(v => {
            let h = parseInt(v.value / 100)
            let m = v.value % 100 === 0 ? "00" : v.value % 100
            let strItem = `<p>${colorSpan(v.color)}${v.seriesName}-> ${h}:${m}</p>`
            rez += strItem
          })
          return rez
        }
      },
      legend: {
        data: ["上午", "下午"],
        textStyle: {
          fontSize: 40
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "5%",
        top: "15%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: this.state.axis,
          // x轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#40514e",
              fontSize: "30"
            }
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          inverse: true,
          max: 1800,
          min: 800,
          interval: 200,
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#40514e",
              fontSize: "30"
            },
            formatter: value => {
              let h = value / 100
              let m = value % 100 === 0 ? "00" : value % 100
              return `${h}:${m}`
            }
          }
        }
      ],
      dataZoom: [
        {
          // 这个dataZoom组件，默认控制x轴。
          type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          start: 0, // 左边在 0% 的位置。
          end: 80 // 右边在 80% 的位置。
        }
      ],
      series: [
        {
          name: "上午",
          type: "line",
          stack: "上午考勤",
          data: this.state.am,
          itemStyle: { color: "#ea168e" }
        },
        {
          name: "下午",
          type: "line",
          stack: "下午考勤",
          data: this.state.pm,
          itemStyle: { color: "#6d3580" }
        }
      ],
      backgroundColor: {
        type: "linear",
        x: 0.5,
        y: 0.5,
        x2: 0.7,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "#fff1eb" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#c3cfe2" // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    }
  }

  render() {
    return (
      <ReactEcharts
        option={this.getOption()}
        onChartReady={this.onChartReady}
        style={{ height: "700px", width: "100%" }}
        className="react_for_echarts"
      />
    )
  }
}
