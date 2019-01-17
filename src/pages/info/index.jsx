
import React, { Component } from 'react';
import { InputItem, Button } from 'antd-mobile'

import style from '../index.less'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }
  enterLoading = () => {
    this.setState({ isLoading: true })
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-input">
          <InputItem></InputItem>
          <InputItem></InputItem>
        </div>
        <div className="login-submit">
          <Button type="primary" icon="poweroff" loading={this.state.isLoading} onClick={this.enterLoading}>
            确认
            </Button>
        </div>
      </div>
    );
  }
}
export default Login
