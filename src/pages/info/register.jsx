import React, { Component } from 'react'
import { List, InputItem, WhiteSpace, Button, DatePicker, Picker } from 'antd-mobile'
import { createForm } from 'rc-form';
import styles from './register.less'

const allCollege = [{
  "value": "340000",
  "label": "安徽省",
  "children": [{
    "value": "341522",
    "label": "霍邱县",
    "children": []
  }, {
    "value": "341525",
    "label": "霍山县",
    "children": []
  },
  {
    "value": "341502",
    "label": "金安区",
    "children": []
  }]
},
{
  "value": "341800",
  "label": "宣城市",
  "children": [{
    "value": "341822",
    "label": "广德县",
    "children": []
  }, {
    "value": "341824",
    "label": "绩溪县",
    "children": []
  }, {
    "value": "341825",
    "label": "旌德县",
    "children": []
  }]
}
]
const allClass = [
  {
    "value": '11',
    "label": '111',
    "children": []
  },
  {
    "value": '22',
    "label": '22',
    "children": []
  },
  {
    "value": '33',
    "label": '333',
    "children": []
  },
]
class Register extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    loading: false,
    name: '',
    age: 20,
    gender: '男',
    college: '',
    class: '',
    year: '',
  }

  componentDidMount() {
    this.fetchData()
  }

  // 控制错误的组件
  errorCom = (errorName) => {
    let err=this.props.form.getFieldError(`${errorName}`)
    return ( err &&
      <div className={styles.error}>
        <span>{err}</span>
      </div>
    )
  }
  fetchData = () => {
    // 初始化下拉框的内容
  }   
  handleChange = (e) => {
    // console.log('aaa',e)
    // console.log(this.props.form.getFieldValue('name'))
    this.setState({ e })
  }
  handleClick = (e) => {
    // 验证数据并提交数据
    this.props.form.validateFields((error, value) => {
      if (error) {
        console.log('error->', error);
      } else {
        console.log('validator->', value)
      }
    });
  }

  render() {
    let errors
    const { getFieldError, getFieldProps } = this.props.form
    return (
      <div className={styles.registerContainer}>
        <List className={styles.list}>
          <InputItem
            clear
            placeholder='请输入姓名'
            {...getFieldProps(
              'name', {
                rules: [
                  { required: true },
                  { range: { max: 6, min: 2 } }
                ]
              }
            )
            }
          >
            姓名
          </InputItem>
          {this.errorCom('name')}
          <InputItem
            clear
            type='number'
            placeholder='请输入年龄'
            {...getFieldProps(
              'age', {
                rules: [
                  { required: true },
                ]
              }
            )
            }
          >
            年龄
          </InputItem>
          {this.errorCom('age')}
          <DatePicker
            mode='year'
            {...getFieldProps(
              'year', {
                rules: [
                  { required: true }
                ]
              }
            )
            }>
            <List.Item arrow="horizontal">入学年份</List.Item>
          </DatePicker>
          {this.errorCom('year')}
          <Picker
            title='请选择学院和专业'
            data={allCollege}
            cols={2}
            {...getFieldProps('college')}>
            <List.Item arrow="horizontal">学院-专业</List.Item>
          </Picker>
          <Picker
            title='请选择班级'
            data={allClass}
            cols={1}
            {
            ...getFieldProps('class')
            }>
            <List.Item arrow="horizontal">班级</List.Item>
          </Picker>
          <WhiteSpace />
          <Button
            onClick={this.handleClick}>
            提交</Button>
        </List>
      </div >
    )
  }
}

export default createForm()(Register)
