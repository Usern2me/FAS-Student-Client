import React, { Component } from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'

import style from './index.less'
export default class Info extends Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.top}></div>
        <div className={style.avater}></div>
        <div>
            <WhiteSpace size="sm" />
            <Card className={style.card}>
              <Card.Header
                title="This is title"
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              />
              <Card.Body>
                <div>This is content of `Card`</div>
              </Card.Body>
            </Card>
        </div>
        <div className={style.edit}></div>
      </div>
    );
  }
}
