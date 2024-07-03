import axios from 'axios';

const API_URL = 'https://octicode-api.vercel.app';

export const fetchUserData = async () => {
  const response = await axios.get(`${API_URL}/user`);
  return response.data;  // Ensure this returns an array of users
};
