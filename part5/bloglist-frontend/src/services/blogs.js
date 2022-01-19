import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.get(baseUrl, config);
  return request.data;
};

const create = async blog => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.post(baseUrl, blog, config);
  return request.data;
};

const services = { setToken, getAll, create };
export default services;