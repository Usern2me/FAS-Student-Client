import React from "react"
import { Flex } from "antd-mobile"

import style from "./index.less"

// 每一竖行是两个FlexBox
const FlexBox = ({ course, select }) => (
  <div className={style.FlexBox}>
    <Flex direction="column">
      {course.map(({ size, name, course_id,weekend }, index) => {
        // 2节下半场的向下偏2格
        // 早上2节课上半场的要margin-bottom把下面的顶下去
        let flag = size == 3?1:(size==21?2:0)
        let _size = size < 20 ? 3 : 2
        let offsetStyle = {}
        // 判断向上偏移距离
        if (flag === 1) {
          if(index%2===0){
            offsetStyle = { marginBottom: ".7rem" }
          }else{
            offsetStyle = { marginTop: ".7rem" }
          }
        } else if (flag === 2) {
          offsetStyle = { marginBottom: "1.4rem" }
        }else{
          offsetStyle = { marginTop: "1.4rem" }
        }
       
        return (
          <Flex.Item key={name} style={offsetStyle}>
            <FlexBlock
              select={select}
              course_id={course_id}
              key={name}
              size={_size}
              name={name}
              flag={flag}
              weekend={weekend}
            />
          </Flex.Item>
        )
      })}
    </Flex>
  </div>
)

// 每一个课程是一个FlexBlock
const FlexBlock = ({ size, name, course_id, weekend, select }) => {
  return (
    <div
      className={style.flexBlock}
      onClick={() => select({ course_id: course_id, weekend: weekend })}>
      <div className={style.courseName}>{name}</div>
      <Flex direction="column">
        <Flex.Item style={{ minHeight: ".7rem" }} />
        <Flex.Item style={{ minHeight: ".7rem" }} />
        {size > 2 && <Flex.Item style={{ minHeight: ".7rem" }} />}
      </Flex>
    </div>
  )
}

export default FlexBox
