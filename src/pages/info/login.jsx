
import React, { Component } from 'react'
import { Flex, InputItem, WhiteSpace, Button } from 'antd-mobile'
import style from './login.less'
import  Router  from 'umi/router';

class Login extends Component {
  constructor() {
    super()
  }
  state = {
    loading: false,
  }
  enterLoading = () => {
    this.setState({ loading: true })
  }

  login = () => {
    this.enterLoading()
    const { state: { value: id } } = this.idRef
    const { state: { value: pwd } } = this.pwdRef
    // 提交数据
    // 跳转路由
    // Router.push('/info')
  }

  render() {
    return (
      <div className={style.loginContainer}>
        <div className={style.loginFlex}>
          <WhiteSpace size="lg" />
          <Flex>
            <Flex.Item>
              <InputItem
                clear
                ref={el => this.idRef = el}
                placeholder="在此处输入您的学号"
                className={style.loginInput}>
                学号：
              </InputItem>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="lg" />
          <Flex>
            <Flex.Item>
              <InputItem
                clear
                ref={el => this.pwdRef = el}
                placeholder="在此处输入您的密码"
                className={style.loginInput}>
                密码：
              </InputItem>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="lg" />
          <Flex>
            <Flex.Item>
              <Button
                loading={this.state.loading}
                onClick={this.login}
                className={style.loginSubmit}>
                登陆
            </Button>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="lg" />
          <Flex>
            <Flex.Item>
              <a
                onClick={() => Router.push('info/register')}
              className={style.loginLink}>
                没有账号？前往注册
                </a>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="lg" />
        </div>
      </div>
    );
  }
}
export default Login
