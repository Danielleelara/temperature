import axios from "axios";

const blogFetch = axios.create({
    baseURL: 'https://api.hgbrasil.com',
    headers: {
     'Content-type': 'application/json',
    }
})

export default blogFetch