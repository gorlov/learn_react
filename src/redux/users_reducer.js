const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';


let initialState = {
    users: [
        { id: 1, photoURL: './face_1.png', followed: true, fullName: 'AVG', status: 'true`Ъ', location: { city: 'Moscow', country: 'Russia' } },
        { id: 2, photoURL: './face_1.png', followed: true, fullName: 'Merlin', status: 'true`Ъ', location: { city: 'Lipetsk', country: 'Russia' } },
        { id: 3, photoURL: './face_1.png', followed: false, fullName: 'Neo', status: 'true`Ъ', location: { city: 'Elets', country: 'Russia' } },
        { id: 4, photoURL: './face_1.png', followed: false, fullName: 'Xeron', status: 'true`Ъ', location: { city: 'Lipetsk', country: 'Russia' } },
        { id: 5, photoURL: './face_1.png', followed: true, fullName: 'Martin', status: 'true`Ъ', location: { city: 'Voronezh', country: 'Russia' } },
        { id: 6, photoURL: './face_1.png', followed: true, fullName: 'Tema', status: 'true`Ъ', location: { city: 'Voronezh', country: 'Russia' } },
    ],
    newPostText: '... и животноводство!'
}


const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }

        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }

        default:
            return state;

    }

}


export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });

export const setUsersAC = (users) => ({ type: SET_USERS, users });


export default usersReducer;