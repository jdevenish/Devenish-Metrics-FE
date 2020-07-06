import axios from 'axios'

const api = axios.create({
    baseURL: 'https://freegeoip.app/json/'
});

export const getLocationData = async () => {
    const resp =  await api.get('/');
    if(resp.status === 200){
        return {
            city: resp.data.city,
            state: resp.data.region_name,
            country: resp.data.country_code,
            date: Date.now()
        }
    } else {
        return {
            city: "",
            state: "",
            country: "",
            date: ""
        }
    }
};
