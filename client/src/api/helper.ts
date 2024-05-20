import axios from "axios";
import { message } from "ant-design-vue";

axios.defaults.baseURL = '/api';

// http response 异常统一处理拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      if (response.data.msg) {
        message.success(response.data.msg)
      }
      return response.data.data;
    } else {
      message.error(response.data.msg);
      return Promise.reject(response.data);
    }
  },
  (error) => {
    message.error(error.message)
    return Promise.reject(error.response.data);
  }
);