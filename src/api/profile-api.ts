import { APIResponseType, instance } from "./api"
import { PhotosType, ProfileType } from "../types/types"

type SavePotosResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {

    getProfile(userID: number) {
        return instance.get<ProfileType>(`profile/${userID}`).then(response => response.data);
    },

    getStatus(userID: number) {
        return instance.get(`profile/status/${userID}`).then(response => response.data);
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status/`, { status }).then(response => response.data);
    },

    aploadPhoto(photoFile: any) {
        console.log(photoFile);

        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<APIResponseType<SavePotosResponseDataType>>(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },

    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile).then(response => response.data);
    }
}
