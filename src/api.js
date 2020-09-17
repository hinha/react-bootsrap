import axios from 'axios';

const basic = axios.create({
    baseURL: "http://localhost:5012/"
})

const basic2 = axios.create({
    baseURL: "http://localhost:5012/"
})

export {basic, basic2};