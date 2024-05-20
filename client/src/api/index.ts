import './helper'
import axios from "axios";

const api =  {
  resigner(params) {
    return axios.post(`/resigner`, params);
  },
};

window['api'] = api;