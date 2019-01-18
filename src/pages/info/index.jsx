
import React, { Component } from 'react';
import { Grid, TextField } from 'material-ui'
import LoadingButton from '../../components/LoadingButton'

import style from './index.less'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }
  enterLoading = () => {
    this.setState({ isLoading: true })
  }

  login = () => {
    this.enterLoading
  }

  render() {
    return (
      <div className={style.loginContainer}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="请输入学号"
              margin="normal"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='请输入密码'
              type="password"
              margin="normal" />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              onClick="this.login"
              loading={this.state.loading}>
            </LoadingButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Login
