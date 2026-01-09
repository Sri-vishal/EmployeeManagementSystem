import axios from 'axios';

const API_URL = 'http://localhost:5000/api/organizations';

export const getOrganizations = () =>
  axios.get(API_URL);

export const createOrganization = data =>
  axios.post(API_URL, data);
