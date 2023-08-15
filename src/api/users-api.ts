import { GetItemsType, APIResponseType, instance } from "./api"


export const userAPI = {
    getUsers(currentPageNumber: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPageNumber}&count=${pageSize}`).then(response => response.data);
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(response => response.data);
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<APIResponseType>;
    }

}