import axios from 'axios'

const api = axios.create({
    baseURL: 'https://devenish-data-vis.herokuapp.com/data'
});

export const sendMetrics = async (body) => {
    const resp =  await api.post('/create', body);
    return resp.data;
};
