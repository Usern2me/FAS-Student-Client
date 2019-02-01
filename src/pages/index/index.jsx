import React, { Component } from "react"
import { Button, NoticeBar, WhiteSpace } from "antd-mobile"
import { connect } from "dva"
import BizIcon from "../../components/BizIcon"

import { addFace } from "@/services/index"
import styles from "./index.less"

@connect(({ info }) => ({ info }))
class Index extends Component {
  state = {
    front: true,
    showCanvas: false
  }
  // 开启摄像头
  handlePhoto = async e => {
    this.setState({ showCanvas: true })

    let file = e.target.files[0]
    let reader = new FileReader()
    let img = new Image()
    let imgObj = this.canvas
    let canvas = document.createElement("canvas")
    let canvasContext = canvas.getContext("2d")

    reader.onload = function(e) {
      img.src = e.target.result
      img.onload = function() {
        canvas.width = 900
        canvas.height = 900
        canvasContext.rotate((270 * Math.PI) / 180)
        canvasContext.drawImage(img, -1200, 0, 1400, 900)

        imgObj.insertBefore(canvas, imgObj.childNodes[0])
      }
    }
    reader.readAsDataURL(file)
    // 转base64
    let dataURL = canvas.toDataURL("image/jpeg", 0.8)
    // 上传图片
    await this.handleUpload(dataURL)
  }
  // 重新拍照
  handleReDraw = () => {
    this.setState({ showCanvas: false })
    let imgObj = this.canvas
    imgObj.removeChild(imgObj.childNodes[0])
  }
  // 上传服务器
  handleUpload = async img => {
    const { stu_id, class_id } = this.props
    await addFace({ group_id: class_id, user_id: stu_id, img: img })
      .then(res => {
        console.log("handle upload---->", res)
      })
      .catch(err => {
        console.log("handle upload---->", err)
      })
  }
  // 查看考勤记录
  handleClick = () => {}

  render() {
    const { showCanvas } = this.state
    const { name } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.info}>
            你好，
            {name}
          </div>
          {!showCanvas && (
            <div className={styles.startButton}>
              <input
                type="file"
                accept="image/*"
                capture="user"
                ref={input => {
                  this.myCameraInput = input
                }}
                onChange={this.handlePhoto}
              />
              <BizIcon type="renlianshibie" />
              <div className={styles.circleinset} />
              <div className={styles.circleoutset} />
            </div>
          )}
          <div className={styles.takePhoto}>
            <div
              ref={r => {
                this.canvas = r
              }}
              className={styles.canvas}
              style={{ visibility: showCanvas ? "visible" : "hidden" }}>
              <div>
                <Button type="primary" inline onClick={this.handleReDraw}>
                  重拍
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <Button
            type="primary"
            size="large"
            style={{ width: "80%", margin: "0 auto" }}
            onClick={this.handleClick}>
            考勤记录
          </Button>
        </div>
        <WhiteSpace size="lg" />
        <NoticeBar
          mode="closable"
          marqueeProps={{ loop: true, style: { padding: "0 7.5px" } }}
          action={<span style={{ color: "#a1a1a1" }}>不再提示</span>}>
          注意：你有一场考勤正在进行！
        </NoticeBar>
      </div>
    )
  }
}

export default Index
