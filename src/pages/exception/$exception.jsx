import React from 'react';
import { Link } from 'umi/link';
import './exception.less';

export default ({ match }) => {
  // 获取路由里的参数
  const error = match.params.exception;
  return (
    <div className="exception-container">
      <img src="../../assets/yay.jpg" alt="页面出错啦" />
      <div className="promopt">
        <h3 className="title">
          {error}-错误
        </h3>
        <p className="description">
          您要找的页面没有找到，请返回
        <Link to="/">首页</Link>
          继续浏览
        </p>
      </div>
    </div>
  );
};
