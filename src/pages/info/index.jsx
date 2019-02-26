import React, { Component } from "react"
import { connect } from "dva"
import { Card, WhiteSpace, List, WingBlank } from "antd-mobile"
import Router from "umi/router"
import BizIcon from "@/components/BizIcon"
import Cropper from "@/components/Cropper"

import style from "./index.less"

// connect视图和state
@connect(({ info }) => ({ info }))
class Info extends Component {
  constructor(props) {
    super(props)
  }
  handleEdit = () => {
    Router.push("/info/edit")
  }
  onUploadedFile = data => {
    console.log("onUploadedFile--->", data)
  }
  render() {
    // 传进来的state当做props用
    const { info } = this.props
    return (
      <div className={style.container}>
        <div className={style.edit} onClick={() => Router.push("/info/edit")}>
          <BizIcon type="edit" />
        </div>
        <div className={style.top} />
        <div className={style.avater}>
          <Cropper onUploadedFile={this.onUploadedFile} />
        </div>
        <WingBlank size="lg">
          <div className={style.cardContainer}>
            <Card className={style.card}>
              <Card.Header title={info.name} thumb={<BizIcon type="reddit1" />} />
              <WhiteSpace />
              <Card.Body>
                <List>
                  <List.Item thumb={<BizIcon type="user" />}>
                    学号:
                    {info.stu_id}
                  </List.Item>
                  <List.Item thumb={<BizIcon type="leanpub" />}>
                    班级:
                    {info.class_name}
                  </List.Item>
                  <List.Item thumb={<BizIcon type="calendar" />}>
                    专业:
                    {info.major_name}
                  </List.Item>
                  <List.Item thumb={<BizIcon type="barchart" />}>
                    学院:
                    {info.college_name}
                  </List.Item>
                  <List.Item thumb={<BizIcon type="mobile" />}>
                    电话:
                    {info.phone}
                  </List.Item>
                  <List.Item thumb={<BizIcon type="mail" />}>
                    EMAIL:
                    {info.email}
                  </List.Item>
                </List>
              </Card.Body>
            </Card>
          </div>
        </WingBlank>
      </div>
    )
  }
}

export default Info
