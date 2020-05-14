/**
 * Created by K0230003 on 2018/12/14.
 */
import axios from 'axios';
import helper from './helper';
import { message } from 'antd';
import { timeout, apiPrefix } from './request';

const { queryToString, getRandomInteger } = helper;

message.config({
  top: 100,
  duration: 2,
  maxCount: 1,
});

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers['Pragma'] = 'no-cache';
axios.defaults.headers['Access-Control-Allow-Headers'] = '*';
axios.defaults.headers['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

const api = axios.create({
  // 请求前缀
  baseURL: apiPrefix,
  // 超时时间
  timeout,
  // 发送请求时需带上cookie
  // withCredentials: true,
  // 响应类型
  responseType: 'json',
  responseEncoding: 'utf8',
  Pragma: 'no-cache',
});

// /**
//  * 下面是为了修复axios get请求不能设置content-type的bug
//  */
// api.interceptors.request.use((config) => {
//   // 在发送请求之前做些什么
//   // 随便写个值 绕过if判段
//   if (config.method === 'get') {
//     config.data = true;
//   }
//   config.headers['HT_TS'] = (new Date()).getTime();
//   config.headers['HT_NONCE'] = getRandomInteger();
//   config.headers['HT_OPEN_TYPE'] = 'OPENAPI';

//   return config;
// }, (error) => {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // response.setHeader("Access-Control-Allow-Origin","*");　　//允许所有域名访问

  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
const parseResponse = (response, url) => {
  // data是服务器发回的响应
  console.log("response------------------>", response);
  // response.setHeader("Access-Control-Allow-Origin","*");　　//允许所有域名访问
  const { data } = response;
  // 这里可以根据和后端的约定接口，对响应进行统一判断
  // 然后throw出错误信息
  return data;
};


/**
 * api生成器
 *
 * @return {Fucntion}
 */
export default function createApi() {
  return {
    /**
     * @param {string} url API url
     * @param {Object} query 请求参数
     * @param {Object} config 请求配置项 如header等等
     * @return {Promise}
     */
    get(url, query, config = {}) {
      // config.withCredentials = true;
      // config.header = { Pragma: 'no-cache'};

        return api.get(`${url}?${queryToString(query)}`, config)
          .then((res, requestUrl) => {
            return parseResponse(res, url);
          });
    },

    /**
     * @param {string} url API url
     * @param {Object} query 请求参数
     * @param {Object} config 请求配置项 如header等等
     * @return {Promise}
     */
    post(url, query, config = {}) {
      // config.header = { Pragma: 'no-cache'};
      return api.post(url, query, config)
        .then((res, requestUrl) => parseResponse(res, url));
    },

    /**
     * @param {string} url 神策日志接收服务器url
     * @param {Object} query 日志参数
     *
     * @return {Promise}
     */
    sendLog(url, query) {
      return axios.post(url, query);
    },
  };
}
