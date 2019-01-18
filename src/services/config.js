
import { stringify } from 'qs';
import request from './request';

const dev = process.env.NODE_ENV === 'development';
const defaultHost = 'localhost:8099';

// 请求地址是当前访问地址
const currentHost = () => {
  if (dev || /^[\d]|localhost/.test(window.location.host)) return defaultHost;
  return `${window.location.origin}`;
};

console.log('环境变量->', currentHost());


export { stringify, request };
