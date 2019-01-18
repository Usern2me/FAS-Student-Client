import React, { Component, TextField, MenuItem } from 'react'
import LoadingButton from '@components/LoadingButton'

import styles from './register.less'

const allGender = [{
  value: '男',
  label: '男'
},
{
  value: '女',
  label: '女'
}]
const allCollege = [{
  value: '学院1',
  label: '学院1'
}, {
  value: '学院2',
  label: '学院2'
}]
const allClass = [{
  value: '班级1',
  label: '班级1'
}, {
  value: '班级2',
  label: '班级2'
}]
const list = [{
  id: 'gender',
  name: '性别',
  data: allGender
}, {
  id: 'college',
  name: '学院',
  data: allCollege
}, {
  id: 'class',
  name: '班级',
  data: allClass
}]

class Register extends Component {
  state = {
    loading: false,
    name: '',
    age: 20,
    gender: '男',
    college: '',
    class: '',
    year: '',
  }

  fetchData = () => {
    // 初始化下拉框的内容
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }
  handleClick = () => {
    // 提交数据
  }
  render() {
    return (
      <div className="styles.registerContainer">
        <form className={styles.form} noValidate autoComplete>
          <textField
            id="name"
            label="姓名"
            className={styles.textField}
          />
          {list.map(v => (
            <TextField
              id={v.id}
              select
              label={v.name}
              className={styles.textField}
              value={this.state[v.id]}
              onChange={this.handleChange(v.id)}
              SelectProps={{
                MenuProps: {
                  className: styles.menu,
                },
              }}
              margin="normal"
            >
              {v[data].map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ))}
          <LoadingButton
            onClick="this.handleClick"
            loading={this.state.loading}>
          </LoadingButton>
        </form>
      </div>
    )
  }
}

export default Register
