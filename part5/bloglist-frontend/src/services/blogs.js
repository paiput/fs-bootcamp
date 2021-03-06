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

const update = async (blogId, blog) => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.put(`${baseUrl}/${blogId}`, blog, config);
  return request;
};

const remove = async blogId => {
  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.delete(`${baseUrl}/${blogId}`, config);
  return request;
};

const services = { setToken, getAll, create, update, remove };
export default services;