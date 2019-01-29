import React, { Component } from "react"
import { Flex, Card, List, InputItem } from "antd-mobile"
import FlexBox from "@/components/FlexBox"
import { connect } from "dva"
import { getClassTable } from "@/services"
import style from "./index.less"

@connect(({ info }) => ({ info }))
class Course extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    tableList: [], // 格式化的课程表
    classInfo: [], // 请求到的数据
    courseInfo: [] // 课程的详细信息
  }
  componentDidMount() {
    const { info } = this.props
    // getClassTable({ class_id: info.class_id })
    getClassTable({ class_id: 1111 })
      .then(res => {
        res.data.forEach(v => {
          v.time_hour = v.time_hour.slice(0, 5)
        })
        this.setState({ classInfo: res.data })
        this.setState({ tableList: this.formatClasstable(res.data) })
      })
      .catch(err => {
        console.log("componentDidMount errr---->", err)
      })
  }
  formatClasstable(data) {
    let list = []
    let current = []
    // 3节上午从8点半开始，2节的1为前两节，2为后两节
    let res = data.reduce((acc, v, index) => {
      let { time_hour: time, course_duration: dur } = v
      if (dur === 2) {
        let hour = +time.split(':')[0]
        if (index > 0) {
          // 下午的科目 大于14点的就是22
          hour > 14 ? (v.hour = 22) : (v.hour = 21)
        } else {
          // 上午的科目 大于10点的就是22
          hour > 9 ? (v.hour = 22) : (v.hour = 21)
        }
      } else {
        v.hour = 3
      }
      current.push({
        name: v.course_name,
        size: v.hour,
        course_id: v.course_id,
        weekend: v.time_weekend,
        duration: v.course_duration
      })
      if (index % 2 !== 0) {
        list.push(current)
        current = []
      }
      return list
    }, [])
    // reduce有初始化参数index从0开始，没有从1开始
    return res
  }
  // 点击切换课程信息
  handleBoxClick = v => {
    let { course_id, weekend } = v
    let flag = weekend * 2 - 2
    let tempData = this.state.classInfo.slice(flag, flag + 2)
    let res = tempData.filter(v => {
      return v.course_id === course_id
    })
    this.setState({ courseInfo: res[0] })
  }
  render() {
    // const { name } = this.props.info
    const { tableList } = this.state
    const { course_name, teacher_name, classroom_id, time_hour } = this.state.courseInfo
    return (
      <div className={style.contanier}>
        <div className={style.top}>
          <div className={style.tableHeader}>
            <Flex justify="center">
              {["一", "二", "三", "四", "五"].map((v, index) => (
                <Flex.Item key={index}>{v}</Flex.Item>
              ))}
            </Flex>
          </div>
          <div className={style.tableSider}>
            <Flex justify="between" direction="column">
              {Array.from(new Array(8), (val, index) => index + 1).map((v, index) => (
                <Flex.Item key={index} style={{ height: ".78rem" }}>
                  {v}
                </Flex.Item>
              ))}
            </Flex>
          </div>
          <div className="table">
            <Flex direction="row">
              {tableList.map((v, index) => (
                <FlexBox
                  select={e => {
                    this.handleBoxClick(e)
                  }}
                  key={index}
                  course={v}
                />
              ))}
            </Flex>
          </div>
        </div>
        <Card>
          <Card.Header title={course_name || "点击查看课程信息"} />
          <Card.Body>
            <List>
              <InputItem editable="false" value={classroom_id}>
                教室号
              </InputItem>
              <InputItem editable="false" value={teacher_name}>
                教师名
              </InputItem>
              <InputItem editable="false" value={time_hour}>
                上课时间
              </InputItem>
            </List>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Course
