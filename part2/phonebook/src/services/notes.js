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

const exportedServices = { getAll, create };

export default exportedServices;