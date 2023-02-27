import axios from 'axios';
import { Config } from '../../../config';

async function Signup(data) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios
    .post(`${Config.apiEndPoint}/auth/register`, data, requestOptions)
    .then((data) => {
      return data;
    })
    .catch((error) => error.response);
}

export const serviceOrderService = {
  Signup,
};
