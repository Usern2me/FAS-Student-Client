import React, { Component } from "react"
import { Button, NoticeBar, WhiteSpace } from "antd-mobile"
import { connect } from "dva"
import Router from "umi/router"
import BizIcon from "../../components/BizIcon"
import Loading from "@/components/Loading"

import { verifyFace, addStuAttendance, getStuAttendance } from "@/services"
import styles from "./index.less"
import { getDate, timeDiff } from "@/util/index"

@connect(({ info }) => ({ info }))
class Index extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    front: true,
    showCanvas: false,
    isLoading: false,
    isOpen: false,
    date: getDate("Y-M-D"),
    attendanceInfo: []
  }

  componentDidMount() {
    // const time = getDate("H:Mi")
    // const { date } = this.state
    // const { stu_id } = this.props.info
    const stu_id = 1501
    const param = {
      stu_id,
      date: "2019-2-14",
      time: "17:43"
    }
    // 获取当前时间的前后20分钟的考勤记录
    getStuAttendance(param).then(res => {
      this.setState({ attendanceInfo: res.data[0] })
      if (res.data.length != 0) {
        this.setState({ isOpen: true })
      }
    })
  }

  // 开启摄像头
  handlePhoto = async e => {
    this.setState({ showCanvas: true })

    let that = this
    let file = e.target.files[0]
    let reader = new FileReader()
    let img = new Image()
    let imgObj = this.canvas
    let canvas = document.createElement("canvas")
    let canvasContext = canvas.getContext("2d")

    reader.onload = function(e) {
      img.src = e.target.result
      img.onload = function() {
        canvas.width = 1200
        canvas.height = 1100
        canvasContext.rotate((270 * Math.PI) / 180)
        canvasContext.drawImage(img, -1200, 0, 1400, 900)

        imgObj.insertBefore(canvas, imgObj.childNodes[0])

        // 转base64
        let dataURL = canvas.toDataURL("image/png", 0.3)
        // 上传图片
        that.handleUpload(dataURL)
      }
    }
    reader.readAsDataURL(file)
  }
  // 重新拍照
  handleReDraw = () => {
    this.setState({ showCanvas: false })
    let imgObj = this.canvas
    imgObj.removeChild(imgObj.childNodes[0])
  }
  // 上传服务器
  handleUpload = async img => {
    const { info } = this.props
    const { class_id, stu_id } = info
    const { attendance_id, time, duration } = this.state.attendanceInfo
    let router_query = {
      pathname: "/result",
      query: {
        status: 0
      }
    }
    this.setState({ isLoading: true })
    await verifyFace({ group_id: class_id, uid: stu_id, img: img }).then(res => {
      // 如果返回了考勤通过的信息 写入数据库
      if (res.code == 0 && res.data.face_token) {
        const { date } = this.state
        const nowTime = getDate("H:Mi")
        // 合并信息
        Object.assign(router_query, {
          query: {
            status: 1,
            class_name: this.props.info.class_name,
            time: nowTime
          }
        })
        // 判断时间是否超过duration 超过设置状态为2-->迟到
        if (timeDiff(nowTime, time) > duration) {
          Object.assign(router_query, {
            query: {
              status: 2,
              class_name: this.props.info.class_name,
              time: nowTime
            }
          })
        }
        addStuAttendance({
          stu_id: stu_id,
          attendance_id,
          time: time,
          date: date,
          status: router_query.status,
          face: 1
        })
      }
    })
    this.setState({ isLoading: false })
    Router.push(router_query)
  }
  // 查看考勤记录
  handleClick = () => {
    Router.push(`/index/detail?id=${this.props.info.class_id}`)
  }

  render() {
    const { showCanvas, isOpen } = this.state
    // const { info: { name} } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.top}>
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
            {this.state.isLoading && (
              <div className={styles.loading}>
                <Loading />
                照片上传中...
              </div>
            )}
            <div
              ref={r => {
                this.canvas = r
              }}
              className={styles.canvas}
              style={{ visibility: showCanvas ? "visible" : "hidden" }}
            />
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
        {isOpen && (
          <NoticeBar
            mode="closable"
            marqueeProps={{ loop: true, style: { padding: "0 7.5px" } }}
            action={<span style={{ color: "#a1a1a1" }}>不再提示</span>}>
            注意：你有一场考勤正在进行！
          </NoticeBar>
        )}
      </div>
    )
  }
}

export default Index
