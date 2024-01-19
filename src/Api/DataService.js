import axios from 'axios';

const API_URL = "http://SynDyS-SynDy-iXq8zOHOIHSU-1919105447.us-east-1.elb.amazonaws.com";

const createDataset = async (data) => {
  return axios.post(`${API_URL}/create_dataset`, data);
};

const listDatasets = () => {
  return axios.get(`${API_URL}/list_topics`);
};

const sampleDataset = (datasetId) => {
  return axios.get(`${API_URL}/sample_dataset`, {
    params: { 'topic': datasetId }
  });
};

export default {
  createDataset,
  listDatasets,
  sampleDataset
};