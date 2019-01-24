import React, { PureComponent } from "react"
import Router from "umi/router"
import { List, InputItem, WhiteSpace, NavBar, Icon, Button, DatePicker, Picker } from "antd-mobile"
import { createForm } from "rc-form"

import { getSchool } from "@/services"

import styles from "./register.less"

const buttonStyle = {
  width: "70%",
  margin: "0 auto"
}

class Register extends PureComponent {
  constructor(props) {
    super(props)
  }

  state = {
    loading: false,
    name: "",
    age: 20,
    gender: "男",
    college: "",
    class: "",
    year: "",
    college_class: "",
    asyncValue: [],
    allCollege: [],
    allClass: []
  }
  async componentDidMount() {
    await this.fetchData()
  }

  fetchData = async () => {
    // 初始化下拉框的内容
    let { data: listData } = await getSchool()
    this.setState({ allCollege: listData })
  }
  onPickerChange = val => {
    let value = [...val]
    console.log("...asyncValue...", value)
    let [major_id, class_id] = val
    let classRes = []
    this.state.allCollege.map(v => {
      if (v.value === major_id) {
        v.children.map(c => {
          if (c.value === class_id) {
            classRes = c.children
          }
        })
      }
    })
    this.setState({ allClass: classRes })
    this.setState({ asyncValue: value })
    console.log("---after setState---", this.state.asyncValue)
  }
  handleChange = e => {
    // console.log('aaa',e)
    // console.log(this.props.form.getFieldValue('name'))
    this.setState({ e })
  }
  handleClick = () => {
    // 验证数据并提交数据
    this.props.form.validateFields((error, value) => {
      if (error) {
        console.log("error->", error)
      } else {
        console.log("validator->", value)
        // Router.push(/info?id=${id})
      }
    })
  }

  // 控制错误的组件
  errorCom = errorName => {
    let err = this.props.form.getFieldError(`${errorName}`)
    return (
      err && (
        <div className={styles.error}>
          <span>{err}</span>
        </div>
      )
    )
  }
  render() {
    const { getFieldProps } = this.props.form
    return (
      <div className={styles.registerContainer}>
        <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => Router.push("/info")}>
          注册信息
        </NavBar>
        <div className={styles.list}>
          <List>
            <InputItem
              clear
              placeholder="请输入姓名"
              onBlur={val => this.setState({ name: val })}
              {...getFieldProps("name", {
                rules: [{ required: true }]
              })}>
              姓名
            </InputItem>
            {this.errorCom("name")}
            <InputItem
              clear
              placeholder="请输入年龄"
              onBlur={val => this.setState({ age: val })}
              {...getFieldProps("age", {
                rules: [{ required: true }]
              })}>
              年龄
            </InputItem>
            {this.errorCom("age")}
            <DatePicker
              mode="year"
              {...getFieldProps("year", {
                rules: [{ required: true }]
              })}>
              <List.Item arrow="horizontal">入学年份</List.Item>
            </DatePicker>
            {this.errorCom("year")}

            <Picker
              title="请选择学院和专业"
              cols={2}
              value={this.state.asyncValue}
              data={this.state.allCollege}
              onOk={this.onPickerChange}
              {...getFieldProps("college")}>
              <List.Item arrow="horizontal">学院-专业</List.Item>
            </Picker>
            <Picker
              title="请选择班级"
              data={this.state.allClass}
              cols={1}
              value={this.state.class}
              onOk={val => {
                this.setState({ class: val })
              }}
              {...getFieldProps("class")}>
              <List.Item arrow="horizontal">班级</List.Item>
            </Picker>
            <WhiteSpace />
          </List>
        </div>
        <Button style={buttonStyle} type="primary" onClick={this.handleClick}>
          提交
        </Button>
      </div>
    )
  }
}

export default createForm()(Register)
