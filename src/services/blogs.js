import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data
}

const createBlog = async (blog, token) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`
    }
  }
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
}

export {
  getAll,
  createBlog,
}
