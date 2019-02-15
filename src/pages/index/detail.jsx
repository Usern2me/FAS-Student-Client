import React, { Component } from "react"
import { Button, NoticeBar, WhiteSpace, NavBar, Icon } from "antd-mobile"
import { connect } from "dva"
import Router from "umi/router"

import style from "./detail.less"

export default class componentName extends Component {
  render() {
    return (
      <div className={style.container}>
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => Router.push("/")} >考勤详情页</NavBar>
      </div>
    )
  }
}
