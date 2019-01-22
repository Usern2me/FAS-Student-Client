import React, { Component } from 'react';
import {Button,NoticeBar, WhiteSpace} from 'antd-mobile';
import BizIcon from '../../components/BizIcon';
import styles from './index.less';

class Index extends Component {
  handlePhont=()=>{

  }
  handleClick=()=>{

  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.info}>
          你好，xxx
          </div>
          <div
            className={styles.startButton}
            onClick={this.handlePhoto}>
            <BizIcon type='renlianshibie'></BizIcon>
            <div className={styles.circleinset}></div>
            <div className={styles.circleoutset}></div>
          </div>
        </div>
        <div className={styles.content}>
          <Button
            type='primary'
            size="large"
            style={{width:'80%',margin:'0 auto'}}
            onClick={this.handleClick}>考勤记录</Button>
        </div>
        <WhiteSpace size="lg" />
        <NoticeBar
          mode="closable"
          marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}
          action={<span style={{ color: '#a1a1a1' }}>不再提示</span>}>
          注意：你有一场考勤正在进行！
        </NoticeBar>
      </div>
    );
  }
}

export default Index;
