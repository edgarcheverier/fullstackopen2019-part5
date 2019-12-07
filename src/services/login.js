import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/login';

const loginUser = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password });
  return response.data;
}

export {
  loginUser
}
