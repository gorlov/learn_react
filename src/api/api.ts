import axios from 'axios';
import { ProfileType } from '../types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "d345afdd-f938-4cd0-b8a4-5aeea504e6a2"
    }
})



export const userAPI = {
    getUsers(currentPageNumber: number, pageSize: number) {
        return instance.get(`users?page=${currentPageNumber}&count=${pageSize}`)
            .then(response => response.data)
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    }

}


export const profileAPI = {

    getProfile(userID: number) {
        return instance.get(`profile/${userID}`)
    },

    getStatus(userID: number) {
        return instance.get(`profile/status/${userID}`)
    },

    updateStatus(status: string) {
        return instance.put(`profile/status/`, { status })
    },

    aploadPhoto(photoFile: any) {
        console.log(photoFile);

        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginMeResponseType = {
    data: { userId: number }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {

    me() {
        return instance.get<MeResponseType>('auth/me').then(response => response.data);
    },

    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginMeResponseType>('auth/login', { email, password, rememberMe }).then(response => response.data);
    },

    logout() {
        return instance.delete('auth/login');
    },
}