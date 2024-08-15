// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/conductores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};