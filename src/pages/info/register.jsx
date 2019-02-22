import React, { PureComponent } from "react"
import Router from "umi/router"
import {
  List,
  InputItem,
  WhiteSpace,
  NavBar,
  Icon,
  Button,
  DatePicker,
  Picker,
  Toast
} from "antd-mobile"
import { createForm } from "rc-form"

import { getSchool, userRegister } from "@/services"

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
    info: {
      name: "",
      password: "",
      age: 20,
      gender: "男",
      college_id: "",
      major_id:"",
      class_id: "",
      year: ""
    },
    loading: false,
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
    this.setState({ info: { ...this.state.info, college_id: value[0], major_id: value[1] } })
  }

  // 验证数据并提交数据
  handleClick = () => {
    this.props.form.validateFields(async (error, value) => {
      if (error) {
        console.log("error->", error)
      } else {
        await userRegister(this.state.info)
          .then(res => {
            if (res.code === 0) {
              Toast.success("注册成功，正在跳转",0.6)
              Router.push(`/info?id=${res.data.stu_id}`)
            }
          })
          .catch(err => {
            Toast.fail("注册出现问题啦，请再试一次", err)
          })
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
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => Router.push("/info")}>
          注册信息
        </NavBar>
        <div className={styles.list}>
          <List>
            <InputItem
              clear
              placeholder="请输入姓名"
              onBlur={val => this.setState({ info: { ...this.state.info, name: val } })}
              {...getFieldProps("name", {
                rules: [{ required: true }]
              })}>
              姓名
            </InputItem>
            {this.errorCom("name")}
            <InputItem
              clear
              placeholder="请输入年龄"
              onBlur={val => this.setState({ info: { ...this.state.info, age: val } })}
              {...getFieldProps("age", {
                rules: [{ required: true, max: 3 }]
              })}>
              年龄
            </InputItem>
            {this.errorCom("age")}
            <InputItem
              clear
              placeholder="请输入你的电话"
              onBlur={val => this.setState({ info: { ...this.state.info, phone: val } })}
              {...getFieldProps("phone", {
                rules: [{ required: true, len: 11 }]
              })}>
              电话
            </InputItem>
            {this.errorCom("phone")}
            <InputItem
              clear
              placeholder="请输入密码"
              onBlur={val => this.setState({ info: { ...this.state.info, password: val } })}
              {...getFieldProps("password", {
                rules: [{ required: true }]
              })}>
              密码
            </InputItem>
            {this.errorCom("password")}
            <Picker
              title="你的性别"
              data={[{ label: "男", value: "男" }, { label: "女", value: "女" }]}
              cols={1}
              value={this.state.gender}
              onOk={val => {
                this.setState({ info: { ...this.state.info, gender: val[0] } })
              }}
              {...getFieldProps("gender")}>
              <List.Item arrow="horizontal">性别</List.Item>
            </Picker>

            <DatePicker
              mode="year"
              value={this.state.year}
              onOk={val => {
                this.setState({ info: { ...this.state.info, year: val } })
              }}
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
              value={this.state.class_id}
              onOk={val => {
                this.setState({ info: { ...this.state.info, class_id: val[0] } })
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
