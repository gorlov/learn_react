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
    },

    aploadPhoto(photoFile) {
        console.log(photoFile);

        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
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