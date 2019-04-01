import axios from 'axios';

import vuex from '../store/index'
import router from '../router/index'


import { Notice } from 'iview'
import {logout_post} from './index'

const instance = axios.create({
  // paramsSerializer: function(params) {
  //   return Qs.stringify(params, {arrayFormat: 'brackets'})
  // }
});


instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.code!=200){
    Notice.open({
      title: '系统错误',
      desc:  response.data.msg
    });
    switch (response.data.code){
      case 4010:
        logout_post({params: {token: 'QEdaemliIQ=='}}).then(e => {
          vuex.commit('setUser', {user: null, accessToken: null});
          router.push('/login');
        })
        break;
    };
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  Notice.open({
    title: '网络错误',
    desc:  error
  });
  return Promise.reject(error);
});

function createAPI(baseURL) {
  return function (conf) {
    if(conf){
      if(conf.opts){
        if(conf.opts.params)
          conf.opts.params.accessToken = vuex.state.accessToken;
        if(conf.opts.data)
          conf.opts.data.accessToken = vuex.state.accessToken;
      }
    }else{
      conf = {}
    }
    return instance(Object.assign({}, {
      url: conf.url,
      baseURL: baseURL,
      method: conf.method
    }, conf.opts));
  };
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach((key) => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g');
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

export {
  createAPI,
  convertRESTAPI
};
