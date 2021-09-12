import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id) => {
  const request = await axios.post(`${baseUrl}/${id}/like`);
  return request.data;
};

const remove = async (id, body) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.post(`${baseUrl}/${id}/delete`, body, config);
  return request.data;
};

export default { getAll, remove, create, update, setToken };
