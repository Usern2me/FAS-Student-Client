
import React from 'react';

const BizIcon = props => {
  const { type } = props;
  return <i className={`iconfont icon-${type}`} />
};
export default BizIcon;

