import axios from 'axios';

const API_URL = 'https://octicode-api.vercel.app';

const login = (tokenId: string) => {
  return axios.post(`${API_URL}/auth/login`, null, {
    params: {
      nfc_id: tokenId
    }
  });
};

const authService = {
  login,
};

export default authService;
