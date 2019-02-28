import React, { Component } from "react"
import { connect } from "dva"
import { Card, WhiteSpace, List, WingBlank, Toast } from "antd-mobile"
import Router from "umi/router"
import { getUserAvator } from "@/services"
import avator from "../../assets/avator.png"
import BizIcon from "@/components/BizIcon"
import Cropper from "@/components/Cropper"

import style from "./index.less"

// connect视图和state
@connect(({ info }) => ({ info }))
class Info extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    await getUserAvator({ stu_id: 1501 })
      .then(response => {
        if (response) {
          return response.blob()
        } else {
          throw new Error("用户头像不存在")
        }
      }) //转blob格式
      .then(blob => {
        const urlCreator = window.URL || window.webkitURL
        this.imgRef.src = urlCreator.createObjectURL(blob)
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleEdit = () => {
    Router.push("/info/edit")
  }
  onUploadedFile = data => {
    if (data == 0) {
      Toast.success("上传头像成功!", 0.7)
    } else {
      Toast.fail("上传头像失败，请重新上传", 0.7)
    }
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
          <img
            src={avator}
            alt="avator"
            ref={el => {
              this.imgRef = el
            }}
          />
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
