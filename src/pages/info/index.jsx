import React, { Component } from "react"
import { connect } from "dva"
import { Card, WhiteSpace } from "antd-mobile"
import BizIcon from "../../components/BizIcon"
import Router from "umi/router"

import style from "./index.less"
// connect视图和state
@connect(({ list }) => {
  list
})
class Info extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // 传进来的state当做props用
    const { list } = this.props
    return (
      <div className={style.container}>
        <div className={style.edit}>
          <BizIcon type="bianji" />
        </div>
        <div className={style.login} onClick={() => Router.push("/info/login")}>
          登录
        </div>
        <div className={style.top} />
        <div className={style.avater} />
        <div className={style.cardContainer}>
          <WhiteSpace size="sm" />
          <Card className={style.card}>
            <Card.Header
              title="This is title"
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            />
            <Card.Body>
              <div>{list}</div>
            </Card.Body>
          </Card>
          <WhiteSpace size="sm" />
        </div>
      </div>
    )
  }
}

export default Info
