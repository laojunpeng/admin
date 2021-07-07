/**
 * ##14 easymock生成的api模块，改造一下
 */
import axios from "axios";

const instance = axios.create();

// 等待请求队列
let penddingRequest = [];

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function ({ response }) {
    console.log(response);
    // 对请求错误做些什么
    return Promise.reject(response);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function ({ response }) {
    return Promise.reject(response);
  }
);

function createAPI(baseURL) {
  return function (conf) {
    conf = conf || {};
    return instance(
      Object.assign(
        {},
        {
          url: conf.url,
          baseURL: baseURL,
          method: conf.method,
        },
        conf.opts
      )
    );
  };
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url;
  const pathKeys = Object.keys(opts.path);
  pathKeys.forEach((key) => {
    const r = new RegExp("(:" + key + "|{" + key + "})", "g");
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

export { createAPI, convertRESTAPI };
