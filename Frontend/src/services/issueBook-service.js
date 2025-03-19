/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import axios from "axios";
import { API } from "../components/API";


const HttpClient = {
    get: (resourceUri) => {
        return axios.get(`${API}${resourceUri}`);
    },
    post: (resourceUri, payload) => {
        return axios.post(`${API}${resourceUri}`, payload);
    },
    put: (resourceUri, payload) => {
        return axios.put(`${API}${resourceUri}`, payload);
    },
    remove: (resourceUri) => {
        return axios.delete(`${API}${resourceUri}`);
    },
};

export default HttpClient;
