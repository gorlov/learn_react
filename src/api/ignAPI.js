import axios from 'axios';

const ignite = axios.create({
    withCredentials: true,
    baseURL: 'http://192.168.1.252:8080/ignite?cmd=',
    headers: {}
})

export const logAPI = {
    getLines(lineFrom, lineTo, path) {
        return ignite.get(`log&from=${lineFrom}&to=${lineTo}`)
    }
} 

export const userAPI = {
    getUsers(currentPageNumber, pageSize) {
        return instance.get(`users?page=${currentPageNumber}&count=${pageSize}`)
            .then(response => response.data)
    },

    follow(userId) {
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    }

}


export const profileAPI = {
    
    getProfile(userID) {
        return instance.get(`profile/${userID}`)
    },

    getStatus(userID) {
        return instance.get(`profile/status/${userID}`)
    },

    updateStatus(status) {
        return instance.put(`profile/status/`, {status})
    }
}


export const authAPI = {
    
    me() {
        return instance.get('auth/me').then(response => response.data);
    },

    login(email, password, rememberMe) {
        return instance.post('auth/login', { email, password, rememberMe });
    }, 

    logout() {
        return instance.delete('auth/login');
    }, 
}