import React, { Component } from "react"
import { Flex, Card } from "antd-mobile"
import { connect } from "dva"
import { getCourse } from "@/services"
import style from "./index.less"

// 3节上午从8点半开始，2节的1为前两节，2为后两节
const tableList = [
  [{ name: "高数", size: 3 }, { name: "大英", size: 21 }],
  [{ name: "计算机", size: 22 }, { name: "语文", size: 3 }],
  [{ name: "机电原理", size: 3 }, { name: "管理学", size: 21 }],
  [{ name: "JAVA入门", size: 21 }, { name: "计算机网络", size: 3 }],
  [{ name: "线性代数", size: 3 }, { name: "马克思马克思", size: 22 }]
]

// 每一竖行是两个FlexBox
// 传的数据格式：[{ 'name':'高数','size': 3 }, { 'name':'大英','size': 21 }]
const FlexBox = ({ course }) => (
  <div className={style.FlexBox}>
    <Flex direction="column">
      {course.map(({ size, name }, index) => {
        // 如果是3节课的或者是2节下半场的就要偏移
        // 早上2节课上半场的要margin-bottom把下面的顶下去
        let flag = size === 21 ? 0 : size < 20 ? 1 : 2
        let _size = size < 20 ? 3 : 2
        let offsetStyle = {}
        // 判断向上偏移距离
        if (flag === 1) {
          offsetStyle = { marginTop: ".5rem" }
        } else if (flag === 2) {
          offsetStyle = { marginTop: "1rem" }
        }
        //判断向下偏移距离 只有一种情况就是上午的21
        if (index === 0 && size === 21) {
          offsetStyle = { marginBottom: "1rem" }
        }
        return (
          <Flex.Item key={name} style={offsetStyle}>
            <FlexBlock key={name} size={_size} name={name} flag={flag} />
          </Flex.Item>
        )
      })}
    </Flex>
  </div>
)

// 每一个课程是一个FlexBlock
const FlexBlock = ({ size, name }) => {
  return (
    <div className={style.flexBlock}>
      <div className={style.courseName}>{name}</div>
      <Flex direction="column">
        <Flex.Item style={{ minHeight: ".5rem" }} />
        <Flex.Item style={{ minHeight: ".5rem" }} />
        {size > 2 && <Flex.Item style={{ minHeight: ".5rem" }} />}
      </Flex>
    </div>
  )
}

@connect(({ info }) => ({ info }))
class Course extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    table: undefined,
    classInfo: undefined
  }
  componentDidMount() {
    getCourse(this.props.info.class_id)
      .then(res => {
        console.log("getCourse result------->", res)
        this.setState({ table: res.data })
      })
      .catch(err => {
        console.log("componentDidMount errr---->", err)
      })
  }

  render() {
    const { name } = this.props
    return (
      <div className={style.contanier}>
        <div className={style.header}>{name}</div>
        <div className={style.top}>
          <Flex direction="row">
            {tableList.map((v, index) => (
              <FlexBox key={index} course={v} />
            ))}
          </Flex>
        </div>
        <div className={style.classIntro}>
          <Card>
            <Card.Header title="course name" />
            <Card.Body>this is course intro</Card.Body>
          </Card>
        </div>
      </div>
    )
  }
}

export default Course
