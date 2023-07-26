import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "d345afdd-f938-4cd0-b8a4-5aeea504e6a2"
    }
})



export const userAPI = {
    getUsers(currentPageNumber, pageSize) {
        debugger;
        return instance.get(`users?page=${currentPageNumber}&count=${pageSize}`)
            .then(response => response.data)
    }

}