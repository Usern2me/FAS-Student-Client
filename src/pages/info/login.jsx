import React, { Component } from "react"
import { List, Flex, InputItem, WhiteSpace, Button, Toast } from "antd-mobile"
import style from "./login.less"
import BizIcon from "../../components/BizIcon"

import Router from "umi/router"
import { userLogin } from "@/services"

class Login extends Component {
  constructor() {
    super()
  }
  state = {
    loading: false
  }
  enterLoading = () => {
    this.setState({ loading: true })
  }

  login = () => {
    this.enterLoading()
    const {
      state: { value: id }
    } = this.idRef
    const {
      state: { value: pwd }
    } = this.pwdRef
    // 请求服务器数据
    userLogin({ id: id, pwd: pwd })
      .then(() => {
        Toast.success("登录成功，正在跳转...", 0.8)
        Router.push(`/info?id=${id}`)
      })
      .catch(() => {
        Toast.fail("password error")
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <div className={style.loginContainer}>
        <div className={style.loginFlex}>
          <div className={style.title}>登陆</div>
          <List>
            <List.Item thumb={<BizIcon type="user" />}>
              <InputItem clear ref={el => (this.idRef = el)} className={style.loginInput}>
                学号：
              </InputItem>
            </List.Item>
            <List.Item thumb={<BizIcon type="dingzhi" />}>
              <InputItem clear ref={el => (this.pwdRef = el)} className={style.loginInput}>
                密码：
              </InputItem>
            </List.Item>
            <List.Item>
              <Button
                loading={this.state.loading}
                onClick={this.login}
                className={style.loginSubmit}>
                登陆
              </Button>
            </List.Item>
          </List>
          <WhiteSpace size="lg" />
          <a onClick={() => Router.push("/info/register")} className={style.loginLink}>
            没有账号？前往注册
          </a>
          <WhiteSpace size="lg" />
        </div>
      </div>
    )
  }
}
export default Login
