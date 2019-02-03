import React, { PureComponent } from "react"
import { Result, Icon, WhiteSpace } from "antd-mobile"

import style from "./index.less"
import Router from "umi/router"

const SuccessIcon = () => {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
      <circle
        className={[style.path, style.circle]}
        fill="none"
        stroke="#73AF55"
        strokeWidth="6"
        strokeMiterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      />
      <polyline
        className={[style.spath, style.check]}
        fill="none"
        stroke="#73AF55"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        points="100.2,40.2 51.5,88.8 29.8,67.5 "
      />
    </svg>
  )
}
const FailIcon = () => {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
      <circle
        className={[style.path, style.circle]}
        fill="none"
        stroke="#D06079"
        strokeWidth="6"
        strokeMiterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      />
      <line
        className={[style.path, style.line]}
        fill="none"
        stroke="#D06079"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        x1="34.4"
        y1="37.9"
        x2="95.8"
        y2="92.3"
      />
      <line
        className={[style.path, style.line]}
        fill="none"
        stroke="#D06079"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        x1="95.8"
        y1="38"
        x2="34.4"
        y2="92.2"
      />
    </svg>
  )
}

class ResultPage extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    let { status, time, class_name } = this.props.location.query
    console.log("status--->", status)
    return (
      <div>
        {status && (
          <div className={style.resultContainer}>
            <Result img={<SuccessIcon />} title="考勤成功" message="您已完成考勤" />
            <span className={style.info}>
              时间：
              {time}
            </span>
            <WhiteSpace />
            <span className={style.info}>
              课程名称：
              {class_name}
            </span>
            <WhiteSpace />
            <a
              onClick={() => {
                Router.push("/")
              }}>
              返回主页
            </a>
            <WhiteSpace />
          </div>
        )}
        {!status && (
          <div classNmae={style.resultContainer}>
            <Result img={<FailIcon />} title="考勤失败" message="请重新考勤" />
            <WhiteSpace />
            <a
              onClick={() => {
                Router.push("/")
              }}>
              返回主页
            </a>
            <WhiteSpace />
          </div>
        )}
      </div>
    )
  }
}
export default ResultPage
