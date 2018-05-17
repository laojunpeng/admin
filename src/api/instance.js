import { createAPI } from './util';
import config from './config';

const baseUrl = {
  mock: 'https://www.easy-mock.com/mock/5a0514c4034de12ca2035e13/admin',
  dev: '/csc/api/',
  pre: 'http://192.168.1.247:8081/csc/api/',
  prod: '/csc/api/'
}[config.env || 'mock'];

export default createAPI(baseUrl);
