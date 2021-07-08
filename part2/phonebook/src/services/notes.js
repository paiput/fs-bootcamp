import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);  
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(res => res.data);
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  request.then(res => res.data)
  .catch(err => {
    console.log('error:', err)
  });
}

const exportedServices = { getAll, create, remove };

export default exportedServices;