export type PostType = {
    id: number
    likesCount: number
    post: string
}

export type ContactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    aboutMe: string | null
    contacts: Array<ContactsType>
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string,
    userId: number
    photos: Array<PhotosType>
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
} 
