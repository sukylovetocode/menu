import axios from "axios";
import qs from "qs";
import { ElMessage } from "element-plus";
import store from "STORE";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL, // api的base_url
  timeout: 5000, // 请求超时时间
});

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["Cms-Token"] = store.getters.token; // 让每个请求携带token--['Cms-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.request.use((request) => {
  //  引进qs Axios中使用post方法发送的不同的数据结构
  let projectAppid = store.getters.projectAppid; // 每个请求都带上项目appid
  if (request.method === "post") {
    request.data.projectAppid = projectAppid;
    request.data = qs.stringify(request.data);
  } else if (request.method === "get") {
    if (!Object.prototype.hasOwnProperty.call(request, "params")) {
      request.params = { projectAppid: projectAppid };
    } else {
      request.params.projectAppid = projectAppid;
    }
  }
  return request;
});

service.interceptors.response.use(
  (response) => {
    if (response.data.status == "success") {
      return response.data.data;
    } else {
      // 登录失效这里处理
      const tokenErrCode = [
        10001, // 用户未登录
        10002, // 用户登陆过期
        10004, // 未分配项目 则不给登陆
        10007, // 飞书token过期
      ];
      if (tokenErrCode.includes(response.data.data.error_code)) {
        store.dispatch("LogOut");
        console.log(response.data.data);
        if (response.data.data.redirect_uri) {
          window.location.href = response.data.data.redirect_uri;
        }
      }
      // 项目应用不存在or无权限 则刷新adminInfo
      const permErrorCode = [
        10003, // 权限不足
        10005, // 项目不存在
        10006, // 项目无权限
      ];
      if (permErrorCode.includes(response.data.data.error_code)) {
        store.dispatch("ReloadAdminInfo");
      }
      ElMessage({
        message: response.data.data.error,
        type: "warning",
        duration: 1000,
      });
      return Promise.reject(response.data.data);
    }
  },
  (error) => {
    console.log("axios err: " + error); // for debug
    ElMessage({
      message: "System Error!!",
      type: "error",
      duration: 1000,
      showClose: true,
    });
    return Promise.reject(error);
  }
);

export default service;
