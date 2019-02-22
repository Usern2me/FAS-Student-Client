import React, { Component } from "react"
import { Button, NoticeBar, WhiteSpace, NavBar, Icon } from "antd-mobile"
import { connect } from "dva"
import Router from "umi/router"
import LineChart from "./component/lineChart"
import Calendar from "./component/calendar"

import style from './index.less'
import echarts from "echarts"
import { getCalendarOfStudent } from "@/services"

export default class Detail extends Component {
  state = {
    data: []
  }
  componentDidMount() {
    // 在这个组件整理好日历的数据格式再传过去
    getCalendarOfStudent({ stu_id: 1501 }).then(res => {
      this.setState({ data: res.data })
    })
  }
  getVirtulData = year => {
    year = year || "2019"
    const date = +echarts.number.parseDate(year + "-02-01")
    const end = +echarts.number.parseDate(year + "-03-01")
    const dayTime = 3600 * 24 * 1000
    let data = []
    let rawData = this.state.data
    let rawPoint = 0 // 标志rawdata数据的指针
    for (let time = date; time < end; time += dayTime) {
      let newTime = echarts.format.formatTime("yyyy-MM-dd", time)
      if (rawData.length != 0 && rawPoint !== rawData.length - 1) {
        if (rawData[rawPoint][0] == newTime) {
          data.push(rawData[rawPoint])
          rawPoint += 1
        } else {
          data.push([newTime, "0|0"])
        }
      } else {
        data.push([newTime, "0|0"])
      }
    }
    console.log("data", data)
    return data
  }

  render() {
    const { id } = this.props.location.query
    return (
      <div className={style.detailContainer}>
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => Router.push("/")}>
          考勤详情页
        </NavBar>
        <LineChart id={id} />
        <Calendar id={id} seriesData={this.getVirtulData()} />
      </div>
    )
  }
}
