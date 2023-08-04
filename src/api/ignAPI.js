import axios from 'axios';

const ignite = axios.create({
    // withCredentials: false,
    // crossOrigin: true,
    baseURL: 'http://192.168.1.252:8080/',
    headers: {
        'Content-Type': 'application/json',
        // 'crossDomain': true, 
        
    },
    // cors: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers": "Content-Type"
    //   }
})

export const logAPI = {
    getLines(lineFrom, lineTo, path) {
        return ignite.get(`ignite?cmd=log&from=${lineFrom}&to=${lineTo}`)
    }
} 

