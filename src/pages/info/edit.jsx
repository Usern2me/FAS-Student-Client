import React, { PureComponent } from "react"
import Router from "umi/router"
import { connect } from "dva"
import { List, InputItem, WhiteSpace, NavBar, Icon, Button, Picker, Toast } from "antd-mobile"
import { createForm } from "rc-form"
import styles from "./edit.less"
import { getSchool, updateInfo } from "@/services"

const buttonStyle = {
  width: "70%",
  margin: "0 auto"
}
// 将action作为props绑定到props上，用this.props.fn直接调用
const myDispatch = (dispatch, ownProps) => {
  return {
    save: (...args) => {
      dispatch({ type: "save", payload: ownProps })
    }
  }
}
@connect(
  ({ info }) => ({
    info
  }),
  myDispatch
)
class Edit extends PureComponent {
  constructor(props) {
    super(props)
  }

  state = {
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
    // this.setState({ info: { ...this.state.info, college_id: value[0], major_id: value[1] } })
  }

  // 验证数据并提交数据
  handleClick = () => {
    this.props.form.validateFields(async (error, value) => {
      if (error) {
        console.log("error->", error)
      } else {
        await updateInfo(this.props.info)
          .then(res => {
            if (res.code === 0) {
              Toast.success("修改成功", 0.6)
              Router.push(`/info?id=${res.data.stu_id}`)
            }
          })
          .catch(err => {
            Toast.fail("修改信息出现问题啦，请再试一次", err)
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
    const { info } = this.props
    return (
      <div className={styles.registerContainer}>
        <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => Router.push("/info")}>
          编辑信息
        </NavBar>
        <div className={styles.list}>
          <List>
            <InputItem
              clear
              placeholder="请输入姓名"
              value={info.name}
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
              value={info.age}
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
              value={info.phone}
              onBlur={val => this.setState({ info: { ...this.state.info, phone: val } })}
              {...getFieldProps("phone", {
                rules: [{ required: true, len: 11 }]
              })}>
              电话
            </InputItem>
            {this.errorCom("phone")}
            <InputItem
              clear
              placeholder="请输入你的邮箱"
              value={info.email}
              onBlur={val => this.setState({ info: { ...this.state.info, email: val } })}
              {...getFieldProps("email", {
                rules: [{ required: true, len: 11 }]
              })}>
              邮箱
            </InputItem>
            {this.errorCom("phone")}
            <InputItem
              clear
              placeholder="请输入密码"
              value={info.password}
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
              value={info.gender}
              onOk={val => {
                this.setState({ info: { ...this.state.info, gender: val[0] } })
              }}
              {...getFieldProps("gender")}>
              <List.Item arrow="horizontal">性别</List.Item>
            </Picker>
            <Picker
              title="请选择学院"
              cols={1}
              value={info.college_id}
              data={this.state.allCollege}
              onOk={this.onPickerChange}
              {...getFieldProps("college")}>
              <List.Item arrow="horizontal">学院</List.Item>
            </Picker>
            <Picker
              title="请选择专业"
              cols={1}
              value={info.major_id}
              data={this.state.allCollege}
              onOk={this.onPickerChange}
              {...getFieldProps("major")}>
              <List.Item arrow="horizontal">专业</List.Item>
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
            <InputItem
              clear
              placeholder="请输入你的地址"
              value={info.address}
              onBlur={val => this.setState({ info: { ...this.state.info, address: val } })}
              {...getFieldProps("address")}>
              地址
            </InputItem>
            <InputItem
              clear
              placeholder="请输入你的民族"
              value={info.nation}
              onBlur={val => this.setState({ info: { ...this.state.info, nation: val } })}
              {...getFieldProps("address")}>
              民族
            </InputItem>
            <WhiteSpace />
          </List>
        </div>
        <Button style={buttonStyle} type="primary" onClick={this.handleClick}>
          提交修改
        </Button>
      </div>
    )
  }
}

export default createForm()(Edit)
