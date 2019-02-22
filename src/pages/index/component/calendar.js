import React, { PureComponent } from "react"
import ReactEcharts from "@/components/Chart"
import echarts from "echarts"

import { getCalendarOfStudent } from "@/services"
const layouts = [
  [[0, 0]],
  [[-0.25, 0], [0.25, 0]],
  [[0, -0.2], [-0.2, 0.2], [0.2, 0.2]],
  [[-0.25, -0.25], [-0.25, 0.25], [0.25, -0.25], [0.25, 0.25]]
]
const pathes = [
  "M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z",
  "M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z",
  "M5 2c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"
]
const colors = ["#c4332b", "#16B644", "#6862FD"]

export default class Calendar extends PureComponent {
  constructor(props) {
    super(props)
  }

  getOption = () => {
    return {
      tooltip: {},
      calendar: [
        {
          left: "center",
          top: "middle",
          cellSize: [150, 150],
          yearLabel: { show: false },
          orient: "vertical",
          dayLabel: {
            firstDay: 1,
            nameMap: "cn",
            fontSize: 40,
            fontWeight: "bold",
            color: "#182952"
          },
          range: "2019-02"
        }
      ],
      series: [
        {
          type: "custom",
          coordinateSystem: "calendar",
          renderItem: this.renderItem,
          dimensions: [null, { type: "ordinal" }],
          data: this.props.seriesData
        }
      ],

    }
  }

  renderItem = (params, api) => {
    let cellPoint = api.coord(api.value(0))
    let cellWidth = params.coordSys.cellWidth
    let cellHeight = params.coordSys.cellHeight

    let value = api.value(1)
    let events = value && value.split("|")

    if (isNaN(cellPoint[0]) || isNaN(cellPoint[1])) {
      return
    }

    let group = {
      type: "group",
      children:
        echarts.util.map(layouts[events.length - 1], function(itemLayout, index) {
          return {
            type: "path",
            shape: {
              pathData: pathes[events[index]],
              x: -8,
              y: -8,
              width: 36,
              height: 36
            },
            position: [
              cellPoint[0] +
                echarts.number.linearMap(
                  itemLayout[0],
                  [-0.5, 0.5],
                  [-cellWidth / 2, cellWidth / 2]
                ),
              cellPoint[1] +
                echarts.number.linearMap(
                  itemLayout[1],
                  [-0.5, 0.5],
                  [-cellHeight / 2 + 20, cellHeight / 2]
                )
            ],
            style: api.style({
              fill: colors[events[index]]
            })
          }
        }) || []
    }

    // 设置文字
    group.children.push({
      type: "text",
      style: {
        x: cellPoint[0],
        y: cellPoint[1] - cellHeight / 2 + 15,
        text: echarts.format.formatTime("dd", api.value(0)),
        fill: "#2b3595",
        textFont: api.font({ fontSize: 30 })
      }
    })
    return group
  }
  onChartReady = chart => {
    chart.hideLoading()
  }

  render() {
    return (
      <div className="canvas">
        <ReactEcharts
          ref={e => {
            this.echarts_react = e
          }}
          option={this.getOption()}
          showLoading={true}
          onChartReady={this.onChartReady}
          style={{ height: "1050px", width: "100%" }}
          className="react_for_echarts"
        />
      </div>
    )
  }
}
