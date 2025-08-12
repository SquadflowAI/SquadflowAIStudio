export const API_BASE_URL = 'https://localhost:44379/api';
export const API_VIBE_CODE_BASE_URL = 'https://localhost:44380/api';
// API Endpoints
export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  getUser: `${API_BASE_URL}/user`,
  updateProfile: `${API_BASE_URL}/user/update`,
};