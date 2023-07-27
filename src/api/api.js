import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "d345afdd-f938-4cd0-b8a4-5aeea504e6a2-000"
    }
})



export const userAPI = {
    getUsers(currentPageNumber, pageSize) {
        return instance.get(`users?page=${currentPageNumber}&count=${pageSize}`)
            .then(response => response.data)
    },

    follow(userId) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },

    unfollow(userId) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)

    }

}


export const authAPI = {
    getMe() {
        return instance.get('auth/me').then(response => response.data)
    }
}


export const profileAPI = {
    getProfile(userID) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/${userID}`)
    }
}