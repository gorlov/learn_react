import { instance } from "./api"
import { APIResponseType } from "./api"


type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginMeResponseDataType = {
    userId: number
}

export const authAPI = {

    me() {
        return instance.get<APIResponseType<MeResponseDataType>>('auth/me').then(response => response.data);
    },

    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<APIResponseType<LoginMeResponseDataType>>('auth/login', { email, password, rememberMe }).then(response => response.data);
    },

    logout() {
        return instance.delete('auth/login');
    },
}